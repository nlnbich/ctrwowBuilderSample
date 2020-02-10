import { COLLECTION } from "./consts";

export default (editor, config = {}) => {
  const domc = editor.DomComponents;
  domc.addType(COLLECTION, {
    model: {
      defaults: {
        name: "Collection",
        style: {
          width: "400px",
          height: "400px",
          "text-align": "center",
          "font-size": "20px"
        }
      }
    },
    view: {
      init() {
        const { model } = this;
        const comps = model.components();
        !comps.length && comps.add(config.template);
      }
    }
  });
};
