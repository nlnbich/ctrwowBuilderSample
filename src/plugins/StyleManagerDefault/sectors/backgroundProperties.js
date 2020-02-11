const backgroundProperties = {
  name: "Background",
  buildProps: ["background-color", "background", "opacity"],
  properties: [
    {
      id: "background-color",
      name: "Solid Color"
    },
    {
      id: "background",
      name: "Background Image"
    },
    {
      id: "opacity",
      type: "slider",
      defaults: 1,
      max: 1,
      min: 0,
      step: 0.01
    }
  ]
};

export default backgroundProperties;
