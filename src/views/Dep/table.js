import renderTable from "@/components/SuperTable/renderTable";
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
        {
          dataIndex: "name",
          title: "名称",
        },
        {
          dataIndex: "time",
          title: "时间",
        },
      ];
    },
  },
  mounted() {
    this.reflesh();
  },
  methods: {
    loadData() {
      let list = [];
      for (let i = 0; i < 100; i++) {
        list.push({
          name: Math.random(),
          time: Math.random(),
        });
      }
      this.dataSource = list;
    },
  },
};
