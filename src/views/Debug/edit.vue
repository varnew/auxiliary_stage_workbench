<script>
import { js_beautify } from "js-beautify";
import { MODEL_FORM_ITMES } from "./constant";
import { codemirror } from "vue-codemirror";
import TempSelect from "./tempSelect";
// base style
import "codemirror/lib/codemirror.css";
// theme css
import "codemirror/theme/base16-dark.css";
// language
import "codemirror/mode/vue/vue.js";
export default {
  name: "edit",
  props: {
    data: Object,
  },
  components: { codemirror, TempSelect },
  data() {
    return {
      renderTypeOptions: [],
      code: "",
      cmOption: {
        tabSize: 4,
        mode: "text/javascript",
        theme: "base16-dark",
        lineNumbers: true,
        line: true,
      },
      showCode: false,
      visible: false,
      copyType: "formObj",
    };
  },
  computed: {
    columns() {
      return [
        {
          title: "名称",
          dataIndex: "name",
        },
        {
          title: "文本",
          customRender: (text, record) => (
            <a-input size="small" vModel={record.description} />
          ),
        },
        {
          title: "是否必填",
          dataIndex: "require",
          width: 80,
          customRender: (text, record) => (
            <a-switch size="small" vModel={record.require} />
          ),
        },
        {
          title: "类型",
          dataIndex: "type",
          width: 100,
        },
        {
          title: "表单模版",
          dataIndex: "action",
          fixed: "right",
          width: 120,
          customRender: (text, record) => (
            <a-select style="width: 100px" vModel={record.formItemId}>
              {this.renderTypeOptions.map((item) => (
                <a-select-option value={item.value}>
                  {item.label}
                </a-select-option>
              ))}
            </a-select>
          ),
        },
      ];
    },
    formObj() {
      const start = "{";
      const end = "}";
      const info = this.data.params;
      const list = Object.keys(info).map((key) => {
        const keyName = info[key].name;
        const description = info[key].description || "";
        const require = info[key].require;
        let text = `${keyName}: '', // ${description}`;
        if (require) {
          text += ` | 必填` + "\n";
        } else {
          text += "\n";
        }
        return text;
      });
      const text = `${start}${list.join("")}${end}`;
      const form = js_beautify(text, { indent_size: 2 });
      return form;
    },
    formRender() {
      const start = "[" + "\n";
      const end = "\n" + "]";
      const info = this.data.params;
      const list = Object.keys(info).map((key) => {
        const item = info[key];
        const formItemId = item.formItemId;
        let formItemFn = MODEL_FORM_ITMES[formItemId];
        let text = formItemFn(item);
        return text;
      });
      const text = `${start}${list.join("," + "\n")}${end}`;
      return text;
    },
  },
  mounted() {
    this.renderTypeOptions = Object.keys(MODEL_FORM_ITMES).map((key) => {
      return { label: key, value: key };
    });
  },
  methods: {
    copy(key) {
      this.key = key;
      this.$copyText(this[key]).then(() => {
        this.$message.success("复制成功");
      });
    },
    codePreview() {
      this.code = this[this.copyType];
      this.showCode = !this.showCode;
    },
    handleCopyType(type) {
      this.code = this[type];
    },
    async exec() {
      const res = await this.$api.exec({ name: "exec", content: "ls" });
      console.log("----------");
      console.log("res", res);
      console.log("----------");
    },
  },
  render() {
    const {
      name = "",
      type = "",
      path = "",
      tags = "",
      params: dataSource = [],
    } = this.data || {};
    return (
      <article class="edit-wrap">
        <h4>
          {name} <a-divider type="vertical" /> [{tags}]
        </h4>
        <h6>
          类型：{type} <a-divider type="vertical" />
          路径：{path}
        </h6>
        <a-space class="btn-box">
          <a-button size="small" type="primary" on-click={this.exec}>
            导出
          </a-button>
          <a-divider type="vertical" />
          <a-button size="small" type="primary" on-click={this.codePreview}>
            {this.showCode ? "代码编辑" : "代码预览"}
          </a-button>
          <a-radio-group
            vModel={this.copyType}
            button-style="solid"
            size="small"
            on-change={this.handleCopyType}
          >
            <a-radio-button value="formObj">form对象</a-radio-button>
            <a-radio-button value="formRender">表单</a-radio-button>
          </a-radio-group>
          <a-divider type="vertical" />
          <a-button
            size="small"
            type="primary"
            on-click={() => (this.visible = true)}
          >
            表单配对
          </a-button>
          <a-divider type="vertical" />
          <a-button size="small" on-click={() => this.$emit("cancel")}>
            返回
          </a-button>
        </a-space>
        <a-divider dashed style="margin: 10px 0px;" />
        {this.showCode && (
          <div style="position: relative;">
            <codemirror
              vModel={this.code}
              options={this.cmOption}
              style="height: calc(100vh - 148px)"
            />
            <span class="copy-btn" on-click={() => this.copy("code")}>
              复制
            </span>
          </div>
        )}
        {!this.showCode && (
          <a-table
            columns={this.columns}
            data-source={dataSource}
            scroll={{ y: "calc(100vh - 180px)" }}
            pagination={false}
          />
        )}
        <TempSelect
          visible={this.visible}
          dataSource={dataSource}
          on-cancel={() => (this.visible = false)}
        />
      </article>
    );
  },
};
</script>
<style lang="less" scoped>
.edit-wrap {
  min-height: 100%;
  padding: 10px;
  position: absolute;
  top: 0px;
  left: 0px;
  bottom: 0px;
  right: 0px;
  background: #fff;
  z-index: 1;
  .btn-box {
    position: absolute;
    top: 10px;
    right: 10px;
  }
  .copy-btn {
    padding: 2px 4px;
    background: rgba(255, 255, 255, 0.12);
    color: #f2f2f2;
    position: absolute;
    top: 4px;
    right: 4px;
    cursor: pointer;
    z-index: 999;
  }
}
::v-deep {
  .CodeMirror {
    height: 100% !important;
    .CodeMirror-scroll {
      height: 100%;
      overflow-y: hidden;
    }
    .CodeMirror-vscrollbar {
      display: none !important;
    }
  }
}
::v-deep {
  .ant-table th,
  .ant-table-tbody > tr > td {
    padding: 4px 8px !important;
  }
  .ant-table-pagination.ant-pagination {
    margin: 10px 0px;
  }
}
</style>
