import React, { useEffect, useState } from "react";
import { SimpleHeaderElement } from "./simple-header.schema";
import { useDispatch } from "~/components/cv/context";
import { setHeader } from "./simple-header.state";

import { LexicalComposer } from "@lexical/react/LexicalComposer"; // Import LexicalComposer for creating the editor
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin"; // Import RichTextPlugin for rich text editing
import { EditorState } from "lexical"; // Import EditorState for managing editor state
