<script>
export default {
  name: "attr-setting",
  props: {
    config: {
      type: Object,
      default: () => null,
    },
  },
  data() {
    return {
      visible: true,
      options: {
        keys: [
          { label: "name", value: "name" },
          { label: "age", value: "age" },
        ],
        btnType: [
          { label: "primary", value: "primary" },
          { label: "dashed", value: "dashed" },
          { label: "danger", value: "danger" },
          { label: "link", value: "link" },
          { label: "默认", value: undefined },
        ],
        btnSize: [
          { label: "small", value: "small" },
          { label: "large", value: "large" },
          { label: "默认", value: undefined },
        ],
        btnShape: [
          { label: "circle", value: "circle" },
          { label: "round", value: "round" },
          { label: "默认", value: undefined },
        ],
      },
    };
  },
  computed: {
    attrList() {
      const attrs = this.config ? this.config.attrs : [];
      return Object.keys(attrs).map((key) => attrs[key]);
    },
    iconType() {
      return this.visible ? "double-right" : "double-left";
    },
    warpStyle() {
      return this.visible ? "" : "width: 0px;";
    },
  },
  watch: {
    config: {
      handler(val) {
        console.log("val", val);
      },
    },
  },
  render() {
    const renderItem = (item) => {
      if (item.renderType === "input") {
        return <a-input vModel={item.value} />;
      }
      if (item.renderType === "select") {
        return (
          <a-select vModel={item.value}>
            {this.options[item.optionKey || "keys"].map((option) => (
              <a-select-option value={option.value}>
                {option.label}
              </a-select-option>
            ))}
          </a-select>
        );
      }
    };
    return (
      <article class="attr-wrap" style={this.warpStyle}>
        <h4 class="header">属性配置</h4>
        <div class="content">
          <a-form-model model={this.model}>
            {!!this.attrList.length &&
              this.attrList.map((item) => {
                return (
                  <a-form-model-item label={item.label}>
                    {renderItem(item)}
                  </a-form-model-item>
                );
              })}
          </a-form-model>
        </div>
        <a-icon
          type={this.iconType}
          class="btn"
          on-click={() => (this.visible = !this.visible)}
        />
      </article>
    );
  },
};
</script>

<style lang="less" scoped>
.attr-wrap {
  width: 260px;
  box-shadow: 0 4px 10px 0 rgba(12, 31, 80, 8%);
  position: relative;
  .header {
    height: 52px;
    line-height: 50px;
    padding: 0px 10px;
    box-shadow: 0 4px 10px 0 rgba(12, 31, 80, 8%);
  }
  .content {
    padding: 10px;
  }
  .btn {
    position: absolute;
    top: 50%;
    margin-top: -7px;
    left: -5px;
    cursor: pointer;
    color: #1890ff;
    background: #fff;
  }
}
</style>
