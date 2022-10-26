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
  输入框: (formItem) => `  {
    render: () => <a-input vModel={this.form.${formItem.name}} />
  }`,
  数字框: (formItem) => `  {
    render: () => <a-input-number vModel={this.form.${formItem.name}} />
  }`,
  下拉框: (formItem) => `  {
    render: () => <a-select vModel={this.form.${formItem.name}}>
      {[].map((option) => (
        <a-select-option value={option.value}>
          {option.name}
        </a-select-option>
      ))}
    </a-select>
  }`,
  日期选择器: (formItem) =>
    `  {
    render: () => <a-date-picker type="date" vModel={this.form.${formItem.name}} />
  }`,
  时间选择器: (formItem) =>
    `  {
    render: () => <a-time-picker format="hh:mm:ss" vModel={this.form.${formItem.name}} />
  }`,
  开关: (formItem) =>
    `  {
    render: () => <a-switch vModel={this.form.${formItem.name}} />
  }`,
  多选框: (formItem) =>
    `  {
    render: () => <a-checkbox-group name="checkboxgroup" options={[{ label: "123", value: "123" }]} vModel={this.form.${formItem.name}} />
  }`,
  单选框: (formItem) =>
    `  {
    render: () => <a-radio-group options={[{ label: "123", value: "123" }]} vModel={this.form.${formItem.name}} />
  }`,
  多行文本框: (formItem) =>
    `  {
    render: () => <a-input type="textarea" vModel={this.form.${formItem.name}} />
  }`,
  文件上传: () =>
    `  {
    render: () => <a-upload name="file" multiple={true} action="https://www.mocky.io/v2/5cc8019d300000980a055e76" headers={{}} on-change={() => {}}><a-button><a-icon type="upload" />上传</a-button></a-upload>
  }`,
  按钮: () => `  {
    render: () => <a-button>按钮</a-button>
  }`,
  "输入-icon": (formItem) =>
    `  {
    render: () => <a-input type="textarea" vModel={this.form.${formItem.name}}><a-icon slot="addonAfter" type="setting" style='cursor: pointer;'/></a-input>
  }`,
  "输入-输入": (formItem) =>
    `  {
    render: () => <a-input-group compact><a-input style='width: 30%' vModel={this.form.${formItem.name}}/><a-input style='width: 70%' vModel={this.form.${formItem.name}} /></a-input-group>
  }`,
  "选择-输入": (formItem) =>
    `  {
    render: () => <a-input-group compact><a-select vModel={this.form.${formItem.name}}>{[].map((option) => (<a-select-option value={option.value}>{option.name}</a-select-option>))}</a-select><a-input style='width: 50%' vModel={this.form.${formItem.name}}/></a-input-group>
  }`,
  "日期-日期": (formItem) =>
    `  {
    render: () => <a-input-group compact><a-date-picker vModel={this.form.${formItem.name}} /><a-date-picker vModel={this.form.${formItem.name}} /></a-input-group>
  }`,
};
