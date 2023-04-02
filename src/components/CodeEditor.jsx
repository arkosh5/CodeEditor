// CodeEditor.jsx
import React, { useMemo } from "react";
import useCodeEditor, { CodeContext } from "./hooks/useCodeEditor";
import TabNavigation from "./TabNavigation";
import { Editor, ErrorMessage, Preview, ThemeSelector } from "./hooks/Preview";
import "./codeMirrorImports";
import styles from "./CodeEditor.module.css";

export function CodeEditor() {
  const {
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
  } = useCodeEditor();

  const handleRunCode = () => {
    setShouldRun(true);
  };

  const commonOptions = {
    lineNumbers: true,
    tabSize: 4,
    matchBrackets: true,
    autoCloseBrackets: true,
    bracketMatching: true,
    styleActiveLine: true,
    lint: true,
    extraKeys: {
      "Ctrl-Space": autoComplete,
    },
  };

  const handleHtmlChange = (_, __, value) =>
    dispatch({ type: "SET_HTML", payload: value });
  const handleCssChange = (_, __, value) =>
    dispatch({ type: "SET_CSS", payload: value });
  const handleJsChange = (_, __, value) =>
    dispatch({ type: "SET_JS", payload: value });
  const handleThemeChange = (event) => setTheme(event.target.value);

  const handleTabClick = (tabId) =>
    dispatch({ type: "SET_ACTIVE_TAB", payload: tabId });

  const handleAddTab = () =>
    dispatch({
      type: "ADD_TAB",
      payload: {
        id: Date.now(),
        name: `Tab ${tabs.length + 1}`,
        html: "",
        css: "",
        js: "",
      },
    });

  const handleSaveCode = async () => {
    try {
      await saveCode();
    } catch (err) {
      setError("Failed to save code");
    }
  };

  const handleLoadCode = async () => {
    try {
      await loadCode(dispatch);
    } catch (err) {
      setError("Failed to load code");
    }
  };

  const handleClearCode = () => {
    clearCode(dispatch);
    setPreviewVisible(false);
  };

  const contextValue = useMemo(
    () => ({
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
    }),
    [
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
    ]
  );

  return (
    <CodeContext.Provider value={contextValue}>
      <div className={styles.editorContainer} key={activeTabId}>
        <div className={styles.editorContainer}>
          <div className={styles.editorContainer}>
            <ThemeSelector theme={theme} onThemeChange={handleThemeChange} />
            <TabNavigation
              tabs={tabs}
              activeTabId={activeTabId}
              onTabClick={handleTabClick}
              onAddTab={handleAddTab}
            />
            <div className={styles.editorsWrapper}>
              <Editor
                title="HTML Editor"
                mode="htmlmixed"
                value={activeTab?.html || ""}
                onChange={handleHtmlChange}
                theme={theme}
                commonOptions={commonOptions}
              />
              <Editor
                title="CSS Editor"
                mode="css"
                value={activeTab?.css || ""}
                onChange={handleCssChange}
                theme={theme}
                commonOptions={commonOptions}
              />
              <Editor
                title="JavaScript Editor"
                mode="javascript"
                value={activeTab?.js || ""}
                onChange={handleJsChange}
                theme={theme}
                commonOptions={{
                  ...commonOptions,
                  gutters: ["CodeMirror-lint-markers"],
                  lint: {
                    esversion: 6,
                    globalstrict: true,
                    asi: true,
                    laxbreak: true,
                    laxcomma: true,
                    boss: true,
                    eqnull: true,
                    node: true,
                  },
                }}
              />
            </div>
            <div className={styles.buttons}>
              <button type="button" onClick={handleSaveCode}>
                Save Code
              </button>
              <button type="button" onClick={handleLoadCode}>
                Load Code
              </button>
              <button type="button" onClick={handleClearCode}>
                Clear Code
              </button>
            </div>
            <button
              type="button"
              onClick={() => setPreviewVisible(!previewVisible)}
            >
              {previewVisible ? "Hide Preview" : "Show Preview"}
            </button>
            <button type="button" onClick={handleRunCode}>
              Run JS Code
            </button>
            {previewVisible && (
              <Preview
                html={activeTab?.html}
                css={activeTab?.css}
                js={activeTab?.js}
                shouldRun={shouldRun}
              />
            )}

            {error && <ErrorMessage message={error} />}
          </div>
        </div>
      </div>
    </CodeContext.Provider>
  );
}

export default React.memo(CodeEditor);
