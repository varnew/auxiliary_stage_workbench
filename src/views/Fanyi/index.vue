<script>
import { js_beautify } from "js-beautify";
import Clipboard from "clipboard";
import _get from "lodash/get";
import { FANYI } from "./constant";
export default {
  name: "fanyi",
  data() {
    return {
      token: "A6fpIEh2S1PVaGk9", // https://admin.alapi.cn/dashboard/workplace中获取
      from: "auto",
      to: "cht",
      content: "",
      rContent: "",
      loading: {
        seatch: false,
      },
    };
  },
  methods: {
    // 生成i8n对象
    buildI18n(list, rContent) {
      const zh_cn_list = rContent.map((item) => {
        return `"${item.src}": "${item.src}"`;
      });
      const zh_hk_list = rContent.map((item) => {
        return `"${item.src}": "${item.dst}"`;
      });
      this.rContent = js_beautify(
        `{
        messages: {
          "zh-CN": {
            ${zh_cn_list.join(",")}
          },
          "zh-HK": {
            ${zh_hk_list.join(",")}
          }
        }
      }`,
        { indent_size: 2 }
      );
    },
    // 翻译
    async enter() {
      this.rContent = "";
      const content = this.content;
      const sourceList = content.split(/[\r\n]+/);
      let dst;
      let res;
      res = await this.$api.baiduFanyi({
        from: this.from,
        to: this.to,
        q: this.content,
      });
      this.loading.seatch = false;
      if (_get(res, "data.code") !== 200) {
        return;
      }
      dst = _get(res, "data.data.trans_result", []);
      if (sourceList.length !== dst.length) {
        this.$notification.warning({
          duration: null,
          message: "智能检测报警",
          description:
            "当前输入文本数组与返回数组长度不一致，通常是由于翻译的类型相同导致的，这将导致i18n对象生成错误，请检查！",
        });
      }
      this.buildI18n(sourceList, dst);
    },
    // 复制
    copy() {
      let clipboard = new Clipboard("#copyBtn");
      clipboard.on("success", () => {
        this.$message.success(`已复制`);
        clipboard.destroy();
      });
    },
  },
  render() {
    const renderSelect = (modelKey, options = []) => (
      <a-select vModel={this[modelKey]} style="width: 150px;">
        {options.map((option) => (
          <a-select-option key={option.value} value={option.value}>
            {option.label}
          </a-select-option>
        ))}
      </a-select>
    );
    return (
      <div class="fanyi-page">
        <div class="tool-box">
          <span>
            <strong>i18n生成工具</strong>
            (翻译接口存在一定的失败率)
            <a-button
              type="link"
              href="https://kazupon.github.io/vue-i18n/zh/guide/component.html#组件的共享语言环境消息"
              target="_brank"
            >
              帮助
            </a-button>
          </span>
          <a-space>
            <a-input vModel={this.token} style="width: 166px;" allowClear />
            {renderSelect("from", FANYI)}
            <a-icon type="swap" />
            {renderSelect("to", FANYI)}
            <a-button
              type="primary"
              id="copyBtn"
              data-clipboard-text={this.rContent}
              on-click={this.copy}
            >
              复制
            </a-button>
            <a-button
              type="primary"
              loading={this.loading.seatch}
              on-click={this.enter}
            >
              翻译
            </a-button>
          </a-space>
        </div>
        <div class="container">
          <a-input class="text-area" type="textarea" vModel={this.content} />
          <a-input class="result-box" type="textarea" vModel={this.rContent} />
        </div>
      </div>
    );
  },
};
</script>

<style lang="less" scoped>
.fanyi-page {
  height: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  background: #fff;
  .tool-box {
    margin-bottom: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .container {
    flex: 1;
    display: flex;
    .text-area {
      flex: 1;
    }
    .result-box {
      flex: 1;
      margin: 0 0 0 10px;
    }
  }
}
</style>
