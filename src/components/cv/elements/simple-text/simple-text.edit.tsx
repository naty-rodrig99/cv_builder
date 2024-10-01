import React from "react";
import { SimpleTextElement } from "~/components/cv/elements/simple-text/simple-text.schema";
import { useDispatch } from "~/components/cv/context";
import { setText } from "./simple-text.state";
import TextAreaAutosize from "react-textarea-autosize"

export interface SimpleTextEditProps {
  element: SimpleTextElement;
}

const SimpleTextEdit = ({ element }: SimpleTextEditProps) => {
  const dispatch = useDispatch();

  return (
    <div className="relative p-2">
      <TextAreaAutosize
        className="w-full resize-none"
        value={element.data.text}
        onChange={(event) => {
          dispatch(setText(element.id, event.target.value));
        }}
      />
    </div>
  );
};

export default SimpleTextEdit;
