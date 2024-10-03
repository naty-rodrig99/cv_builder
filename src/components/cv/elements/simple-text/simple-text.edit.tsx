import React from "react";
import { SimpleTextElement } from "~/components/cv/elements/simple-text/simple-text.schema";
import { useDispatch } from "~/components/cv/context";
import { setText } from "./simple-text.state";
import { Textarea } from "~/components/ui/textarea";
import { EditionTools } from "../EditorTools";

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

  return (
    <>
      <EditionTools element={element} options={[]} />
      <div className="relative p-2">
        <Textarea
          className="w-full resize-none border-none bg-green-50 shadow-none"
          ref={textAreaRef}
          value={element.data.text}
          defaultValue={"Your text here"}
          onChange={(event) => {
            dispatch(setText(element.id, event.target.value));
            onChange(event);
          }}
        />
      </div>
    </>
  );
};

export default SimpleTextEdit;
