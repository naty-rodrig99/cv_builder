import {
  DEFAULT_EDITOR_STATE,
  TextEditor,
  TextEditorContextProvider,
} from "~/components/text-editor";
import React from "react";
import { type SimpleTextElement } from "~/components/cv/elements/simple-text/simple-text.schema";
import { safeJSON } from "~/lib/utils";

export interface SimpleTextPrintProps {
  element: SimpleTextElement;
}

const SimpleTextPrint = ({ element }: SimpleTextPrintProps) => {
  const editorConfig = {
    namespace: "Rich Text Editor",
    theme: {
      text: {
        underline: "underline",
      },
    },
    onError(error: Error) {
      throw error;
    },
    editable: false,
    editorState: safeJSON(element.data.text, DEFAULT_EDITOR_STATE),
  };

  return (
    <TextEditorContextProvider
      editorConfig={editorConfig}
      onTextChange={() => void 0}
    >
      <TextEditor placeholder={""} />
    </TextEditorContextProvider>
  );
};

export default SimpleTextPrint;
