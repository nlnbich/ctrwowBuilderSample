const paragraph = {
  name: "Paragraph",
  buildProps: ["text-align", "list-style-type"],
  properties: [
    {
      id: "text-align",
      name: "Alignment",
      property: "text-align",
      type: "radio",
      defaults: "left",
      list: [
        {
          value: "left",
          name: "Left",
          className: "fa fa-align-left"
        },
        {
          value: "center",
          name: "Center",
          className: "fa fa-align-center"
        },
        {
          value: "right",
          name: "Right",
          className: "fa fa-align-right"
        },
        {
          value: "justify",
          name: "Justify",
          className: "fa fa-align-justify"
        }
      ]
    },
    {
      id: "list-style-type",
      name: "Style",
      property: "list-style-type",
      type: "radio",
      defaults: "left",
      list: [
        {
          value: "disc",
          name: "Bulleted List",
          className: "fa fa-list-ul"
        },
        {
          value: "decimal",
          name: "Numbered List",
          className: "fa fa-list-ol"
        }
      ]
    }
  ]
};

export default paragraph;
