import { tableAnatomy as parts } from "@chakra-ui/anatomy"
import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system"

import getDefaultTransitionProps from "../utils/getDefaultTransitionProps"

const { defineMultiStyleConfig, definePartsStyle } =
  createMultiStyleConfigHelpers(parts.keys)

const variantSimple = definePartsStyle(() => {
  const transitionProps = getDefaultTransitionProps()

  return {
    th: {
      ...transitionProps,
      color: "neutral.light.5",
      backgroundColor: "neutral.light.1",
      border: "1px solid #EDEBEC",
      borderLeftWidth: 0,
      fontWeight: 500,
      borderRightWidth: 0,
      padding: {
        base: "0.75rem 0 0.75rem 1rem",
        xl: "0.75rem 0 0.75rem 1.5rem",
      },
      _first: {
        borderTopLeftRadius: "8px",
        borderLeftWidth: 1,
        borderRight: 0,
      },
      _last: {
        borderTopRightRadius: "8px",
        borderRightWidth: 1,
        borderLeftWidth: 0,
        padding: {
          base: "0.75rem 1rem 0.75rem 1rem",
          xl: "0.75rem 1.5rem 0.75rem 1.5rem",
        },
      },
    },
    thead: {
      ...transitionProps,
    },
    td: {
      ...transitionProps,
      border: "1px solid #EDEBEC",
      borderTopWidth: 1,
      borderLeftWidth: 0,
      borderRightWidth: 0,
      borderBottomWidth: 0,
      // sx: {
      //   paddingX: {
      //     base: "1rem !important",
      //     xl: "1.5rem !important",
      //   },
      //   paddingY: "0.75rem !important",
      // },
      padding: {
        base: "0.75rem 0 0.75rem 1rem",
        xl: "0.75rem 0 0.75rem 1.5rem",
      },
      _first: {
        borderLeftWidth: 1,
      },
      _last: {
        borderRightWidth: 1,
        padding: {
          base: "0.75rem 1rem 0.75rem 1rem",
          xl: "0.75rem 1.5rem 0.75rem 1.5rem",
        },
      },
    },
    tr: {
      ...transitionProps,
      _first: {
        td: {
          border: "1px solid #EDEBEC",
          borderWidth: 0,
          _first: {
            borderLeftWidth: 1,
          },
          _last: {
            borderRightWidth: 1,
          },
        },
      },
      _last: {
        td: {
          border: "1px solid #EDEBEC",
          borderTopWidth: 1,
          borderLeftWidth: 0,
          borderRightWidth: 0,
          borderBottomWidth: 1,
          _first: {
            borderBottomLeftRadius: "8px",
            borderLeftWidth: 1,
          },
          _last: {
            borderBottomRightRadius: "8px",
            borderRightWidth: 1,
          },
        },
      },
    },
  }
})

// const sizes = {};

// const variants = {};

// const border = "1px solid";
// const borderColor = "neutral.light.3";

