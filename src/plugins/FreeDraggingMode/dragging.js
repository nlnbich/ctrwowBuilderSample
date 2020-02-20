function onMove(editor, event) {
  console.log('on move')
}

function endMove(editor, event) {
  console.log('end move-----------')
}

export default function overrideSorter(editor, sorter) {
  const bk__endMove = sorter.endMove
  const bk__onMove = sorter.onMove

  sorter.onMove = function(...args) {
    onMove.apply(this, [editor, ...args])
    bk__onMove.apply(this, [...args])
  }

  sorter.endMove = function(...args) {
    endMove.apply(this, [editor, ...args])
    bk__endMove.apply(this, [...args])
  }
}
