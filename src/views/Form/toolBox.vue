<script>
import eventBus from "./eventBus";
import { MODE_MAP } from "./constant";
export default {
  name: "tool-box",
  props: {
    setting: Object,
  },
  data() {
    return {
      modeList: [
        { name: "行内水平布局", value: "inline-horizontal" },
        { name: "行内垂直布局", value: "inline-vertical" },
        { name: "块级水平布局", value: "block-horizontal" },
        { name: "块级垂直布局", value: "block-vertical" },
        { name: "分列水平布局", value: "col-horizontal" },
        { name: "分列垂直布局", value: "col-vertical" },
      ],
      layouts: [
        { label: "水平", value: "horizontal" },
        { label: "垂直", value: "vertical" },
        { label: "行内", value: "inline" },
      ],
    };
  },
  computed: {
    isCol() {
      return this.setting.config.col !== undefined;
    },
    isLabelCol() {
      return this.setting.config.labelCol !== undefined;
    },
    isWrapperCol() {
      return this.setting.config.wrapperCol !== undefined;
    },
  },
  mounted() {},
  methods: {
    // 预览
    preview() {
      eventBus.$emit(
        "updata:renderType",
        this.setting.renderType === "PREVIEW" ? "EDIT" : "PREVIEW"
      );
    },
    // 输出表单
    export() {
      eventBus.$emit("export", "test.vue");
    },
    handleModeChange(key) {
      const payload = MODE_MAP[key];
      eventBus.$emit("updata:config", payload.config);
    },
  },
  render() {
    return (
      <div class="tool-box">
        <a-space>
          <a-select
            vModel={this.setting.mode}
            on-change={this.handleModeChange}
          >
            {this.modeList.map((option) => (
              <a-select-option value={option.value}>
                {option.name}
              </a-select-option>
            ))}
          </a-select>
          {this.isCol && (
            <label>
              列数：
              <a-input
                style="width:50px;"
                type="number"
                min="1"
                vModel={this.setting.config.col}
              />
            </label>
          )}
          {this.isLabelCol && (
            <label>
              标签布局：
              <a-input
                style="width:50px;"
                type="number"
                min="1"
                vModel={this.setting.config.labelCol.span}
              />
            </label>
          )}
          {this.isWrapperCol && (
            <label>
              控件布局：
              <a-input
                style="width:60px;"
                type="number"
                min="1"
                vModel={this.setting.config.wrapperCol.span}
              />
            </label>
          )}
        </a-space>
        <a-space>
          <a-button type="primary" size="small" on-click={this.preview}>
            {this.setting.renderType === "PREVIEW" ? "预览" : "编辑"}
          </a-button>
          <a-button type="primary" size="small" on-click={this.export}>
            代码预览
          </a-button>
        </a-space>
      </div>
    );
  },
};
</script>

<style lang="less" scoped>
.tool-box {
  width: 100%;
  padding: 10px;
  box-shadow: 0 4px 10px 0 rgba(12, 31, 80, 8%);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
