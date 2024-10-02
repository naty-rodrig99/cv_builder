import React, { useState } from "react";
import './text-edit-styles.css';
import { Textarea } from "~/components/ui/textarea";
import { SimpleTextElement } from "~/components/cv/elements/simple-text/simple-text.schema";
import { useDispatch } from "~/components/cv/context";

import {LexicalComposer} from '@lexical/react/LexicalComposer';
import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import {LexicalErrorBoundary} from '@lexical/react/LexicalErrorBoundary';
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';
import {RichTextPlugin} from '@lexical/react/LexicalRichTextPlugin';

import { EditorState } from "lexical";

import SimpleTextOnChangePlugin from './simple-text-onchange'
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

  const [editorState, setEditorState] = useState<EditorState | null>(null);
  function textEdited() {
    if (editorState && typeof editorState.toJSON === 'function') {
      //creates JSON
      const editorStateJSON = editorState.toJSON();
      //convert to a string
      const editorStateString = JSON.stringify(editorStateJSON);

      console.log("Updated Editor State JSON:", editorStateString);
    } else {
      console.warn("Editor state is undefined or invalid");
    }
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
          <SimpleTextOnChangePlugin onChange={textEdited}/>
        </div>
      </div>
    </LexicalComposer>
    </div>
  );
};

export default SimpleTextEdit;
