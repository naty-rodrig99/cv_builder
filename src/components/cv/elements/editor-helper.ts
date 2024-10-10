import { useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { EditorState } from "lexical";

interface MyOnChangePluginProps {
  onChange: (editorState: EditorState) => void;
}

export function MyOnChangePlugin({ onChange }: MyOnChangePluginProps) {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      onChange(editorState);
    });
  }, [editor, onChange]);
  return null;
}

export const safeJSON = (input: string): string | null => {
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
