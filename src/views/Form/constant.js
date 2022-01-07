export const MODE_MAP = {
  "inline-horizontal": {
    mode: "inline-horizontal",
    config: {
      layout: "inline",
      colon: false,
      mode: "inline-horizontal",
    },
  },
  "inline-vertical": {
    mode: "inline-vertical",
    config: {
      layout: "vertical",
      colon: false,
      mode: "inline-vertical",
    },
  },
  "block-horizontal": {
    mode: "block-horizontal",
    config: {
      layout: "horizontal",
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
      colon: false,
      mode: "block-horizontal",
    },
  },
  "block-vertical": {
    mode: "block-vertical",
    config: {
      layout: "vertical",
      colon: false,
      mode: "block-vertical",
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
      mode: "col-horizontal",
    },
  },
  "col-vertical": {
    mode: "col-vertical",
    config: {
      layout: "horizontal",
      colon: false,
      col: 3,
      mode: "col-vertical",
    },
  },
};
