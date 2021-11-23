<script>
import UseForm from "@/pages/form/custom/useForm";
export default {
  mixins: [UseForm],
  data: () => {
    return {
      form: {},
      rules: {
        input: [
          { required: true, message: '请输入', trigger: 'blur' }
        ]
      },
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
      colon: false,
      col: 3,
      layout: 'horizontal' // 'horizontal'|'vertical'|'inline'
    };
  },
  computed: {
    modelRender() {
      return [
        {
          label: "输入框",
          prop: "input",
          render: () => <a-input v-model={this.form.input} />,
        },
        {
          label: "选择框",
          prop: "select",
          render: () => {
            return (
              <a-select v-model={this.form.select}>
                {[].map((option) => <a-select-option value={option.value}>
                  {option.name}
                </a-select-option>)}
              </a-select>
            );
          },
        },
        {
          label: "时间",
          prop: "name",
          render: () => <a-date-picker v-model={this.form.time} type="date" />,
        },
        {
          label: "多行文本",
          prop: "textarea",
          render: () => (
            <a-input v-model={this.form.textarea} type="textarea" />
          ),
        },
        {
          label: "开关",
          prop: "name",
          render: () => <a-switch v-model={this.form.switch} />,
        },
        {
          label: "多选",
          prop: "checkbox",
          render: () => {
            return (
              <a-checkbox-group v-model={this.form.checkbox}>
                {[{ name: '测试1', value: 1 }, { name: '测试2', value: 1 }].map((checkbox) => (
                  <a-checkbox value={checkbox.value} name="type">
                    {checkbox.name}
                  </a-checkbox>
                ))}
              </a-checkbox-group>
            );
          },
        },
        {
          label: "单选",
          prop: "radio",
          render: () => {
            return (
              <a-radio-group v-model={this.form.checkbox}>
                {[{ name: '测试1', value: 1 }, { name: '测试2', value: 1 }].map((checkbox) => (
                  <a-radio value={checkbox.value} name="type">
                    {checkbox.name}
                  </a-radio>
                ))}
              </a-radio-group>
            );
          },
        },
        {
          label: ' ',
          prop: "upload",
          render: () => {
            return (
              <a-upload
                name="file"
                multiple={true}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                headers={{}}
                on-change={() => {}}
              >
                <a-button> <a-icon type="upload" /> 上传 </a-button>
              </a-upload>
            )
          },
        },
        {
          label: ' ',
          render: () => {
            return (
              <div>
                <a-button type="primary" on-click={this.onSubmit}>
                  确定
                </a-button>
                <a-button style="margin-left: 10px;" on-click={this.resetForm}>
                  重制
                </a-button>
              </div>
            )
          }
        }
      ];
    },
  },
  mounted() {},
  methods: {
    onSubmit() {
      const ref = this.ref || 'form'
      this.$refs[ref].validate(valid => {
        if (valid) {
          //
        } else {
          return false;
        }
      });
    },
    resetForm() {
      const ref = this.ref || 'form'
      this.$refs[ref].resetFields();
    }
  }
};
</script>

<style>
</style>