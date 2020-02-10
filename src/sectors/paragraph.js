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
          title: "Left Align",
          value: "left",
          name: "Left",
          className: "fa fa-align-left"
        },
        {
          title: "Center Align",
          value: "center",
          name: "Center",
          className: "fa fa-align-center"
        },
        {
          title: "Justify Align",
          value: "justify",
          name: "Justify",
          className: "fa fa-align-justify"
        },
        {
          title: "Right Align",
          value: "right",
          name: "Right",
          className: "fa fa-align-right"
        },
      ],
      toRequire: 1
    },
    {
      id: "list-style-type",
      name: "Style",
      property: "list-style-type",
      type: "radio",
      defaults: "",
      list: [
        {
          value: "bulleted",
          name: "Bulleted List",
          className: "fa fa-list-ul"
        },
        {
          value: "numbered",
          name: "Numbered List",
          className: "fa fa-list-ol"
        },
        {
          value: "decrease",
          name: "Decrease Indent",
          className: "fa fa-indent"
        },
        {
          value: "increase",
          name: "Increase Indent",
          className: "fa fa-outdent"
        },
      ],
      toRequire: 1
    }
  ]
};

export default paragraph;
