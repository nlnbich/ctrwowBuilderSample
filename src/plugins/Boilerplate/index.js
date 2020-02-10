import loadComponents from "./components";
import loadBlocks from "./blocks";
import template from "./template";

export default (editor, opts = {}) => {
  const options = {
    ...{
      template
    },
    ...opts
  };

  // Add components
  loadComponents(editor, options);

  // Add blocks
  loadBlocks(editor, options);
};
