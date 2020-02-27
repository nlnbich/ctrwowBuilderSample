import _get from 'lodash/fp/get'
import { getClass } from './Sorter'

export default class DfoSorter {
  constructor(editor, componnentDragCommand, opts) {
    const em = editor.getModel()
    const canvas = editor.Canvas

    const BaseSorterClass = getClass()
    if (!BaseSorterClass) {
      throw '[CtrSorter] Need to extend utils/Sorter class'
    }

    const sorter = (this.__sorter = new BaseSorterClass({
      container: componnentDragCommand.getCanvasBody(),
      placer: canvas.getPlacerEl(),
      containerSel: '*',
      itemSel: '*',
      // pfx: this.ppfx,
      direction: 'a',
      document: canvas.getFrameEl().contentDocument,
      wmargin: 1,
      nested: 1,
      em,
      canvasRelative: 1,
      scale: () => em.getZoomDecimal(),
      onEndMove: function(model) {
        if (!em.get('dragContent')) {
          return
        }

        if (!model) return

        em.set('dragResult', model)
        em.trigger('canvas:drop', _get('event.dataTransfer', opts), model)
      }
    }))

    this.dfo__drapContent = em.get('dragContent')
    this.dfo__drapContent && sorter.setDropContent(this.dfo__drapContent)

    const { target, event } = opts
    // const sel = target || editor.getSelected()
    const selAll = target ? [target] : [...editor.getSelectedAll()]
    sorter.getSourceModel(selAll)
    const lastModel = selAll[selAll.length - 1]
    this.__sorter.startSort(lastModel.view.el)

    const { x, y } = lastModel.view.el.getBoundingClientRect()
    sorter.dfo__srcOffset = {
      x: event.clientX - x,
      y: event.clientY - y
    }
  }

  set dfo__onStartPointer(value) {
    this.__sorter.dfo__onStartPointer = value
  }

  set dfo__onDragPointer(value) {
    this.__sorter.dfo__onDragPointer = value
  }

  set dfo__moved(val) {
    this.__sorter.moved = val
  }

  get sorter() {
    return this.__sorter
  }

  onMove(...args) {
    this.__sorter.onMove && this.__sorter.onMove(...args)
  }

  endMove(...args) {
    try {
      this.__sorter.endMove(...args)

      return { isCancelled: !!this.dfo__drapContent }
    } catch (e) {
      console.log(e)
      return { isCancelled: true }
    }
  }
}
