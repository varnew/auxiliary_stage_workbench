export default {
  props: {
    pagination: [Object, Boolean],
    selectedType: String, // checkbox | radio
  },
  data() {
    return {
      renderPagination: {},
      selectedRowKeys: [],
      selectedRows: [],
    };
  },
  created() {
    this.initColumnsKey();
    this.initPagination();
  },
  methods: {
    // -------------------init
    // 自动初始化column的key
    initColumnsKey() {
      this.columns.forEach((item) => {
        if (item.key === undefined) {
          item.key = item.dataIndex;
        }
      });
    },
    // 初始化pagination
    initPagination() {
      if (typeof this.pagination === "boolean") {
        return (this.renderPagination = this.pagination);
      }
      const PAGINATION = {
        current: 1,
        hideOnSinglePage: false,
        showSizeChanger: true,
        pageSize: 30,
        pageSizeOptions: ["30", "50", "100", "200"],
        showQuickJumper: true,
        showTotal: (total, range) => {
          return `【${range[0]}-${range[1]}】,共${total}条数据`;
        },
        size: "small",
        total: 0,
      };
      const EVENTS = {
        onChange: this.onPgChange,
        onShowSizeChange: this.onPgSizeChange,
      };
      let pagination = {
        ...PAGINATION,
        ...EVENTS,
      };
      if (this.pagination && this.pagination._type === "merge") {
        pagination = {
          ...pagination,
          ...this.pagination,
        };
      }
      this.renderPagination = pagination;
    },
    // --------------------rowSelection
    onChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys;
      this.selectedRows = selectedRows;
      this.$emit("change", selectedRowKeys, selectedRows);
    },
    onSelect(record, selected, selectedRows, nativeEvent) {
      this.$emit("select", record, selected, selectedRows, nativeEvent);
    },
    onSelectAll(selected, selectedRows, changeRows) {
      this.$emit("selectAll", selected, selectedRows, changeRows);
    },
    onSelectInvert(selectedRows) {
      this.$emit("selectInvert", selectedRows);
    },
    // --------------------pagination
    onPgChange(page, pageSize) {
      this.renderPagination.current = page;
      this.renderPagination.pageSize = pageSize;
      this.reflesh();
    },
    onPgSizeChange(current, size) {
      this.renderPagination.current = 1;
      this.renderPagination.pageSize = size;
      this.reflesh();
    },
    // --------------------reflesh
    reflesh(pagination) {
      const { current, pageSize } = pagination
        ? pagination
        : this.renderPagination;
      this.loadData && this.loadData({ current, pageSize });
    },
  },
};
