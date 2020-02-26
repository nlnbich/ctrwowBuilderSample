import Sorter from './Sorter'

export default function freeDraggingMode(editor) {
  if (editor && editor.Config && editor.Config.dragMode !== 'absolute') {
    // for absolute mode only
    return
  }

  editor.Config.canvasCss = `.gjs-comp-selected-parent {opacity: 0.5;} ${editor.Config.canvasCss || ''}`

  const COMMAND = 'core:component-drag'
  const commands = editor.Commands

  const componnentDragCommand = commands.get(COMMAND)

  commands.add(COMMAND, {
    run(editor, sender, options = {}) {
      const sorter = new Sorter(editor, componnentDragCommand, options)

      return componnentDragCommand.run(editor, sender, {
        ...options,
        dragger: {
          guidesInfo: 0, //disabled guidesInfo
          guidesStatic: () => [],
          guidesTarget: () => []
        },

        onDrag: function(ev, dragger) {
          sorter.ctr__onStartPointer = dragger.startPointer
          sorter.ctr__onDragPointer = dragger.currentPointer
          sorter.onMove(...arguments)
          options.onDrag && options.onDrag(...arguments)
        },
        onEnd: function(ev, dragger, opts) {
          sorter.ctr__onDragPointer = dragger.currentPointer

          const isCancelled = sorter.onEnd(...arguments)
          options.onEnd && options.onEnd(ev, dragger, { ...opts, ...(isCancelled ? { cancelled: true } : {}) })
        }
      })
    }
  })
}
