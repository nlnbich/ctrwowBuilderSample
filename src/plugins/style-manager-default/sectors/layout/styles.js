export default (editor, opts = {}) => {
  const sm = editor.StyleManager
  const radio = sm.getType('radio')
  const propModel = radio.model
  const propView = radio.view

  const PADDING = 20 * 2
  let LIMIT_LEVEL = 5

  sm.addType('align-box', {
    model: propModel.extend({
      defaults: () => ({
        ...propModel.prototype.defaults,
        list: [
          {
            title: 'Left Align',
            value: 'left',
            name:
              '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#000" fill-rule="nonzero" d="M6 6v12h13V6H6zm0 13v5H5V0h1v5h13c.6 0 1 .4 1 1v12c0 .6-.4 1-1 1H6zm6-14h1v14h-1V5z"/></svg>'
          },
          {
            title: 'Center Align',
            value: 'center',
            name:
              '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#000" fill-rule="nonzero" d="M6 6v12h13V6H6zm0-1h13c.6 0 1 .4 1 1v12c0 .6-.4 1-1 1H6a1 1 0 01-1-1V6c0-.6.4-1 1-1zm6-5h1v24h-1V0z"/></svg>'
          },
          {
            title: 'Right Align',
            value: 'right',
            name:
              '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#000" fill-rule="nonzero" d="M6 6v12h13V6H6zm13-1V0h1v24h-1v-5H6a1 1 0 01-1-1V6c0-.6.4-1 1-1h13zm-7 0h1v14h-1V5z"/></svg>'
          },
          {
            title: 'Top Align',
            value: 'top',
            name:
              '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#000" fill-rule="nonzero" d="M18 6H6v13h12V6zM5 6H0V5h24v1h-5v13c0 .6-.4 1-1 1H6a1 1 0 01-1-1V6zm14 6v1H5v-1h14z"/></svg>'
          },
          {
            title: 'Middle Align',
            value: 'middle',
            name:
              '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#000" fill-rule="nonzero" d="M18 6H6v13h12V6zm1 0v13c0 .6-.4 1-1 1H6a1 1 0 01-1-1V6c0-.6.4-1 1-1h12c.6 0 1 .4 1 1zm5 6v1H0v-1h24z"/></svg>'
          },
          {
            title: 'Bottom Align',
            value: 'bottom',
            name:
              '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#000" fill-rule="nonzero" d="M18 19H6V6h12v13zM5 19H0v1h24v-1h-5V6c0-.6-.4-1-1-1H6a1 1 0 00-1 1v13zm14-6v-1H5v1h14z"/></svg>'
          }
        ]
      })
    }),
    view: propView.extend({
      ...radio.view,
      events: {
        change: 'inputValueChanged'
      },
      getPaddingBox(el) {
        let compStyles = window.getComputedStyle(el)
        const pL = compStyles.getPropertyValue('padding-left')
        const pR = compStyles.getPropertyValue('padding-right')
        const pT = compStyles.getPropertyValue('padding-top')
        const pB = compStyles.getPropertyValue('padding-bottom')
        return {
          left: pL.substr(0, pL.length - 2),
          right: pR.substr(0, pR.length - 2),
          top: pT.substr(0, pT.length - 2),
          bottom: pB.substr(0, pB.length - 2)
        }
      },
      getCoords(elem, children) {
        let padding = this.getPaddingBox(elem)
        return {
          top: 0 - padding.top + 'px',
          left: 0 - padding.left + 'px',
          right: elem.clientWidth - children.clientWidth - padding.left + 'px',
          bottom: elem.clientHeight - children.clientHeight - padding.top + 'px',
          center: elem.clientWidth / 2 - children.clientWidth / 2 - padding.left + 'px',
          middle: elem.clientHeight / 2 - children.clientHeight / 2 - padding.top + 'px'
        }
      },
      getValidParent(target, parent, position) {
        let $target = target.getEl()
        let $parent = parent.getEl()
        let i = 0
        let valid = $parent.clientWidth - $target.clientWidth >= PADDING
        if (position === 'top' || position === 'bottom' || position === 'middle') {
          valid = $parent.clientHeight - $target.clientHeight >= PADDING
        }
        if (valid || i === LIMIT_LEVEL) {
          return { target, parent }
        } else {
          return this.getValidParent(parent, parent.parent())
        }
      },
      updatePosition(x, y) {
        const sm = editor.StyleManager
        const leftProp = sm.getProperty('geometry', 'left')
        const topProp = sm.getProperty('geometry', 'top')

        leftProp.set('value', x)
        topProp.set('value', y)
      },
      handleAlignment(action) {
        const selected = editor.getSelected()
        const validTarget = this.getValidParent(selected, selected.parent(), action)
        const box = validTarget.target
        const { left, right, top, bottom, center, middle } = this.getCoords(validTarget.parent.getEl(), box.getEl())

        const parentStyle = validTarget.parent.getStyle()
        if (!parentStyle.position || parentStyle.position === 'static') {
          validTarget.parent.addStyle({ position: 'relative' })
        }

        box.addStyle({ transform: "translateX(0) translateY(0)" });

        const currentTop = box.getStyle().top
        const currentLeft = box.getStyle().left
        switch (action) {
          case 'left':
            this.updatePosition(left, currentTop)
            break
          case 'center':
            this.updatePosition(center, currentTop)
            break
          case 'right':
            this.updatePosition(right, currentTop)
            break
          case 'top':
            this.updatePosition(currentLeft, top)
            break
          case 'middle':
            this.updatePosition(currentLeft, middle)
            break
          case 'bottom':
            this.updatePosition(currentLeft, bottom)
            break
        }
        editor.trigger('component:toggled')
      },
      inputValueChanged(e) {
        e && e.stopPropagation()
        const align = this.getInputValue()
        this.handleAlignment(align)
      }
    })
  })
}
