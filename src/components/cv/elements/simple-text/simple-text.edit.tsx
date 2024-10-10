import React, { useEffect, useState } from "react";
import "./text-edit-styles.css";
import { SimpleTextElement } from "~/components/cv/elements/simple-text/simple-text.schema";
import { useDispatch } from "~/components/cv/context";
import { setText } from "./simple-text.state";
import { customOption, EditionTools } from "../editor-tools";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";

import { EditorState } from "lexical";

import ToolbarTextEdit from "./toolbar-text.edit";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

export interface SimpleTextEditProps {
  element: SimpleTextElement;
}

interface MyOnChangePluginProps {
  onChange: (editorState: EditorState) => void;
}
function MyOnChangePlugin({ onChange }: MyOnChangePluginProps) {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      onChange(editorState);
    });
  }, [editor, onChange]);
  return null;
}

const SimpleTextEdit = ({ element }: SimpleTextEditProps) => {
  const dispatch = useDispatch();

  const placeholder = "Enter some rich text...";

  const safeJSON = (input: string): string | null => {
    try {
      const parsed = JSON.parse(input);
      if (parsed && typeof parsed === "object") {
        return input;
      }
    } catch {
      return null;
    }
    return null;
  };

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

  const [editorState, setEditorState] = useState("");
  function onChange(editorState: EditorState) {
    const editorStateJSON = editorState.toJSON();
    dispatch(setText(element.id, JSON.stringify(editorStateJSON)));
  }

  return (
    <>
      <LexicalComposer initialConfig={editorConfig}>
        <div className="editor-container">
          <EditionTools
            element={element}
            options={[customOption(<ToolbarTextEdit />)]}
          />
          <div className="relative p-2">
            <div className="editor-inner w-full resize-none border-none bg-green-50 shadow-none">
              <RichTextPlugin
                contentEditable={
                  <ContentEditable
                    className="editor-input"
                    aria-placeholder={placeholder}
                    placeholder={
                      <div className="editor-placeholder">{placeholder}</div>
                    }
                  />
                }
                ErrorBoundary={LexicalErrorBoundary}
              />
              <MyOnChangePlugin onChange={onChange} />
            </div>
          </div>
        </div>
      </LexicalComposer>
    </>
  );
};

export default SimpleTextEdit;
