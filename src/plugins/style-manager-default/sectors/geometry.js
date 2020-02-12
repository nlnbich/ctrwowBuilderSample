const geometry = {
    name: "Geometry",
    buildProps: [
        "float",
        "display",
        "position",
        "max-width",
        "min-height",
        "width",
        "height",
        "left",
        "top",
        "right",
        "bottom",
        "margin",
        "padding"
    ],
    properties: [
        {property: 'position', type: 'select'},
        {
            name: "Margin",
            property: "margin",
            properties: [
                {classList: ["sl-inline-slider"], name: "Top", property: "margin-top", type: "slider", max: 1024},
                {classList: ["sl-inline-slider"], name: "Right", property: "margin-right", type: "slider", max: 1024},
                {classList: ["sl-inline-slider"], name: "Bottom", property: "margin-bottom", type: "slider", max: 1024},
                {classList: ["sl-inline-slider"], name: "Left", property: "margin-left", type: "slider", max: 1024}
            ]
        },
        {
            name: "Padding",
            property: "padding",
            properties: [
                {classList: ["sl-inline-slider"], name: "Top", property: "padding-top", type: "slider", max: 1024},
                {classList: ["sl-inline-slider"], name: "Right", property: "padding-right", type: "slider", max: 1024},
                {
                    classList: ["sl-inline-slider"],
                    name: "Bottom",
                    property: "padding-bottom",
                    type: "slider",
                    max: 1024
                },
                {classList: ["sl-inline-slider"], name: "Left", property: "padding-left", type: "slider", max: 1024}
            ]
        }
    ]
};

export default geometry;
