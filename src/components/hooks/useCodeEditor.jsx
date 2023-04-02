// useCodeEditor.jsx
import React, { createContext, useEffect, useReducer, useState } from "react";
import { reducer, initialState } from "../Reducer";
import useAutoComplete from "./useAutoComplete";
import { useSaveCode, useLoadCode, useClearCode } from "./codeStorage";
import runSandboxed from "../Sandbox";

export const CodeContext = createContext(null);
const useCodeEditor = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [theme, setTheme] = useState("material");
  const [previewVisible, setPreviewVisible] = useState(true);
  const { tabs, activeTab: activeTabId } = state;
  const activeTab = tabs.find((tab) => tab.id === activeTabId);
  const autoComplete = useAutoComplete();
  const saveCode = useSaveCode(state);
  const loadCode = useLoadCode(dispatch);
  const clearCode = useClearCode(dispatch);
  const [error, setError] = useState("");
  const [, setErrorMessages] = useState([]);
  const [shouldRun, setShouldRun] = useState(false);
  const [, setHasError] = useState(false);

  useEffect(() => {
    if (shouldRun) {
      runSandboxed(activeTab.js, setError).then((r) => {
        if (r) {
          setShouldRun(false);
        }
      });
      setShouldRun(false);
    }
  }, [activeTab.js, shouldRun, setShouldRun]);

  const detectDuplicateDeclarations = (code) => {
    const linesWithError = {};
    const newErrors = [];
    const codeLines = code.split("\n");
    const declaredIdentifiers = new Map();

    for (let i = 0; i < codeLines.length; i++) {
      const line = codeLines[i];
      const lineNumber = i + 1;

      if (/^\s*$/.test(line) || /^\s*\/\//.test(line)) {
        // eslint-disable-next-line no-continue
        continue;
      }

      const matches = line.match(/(let|const|var)\s+([a-zA-Z0-9_$]+)/);
      if (matches) {
        const identifier = matches[2];

        if (
          declaredIdentifiers.has(identifier) &&
          declaredIdentifiers.get(identifier) !== lineNumber
        ) {
          if (!linesWithError[lineNumber]) {
            newErrors.push({
              line: lineNumber,
              message: `Identifier '${identifier}' has already been declared`,
            });
            linesWithError[lineNumber] = true;
          }
        } else {
          declaredIdentifiers.set(identifier, lineNumber);
        }
      }
    }

    return newErrors;
  };

  useEffect(() => {
    const newErrors = detectDuplicateDeclarations(activeTab.js);
    setErrorMessages(newErrors);
    setHasError(newErrors.length > 0);
  }, [activeTab.js]);

  const value = {
    state,
    dispatch,
    theme,
    setTheme,
    previewVisible,
    setPreviewVisible,
    activeTab,
    autoComplete,
    saveCode,
    loadCode,
    clearCode,
    error,
    setError,
    tabs,
    activeTabId,
    shouldRun,
    setShouldRun,
  };

  return value;
};

export default useCodeEditor;
