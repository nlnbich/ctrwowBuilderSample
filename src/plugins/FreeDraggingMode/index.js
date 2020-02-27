import Sorter from './Sorter'
import { isElement } from 'underscore';
import { isTaggableNode } from 'grapesjs/src/utils/mixins';

export default function freeDraggingMode(editor) {
  if (editor && editor.Config && editor.Config.dragMode !== 'absolute') {
    // for absolute mode only
    return
  }

  editor.Config.canvasCss = `.gjs-comp-selected-parent {opacity: 0.5;} ${editor.Config.canvasCss || ''}`

  const COMMAND = 'core:component-drag'
  const commands = editor.Commands

  const componnentDragCommand = commands.get(COMMAND)

  commands.add('resize', {
    run(editor, sender, opts) {
      var opt = opts || {};
      var el = opt.el || '';
      var canvas = editor.Canvas;
      var canvasResizer = this.canvasResizer;
      var options = opt.options || {};
      var canvasView = canvas.getCanvasView();
      options.appendTo = canvas.getResizerEl();
      options.prefix = editor.getConfig().stylePrefix;
      options.posFetcher = canvasView.getElementPos.bind(canvasView);
      options.mousePosFetcher = canvas.getMouseRelativePos;

      // Create the resizer for the canvas if not yet created
      if (!canvasResizer || opt.forceNew) {
        this.canvasResizer = editor.Utils.Resizer.init(options);
        canvasResizer = this.canvasResizer;
      }

      const {em} = this;

      const model =
          !isElement(el) && isTaggableNode(el) ? el : em.getSelected();

      const modelToStyle = em.get('StyleManager').getModelToStyle(model);

      const {onStart, updateTarget} = options;

      options.onStart = function (...params) {
        if (modelToStyle) {
          this.startStyle = modelToStyle.getStyle();
        }
        return onStart.call(this, ...params)
      }.bind(canvasResizer);

      options.updateTarget = function (...params) {
        if (modelToStyle) {
          const [, rect, options] = params;
          const {startStyle} = this;
          const style = modelToStyle.getStyle();
          const newStyle = {...style};
          const getStyleValue = function (n, def = 0) {
            const vReg = startStyle[n].match(/\d+/);
            return vReg ? parseFloat(vReg[0]) : def;
          }
          if (rect.t) {
            newStyle.top = `${rect.t + getStyleValue('top')}px`;
          }
          if (rect.l) {
            newStyle.left = `${rect.l + getStyleValue('left')}px`;
          }
          if (rect.t || rect.l) {
            modelToStyle.setStyle(newStyle, {avoidStore: 1})

            const updateEvent = `update:component:style`;
              em &&
              em.trigger(
                  `${updateEvent}:top ${updateEvent}:left`
              );
              const { store } = options;
              if (store) {
                modelToStyle.trigger('change:style', modelToStyle, style, {});
              }
          }
        }
        return updateTarget.call(this, ...params);
      }.bind(canvasResizer)

      canvasResizer.setOptions(options);
      canvasResizer.blur();
      canvasResizer.focus(el);
      return canvasResizer;
    },

    stop() {
      const resizer = this.canvasResizer;
      resizer && resizer.blur();
    }
  });

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
