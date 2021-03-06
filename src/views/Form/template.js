// import { js_beautify } from "js-beautify";
import _cloneDeep from "lodash/cloneDeep";
import ejs from "ejs";
// import _get from "lodash/get";
// const pretty = require("js-object-pretty-print").pretty;

// 获取表单项配置
const getModelRender = (list = []) => {
  const tempList = list.map((item) => {
    return `{
      label: "${item.label}",
      render: () => ${ejs.render(item.template, { item: item })}
    }`;
  });
  let text = `modelRender() {
    return [
      ${tempList.join(",")}
    ]
  }`;
  return text;
};

// 获取表单布局配置信息
const getLayoutConfig = (layoutConfig) => {
  let textList = [];
  Object.keys(layoutConfig).forEach((key) => {
    const value =
      typeof layoutConfig[key] === "string"
        ? `"${layoutConfig[key]}"`
        : JSON.stringify(layoutConfig[key]);
    textList.push(`${key}: ${value}`);
  });
  return textList.join(",");
};

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
<script>
import useForm from "@pgs/portableForm";
import "@pgs/portableForm/index.less";
export default {
  name: 'render-form',
  components: {},
  mixins: [useForm],
  data: () => {
    return {
      form: {},
      rules: {
        input: [
          { required: true, message: '请输入', trigger: 'blur' }
        ]
      },
      ${getLayoutConfig(layoutConfig)}
    };
  },
  ${buildComputed(exportItems)}
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
  // return js_beautify(temp, {
  //   indent_size: 2,
  //   html: {
  //     end_with_newline: true,
  //     extra_liners: [],
  //     js: {
  //       indent_size: 2,
  //     },
  //     css: {
  //       indent_size: 2,
  //     },
  //   },
  //   css: {
  //     indent_size: 1,
  //   },
  //   js: {
  //     "preserve-newlines": true,
  //   },
  // });
  return temp;
};
