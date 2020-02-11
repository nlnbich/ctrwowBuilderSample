import grapesjs from 'grapesjs'
import basicBlocks from 'grapesjs-blocks-basic'
import loadTraits from './traits'
import 'grapesjs/dist/css/grapes.min.css'
import './styles.css'

// Plugins
//import Collection from "./plugins/Collection";
import actionLoader from './sectors/actionLoader';
import styleManagerUtils from "./utils";

import sectors from './sectors'

var editor = grapesjs.init({
  container: '#app',
  fromElement: true,
  dragMode: 'translate',
  styleManager: {
    clearProperties: 1,
    sectors: sectors
  },
  plugins: [basicBlocks]
})

actionLoader(editor);

editor.on('load', function() {
  loadTraits(editor);
  styleManagerUtils.initStyleManagerPanel(editor);
})

editor.on('component:selected', function(model) {
  styleManagerUtils.componentSwitcher(model);
  model.set('resizable', true)
})
