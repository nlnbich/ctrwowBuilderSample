import DfoSorter from './DfoSorter'
import { extendSorterClass } from './Sorter'
import { adjustPosition } from './helpers'

export default function freeDraggingMode(editor) {
  editor.Config.canvasCss = `.gjs-comp-selected-parent {opacity: 0.5;} ${editor.Config.canvasCss || ''}`
  extendSorterClass(editor.Utils.Sorter)
  const COMMAND = 'core:component-drag'
  const commands = editor.Commands

  const componnentDragCommand = commands.get(COMMAND)
  const bk = componnentDragCommand.setPosition
  // componnentDragCommand.setPosition = function(newPos, ...args) {
  //   bk.call(this, newPos, ...args)
  // }

  commands.extend(COMMAND, {
    setPosition(newPos, ...args) {
      console.log('run me - setPosition')
      bk.call(this, adjustPosition(newPos), ...args)
    },
    run(editor, sender, options = {}) {
      const sorter = new DfoSorter(editor, componnentDragCommand, options)
      // const sorter = new Sorter_bk(editor, componnentDragCommand,options)

      return componnentDragCommand.run.call(this, editor, sender, {
        ...options,
        // dragger: {
        //   guidesInfo: 0, //disabled guidesInfo
        //   guidesStatic: () => [],
        //   guidesTarget: () => []
        // },

        onDrag: function(ev, dragger) {
          sorter.dfo__onStartPointer = dragger.startPointer
          sorter.dfo__onDragPointer = dragger.currentPointer
          sorter.onMove(...arguments)
          options.onDrag && options.onDrag(...arguments)
        },
        onEnd: function(ev, dragger, opts) {
          sorter.dfo__onDragPointer = dragger.currentPointer
          const { cancelled } = opts || {}

          // options.onEnd && options.onEnd(ev, dragger, { ...opts, ...(false ? { cancelled: true } : {}) })

          if (cancelled) {
            sorter.dfo__moved = 0
            sorter.endMove(...arguments)
            options.onEnd && options.onEnd(ev, dragger, opts)
          }

          const hasDropContent = sorter.sorter.dropContent

          sorter.endMove(...arguments)
          options.onEnd && options.onEnd(ev, dragger, { ...opts, ...(hasDropContent ? { cancelled: true } : {}) })
        }
      })
    }
  })
}
