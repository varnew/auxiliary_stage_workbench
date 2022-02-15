/**
 * @desc: 接口列表
 */
import renderTable from "@/components/SuperTable/renderTable";
export default {
  name: "business-table",
  mixins: [renderTable],
  props: {
    dataSource: Array,
  },
  data() {
    return {};
  },
  computed: {
    columns() {
      return [
        {
          title: "名称",
          dataIndex: "name",
        },
        {
          title: "路径",
          dataIndex: "path",
        },
        {
          title: "分组",
          dataIndex: "tags",
          width: 150,
        },
        {
          title: "类型",
          dataIndex: "type",
          width: 80,
        },
        {
          title: "操作",
          dataIndex: "action",
          fixed: "right",
          width: 90,
          customRender: (text, record) => (
            <a-button
              type="primary"
              size="small"
              on-click={() => this.$emit("edit", record)}
            >
              编辑
            </a-button>
          ),
        },
      ];
    },
  },
};
