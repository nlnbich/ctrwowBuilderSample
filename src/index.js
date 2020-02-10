import grapesjs from "grapesjs";
import basicBlocks from "grapesjs-blocks-basic";
import "grapesjs/dist/css/grapes.min.css";
import "./styles.css";

// Plugins
//import Collection from "./plugins/Collection";
import font from "./sectors/font";
import paragraph from "./sectors/paragraph";

import sectors from "./sectors";

var editor = grapesjs.init({
  container: "#app",
  fromElement: true,
  dragMode: "translate",
  styleManager: {
    clearProperties: 1,
    sectors: sectors
  },
  plugins: [basicBlocks]
});

function moveTraitToSector(trait, sector) {
  trait.classList.add("gjs-sm-property");
  trait.classList.add("gjs-sm-stack");
  sector && sector.querySelector(".gjs-sm-properties").appendChild(trait);
}

editor.on("load", function() {
  const classManager = document.querySelector(".gjs-clm-tags");
  const metaDataSector = document.getElementById("gjs-sm-element_metadata");
  moveTraitToSector(classManager, metaDataSector);
});

editor.on("component:selected", function(model) {
  const componentType = model.get("type");
  if (componentType === "text") {
    model.set("stylable-require", font.buildProps.concat(paragraph.buildProps));
  }
  model.set("resizable", true);
});

