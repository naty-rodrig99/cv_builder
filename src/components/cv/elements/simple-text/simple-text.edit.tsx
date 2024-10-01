import React from "react";
import { SimpleTextElement } from "~/components/cv/elements/simple-text/simple-text.schema";
import { useDispatch } from "~/components/cv/context";
import { setText } from "./simple-text.state";
import { Textarea } from "~/components/ui/textarea";

export interface SimpleTextEditProps {
  element: SimpleTextElement;
}

const MIN_TEXTAREA_HEIGHT = 32;

const SimpleTextEdit = ({ element }: SimpleTextEditProps) => {
  const dispatch = useDispatch();
  const textAreaRef: any = React.useRef(null);
  const [value, setValue] = React.useState("");
  const onChange = (event: any) => setValue(event.target.value);

  React.useLayoutEffect(() => {
    // Reset height - important to shrink on delete
    textAreaRef.current.style.height = "inherit";
    // Set height
    textAreaRef.current.style.height = `${Math.max(
      textAreaRef.current.scrollHeight,
      MIN_TEXTAREA_HEIGHT,
    )}px`;
  }, [value]);

  return (
    <div className="relative p-2">
      <Textarea
        className="w-full resize-none border-none shadow-none hover:border-solid"
        ref={textAreaRef}
        value={element.data.text}
        onChange={(event) => {
          dispatch(setText(element.id, event.target.value));
          onChange(event);
        }}
      />
    </div>
  );
};

export default SimpleTextEdit;
