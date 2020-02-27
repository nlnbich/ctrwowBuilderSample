import componentDragHandler from './component-drag'
import componentCloneHandler from './component-clone'
import componentResizeHandler from './component-resize'

export default function freeDraggingMode(editor) {
  if (editor && editor.Config && editor.Config.dragMode !== 'absolute') {
    // for absolute mode only
    return
  }

  componentDragHandler(editor)
  componentCloneHandler(editor)
  componentResizeHandler(editor)
}
