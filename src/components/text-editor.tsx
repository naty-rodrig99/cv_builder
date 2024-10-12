import React, { useContext, useEffect, useMemo } from "react";

import { EditorState } from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import {
  InitialConfigType,
  LexicalComposer,
} from "@lexical/react/LexicalComposer";

export interface TextEditorContext {
  onEditorChange: (editorState: EditorState) => void;
}

const textEditorContext = React.createContext<TextEditorContext | null>(null);

export function retrieveTextEditorOnChange() {
  const ctx = useContext(textEditorContext);
  if (ctx == null) {
    throw new Error(
      "retrieveTextEditorContext(elementId) must be used within textEditorContext provider.",
    );
  }
  return ctx.onEditorChange;
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

export interface TextEditorContextProviderProps {
  editorConfig: InitialConfigType;
  onTextChange: (newEditorStateJson: string) => void;
  children: React.ReactNode;
}
export const TextEditorContextProvider = ({
  editorConfig,
  onTextChange,
  children,
}: TextEditorContextProviderProps) => {
  const ctxValue = useMemo(() => ({ onEditorChange }), [onEditorChange]);

  function onEditorChange(editorState: EditorState) {
    const editorStateJSON = editorState.toJSON();
    onTextChange(JSON.stringify(editorStateJSON));
  }

  return (
    <textEditorContext.Provider value={ctxValue}>
      <LexicalComposer initialConfig={editorConfig}>
        <div className="editor-container">{children}</div>
      </LexicalComposer>
    </textEditorContext.Provider>
  );
};

export interface TextEditorProps {
  placeholder: string;
}
export const TextEditor = ({ placeholder }: TextEditorProps) => {
  return (
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
        <MyOnChangePlugin onChange={retrieveTextEditorOnChange()} />
      </div>
    </div>
  );
};
