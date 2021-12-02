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
export const MODEL_FORM_ITMES = {
  "0000": (formItem) => `  {
    render: () => <a-input vModel={this.form.${formItem.name}} />
  }`,
  "0001": (formItem) => `  {
    render: () => <a-input-number vModel={this.form.${formItem.name}} />
  }`,
  "0002": (formItem) => `  {
    render: () => <a-select vModel={this.form.${formItem.name}}>
      {[].map((option) => (
        <a-select-option value={option.value}>
          {option.name}
        </a-select-option>
      ))}
    </a-select>
  }`,
  "0003": (formItem) =>
    `  {
    render: () => <a-date-picker type="date" vModel={this.form.${formItem.name}} />
  }`,
  "0004": (formItem) =>
    `  {
    render: () => <a-time-picker format="hh:mm:ss" vModel={this.form.${formItem.name}} />
  }`,
  "0005": (formItem) =>
    `  {
    render: () => <a-switch vModel={this.form.${formItem.name}} />
  }`,
  "0006": (formItem) =>
    `  {
    render: () => <a-checkbox-group name="checkboxgroup" options={[{ label: "123", value: "123" }]} vModel={this.form.${formItem.name}} />
  }`,
  "0007": (formItem) =>
    `  {
    render: () => <a-radio-group options={[{ label: "123", value: "123" }]} vModel={this.form.${formItem.name}} />
  }`,
  "0008": (formItem) =>
    `  {
    render: () => <a-input type="textarea" vModel={this.form.${formItem.name}} />
  }`,
  "0009": () =>
    `  {
    render: () => <a-upload name="file" multiple={true} action="https://www.mocky.io/v2/5cc8019d300000980a055e76" headers={{}} on-change={() => {}}><a-button><a-icon type="upload" />上传</a-button></a-upload>
  }`,
  "0100": () => `<a-button type="primary">按钮</a-button>`,
  "0101": () => `<a-button>按钮</a-button>`,
  "0102": () => `<a-button type="danger">按钮</a-button>`,
  "0103": () => `<a-button type="link" href="javascript:none">按钮</a-button>`,
  "0104": () => `<a-button type="primary" icon="search">按钮</a-button>`,
  "0105": () => `<a-button type="dashed" loading={true}>按钮</a-button>`,
  "0200": (formItem) =>
    `  {
    render: () => <a-input type="textarea" vModel={this.form.${formItem.name}}><a-icon slot="addonAfter" type="setting" style='cursor: pointer;'/></a-input>
  }`,
  "0201": (formItem) =>
    `  {
    render: () => <a-input-group compact><a-input style='width: 30%' vModel={this.form.${formItem.name}}/><a-input style='width: 70%' vModel={this.form.${formItem.name}} /></a-input-group>
  }`,
  "0202": (formItem) =>
    `  {
    render: () => <a-input-group compact><a-select vModel={this.form.${formItem.name}}>{[].map((option) => (<a-select-option value={option.value}>{option.name}</a-select-option>))}</a-select><a-input style='width: 50%' vModel={this.form.${formItem.name}}/></a-input-group>
  }`,
  "0203": (formItem) =>
    `  {
    render: () => <a-input-group compact><a-date-picker vModel={this.form.${formItem.name}} /><a-date-picker vModel={this.form.${formItem.name}} /></a-input-group>
  }`,
};
