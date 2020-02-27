function getNewVal(val) {
  try {
    const regex = /([-+]?[\d.]*)(.*)/
    const parts = val.split(regex)
    const newVal = parseInt(parts[1])
    return newVal ? `${newVal + 10}${parts[2] || 'px'}` : undefined
  } catch (e) {
    return
  }
}

export default function freeDraggingMode(editor) {
  editor.on('component:paste', add => {
    console.log(add)
    try {
      let { top, left, bottom, right, ...style } = add.getStyle()
      if (left && top) {
        const newTop = getNewVal(top)
        const newLeft = getNewVal(left)

        if (newTop || newLeft) {
          add.setStyle({
            ...style,
            top: newTop || top,
            left: newLeft || left
          })
        }
      }
    } catch (e) {
      console.log('[freeDraggingMode] component-clone')
      console.log(e)
    }
  })
}
