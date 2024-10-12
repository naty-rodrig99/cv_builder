import React from "react";
import "./text-edit-styles.css";
import { SimpleTextElement } from "~/components/cv/elements/simple-text/simple-text.schema";
import { customOption, EditionTools } from "../editor-tools";

import TextToolbar from "./toolbar-text.edit";
import {
  TextEditor,
  TextEditorContextProvider,
} from "~/components/text-editor";
import { safeJSON } from "~/lib/utils";
import { setText } from "./simple-text.state";
import { useDispatch } from "../../context";

export interface SimpleTextEditProps {
  element: SimpleTextElement;
}

const SimpleTextEdit = ({ element }: SimpleTextEditProps) => {
  const dispatch = useDispatch();
  const placeholder = "Enter some rich text...";

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
    editorState: safeJSON(element.data.text),
  };

  return (
    <TextEditorContextProvider
      editorConfig={editorConfig}
      onTextChange={(value) => dispatch(setText(element.id, value))}
    >
      <EditionTools
        element={element}
        options={[customOption(<TextToolbar />)]}
      />
      <TextEditor placeholder={placeholder} />
    </TextEditorContextProvider>
  );
};

export default SimpleTextEdit;
