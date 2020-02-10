const flexProperties = {
  name: "Flex",
  buildProps: [
    "display",
    "flex-direction",
    "justify-content",
    "align-items",
    "order",
    "flex",
    "align-self"
  ],
  properties: [
    {
      id: "display",
      name: "Flex Container",
      property: "display",
      type: "select",
      defaults: "block",
      list: [
        { value: "block", name: "Disable" },
        { value: "flex", name: "Enable" }
      ],
    },
    {
      id: "flex-direction",
      name: "Direction",
      property: "flex-direction",
      type: "radio",
      defaults: "row",
      list: [
        {
          value: "row",
          name: "Row",
          className: "icons-flex icon-dir-row",
          title: "Row"
        },
        {
          value: "row-reverse",
          name: "Row reverse",
          className: "icons-flex icon-dir-row-rev",
          title: "Row reverse"
        },
        {
          value: "column",
          name: "Column",
          title: "Column",
          className: "icons-flex icon-dir-col"
        },
        {
          value: "column-reverse",
          name: "Column reverse",
          title: "Column reverse",
          className: "icons-flex icon-dir-col-rev"
        }
      ],
    },
    {
      id: "justify-content",
      name: "Justify",
      property: "justify-content",
      type: "radio",
      defaults: "flex-start",
      list: [
        {
          value: "flex-start",
          className: "icons-flex icon-just-start",
          title: "Start"
        },
        {
          value: "flex-end",
          title: "End",
          className: "icons-flex icon-just-end"
        },
        {
          value: "space-between",
          title: "Space between",
          className: "icons-flex icon-just-sp-bet"
        },
        {
          value: "space-around",
          title: "Space around",
          className: "icons-flex icon-just-sp-ar"
        },
        {
          value: "center",
          title: "Center",
          className: "icons-flex icon-just-sp-cent"
        }
      ]
    },
    {
      id: "align-items",
      name: "Align",
      property: "align-items",
      type: "radio",
      defaults: "center",
      list: [
        {
          value: "flex-start",
          title: "Start",
          className: "icons-flex icon-al-start"
        },
        {
          value: "flex-end",
          title: "End",
          className: "icons-flex icon-al-end"
        },
        {
          value: "stretch",
          title: "Stretch",
          className: "icons-flex icon-al-str"
        },
        {
          value: "center",
          title: "Center",
          className: "icons-flex icon-al-center"
        }
      ]
    },
    {
      id: "order",
      name: "Order",
      property: "order",
      type: "integer",
      defaults: 0,
      min: 0
    },
    {
      id: "flex",
      name: "Flex",
      property: "flex",
      type: "composite",
      properties: [
        {
          name: "Grow",
          property: "flex-grow",
          type: "integer",
          defaults: 0,
          min: 0
        },
        {
          name: "Shrink",
          property: "flex-shrink",
          type: "integer",
          defaults: 0,
          min: 0
        },
        {
          name: "Basis",
          property: "flex-basis",
          type: "integer",
          units: ["px", "%", ""],
          unit: "",
          defaults: "auto"
        }
      ]
    },
    {
      id: "align-self",
      name: "Align",
      property: "align-self",
      type: "radio",
      defaults: "auto",
      list: [
        {
          value: "auto",
          name: "Auto"
        },
        {
          value: "flex-start",
          title: "Start",
          className: "icons-flex icon-al-start"
        },
        {
          value: "flex-end",
          title: "End",
          className: "icons-flex icon-al-end"
        },
        {
          value: "stretch",
          title: "Stretch",
          className: "icons-flex icon-al-str"
        },
        {
          value: "center",
          title: "Center",
          className: "icons-flex icon-al-center"
        }
      ]
    }
  ]
};

export default flexProperties;
