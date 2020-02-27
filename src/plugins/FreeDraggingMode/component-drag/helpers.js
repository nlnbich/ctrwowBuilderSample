import grapesjs from 'grapesjs'
import _round from 'lodash/fp/round'

export function adjustPosition({ x, y, ...rest }) {
  try {
    // x < 0 && (x = 0)
    // y < 0 && (y = 0)
    const { offsetHeight, offsetWidth } = grapesjs.editors[0].Canvas.getBody() || {}

    offsetWidth && x > offsetWidth && (x = offsetWidth)
    offsetHeight && y > offsetHeight && (y = offsetHeight)
    return {
      ...rest,
      x: _round(x),
      y: _round(y)
    }
  } catch (e) {
    console.log(e)
    return {
      ...rest,
      x: _round(x),
      y: _round(y)
    }
  }
}

export function calculateNewPosition(startPointer, currentPointer, parentElm, srcElm, offset) {
  const { x: root_x, y: root_y } = parentElm.getBoundingClientRect()
  const { x: src_x, y: src_y } = srcElm.getBoundingClientRect()

  // const { x: start_x, y: start_y } = startPointer
  const { x: cur_x, y: cur_y } = currentPointer

  const src_pos = {
    x: cur_x - offset.x,
    y: cur_y - offset.y
  }

  const left = src_pos.x - root_x || 0
  const top = src_pos.y - root_y || 0

  return adjustPosition({ x: left, y: top })
}

export function calculateGuideline(startPointer, currentPointer, parentElm, srcElm, offset, e) {
  const doc = e.target.ownerDocument

  if (!doc) {
    return
  }

  let addTop = 0
  let addLeft = 0
  const window = doc.defaultView || doc.parentWindow
  const frame = window.frameElement

  // If frame is present that means mouse has moved over the editor's canvas,
  // which is rendered inside the iframe and the mouse move event comes from
  // the iframe, not the parent window. Mouse position relative to the frame's
  // parent window needs to account for the frame's position relative to the
  // parent window.
  if (frame) {
    const frameRect = frame.getBoundingClientRect()
    // addTop = frameRect.top + document.documentElement.scrollTop;
    addTop = document.documentElement.scrollTop
    addLeft = frameRect.left + document.documentElement.scrollLeft
  } else {
    return
  }

  const { x: root_x, y: root_y } = parentElm.getBoundingClientRect()
  const { x: src_x, y: src_y } = srcElm.getBoundingClientRect()

  const { x: cur_x, y: cur_y } = currentPointer

  const src_pos = {
    x: cur_x - offset.x,
    y: cur_y - offset.y
  }

  let base = {
    root_x: _round(root_x) || 0,
    root_y: _round(root_y) || 0,
    left: _round(src_pos.x - root_x) || 0,
    top: _round(src_pos.y - root_y) || 0
  }

  let guideline = {}

  if (base.left < 0) {
    guideline.width = Math.abs(base.left)
    guideline.left = base.root_x - guideline.width
  } else {
    guideline.left = base.root_x
    guideline.width = base.left
    // guideline.width = Math.abs(base.x)
  }

  if (base.top < 0) {
    guideline.height = Math.abs(base.top)
    guideline.top = base.root_y - guideline.height
  } else {
    guideline.top = base.root_y
    guideline.height = base.top
    // guideline.width = Math.abs(base.x)
  }

  const body = parentElm.ownerDocument.body
  guideline.top += addTop + body.scrollTop
  guideline.left += addLeft + body.scrollLeft

  return guideline
}
