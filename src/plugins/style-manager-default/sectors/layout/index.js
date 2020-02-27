const layout = {
  name: 'Layout',
  buildProps: ['layout-visibility'],
  properties: [
    {
      id: 'layout-visibility',
      type: 'radio',
      name: 'Visibility',
      property: 'display',
      defaults: 'inherit',
      options: [
        {
          value: 'inherit',
          name: 'Visible'
        },
        {
          value: 'none',
          name: 'Hidden'
        }
      ]
    },
    {
      name: 'Align Box',
      property: 'align-box',
      type: 'align-box', // <- the new type
      full: 1
    }
  ]
}

export default layout
