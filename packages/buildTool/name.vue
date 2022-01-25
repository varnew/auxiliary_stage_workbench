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
      layout: "inline",
      colon: false,
      mode: "inline-horizontal",
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
