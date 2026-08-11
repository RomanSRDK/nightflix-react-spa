export default {
  extends: ["stylelint-config-standard"],
  ignoreFiles: ["dist/**", "node_modules/**"],
  plugins: ["stylelint-order"],

  rules: {
    "order/properties-alphabetical-order": true,
    // Colors
    "color-hex-length": "short",
    "color-function-notation": "modern",
    "alpha-value-notation": "number",

    // Fonts
    "font-weight-notation": "numeric",

    // Indents
    "declaration-block-single-line-max-declarations": 1,
    "declaration-empty-line-before": "never",

    // Empty lines
    "rule-empty-line-before": [
      "always",
      {
        except: ["first-nested"],
        ignore: ["after-comment"],
      },
    ],

    // Duplicates
    "declaration-block-no-duplicate-properties": true,
    "no-duplicate-selectors": true,

    // Selectors
    "selector-max-id": 0,
    "selector-max-compound-selectors": 4,

    // Values
    "length-zero-no-unit": true,
    "number-max-precision": 3,

    // Modern CSS
    "property-no-vendor-prefix": true,
    "value-no-vendor-prefix": true,

    // Allows the use of :global() in CSS Modules
    "selector-pseudo-class-no-unknown": [
      true,
      {
        ignorePseudoClasses: ["global"],
      },
    ],
  },
};
