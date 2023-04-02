/* eslint-disable react/prop-types */
import { Controlled as CodeMirror } from "react-codemirror2-react-17";
import React, { useEffect, useRef, useState } from "react";
import styles from "../CodeEditor.module.css";

export function Editor({
  title,
  mode,
  value: values,
  onChange,
  theme,
  commonOptions,
}) {
  return (
    <div className={styles.editor}>
      <div className={styles.editorTitle}>{title}</div>
      <CodeMirror
        value={values}
        onBeforeChange={onChange}
        options={{ mode, theme, ...commonOptions }}
      />
    </div>
  );
}

function wrapJSCode(jsCode) {
  return `
    (function() {
      const originalLog = console.log;
      console.log = function(...args) {
        window.parent.postMessage({ type: "capturedLog", message: args.join(' ') }, "*");
        originalLog.apply(console, args);
      };

      ${jsCode}
    })();`;
}

export function Preview({ html, css, js, shouldRun }) {
  const iframeRef = useRef(null);
  const [capturedLogs, setCapturedLogs] = useState([]);

  useEffect(() => {
    const iframe = iframeRef.current?.contentWindow;

    if (iframe) {
      iframe.document.open();
      iframe.document.write(`
      <html lang="en">
        <head>
          <style>${css}</style>
          <title>Document</title>
        </head>
        <body>${html}</body>
      </html>
    `);

      if (shouldRun) {
        const wrappedJsCode = wrapJSCode(js);
        const script = iframe.document.createElement("script");
        script.textContent = wrappedJsCode;
        iframe.document.body.appendChild(script);
      }

      iframe.document.close();
    }

    function handleMessage(event) {
      if (event.data.type === "capturedLog") {
        setCapturedLogs((prevLogs) => [
          ...prevLogs,
          { key: Date.now(), message: event.data.message },
        ]);
      }
    }

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [html, css, shouldRun, js]);

  return (
    <>
      <iframe title="Output" ref={iframeRef} className={styles.output} />
      <div className={styles.capturedLogs}>
        <p className={styles.capturedLogsTitle}>Captured Logs:</p>
        {capturedLogs.map(({ key, message }) => (
          <div key={key}>{message}</div>
        ))}
      </div>
    </>
  );
}

export function ThemeSelector({ theme, onThemeChange }) {
  const themeSelectId = "theme-select";

  return (
    <div className={styles.themeSelector}>
      <label htmlFor={themeSelectId}>Select Theme:</label>
      <select id={themeSelectId} value={theme} onChange={onThemeChange}>
        <option value="material">Material</option>
        <option value="monokai">Monokai</option>
        <option value="dracula">Dracula</option>
        <option value="eclipse">Eclipse</option>
      </select>
    </div>
  );
}

export function ErrorMessage({ message }) {
  return <div className={styles.error}>{message}</div>;
}
