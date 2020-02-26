export function calculateRelativePosWithParent(startPointer, currentPointer, parentElm, srcElm, offset) {
  const { x: root_x, y: root_y } = parentElm.getBoundingClientRect()
  const { x: src_x, y: src_y } = srcElm.getBoundingClientRect()

  const { x: start_x, y: start_y } = startPointer
  const { x: cur_x, y: cur_y } = currentPointer

  return {
    root_x,
    root_y,
    left: cur_x - root_x - (offset.x || 0), // - (start_x - src_x),
    top: cur_y - root_y - (offset.y || 0) // - (start_y - src_y)
  }
}
