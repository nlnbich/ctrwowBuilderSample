import { COLLECTION } from "./consts";

export default (editor, config = {}) => {
  const bm = editor.BlockManager;
  bm.add(COLLECTION, {
    label: "Collection",
    content: { type: COLLECTION }
  });
};
