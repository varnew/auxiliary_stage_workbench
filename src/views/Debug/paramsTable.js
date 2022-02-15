/**
 * @desc: 参数列表
 */
import renderTable from "@/components/SuperTable/renderTable";
import { MODEL_FORM_ITMES } from "./constant";
export default {
  name: "business-table",
  mixins: [renderTable],
  props: {
    dataSource: Array,
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
  },
  mounted() {
    this.renderTypeOptions = Object.keys(MODEL_FORM_ITMES).map((key) => {
      return { label: key, value: key };
    });
  },
};
