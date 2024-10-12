import React, { useContext, useEffect, useMemo } from "react";

import { type EditorState } from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import {
  type InitialConfigType,
  LexicalComposer,
} from "@lexical/react/LexicalComposer";
import { useStableCallback } from "~/lib/useStableCallback";
import { cn } from "~/lib/utils";

export const DEFAULT_EDITOR_STATE = `{
  "root": {
    "children": [
      {
        "children": [],
        "direction": null,
        "format": "",
        "indent": 0,
        "type": "paragraph",
        "version": 1,
        "textformat": 0,
        "textstyle": ""
      }
    ],
    "direction": null,
    "format": "",
    "indent": 0,
    "type": "root",
    "version": 1
  }
}`;

export interface TextEditorContext {
  onEditorChange: (editorState: EditorState) => void;
}

const textEditorContext = React.createContext<TextEditorContext | null>(null);

export function useTextEditorOnChange() {
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
  const onEditorChange = useStableCallback((editorState: EditorState) => {
    const editorStateJSON = editorState.toJSON();
    onTextChange(JSON.stringify(editorStateJSON));
  });

  const ctxValue = useMemo(() => ({ onEditorChange }), [onEditorChange]);

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
  const textEditorOnChange = useTextEditorOnChange();
  const [editor] = useLexicalComposerContext();
  const isEditable = editor.isEditable();
  return (
    <div className="relative p-2">
      <div className="w-full resize-none border-none shadow-none">
        <RichTextPlugin
          contentEditable={
            <ContentEditable
              className={cn({ "editor-inner editor-input": isEditable })}
              aria-placeholder={placeholder}
              placeholder={
                <div className="editor-placeholder">{placeholder}</div>
              }
            />
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <MyOnChangePlugin onChange={textEditorOnChange} />
      </div>
    </div>
  );
};
