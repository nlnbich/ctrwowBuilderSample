import { calculateGuideline, calculateNewPosition } from './helpers'
import Backbone from 'backbone'
import grapesjs from 'grapesjs'
import isFunction from 'lodash/fp/isFunction'
import isArray from 'lodash/fp/isArray'
import { getElement } from 'grapesjs/src/utils/mixins'

let DfoSorter

export const getClass = () => DfoSorter
const updatePositionByParent = function(model, parent, dropContent) {
  if (!model || !model.setStyle) {
    return
  }

  const { x, y } = calculateNewPosition(
    this.dfo__onStartPointer,
    this.dfo__onDragPointer,
    this.target,
    this.eV,
    dropContent ? { x: 0, y: 0 } : this.dfo__srcOffset
  )

  model.setStyle({
    ...model.getStyle(),
    position: 'absolute',
    top: `${y}px`,
    left: `${x}px`
  })
}

export function extendSorterClass(BaseDfoSorter) {
  DfoSorter = BaseDfoSorter.extend({
    initialize() {
      BaseDfoSorter.prototype.initialize.apply(this, arguments)
    },

    startSort(src) {
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

      // em && em.trigger('sorter:drag:start', src, srcModel);
    },
    cleanUpGuideLine() {
      // hide guide-lines
      this.plh.style.display = 'none'
      this.plh.classList.remove('ctr-guidleline')
    },
    endMove(e) {
      const isChangeParent = this.getTargetModel() != this.getSourceModel().parent()

      const moved = [null]
      const docs = this.getDocuments()
      const container = this.getContainerEl()
      const onEndMove = this.onEndMove
      const { target, lastPos } = this
      // off(container, 'mousemove dragover', this.onMove);
      // off(docs, 'mouseup dragend touchend', this.endMove);
      // off(docs, 'keydown', this.rollback);
      this.cleanUpGuideLine()
      // this.plh.style.display = 'none';
      let src = this.eV

      if (src && this.selectOnEnd) {
        var srcModel = this.getSourceModel()
        if (srcModel && srcModel.set) {
          srcModel.set('status', '')
          // srcModel.set('status', 'selected');
        }
      }

      if (isChangeParent && this.moved) {
        const toMove = this.toMove
        const toMoveArr = isArray(toMove) ? toMove : toMove ? [toMove] : [src]
        const { dropContent } = this
        toMoveArr.forEach(model => {
          // console.log(grapesjs.$(target).data('collection'))
          const createdModel = this.move(target, model, lastPos)
          moved.push(createdModel)
          updatePositionByParent.call(this, createdModel, target, dropContent)
        })
      }

      if (this.plh) this.plh.style.display = 'none'
      var dragHelper = this.dragHelper

      if (dragHelper) {
        dragHelper.parentNode.removeChild(dragHelper)
        this.dragHelper = null
      }

      // this.disableTextable();
      this.selectTargetModel()
      // this.toggleSortCursor();

      this.toMove = null
      isFunction(onEndMove) && moved.forEach(m => onEndMove(m, this))
    },

    move(dst, src, pos) {
      // console.log('custom move')
      // console.log(grapesjs.$(dst).data('collection'))
      const { em, activeTextModel } = this
      const srcEl = getElement(src)
      // em && em.trigger('component:dragEnd:before', dst, srcEl, pos); // @depricated
      var warns = []
      var index = pos.indexEl
      var modelToDrop, modelTemp, created
      var validResult = this.validTarget(dst, srcEl)
      var targetCollection = grapesjs.$(dst).data('collection')
      var model = validResult.srcModel
      var droppable = validResult.droppable
      var draggable = validResult.draggable
      var dropInfo = validResult.dropInfo
      var dragInfo = validResult.dragInfo
      var dropContent = this.dropContent
      const { trgModel } = validResult
      droppable = trgModel instanceof Backbone.Collection ? 1 : droppable
      const isTextableActive = this.isTextableActive(model, trgModel)

      if (targetCollection && droppable && draggable) {
        index = pos.method === 'after' ? index + 1 : index
        var opts = { at: index, noIncrement: 1 }

        if (!dropContent) {
          // Putting `avoidStore` here will make the UndoManager behave wrong
          opts.temporary = 1
          modelTemp = targetCollection.add({}, { ...opts })

          if (model.collection) {
            modelToDrop = model.collection.remove(model, { temporary: 1 })
          }
        } else {
          modelToDrop = dropContent
          opts.silent = false
          opts.avoidUpdateStyle = 1
        }

        if (isTextableActive) {
          const viewActive = activeTextModel.getView()
          activeTextModel.trigger('active')
          const { activeRte } = viewActive
          const modelEl = model.getEl()
          model.getView().render()
          modelEl.setAttribute('data-gjs-textable', 'true')
          const { outerHTML } = modelEl
          activeRte.insertHTML && activeRte.insertHTML(outerHTML)
        } else {
          created = targetCollection.add(modelToDrop, opts)
        }

        if (!dropContent) {
          targetCollection.remove(modelTemp)
        } else {
          this.dropContent = null
        }

        // This will cause to recalculate children dimensions
        this.prevTarget = null
      } else {
        if (!targetCollection) {
          throw 'Target collection not found'
        }

        if (!droppable) {
          throw `Target is not droppable, accepts [${dropInfo}]`
        }

        if (!draggable) {
          throw `Component not draggable, acceptable by [${dragInfo}]`
        }

        throw 'Invalid target position: ' + warns.join(', ')
      }

      // em && em.trigger('component:dragEnd', targetCollection, modelToDrop, warns); // @depricated
      // em && em.trigger('sorter:drag:end', targetCollection, modelToDrop, warns);

      return created
    },

    movePlaceholder(plh, dims, pos, trgDim) {
      const guideline = calculateGuideline(
        this.dfo__onStartPointer,
        this.dfo__onDragPointer,
        this.target,
        this.eV,
        this.dfo__srcOffset,
        this.eventMove
      )

      if (!guideline || this.dropContent) {
        plh.style.display = `none`
        return
      }
      const { top, left, width, height } = guideline
      plh.classList.add('ctr-guidleline')
      plh.style.border = '1px dashed red !important'
      plh.style.top = `${top}px`
      plh.style.left = `${left}px`
      plh.style.width = `${width}px`
      plh.style.height = `${height}px`
    }
  })
}
