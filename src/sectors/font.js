const font = {
  id: "font",
  name: "Font",
  buildProps: [
    "font-family",
    "font-size",
    "color",
    "letter-spacing",
    "text-decoration",
    "font-style"
  ],
  properties: [
    {
      property: "font-family",
      toRequire: 1
    },
    {
      property: "font-size",
      toRequire: 1
    },
    {
      property: "color",
      toRequire: 1
    },
    {
      property: "letter-spacing",
      toRequire: 1
    },
    {
      property: "text-decoration",
      name: "Decoration",
      type: "radio",
      defaults: "none",
      list: [
        {
          value: "none",
          name: "None",
          className: "fa fa-times"
        },
        {
          value: "underline",
          name: "underline",
          className: "fa fa-underline"
        },
        {
          value: "line-through",
          name: "Line-through",
          className: "fa fa-strikethrough"
        }
      ],
      toRequire: 1
    },
    {
      id: "font-style",
      name: "Style",
      type: "radio",
      defaults: "normal",
      list: [
        {
          value: "normal",
          name: "Normal",
          className: "fa fa-font"
        },
        {
          value: "italic",
          name: "Italic",
          className: "fa fa-italic"
        }
      ],
      toRequire: 1
    }
  ]
};

export default font;
