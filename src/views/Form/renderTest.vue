<script>
import useForm from "@pgs/portableForm";
import "@pgs/portableForm/index.less";
export default {
  name: "render-form",
  components: {},
  mixins: [useForm],
  data: () => {
    return {
      form: {},
      rules: {
        input: [{ required: true, message: "请输入", trigger: "blur" }],
      },
      layout: "horizontal",
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
      colon: false,
      col: 3,
      mode: "col-horizontal",
    };
  },
  computed: {
    modelRender() {
      return [
        {
          label: "文本框",
          render: () => <a-input vModel={this.form.test} />,
        },
        {
          label: "数字框",
          render: () => <a-input-number vModel={this.form.test} />,
        },
        {
          label: "选择框",
          render: () => (
            <a-select vModel={this.form.test}>
              {[].map((option) => (
                <a-select-option value={option.value}>
                  {option.name}
                </a-select-option>
              ))}
            </a-select>
          ),
        },
        {
          label: "日期",
          render: () => <a-date-picker vModel={this.form.test} type="date" />,
        },
        {
          label: "开关",
          render: () => <a-switch vModel={this.form.test} />,
        },
        {
          label: "多选框",
          render: () => (
            <a-checkbox-group
              vModel={this.form.test}
              name="checkboxgroup"
              options={[{ label: "123", value: "123" }]}
            />
          ),
        },
        {
          label: "单选框",
          render: () => (
            <a-radio-group
              vModel={this.form.test}
              options={[{ label: "123", value: "123" }]}
            />
          ),
        },
        {
          label: "上传",
          render: () => (
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
          ),
        },
      ];
    },
  },
  mounted() {},
  methods: {
    onSubmit() {
      const ref = this.ref || "form";
      this.$refs[ref].validate((valid) => {
        if (valid) {
          //
        } else {
          return false;
        }
      });
    },
    resetForm() {
      const ref = this.ref || "form";
      this.$refs[ref].resetFields();
    },
  },
};
</script>

<style lang="less" scoped></style>
