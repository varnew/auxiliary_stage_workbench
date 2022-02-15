/**
 * @desc: 返回数据列表
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
          title: "文本",
          dataIndex: "text",
          customRender: (text, record) => <a-input vModel={record.text} />,
        },
        {
          title: "类型",
          dataIndex: "type",
        },
      ];
    },
  },
};
