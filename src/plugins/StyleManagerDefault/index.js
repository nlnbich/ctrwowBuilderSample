import loadTraits from './traits'
import styleManagerUtils from './utils'
import actionLoader from './sectors/actionLoader'
import sectors from './sectors'
import "./styles/index.css";

export default (editor, opts = {}) => {
  editor.on('load', function() {
    loadTraits(editor)
    styleManagerUtils.initStyleManagerPanel(editor)
    styleManagerUtils.initSectors(sectors)
    actionLoader(editor)
  })

  editor.on('component:selected', function(model) {
    styleManagerUtils.componentSwitcher(model)
    model.set('resizable', true)
  })
};
