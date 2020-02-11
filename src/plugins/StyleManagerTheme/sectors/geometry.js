const geometry = {
    name: "Geometry",
    buildProps: ["width", "height", "left", "top", "right", "bottom", "display", "position", "float", "max-width",
        "min-height",
        "margin",
        "padding"],
    properties: [
        {
            name: "Margin",
            property: "margin",
            properties: [
                {name: "Top", property: "margin-top", type: "slider", max: 1024},
                {name: "Right", property: "margin-right", type: "slider", max: 1024},
                {name: "Bottom", property: "margin-bottom", type: "slider", max: 1024},
                {name: "Left", property: "margin-left", type: "slider", max: 1024}
            ]
        },
        {
            name: "Padding",
            property: "padding",
            properties: [
                {name: "Top", property: "padding-top", type: "slider", max: 1024},
                {name: "Right", property: "padding-right", type: "slider", max: 1024},
                {name: "Bottom", property: "padding-bottom", type: "slider", max: 1024},
                {name: "Left", property: "padding-left", type: "slider", max: 1024}
            ]
        }
    ]
};

export default geometry;
