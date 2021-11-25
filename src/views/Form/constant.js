export const MODE_MAP = {
  "inline-horizontal": {
    mode: "inline-horizontal",
    config: {
      layout: "inline",
      colon: false,
    },
  },
  "inline-vertical": {
    mode: "inline-vertical",
    config: {
      layout: "vertical",
      colon: false,
    },
  },
  "block-horizontal": {
    mode: "block-horizontal",
    config: {
      layout: "horizontal",
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
      colon: false,
    },
  },
  "block-vertical": {
    mode: "block-vertical",
    config: {
      layout: "vertical",
      colon: false,
    },
  },
  "col-horizontal": {
    mode: "col-horizontal",
    config: {
      layout: "horizontal",
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
      colon: false,
      col: 3,
    },
  },
  "col-vertical": {
    mode: "col-vertical",
    config: {
      layout: "horizontal",
      colon: false,
      col: 3,
    },
  },
};
