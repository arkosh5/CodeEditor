// codeMirrorImports.jsx
import "codemirror/mode/htmlmixed/htmlmixed";
import "codemirror/mode/xml/xml";
import "codemirror/mode/css/css";
import "codemirror/mode/javascript/javascript";
import "codemirror/addon/lint/lint";
import "codemirror/addon/lint/javascript-lint";
import "codemirror/addon/lint/lint.css";
import "codemirror/addon/edit/matchbrackets";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/theme/monokai.css";
import "codemirror/theme/dracula.css";
import "codemirror/theme/eclipse.css";
import "codemirror/addon/hint/show-hint";
import "codemirror/addon/hint/javascript-hint";
import "codemirror/addon/hint/css-hint";
import "codemirror/addon/hint/html-hint";
import "codemirror/addon/hint/show-hint.css";
import "codemirror/addon/hint/xml-hint";

import { JSHINT } from "jshint";

// Set JSHINT as a property on the window object
window.JSHINT = JSHINT;
