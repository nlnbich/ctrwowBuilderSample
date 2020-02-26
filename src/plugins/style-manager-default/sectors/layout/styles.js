export default (editor, opts = {}) => {
  const sm = editor.StyleManager;
  const radio = sm.getType('radio');
  const propModel = radio.model;
  const propView = radio.view;

  const PADDING = 20 * 2;
  let LIMIT_LEVEL = 5;

  sm.addType('align-box', {
    model: propModel.extend({
      defaults: () => ({
        ...propModel.prototype.defaults,
        list: [
          {
            title: "Left Align",
            value: "left",
            name: "Left",
            className: "fa fa-align-left"
          },
          {
            title: "Center Align",
            value: "center",
            name: "Center",
            className: "fa fa-align-center"
          },
          {
            title: "Right Align",
            value: "right",
            name: "Right",
            className: "fa fa-align-right"
          },
          {
            title: "Top Align",
            value: "top",
            name: "Top",
            className: "fa fa-align-left"
          },
          {
            title: "Middle Align",
            value: "middle",
            name: "Middle",
            className: "fa fa-align-center"
          },
          {
            title: "Bottom Align",
            value: "bottom",
            name: "Bottom",
            className: "fa fa-align-right"
          },
        ]
      })
    }),
    view: propView.extend({
      ...radio.view,
      events: {
        change: 'inputValueChanged'
      },
      getPaddingBox(el){
        let compStyles = window.getComputedStyle(el);
        const pL = compStyles.getPropertyValue("padding-left");
        const pR = compStyles.getPropertyValue("padding-right");
        const pT = compStyles.getPropertyValue("padding-top");
        const pB = compStyles.getPropertyValue("padding-bottom");
        return {
          left: pL.substr(0, pL.length - 2),
          right: pR.substr(0, pR.length - 2),
          top: pT.substr(0, pT.length - 2),
          bottom: pB.substr(0, pB.length - 2)
        };
      },
      getCoords(elem, children){
        let padding = this.getPaddingBox(elem);
        return {
          top: 0 - padding.top + "px",
          left: 0 - padding.left + "px",
          right: elem.clientWidth - children.clientWidth - padding.left + "px",
          bottom: elem.clientHeight - children.clientHeight - padding.top + "px",
          center:
            elem.clientWidth / 2 - children.clientWidth / 2 - padding.left + "px",
          middle:
            elem.clientHeight / 2 - children.clientHeight / 2 - padding.top + "px"
        };
      },
      getValidParent(target, parent, position) {
        let $target = target.getEl();
        let $parent = parent.getEl();
        let i = 0;
        let valid = $parent.clientWidth - $target.clientWidth >= PADDING;
        if (position === "top" || position === "bottom" || position === "middle") {
          valid = $parent.clientHeight - $target.clientHeight >= PADDING;
        }
        if (valid || i === LIMIT_LEVEL) {
          return { target, parent };
        } else {
          return this.getValidParent(parent, parent.parent());
        }
      },
      handleAlignment(action){
        const selected = editor.getSelected();
        const validTarget = this.getValidParent(selected, selected.parent(), action);
        const box = validTarget.target;
        box.addStyle({ position: 'relative', transform:  'translateX(0) translateY(0)'});
        const { left, right, top, bottom, center, middle } = this.getCoords(
          validTarget.parent.getEl(),
          box.getEl()
        );

        const sm = editor.StyleManager;
        const l = sm.getProperty('geometry','left');
        const t = sm.getProperty('geometry','top');

        const currentTop = box.getStyle().top;
        const currentLeft = box.getStyle().left;
        switch (action) {
          case "left":
            //box.addStyle({ top: currentTop, left })
            l.set('value', left);
            t.set('value', currentTop);
            break;
          case "center":
            //box.addStyle({ top: currentTop, left: center })
            l.set('value', center);
            t.set('value', currentTop);
            break;
          case "right":
            //box.addStyle({ top: currentTop, left: right })
            l.set('value', right);
            t.set('value', currentTop);
            break;
          case "top":
            //box.addStyle({ top: top, left: currentLeft })
            l.set('value', currentLeft);
            t.set('value', top);
            break;
          case "middle":
            //box.addStyle({ top: middle, left: currentLeft })
            l.set('value', currentLeft);
            t.set('value', middle);
            break;
          case "bottom":
            //box.addStyle({ top: bottom, left: currentLeft })
            l.set('value', currentLeft);
            t.set('value', bottom);
            break;
        }
        editor.trigger('component:toggled')
      },
      inputValueChanged(e){
        e && e.stopPropagation();
        const align = this.getInputValue();
        this.handleAlignment(align);
      }
    })
  })
};