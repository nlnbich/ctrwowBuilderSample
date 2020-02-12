const layout = {
  name: "Layout",
  buildProps: ["layout-visibility"],
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
    }
  ]
};

export default layout;
