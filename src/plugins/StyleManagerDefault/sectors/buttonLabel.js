const buttonLabel = {
  id: 'button-label',
  name: 'Button Label',
  buildProps: ['font-family', 'font-size', 'font-style'],
  properties: [
    {
      property: 'font-family',
      defaults: "Arial, Helvetica, sans-serif"
    },
    {
      property: 'font-size',
      defaults: 16
    },
    {
      id: 'font-style',
      name: 'Style',
      type: 'radio',
      defaults: 'normal',
      list: [
        {
          value: 'normal',
          name: 'Normal',
          className: 'fa fa-font'
        },
        {
          value: 'italic',
          name: 'Italic',
          className: 'fa fa-italic'
        }
      ]
    }
  ]
}

export default buttonLabel