const variantV2 = {
  table: {
    minWidth: "full",
    tableLayout: "auto",
    overflow: "unset",
    borderCollapse: "separate",
    borderSpacing: 0,
    bgColor: "neutral.light.1",
    borderRadius: "0.5rem",
    thead: {
      lineHeight: "1.25rem",
      fontSize: "0.875rem",
      fontStyle: "normal",
      fontWeight: 500,
      tr: {
        _first: {
          th: {
            borderTopWidth: 1,
            _first: {
              borderTopLeftRadius: "0.5rem",
            },
            _last: {
              borderTopRightRadius: "0.5rem",
            },
          },
        },
        th: {
          textTransform: "none",
          fontFamily: "body",
          fontWeight: 500,
          whiteSpace: "nowrap",
          overflow: "hidden",
          color: "neutral.light.5",
          letterSpacing: "none",
          fontSize: "0.875rem",
          lineHeight: "1.25rem",
          fontStyle: "normal",
          verticalAlign: "middle",
          backgroundColor: "neutral.light.1",
          border: "1px solid #EDEBEC",
          borderTopWidth: 0,
          borderBottomWidth: 1,
          borderLeftWidth: 0,
          borderRightWidth: 0,
          paddingInlineStart: 4,
          paddingInlineEnd: 4,
          paddingY: 3,
          _first: {
            borderLeftWidth: 1,
            paddingInlineStart: 8,
          },
          _last: {
            borderRightWidth: 1,
            paddingInlineEnd: 8,
          },
        },
      },
    },
    tbody: {
      tr: {
        role: "group",
        _last: {
          td: {
            _first: {
              borderBottomLeftRadius: "0.5rem",
            },
            _last: {
              borderBottomRightRadius: "0.5rem",
            },
          },
        },
        _hover: {
          backgroundColor: "primary.light.1",
          cursor: "pointer",
        },
        td: {
          verticalAlign: "middle",
          fontSize: "0.875rem",
          fontWeight: 400,
          lineHeight: "1.25rem",
          color: "neutral.light.7",
          whiteSpace: "nowrap",
          border: "1px solid #EDEBEC",
          borderBottomWidth: 1,
          borderTopWidth: 0,
          borderLeftWidth: 0,
          borderRightWidth: 0,
          paddingInlineStart: 4,
          paddingInlineEnd: 4,
          paddingY: 3,
          _first: {
            borderLeftWidth: 1,
            paddingInlineStart: 8,
          },
          _last: {
            borderRightWidth: 1,
            paddingInlineEnd: 8,
          },
        },
      },
    },
  },
}

const home = {
  table: {
    minWidth: "full",
    tableLayout: "auto",
    overflow: "unset",
    borderCollapse: "separate",
    borderSpacing: 0,
    bgColor: "none",
    tbody: {
      tr: {
        role: "group",
        _hover: {
          backgroundColor: "primary.light.1",
          cursor: "pointer",
        },
        _first: {
          td: {
            borderTopWidth: 1,
          },
        },
        _last: {
          td: {
            borderBottomWidth: 0,
          },
        },
        td: {
          verticalAlign: "middle",
          fontSize: "0.875rem",
          fontWeight: 400,
          lineHeight: "1.25rem",
          color: "neutral.light.7",
          whiteSpace: "nowrap",
          borderColor: "neutral.light.3",
          borderBottomWidth: 1,
          borderTopWidth: 0,
          borderLeftWidth: 0,
          borderRightWidth: 0,
          paddingInlineStart: "0.625rem",
          paddingInlineEnd: "0.625rem",
          paddingY: "0.5rem",
          _first: {
            paddingInlineStart: 0,
          },
          _last: {
            paddingInlineEnd: 0,
          },
        },
      },
    },
  },
}
const variants = {
  simple: variantSimple,
  v2: variantV2,
  home: home,
}

// const border = "1px solid";
// const borderColor = "neutral.light.3";

const baseStyle = definePartsStyle({
  th: {
    textTransform: "none",
    fontFamily: "body",
    fontWeight: 500,
    overflow: "hidden",
    color: "neutral.light.5",
    letterSpacing: "none",
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
    fontStyle: "normal",
    verticalAlign: "middle",
  },
  td: {
    verticalAlign: "middle",
    fontSize: "0.875rem",
    fontWeight: 400,
    lineHeight: "1.25rem",
    color: "neutral.light.7",
  },
  thead: {
    lineHeight: "1.25rem",
    fontSize: "0.875rem",
    fontStyle: "normal",
    fontWeight: 500,
  },
  table: {
    minWidth: { base: "1324px", xl: "100%" },
    tableLayout: "fixed",
    overflow: "unset",
    fontVariant: "normal",
    fontVariantLigatures: "no-contextual",
    borderCollapse: "separate",
    borderSpacing: 0,
    bgColor: "neutral.light.1",
    // marginTop: "10px",
  },
  tbody: {
    tr: {
      _hover: {
        backgroundColor: "primary.light.1",
        cursor: "pointer",
      },
    },
  },
})

const Table = defineMultiStyleConfig({
  baseStyle,
  // sizes,
  variants,
})

export default Table
