import React from "react";
import { useState, useEffect } from "react";
import {
  SIMPLE_HEADER_OPTIONS,
  SimpleHeaderOptions,
  type SimpleHeaderElement,
} from "./simple-header.schema";
import { useDispatch } from "~/components/cv/context";
import { setHeaderText, setHeadingOption } from "./simple-header.state";
import { safeJSON, MyOnChangePlugin } from "../editor-helper";
import { EditionTools, selectOneOption } from "../editor-tools";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { $getSelection, type EditorState } from "lexical";
import { HeadingNode } from "@lexical/rich-text";
import { HeadingTagType, $createHeadingNode } from "@lexical/rich-text";

// https://lexical.dev/docs/getting-started/react

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

interface onHeadingChangeProps {
  onChange: (editorState: EditorState) => void;
}

export function onHeadingChange({ onChange }: onHeadingChangeProps) {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      onChange(editorState);
    });
  }, [editor, onChange]);
  return null;
}

export interface SimpleHeaderEditProps {
  element: SimpleHeaderElement;
}

const SimpleHeaderEdit = ({ element }: SimpleHeaderEditProps) => {
  const dispatch = useDispatch();
  const placeholder = "A simple header";

  const [localHeadingOption, setLocalHeadingOption] = useState<string>(
    element.headingOptions.heading,
  );

  const initialConfig = {
    namespace: "RichTextEditor-header",
    onError(error: Error) {
      throw error; //todo error
    },
    nodes: [HeadingNode],
    editorState: safeJSON(element.data.text),
  };

  function onChangeTextInput(editorState: EditorState) {
    const editorStateJSON = editorState.toJSON();
    dispatch(setHeaderText(element.id, JSON.stringify(editorStateJSON)));
  }

  useEffect(() => {
    setLocalHeadingOption(element.headingOptions.heading);
  }, [element.headingOptions.heading]);

  return (
    <>
      <LexicalComposer initialConfig={initialConfig}>
        <div className="editor-container">
          <EditionTools
            element={element}
            options={[
              selectOneOption<SimpleHeaderOptions>(
                "Heading: " + element.headingOptions.heading,
                SIMPLE_HEADER_OPTIONS as unknown as SimpleHeaderOptions[], // To access const = readOnly
                (option) => {
                  dispatch(setHeadingOption(element.id, option));
                },
                localHeadingOption,
              ),
            ]}
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
              <MyOnChangePlugin onChange={onChangeTextInput} />
            </div>
          </div>
        </div>
      </LexicalComposer>
    </>
  );
};

export default SimpleHeaderEdit;
