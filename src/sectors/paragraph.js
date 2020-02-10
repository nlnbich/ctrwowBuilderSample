const paragraph = {
  name: "Paragraph",
  buildProps: ["text-align", "line-height", "text-shadow"],
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
    },
    // {
    //   id: "list-style-type",
    //   name: "Style",
    //   property: "list-style-type",
    //   type: "radio",
    //   defaults: "",
    //   list: [
    //     {
    //       value: "bulleted",
    //       name: "Bulleted List",
    //       className: "fa fa-list-ul"
    //     },
    //     {
    //       value: "numbered",
    //       name: "Numbered List",
    //       className: "fa fa-list-ol"
    //     },
    //     {
    //       value: "decrease",
    //       name: "Decrease Indent",
    //       className: "fa fa-indent"
    //     },
    //     {
    //       value: "increase",
    //       name: "Increase Indent",
    //       className: "fa fa-outdent"
    //     },
    //   ],
    // },
  ]
};

export default paragraph;
