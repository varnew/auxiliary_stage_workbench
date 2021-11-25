import { html_beautify } from "js-beautify";
export const FORM_COMPONENT = (formItems = []) => {
  const buildComputed = (formItems) => {
    return `computed: {
      modelRender() {
        return ${JSON.stringify(formItems)}
      }
    },`;
  };
  let temp = `
<script>
import UseForm from "./useForm";
export default {
  name: 'render-form',
  components: { draggable },
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
      // col: 3,
      layout: 'horizontal' // 'horizontal'|'vertical'|'inline'
    };
  },
  ${buildComputed(formItems)}
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

<style lang="less" scoped>
</style>
`;
  return html_beautify(temp, { indent_size: 2 });
};
