export default {
  extends: ["stylelint-config-standard"],
  plugins: ["stylelint-order"],
  ignoreFiles: ["dist/**", "node_modules/**"],
  rules: {
    "selector-class-pattern": null,
    "color-function-alias-notation": null,
    "color-function-notation": null,
    "alpha-value-notation": null,

    "selector-pseudo-class-no-unknown": [
      true,
      {
        ignorePseudoClasses: ["global"],
      },
    ],

    "order/properties-order": [
      [
        "display",
        "position",
        "top",
        "right",
        "bottom",
        "left",
        "z-index",

        "flex",
        "flex-direction",
        "justify-content",
        "align-items",
        "gap",

        "width",
        "height",
        "min-width",
        "min-height",
        "max-width",
        "max-height",

        "margin",
        "margin-top",
        "margin-right",
        "margin-bottom",
        "margin-left",

        "padding",
        "padding-top",
        "padding-right",
        "padding-bottom",
        "padding-left",

        "overflow",

        "border",
        "border-radius",

        "background",
        "background-color",

        "color",
        "font-size",
        "font-weight",
        "line-height",
        "text-align",
        "text-decoration",

        "opacity",
        "transform",
        "transition",
        "animation",
      ],
      {
        unspecified: "bottomAlphabetical",
      },
    ],
  },
};
