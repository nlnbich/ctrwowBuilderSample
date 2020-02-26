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
  dragMode: 'absolute',
  styleManager: {
    clearProperties: 1
  },
  plugins: [basicBlocks, styleManagerPlugin]
})

const blockManager = editor.BlockManager;
blockManager.add('box', {
  label: 'Box',
  content: `<div class="box" style="padding: 20px;">
  <div style="width: 300px">
    <div style="width: 280px; padding: 2px">
        <div>Content</div>
    </div>
  </div>
</div>`,
});
