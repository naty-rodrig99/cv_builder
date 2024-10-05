import React from "react";
import './text-edit-styles.css';
import { Textarea } from "~/components/ui/textarea";
import { SimpleTextElement } from "~/components/cv/elements/simple-text/simple-text.schema";
import { useDispatch } from "~/components/cv/context";
import { setText } from "./simple-text.state";
import { Textarea } from "~/components/ui/textarea";

import {LexicalComposer} from '@lexical/react/LexicalComposer';
import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import {LexicalErrorBoundary} from '@lexical/react/LexicalErrorBoundary';
import {RichTextPlugin} from '@lexical/react/LexicalRichTextPlugin';

import { EditorState } from "lexical";

import SimpleTextOnChangePlugin from './simple-text-onchange'
import ToolbarTextEdit from './toolbar-text.edit';


export interface SimpleTextEditProps {
  element: SimpleTextElement;
}

const SimpleTextEdit = ({ element }: SimpleTextEditProps) => {
  const dispatch = useDispatch();
  const textAreaRef: any = React.useRef(null);
  const [value, setValue] = React.useState("");
  const onChange = (event: any) => setValue(event.target.value);

  React.useLayoutEffect(() => {
    // Reset height - important to shrink on delete
    textAreaRef.current.style.height = "inherit";
    // Set height
    textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
  }, [value]);

  const placeholder = 'Enter some rich text...';

  const editorConfig = {
    editable: true, //edit mode
    namespace: 'Rich Text Editor',
    nodes: [],
    onError(error: Error) {
      throw error;
    },
  };

  //define editorState type as EditorState from Lexical
  const textEdited = (editorState: EditorState) => {
    //converts editor state to JSON
    const editorStateJSON = editorState.toJSON();
    const editorStateString = JSON.stringify(editorStateJSON);
    console.log("Updated Editor State JSON:", editorStateString);
  };

  return (
    <div className="relative p-2">
      <Textarea
        className="w-full resize-none border-none shadow-none"
        ref={textAreaRef}
        value={element.data.text}
        onChange={(event) => {
          dispatch(setText(element.id, event.target.value));
          onChange(event);
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
          <SimpleTextOnChangePlugin onChange={textEdited}/>
        </div>
      </div>
    </LexicalComposer>
    </div>
  );
};

export default SimpleTextEdit;
