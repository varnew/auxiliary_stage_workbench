import _cloneDeep from "lodash/cloneDeep";
import prettier from "prettier/standalone";
import parserBabel from "prettier/parser-babel";
import {
  getModelRender,
  buildRules,
  buildFormObj,
  buildFormOption,
} from "./utils";

/**
 * @desc: 输出模版
 */

export const FORM_COMPONENT = (layoutConfig, formItems = []) => {
  const exportItems = formItems.map((item) => {
    const temp = _cloneDeep(item);
    return temp;
  });
  const buildComputed = (exportItems) => {
    return `computed: {
      ${getModelRender(exportItems)}
    },`;
  };
  let temp = `
import useForm from '@/views/cloudLibrary/common/hooks/useForm'
export default {
  name: 'render-form',
  components: {},
  mixins: [useForm],
  data: () => {
    return {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
      options: {
        ${buildFormOption(exportItems)}
      },
      form: {
        ${buildFormObj(exportItems)}
      },
      rules: {
        ${buildRules(exportItems)}
      }
    };
  },
  ${buildComputed(exportItems)}
  mounted() {},
  methods: {
    onSubmit(callback) {
      const ref = this.ref || 'form'
      this.$refs[ref].validate(valid => {
        if (valid) {
          callback && callback()
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
`;
  const code = prettier.format(temp, {
    parser: "babel",
    plugins: [parserBabel],
  });
  return "<script>" + "\n" + code + "</script>";
};
