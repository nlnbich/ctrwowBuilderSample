const layout = {
  name: "Layout",
  buildProps: ["layout-visibility", "alignment"],
  properties: [
    {
      id: "layout-visibility",
      type: "radio",
      name: "Visibility",
      property: "display",
      defaults: "inherit",
      options: [
        {
          value: "inherit",
          name: "Visible"
        },
        {
          value: "none",
          name: "Hidden"
        }
      ]
    },
    {
      id: "alignment",
      type: "radio",
      property: "align-box",
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
        }
      ]
    }
  ]
};

export default layout;
