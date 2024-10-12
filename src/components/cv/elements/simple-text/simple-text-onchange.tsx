import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { type EditorState } from "lexical";
import { useEffect } from "react";

interface SimpleTextOnChangePluginProps {
  onChange: (editorState: EditorState) => void;
}

export default function SimpleTextOnChangePlugin({ onChange }: SimpleTextOnChangePluginProps) {
  const [editor] = useLexicalComposerContext();
  
  useEffect(() => {
    return editor.registerUpdateListener(({editorState}) => {
      onChange(editorState);
    });
  }, [editor, onChange]);

  return null;
}