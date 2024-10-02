import React from "react";
import './text-edit-styles.css';
import { Textarea } from "~/components/ui/textarea";
import { SimpleTextElement } from "~/components/cv/elements/simple-text/simple-text.schema";
import { useDispatch } from "~/components/cv/context";

import {LexicalComposer} from '@lexical/react/LexicalComposer';
import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import {LexicalErrorBoundary} from '@lexical/react/LexicalErrorBoundary';
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';
import {RichTextPlugin} from '@lexical/react/LexicalRichTextPlugin';

import ToolbarTextEdit from './toolbar-text.edit';

export interface SimpleTextEditProps {
  element: SimpleTextElement;
}

const SimpleTextEdit = ({ element }: SimpleTextEditProps) => {
  const dispatch = useDispatch();

  const placeholder = 'Enter some rich text...';

  const editorConfig = {
    editable: true,
    namespace: 'Rich Text Editor',
    nodes: [],
    onError(error: Error) {
      throw error;
    },
  };

  //on change function
  function textEdited(){
    //const editorState = editor.getEditorState();
    //const json = editorState.toJSON();
  }

  return (
    <div className="relative p-2">
      <Textarea
        className="w-full"
        value={element.data.text}
        onChange={(event) => {
          // TODO: dispatch(updateTextElementText(event.target.value));
        }}
      />
    <LexicalComposer initialConfig={editorConfig}>
      <div className="editor-container">
        <ToolbarTextEdit />
        <div className="editor-inner">
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
          <HistoryPlugin />
        </div>
      </div>
    </LexicalComposer>
    </div>
  );
};

export default SimpleTextEdit;
