const TABLE_TEMPLATE = (
  columns
) => `import renderTable from "@/components/SuperTable/renderTable";
export default {
  name: "business-table",
  mixins: [renderTable],
  props: {
    form: Object,
  },
  data() {
    return {
      dataSource: [],
    };
  },
  computed: {
    columns() {
      return [
        ${columns}
      ]
    },
  },
  methods: {
    loadData() {
      // dosomeing
    },
  },
};
`;
export function buildTable(columns) {
  const temp = columns
    .map((item) => {
      return `{
          title: "${item.text}",
          dataIndex: "${item.name}",
        },
        `;
    })
    .join("");

  return TABLE_TEMPLATE(temp);
}
