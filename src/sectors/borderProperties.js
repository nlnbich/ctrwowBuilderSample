const borderProperties = {
  name: "Border",
  buildProps: ["border", "border-radius-slider"],
  properties: [
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
