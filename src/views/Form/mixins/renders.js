export default {
  data() {
    return {
      sourceList: [
        {
          name: "基础表单",
          list: [
            {
              dragName: " 文本框",
              id: "0000",
              label: "文本框",
              prop: "",
              render: function () {
                return <a-input vModel={this.form.input} />;
              },
            },
            {
              dragName: "数字框",
              id: "0001",
              label: "数字框",
              prop: "number",
              render: function () {
                return <a-input-number vModel={this.form.input} />;
              },
            },
            {
              dragName: "选择框",
              id: "0002",
              label: "选择框",
              prop: "select",
              render: function () {
                return (
                  <a-select vModel={this.form.select}>
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
              id: "0003",
              label: "日期",
              prop: "name",
              render: function () {
                return <a-date-picker vModel={this.form.time} type="date" />;
              },
            },
            {
              dragName: "时间",
              id: "0004",
              label: "时间",
              prop: "name",
              render: function () {
                return (
                  <a-time-picker
                    vModel={this.form.timePicker}
                    use12-hours
                    format="hh:mm:ss"
                  />
                );
              },
            },
            {
              dragName: "开关",
              id: "0005",
              label: "开关",
              prop: "switch",
              render: function () {
                return <a-switch vModel={this.form.switch} />;
              },
            },
            {
              dragName: "多选框",
              id: "0006",
              label: "多选框",
              prop: "switch",
              render: function () {
                return (
                  <a-checkbox-group
                    vModel={this.form.checkbox}
                    name="checkboxgroup"
                    options={[{ label: "123", value: "123" }]}
                  />
                );
              },
            },
            {
              dragName: "单选框",
              id: "0007",
              label: "单选框",
              prop: "radio",
              render: function () {
                return (
                  <a-radio-group
                    vModel={this.form.checkbox}
                    options={[{ label: "123", value: "123" }]}
                  />
                );
              },
            },
            {
              dragName: "多行文本",
              id: "0008",
              label: "多行文本",
              prop: "textarea",
              render: function () {
                return <a-input vModel={this.form.textarea} type="textarea" />;
              },
            },
            {
              dragName: "上传",
              id: "0009",
              label: "上传",
              prop: "file",
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
              id: "0100",
              label: "",
              render: function () {
                return <a-button type="primary">按钮</a-button>;
              },
            },
            {
              dragName: "按钮",
              id: "0101",
              label: "",
              render: function () {
                return <a-button>按钮</a-button>;
              },
            },
            {
              dragName: "按钮",
              id: "0102",
              label: "",
              render: function () {
                return <a-button type="danger">按钮</a-button>;
              },
            },
            {
              dragName: "按钮",
              id: "0103",
              label: "",
              render: function () {
                return (
                  <a-button type="link" href="javascript:none">
                    按钮
                  </a-button>
                );
              },
            },
            {
              dragName: "按钮",
              id: "0104",
              label: "",
              render: function () {
                return (
                  <a-button type="primary" icon="search">
                    按钮
                  </a-button>
                );
              },
            },
            {
              dragName: "按钮",
              id: "0104",
              label: "",
              render: function () {
                return (
                  <a-button type="dashed" loading={true}>
                    按钮
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
              id: "0200",
              label: "",
              prop: "",
              render: function () {
                return (
                  <a-input vModel={this.form.inputIcon}>
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
              id: "0201",
              label: "",
              prop: "",
              render: function () {
                return (
                  <a-input-group compact>
                    <a-input
                      style="width: 30%"
                      vModel={this.form.inputGroup1}
                    />
                    <a-input
                      style="width: 70%"
                      vModel={this.form.inputGroup2}
                    />
                  </a-input-group>
                );
              },
            },
            {
              dragName: "选择-输入",
              id: "0202",
              label: "",
              prop: "",
              render: function () {
                return (
                  <a-input-group compact>
                    <a-select vModel={this.form.inputGroup3}>
                      {[].map((option) => (
                        <a-select-option value={option.value}>
                          {option.name}
                        </a-select-option>
                      ))}
                    </a-select>
                    <a-input
                      style="width: 50%"
                      vModel={this.form.inputGroup4}
                    />
                  </a-input-group>
                );
              },
            },
            {
              dragName: "日期-日期",
              id: "0203",
              label: "",
              prop: "",
              render: function () {
                return (
                  <a-input-group compact>
                    <a-date-picker vModel={this.form.startTime} />
                    <a-date-picker vModel={this.form.endTime} />
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
