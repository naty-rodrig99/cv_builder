import React from "react";
import { Textarea } from "~/components/ui/textarea";
import { SimpleTextElement } from "~/components/cv/elements/simple-text/simple-text.schema";
import { useDispatch } from "~/components/cv/context";

export interface SimpleTextEditProps {
  element: SimpleTextElement;
}

const SimpleTextEdit = ({ element }: SimpleTextEditProps) => {
  const dispatch = useDispatch();

  return (
    <div className="relative p-2">
      <Textarea
        className="w-full"
        value={element.data.text}
        onChange={(event) => {
          // TODO: dispatch(updateTextElementText(event.target.value));
        }}
      />
    </div>
  );
};

export default SimpleTextEdit;
