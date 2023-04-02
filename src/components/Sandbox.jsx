function runJavaScriptCodeInIframe(html, css, js, onOutput) {
  const iframe = document.createElement("iframe");

  // Sandbox the iframe to prevent it from accessing the parent window
  iframe.setAttribute("sandbox", "allow-scripts allow-same-origin");
  iframe.style.display = "none";

  // Append the iframe to the DOM
  document.body.appendChild(iframe);

  // Define a custom console log function
  const customConsoleLog = function log(...args) {
    // disable the no-unused-expressions
    // eslint-disable-next-line no-unused-expressions
    onOutput && onOutput(args.join(" "));
  };

  // Create a script tag to override the console.log function within the iframe
  const scriptTag = document.createElement("script");
  scriptTag.innerHTML = `
    console.log = ${customConsoleLog.toString()};
  `;

  // Add the script tag to the iframe
  iframe.contentWindow.document.head.appendChild(scriptTag);

  // Add the provided HTML, CSS, and JS to the iframe
  iframe.contentWindow.document.body.innerHTML = html;
  const styleTag = document.createElement("style");
  styleTag.innerHTML = css;
  iframe.contentWindow.document.head.appendChild(styleTag);
  const jsTag = document.createElement("script");
  jsTag.innerHTML = js;
  iframe.contentWindow.document.body.appendChild(jsTag);

  // Remove the iframe after running the code
  setTimeout(() => {
    document.body.removeChild(iframe);
  }, 0);
}

const runSandboxed = (html, css, js, options = {}) => {
  return new Promise((resolve) => {
    try {
      const { onOutput } = options;

      runJavaScriptCodeInIframe(html, css, js, onOutput);
      resolve();
    } catch (err) {
      if (options.onError) {
        options.onError(err.message);
      }
    }
  });
};

export default runSandboxed;
