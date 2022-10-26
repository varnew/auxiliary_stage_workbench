import _get from "lodash/get";
import _cloneDeep from "lodash/cloneDeep";
const DEFAULT_ATTRS = {
  label: {
    label: "表单名称",
    value: "",
    renderType: "input",
  },
  key: {
    label: "关联key",
    value: "",
    renderType: "select",
  },
  rules: {
    label: "校验规则",
    value: [],
    options: [
      {
        label: "空检验",
        value: `{ required: true, message: '请输入<%=item.attrs.label.value || ''%>' }`,
      },
      {
        label: "正则",
        value: `{ pattern: /^[\\S]*$/, message: '请输入有效内容' }`,
      },
    ],
    renderType: "multiple_select",
  },
};
export default {
  data() {
    return {
      sourceList: [
        {
          name: "基础表单",
          list: [
            {
              dragName: " 文本框",
              id: "输入框",
              label: "文本框",
              prop: "",
              attrs: { ..._cloneDeep(DEFAULT_ATTRS) },
              template: `<a-input vModel={this.form.<%=item.attrs.key.value || 'test'%>} />`,
              render: function () {
                return <a-input vModel={this.value} />;
              },
            },
            {
              dragName: "数字框",
              id: "数字框",
              label: "数字框",
              prop: "",
              attrs: { ..._cloneDeep(DEFAULT_ATTRS) },
              template: `<a-input-number vModel={this.form.<%=item.attrs.key.value || 'test'%>} />`,
              render: function () {
                return <a-input type="number" vModel={this.value} />;
              },
            },
            {
              dragName: "下拉框",
              id: "下拉框",
              label: "下拉框",
              prop: "",
              attrs: {
                ..._cloneDeep(DEFAULT_ATTRS),
              },
              template: `<a-select vModel={this.form.<%=item.attrs.key.value || 'test'%>}>
                {this.options.<%=item.attrs.key.value || 'test'%>.map((option) => (
                  <a-select-option value={option.value}>
                    {option.name}
                  </a-select-option>
                ))}
              </a-select>`,
              render: function () {
                return (
                  <a-select vModel={this.value}>
                    {[].map((option) => (
                      <a-select-option value={option.value}>
                        {option.name}
                      </a-select-option>
                    ))}
                  </a-select>
                );
              },
            },
            {
              dragName: " 日期",
              id: "日期选择器",
              label: "日期",
              prop: "name",
              attrs: { ..._cloneDeep(DEFAULT_ATTRS) },
              template: `<a-date-picker vModel={this.form.<%=item.attrs.key.value || 'test'%>} type="date" />`,
              render: function () {
                return (
                  <a-date-picker
                    vModel={this.value}
                    type="date"
                    format="YYYY-MM-DD"
                  />
                );
              },
            },
            {
              dragName: "时间",
              id: "时间选择器",
              label: "时间",
              prop: "name",
              attrs: { ..._cloneDeep(DEFAULT_ATTRS) },
              template: `<a-time-picker
                format="hh:mm:ss"
                vModel={this.form.<%=item.attrs.key.value || 'test'%>}
              />`,
              render: function () {
                return <a-time-picker format="hh:mm:ss" vModel={this.value} />;
              },
            },
            {
              dragName: "开关",
              id: "开关",
              label: "开关",
              prop: "switch",
              attrs: { ..._cloneDeep(DEFAULT_ATTRS) },
              template: `<a-switch vModel={this.form.<%=item.attrs.key.value || 'test'%>} />`,
              render: function () {
                return <a-switch vModel={this.value} />;
              },
            },
            {
              dragName: "多选框",
              id: "多选框",
              label: "多选框",
              prop: "switch",
              attrs: { ..._cloneDeep(DEFAULT_ATTRS) },
              template: `<a-checkbox-group
                vModel={this.form.<%=item.attrs.key.value || 'test'%>}
                name="checkboxgroup"
                options={[{ label: "123", value: "123" }]}
              />`,
              render: function () {
                return (
                  <a-checkbox-group
                    vModel={this.value}
                    name="checkboxgroup"
                    options={[{ label: "123", value: "123" }]}
                  />
                );
              },
            },
            {
              dragName: "单选框",
              id: "单选框",
              label: "单选框",
              prop: "radio",
              attrs: { ..._cloneDeep(DEFAULT_ATTRS) },
              template: `<a-radio-group
                vModel={this.form.<%=item.attrs.key.value || 'test'%>}
                options={[{ label: "123", value: "123" }]}
              />`,
              render: function () {
                return (
                  <a-radio-group
                    vModel={this.value}
                    options={[{ label: "123", value: "123" }]}
                  />
                );
              },
            },
            {
              dragName: "多行文本",
              id: "多行文本框",
              label: "多行文本",
              prop: "textarea",
              attrs: { ..._cloneDeep(DEFAULT_ATTRS) },
              template: `<a-input vModel={this.form.<%=item.attrs.key.value || 'test'%>} type="textarea" />`,
              render: function () {
                return <a-input vModel={this.value} type="textarea" />;
              },
            },
            {
              dragName: "上传",
              id: "文件上传",
              label: "上传",
              prop: "file",
              template: `<a-upload
                name="file"
                multiple={true}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                headers={{}}
                on-change={() => {}}
              >
                <a-button>
                  <a-icon type="upload" /> 上传
                </a-button>
              </a-upload>`,
              render: function () {
                return (
                  <a-upload
                    name="file"
                    multiple={true}
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    headers={{}}
                    on-change={() => {}}
                  >
                    <a-button>
                      <a-icon type="upload" /> 上传
                    </a-button>
                  </a-upload>
                );
              },
            },
          ],
        },
        {
          name: "按钮",
          type: "render",
          list: [
            {
              dragName: "按钮",
              id: "按钮",
              label: "",
              attrs: {
                text: {
                  label: "按钮文本",
                  value: "按钮",
                  renderType: "input",
                },
                type: {
                  label: "按钮类型",
                  value: undefined,
                  renderType: "select",
                  optionKey: "btnType",
                },
                size: {
                  label: "按钮大小",
                  value: undefined,
                  renderType: "select",
                  optionKey: "btnSize",
                },
                shape: {
                  label: "按钮形状",
                  value: undefined,
                  renderType: "select",
                  optionKey: "btnShape",
                },
              },
              render: function () {
                const { attrs = [] } = this || {}; // this可能为null
                const text = _get(attrs, "text.value", "按钮");
                const type = _get(attrs, "type.value");
                const size = _get(attrs, "size.value");
                const shape = _get(attrs, "shape.value");
                return (
                  <a-button type={type} size={size} shape={shape}>
                    {text}
                  </a-button>
                );
              },
            },
          ],
        },
        {
          name: "高级表单",
          list: [
            {
              dragName: "输入-icon",
              id: "输入-icon",
              label: "",
              prop: "",
              attrs: {
                key: {
                  label: "关联key1",
                  value: "",
                  renderType: "input",
                },
              },
              template: `<a-input vModel={this.form.<%=item.attrs.key.value || 'test'%>}>
                <a-icon
                  slot="addonAfter"
                  type="setting"
                  style="cursor: pointer;"
                />
              </a-input>`,
              render: function () {
                return (
                  <a-input vModel={this.value}>
                    <a-icon
                      slot="addonAfter"
                      type="setting"
                      style="cursor: pointer;"
                    />
                  </a-input>
                );
              },
            },
            {
              dragName: "输入-输入",
              id: "输入-输入",
              label: "",
              prop: "",
              attrs: {
                key1: {
                  label: "关联key1",
                  value: "",
                  renderType: "input",
                },
                key2: {
                  label: "关联key2",
                  value: "",
                  renderType: "input",
                },
              },
              template: `<a-input-group compact>
                <a-input
                  style="width: 30%"
                  vModel={this.form.<%=item.attrs.key1.value || 'test'%>}
                />
                <a-input
                  style="width: 70%"
                  vModel={this.form.<%=item.attrs.key2.value || 'test'%>}
                />
              </a-input-group>`,
              render: function () {
                return (
                  <a-input-group compact>
                    <a-input style="width: 30%" vModel={this.value1} />
                    <a-input style="width: 70%" vModel={this.value2} />
                  </a-input-group>
                );
              },
            },
            {
              dragName: "选择-输入",
              id: "选择-输入",
              label: "",
              prop: "",
              attrs: {
                key1: {
                  label: "关联key1",
                  value: "",
                  renderType: "input",
                },
                key2: {
                  label: "关联key2",
                  value: "",
                  renderType: "input",
                },
              },
              template: `<a-input-group compact>
                <a-select vModel={this.form.<%=item.attrs.key1.value || 'test'%>}>
                  {[].map((option) => (
                    <a-select-option value={option.value}>
                      {option.name}
                    </a-select-option>
                  ))}
                </a-select>
                <a-input
                  style="width: 50%"
                  vModel={this.form.<%=item.attrs.key2.value || 'test'%>}
                />
              </a-input-group>`,
              render: function () {
                return (
                  <a-input-group compact>
                    <a-select style="width: 50%;" vModel={this.value}>
                      1
                      {[].map((option) => (
                        <a-select-option value={option.value}>
                          {option.name}
                        </a-select-option>
                      ))}
                    </a-select>
                    <a-input style="width: 50%;" vModel={this.value2} />
                  </a-input-group>
                );
              },
            },
            {
              dragName: "日期-日期",
              id: "日期-日期",
              label: "",
              prop: "",
              attrs: {
                key1: {
                  label: "关联key1",
                  value: "",
                  renderType: "input",
                },
                key2: {
                  label: "关联key2",
                  value: "",
                  renderType: "input",
                },
              },
              template: `<a-input-group compact>
                <a-date-picker vModel={this.form.<%=item.attrs.key1.value || 'test'%>} />
                <a-date-picker vModel={this.form.<%=item.attrs.key2.value || 'test'%>} />
              </a-input-group>`,
              render: function () {
                return (
                  <a-input-group compact>
                    <a-date-picker vModel={this.value1} />
                    <a-date-picker vModel={this.value2} />
                  </a-input-group>
                );
              },
            },
          ],
        },
      ],
    };
  },
};
