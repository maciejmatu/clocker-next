export const reportError = e => {
  var errorText = [
    e.message,
    "URL: " + e.filename,
    "Line: " + e.lineno + ", Column: " + e.colno,
    "Stack: " + ((e.error && e.error.stack) || "(no stack trace)")
  ].join("\n");

  var DOM_ID = "rendering-debug-pre";
  if (!document.getElementById(DOM_ID)) {
    var log = document.createElement("pre");
    log.id = DOM_ID;
    log.style.display = "none";
    log.style.whiteSpace = "pre-wrap";
    log.textContent = errorText;
    if (!document.body) document.body = document.createElement("body");
    document.body.insertBefore(log, document.body.firstChild);
  } else {
    document.getElementById(DOM_ID).textContent += "\n\n" + errorText;
  }
};

export const setupErrorLogger = () => {
  if (typeof window === "undefined") return;

  window.addEventListener("error", reportError);
};
