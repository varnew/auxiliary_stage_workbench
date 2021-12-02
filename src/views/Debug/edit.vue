<script>
import { js_beautify } from "js-beautify";
import { MODEL_FORM_ITMES } from "./constant";
export default {
  name: "edit",
  props: {
    data: Object,
  },
  data() {
    return {
      renderTypeOptions: [],
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
          dataIndex: "description",
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
          title: "操作",
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
      this.$copyText(this[key]).then(() => {
        this.$message.success("复制成功");
      });
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
          <a-button
            size="small"
            type="primary"
            on-click={() => this.copy("formObj")}
          >
            复制表单对象
          </a-button>
          <a-button
            size="small"
            type="primary"
            on-click={() => this.copy("formRender")}
          >
            复制表单
          </a-button>
          <a-button size="small" on-click={() => this.$emit("cancel")}>
            返回
          </a-button>
        </a-space>
        <a-divider dashed style="margin: 10px 0px;" />
        <a-table
          columns={this.columns}
          data-source={dataSource}
          scroll={{ y: "calc(100vh - 180px)" }}
          pagination={false}
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
