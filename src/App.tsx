import React, { useEffect, useRef, useState } from "react";
import EmailEditor from "react-email-editor";
// CHANGE THE DEFAULT TEMPLATE TO START EDITING
import jsonTemplate from "./templates/blank.json";

function App() {
  const emailEditorRef = useRef(null);
  const [showMessage, setShowMessage] = useState(false);
  useEffect(() => {
    if (showMessage)
      setTimeout(() => {
        setShowMessage(false);
      }, 1500);
  }, [showMessage]);

  const onConfirmRefresh = function (event: any) {
    event.preventDefault();
    return (event.returnValue = "Are you sure you want to leave the page?");
  };
  React.useEffect(() => {
    window.addEventListener("beforeunload", onConfirmRefresh, {
      capture: true,
    });
  }, []);

  const exportHtml = () => {
    // @ts-ignore
    emailEditorRef?.current?.editor?.exportHtml((data) => {
      const { html } = data;
      navigator.clipboard.writeText(html);
      setShowMessage(true);
    });
  };

  const exportJSON = () => {
    // @ts-ignore
    emailEditorRef?.current?.editor?.exportHtml((data) => {
      const { design } = data;
      navigator.clipboard.writeText(JSON.stringify(design));
      setShowMessage(true);
    });
  };
  const onReady = () => {
    // editor is ready
    // you can load your template here;
    //@ts-ignore
    emailEditorRef.current.editor.loadDesign(jsonTemplate);
  };

  return (
    <div>
      <div
        style={{
          backgroundColor: "oldlace",
          display: "flex",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <div>
          <button
            style={{
              backgroundColor: "#00A094",
              border: "none",
              padding: "6px",
              margin: "0 10px",
              color: "white",
            }}
            onClick={exportHtml}
          >
            Export HTML
          </button>
          <button
            style={{
              backgroundColor: "#00A094",
              border: "none",
              padding: "6px",
              margin: "0 10px",
              color: "white",
            }}
            onClick={exportJSON}
          >
            Export JSON
          </button>
        </div>
        {showMessage && (
          <h5
            style={{
              margin: 0,
              color: "white",
              marginLeft: "20px",
              backgroundColor: "#00A094",
              padding: "6px",
              borderRadius: "4px",
              opacity: ".6",
            }}
          >
            Content copied to clipboard.
          </h5>
        )}
        <div />
      </div>
      <EmailEditor ref={emailEditorRef} onReady={onReady} />
    </div>
  );
}

export default App;
