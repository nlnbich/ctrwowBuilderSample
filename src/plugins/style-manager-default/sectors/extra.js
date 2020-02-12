const flexProperties = {
  name: 'Extra',
  open: false,
  buildProps: ['transition', 'perspective', 'transform'],
  properties: [
    {
      property: 'transition',
      properties: [
        { name: 'Property', property: 'transition-property' },
        { name: 'Duration', property: 'transition-duration' },
        { name: 'Easing', property: 'transition-timing-function' }
      ]
    },
    {
      property: 'transform',
      properties: [
        { name: 'Rotate X', property: 'transform-rotate-x' },
        { name: 'Rotate Y', property: 'transform-rotate-y' },
        { name: 'Rotate Z', property: 'transform-rotate-z' },
        { name: 'Scale X', property: 'transform-scale-x' },
        { name: 'Scale Y', property: 'transform-scale-y' },
        { name: 'Scale Z', property: 'transform-scale-z' }
      ]
    }
  ]
}

export default flexProperties
