// import overrideSorter from './dragging'
// import sort from './sorting'
import { isString, isFunction, isArray, result, each, bindAll } from 'underscore'

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

  // // Avoid strange effects on dragging
  // em && em.clearSelection();
  // this.toggleSortCursor(1);
  //
  // em && em.trigger('sorter:drag:start', src, srcModel);
}

function calculateRelativePosWithParent(startPointer, currentPointer, parentElm, srcElm, offset) {
  const { x: root_x, y: root_y } = parentElm.getBoundingClientRect()
  const { x: src_x, y: src_y } = srcElm.getBoundingClientRect()

  const { x: start_x, y: start_y } = startPointer
  const { x: cur_x, y: cur_y } = currentPointer

  return {
    root_x,
    root_y,
    left: cur_x - root_x - offset.x, // - (start_x - src_x),
    top: cur_y - root_y - offset.y // - (start_y - src_y)
  }
}

function getSelectedParent(sorter) {}

function highlightSelectedParent(sorter) {}

function moveElem(srcMove) {
  const moved = [null]
  const { target, lastPos, dropContent } = this
  let src = this.eV

  if (src && this.selectOnEnd) {
    var srcModel = this.getSourceModel()
    if (srcModel && srcModel.set) {
      srcModel.set('status', '')
      srcModel.set('status', 'selected')
    }
  }

  if (this.moved) {
    const toMove = this.toMove
    const toMoveArr = srcMove ? [srcMove] : isArray(toMove) ? toMove : toMove ? [toMove] : [src]
    toMoveArr.forEach(model => {
      const { root_x, root_y, top, left } = calculateRelativePosWithParent(
        this.ctr__onStartPointer,
        this.ctr__onDragPointer,
        this.target,
        this.eV,
        dropContent ? { x: 0, y: 0 } : this.ctr__srcOffset
      )

      // console.log(`>>>>>>>my new pos -- top ${top} -- left: ${left}`)
      // model.style.top = `${top}px`
      // model.style.left = `${left}px`
      const newModel = this.move(target, model, lastPos)
      console.log(newModel)

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
  plh.classList.add('ctr-guidleline')
  plh.style.border = '1px dashed red !important'
  plh.style.top = `${this.el.ownerDocument.body.scrollTop + root_y}px`
  plh.style.left = `${this.el.ownerDocument.body.scrollLeft + root_x}px`
  plh.style.width = `${left}px`
  plh.style.height = `${top}px`
  plh.style.transitionDuration = '0'
}

export default function freeDraggingMode(editor) {
  const COMMAND = 'core:component-drag'
  const commands = editor.Commands

  // sorting(editor)
  const componnentDragCommand = commands.get(COMMAND)

  commands.add(COMMAND, {
    run(editor, sender, opts = {}) {
      // console.log(ed)

      const sorter = (this.ctr__sorter = new editor.Utils.Sorter({
        container: componnentDragCommand.getCanvasBody(),
        placer: componnentDragCommand.canvas.getPlacerEl(),
        containerSel: '*',
        itemSel: '*',
        // pfx: this.ppfx,
        direction: 'a',
        document: componnentDragCommand.canvas.getFrameEl().contentDocument,
        wmargin: 1,
        nested: 1,
        em: componnentDragCommand.editorModel,
        canvasRelative: 1,
        scale: () => componnentDragCommand.editorModel.getZoomDecimal()
      }))

      sorter.movePlaceholder = movePlaceholder.bind(sorter)
      const { target, event } = opts
      const sel = target || editor.getSelected()
      const selAll = target ? [target] : [...editor.getSelectedAll()]
      sorter.getSourceModel(selAll)
      const lastModel = selAll[selAll.length - 1]
      // const doc = sorter.frameEl.contentDocument;
      // this.startSelectPosition(lastModel.view.el, doc);
      startSorter.call(sorter, lastModel.view.el)
      const { x, y } = lastModel.view.el.getBoundingClientRect()
      sorter.ctr__srcOffset = {
        x: event.x - x,
        y: event.y - y
      }

      if (componnentDragCommand.editorModel.get('dragContent')) {
        // console.log('drag content')
        // console.log(componnentDragCommand.editorModel.get('dragContent'))
        sorter.setDropContent(componnentDragCommand.editorModel.get('dragContent'))
      }
      // componnentDragCommand.editorModel.on('change:dragResult', function(model) {
      //   console.log('dragResult')
      //   console.log(model)
      //   moveElem.call(sorter, model)
      // })

      return componnentDragCommand.run(editor, sender, {
        ...opts,
        dragger: {
          guidesInfo: 0, //disabled guidesInfo
          guidesStatic: () => [],
          guidesTarget: () => []
        },

        onDrag: function(ev, dragger) {
          sorter.ctr__onStartPointer = dragger.startPointer
          sorter.ctr__onDragPointer = dragger.currentPointer
          console.log('drag')
          sorter && sorter && sorter.onMove && sorter.onMove(...arguments)
          opts.onDrag && opts.onDrag(...arguments)
        },
        onEnd: function(ev, dragger, opts) {
          sorter.ctr__onDragPointer = dragger.currentPointer
          console.log('>>>>end')
          console.log(sorter.target)

          // hide guidle-line
          sorter.plh.style.display = 'none'
          sorter.plh.classList.remove('ctr-guidleline')

          if (componnentDragCommand.editorModel.get('dragContent')) {
            componnentDragCommand.editorModel.once('change:dragResult', function(model) {
              console.log('dragResult')
              console.log(model)
            })
          }

          if (sorter.getTargetModel() != sorter.getSourceModel().parent()) {
            console.log('parent change -- need to move')
            console.log(componnentDragCommand.editorModel.get('dragResult'))
            setTimeout(() => moveElem.call(sorter), 0)
          }

          const addedOpts = componnentDragCommand.editorModel.get('dragContent') ? { cancelled: true } : {}

          const re = opts.onEnd && opts.onEnd(ev, dragger, { ...opts, ...addedOpts })

          return re
        }
      })
    }
  })
}
