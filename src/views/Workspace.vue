<script>
const log = (type) => {
  return (target, name, descriptor) => {
    const method = descriptor.value;
    descriptor.value = (...args) => {
      console.info(`(${type}) 正在执行: ${name}(${args}) = ?`);
      let ret;
      try {
        ret = method.call(target, ...args); // 默认参数需要写在此处，否则会失效
        console.info(`(${type}) 成功 : ${name}(${args}) => ${ret}`);
      } catch (error) {
        console.error(`(${type}) 失败: ${name}(${args}) => ${error}`);
      }
      return ret;
    };
  };
};
export default {
  name: "workspace",
  data() {
    return {};
  },
  mounted() {},
  methods: {
    @log()
    handleSubmit() {},
  },
  render() {
    return <section on-click={this.handleSubmit}>工作台</section>;
  },
};
</script>
