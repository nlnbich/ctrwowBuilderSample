const borderProperties = {
  name: "Border",
  buildProps: ["border-width", "border-style", "border-color", "border-radius-slider"],
  properties: [
    {
      id: "border-width",
      name: "Width",
      property: "border-width",
    },
    {
      id: "border-style",
      name: "Style",
      property: "border-style",
    },
    {
      id: "border-color",
      name: "Color",
      property: "border-color"
    },
    {
      id: "border-radius-slider",
      type: "slider",
      name: "Corner Radius",
      property: "border-radius",
      defaults: 0,
      step: 1,
      max: 100,
      min: 0,
      units: ["px"]
    }
  ]
};

export default borderProperties;
