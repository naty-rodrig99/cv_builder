import React from "react";
import { type SimpleHeaderElement } from "./simple-header.schema";
import { useDispatch } from "~/components/cv/context";
import { setHeaderText } from "./simple-header.state";
import { EditionTools } from "../editor-tools";
import { customOption } from "../editor-tools";
import { simpleHeaderStyling } from "./simple-header.styling";
import HeaderToolbar from "./toolbar-header.edit";
import { Input } from "~/components/ui/input";

export interface SimpleHeaderEditProps {
  element: SimpleHeaderElement;
}

const SimpleHeaderEdit = ({ element }: SimpleHeaderEditProps) => {
  const dispatch = useDispatch();
  const placeholder = "Simple Header";

  return (
    <div>
      <EditionTools
        element={element}
        options={[customOption(<HeaderToolbar element={element} />)]}
      />
      <Input
        className={simpleHeaderStyling(element.options.heading)}
        value={element.data.text}
        onChange={(e) => dispatch(setHeaderText(element.id, e.target.value))}
        placeholder={placeholder}
      />
    </div>
  );
};

export default SimpleHeaderEdit;
