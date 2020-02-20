import { isArray } from 'underscore'
import { calculateRelativePosWithParent } from './helpers'

//Ref: node_modules/grapesjs/src/utils/Sorter.js >> [startSort]
function startSorter(src) {
  const em = this.em
  const itemSel = this.itemSel
  const contSel = this.containerSel
  const container = this.getContainerEl()
  const docs = this.getDocuments()
  const onStart = this.onStart
  let srcModel
  let plh = this.plh
  this.dropModel = null
  this.moved = 0

  // Check if the start element is a valid one, if not get the
  // closest valid one
  if (src && !this.matches(src, `${itemSel}, ${contSel}`)) {
    src = this.closest(src, itemSel)
  }

  this.eV = src

  // Create placeholder if not yet exists
  if (!plh) {
    plh = this.createPlaceholder()
    container.appendChild(plh)
    this.plh = plh
  }

  if (src) {
    srcModel = this.getSourceModel(src)
    srcModel && srcModel.set && srcModel.set('status', 'freezed')
    this.srcModel = srcModel
  }

  // on(container, 'mousemove dragover', this.onMove);
  // on(docs, 'mouseup dragend touchend', this.endMove);
  // on(docs, 'keydown', this.rollback);
  // onStart && onStart();

  // Avoid strange effects on dragging
  em && em.clearSelection()
  // this.toggleSortCursor(1);
  //
  // em && em.trigger('sorter:drag:start', src, srcModel);
}

//Ref: node_modules/grapesjs/src/utils/Sorter.js >> [startSort]
function endMove() {
  const isChangeParent = this.getTargetModel() != this.getSourceModel().parent()

  const moved = [null]
  const { target, lastPos, dropContent } = this
  let src = this.eV

  if (src && this.selectOnEnd) {
    var srcModel = this.getSourceModel()
    if (srcModel && srcModel.set) {
      srcModel.set('status', '')
      // srcModel.set('status', 'selected')
    }
  }

  if (isChangeParent && this.moved) {
    const toMove = this.toMove
    const toMoveArr = isArray(toMove) ? toMove : toMove ? [toMove] : [src]
    toMoveArr.forEach(model => {
      const { root_x, root_y, top, left } = calculateRelativePosWithParent(
        this.ctr__onStartPointer,
        this.ctr__onDragPointer,
        this.target,
        this.eV,
        dropContent ? { x: 0, y: 0 } : this.ctr__srcOffset
      )

      const newModel = this.move(target, model, lastPos)
      console.log(newModel)
      moved.push(newModel)

      // console.log(newModel.getStyle())
      newModel &&
        newModel.setStyle &&
        newModel.setStyle({
          ...newModel.getStyle(),
          position: 'absolute',
          top: `${top}px`,
          left: `${left}px`
        })
    })
  }

  this.selectTargetModel()
  this.toMove = null

  dropContent && moved.forEach(m => handleDragEnd.call(this, m, this))

  //Handle for dragend event - when user add new block
  //Ref: [Droppa]
  function handleDragEnd(model, dt) {
    if (!model) return
    const { em } = this
    em.set('dragResult', model)
    em.trigger('canvas:drop', dt, model)
  }
}

function movePlaceholder(plh, dims, pos, trgDim) {
  // console.log(this)
  const { root_x, root_y, top, left } = calculateRelativePosWithParent(
    this.ctr__onStartPointer,
    this.ctr__onDragPointer,
    this.target,
    this.eV,
    this.ctr__srcOffset
  )

  if (this.dropContent) {
    plh.style.display = `none`
    return
  }
  plh.classList.add('ctr-guidleline')
  plh.style.border = '1px dashed red !important'
  plh.style.top = `${this.el.ownerDocument.body.scrollTop + root_y}px`
  plh.style.left = `${this.el.ownerDocument.body.scrollLeft + root_x}px`
  plh.style.width = `${left}px`
  plh.style.height = `${top}px`
}

export default class CtrSorter {
  set ctr__onStartPointer(value) {
    this.ctr__sorter.ctr__onStartPointer = value
  }

  set ctr__onDragPointer(value) {
    this.ctr__sorter.ctr__onDragPointer = value
  }

  onMove(...args) {
    this.ctr__sorter.onMove && this.ctr__sorter.onMove(...args)
  }

  onEnd() {
    this.cleanUpGuideLine()
    endMove.call(this.ctr__sorter)

    return !!this.ctr__drapContent
  }

  cleanUpGuideLine() {
    // hide guide-lines
    this.ctr__sorter.plh.style.display = 'none'
    this.ctr__sorter.plh.classList.remove('ctr-guidleline')
  }

  constructor(editor, componnentDragCommand, opts) {
    const em = editor.getModel()
    const canvas = editor.Canvas

    const sorter = (this.ctr__sorter = new editor.Utils.Sorter({
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
      scale: () => em.getZoomDecimal()
    }))

    sorter.movePlaceholder = movePlaceholder.bind(sorter)

    const { target, event } = opts
    // const sel = target || editor.getSelected()
    const selAll = target ? [target] : [...editor.getSelectedAll()]
    sorter.getSourceModel(selAll)

    const lastModel = selAll[selAll.length - 1]
    startSorter.call(sorter, lastModel.view.el)

    const { x, y } = lastModel.view.el.getBoundingClientRect()
    sorter.ctr__srcOffset = {
      x: event.clientX - x,
      y: event.clientY - y
    }

    this.ctr__drapContent = em.get('dragContent')
    this.ctr__drapContent && sorter.setDropContent(this.ctr__drapContent)
  }
}
