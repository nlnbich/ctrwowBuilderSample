import grapesjs from 'grapesjs'
import basicBlocks from 'grapesjs-blocks-basic'
import styleManagerPlugin from './plugins/style-manager-default';
import 'grapesjs/dist/css/grapes.min.css'
import './styles.css'

// Plugins
//import Collection from "./plugins/Collection";

var editor = grapesjs.init({
  container: '#app',
  fromElement: true,
  dragMode: 'translate',
  styleManager: {
    clearProperties: 1
  },
  plugins: [basicBlocks, styleManagerPlugin]
})
