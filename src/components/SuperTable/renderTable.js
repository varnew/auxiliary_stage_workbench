import useTable from "./useTable";
export default {
  name: "super-table",
  mixins: [useTable],
  render() {
    const rowSelection = this.selectedType
      ? {
          selectedRowKeys: this.selectedRowKeys,
          type: this.selectedType,
          onChange: this.onChange,
          onSelect: this.onSelect,
          onSelectAll: this.onSelectAll,
          onSelectInvert: this.onSelectInvert,
        }
      : null;
    return (
      <a-table
        columns={this.columns}
        dataSource={this.dataSource}
        pagination={this.renderPagination}
        rowSelection={rowSelection}
        {...{ props: { ...this.$attrs } }}
      >
        {Object.keys(this.$slots).map((name) => (
          <template slot={name}>{this.$slots[name]}</template>
        ))}
      </a-table>
    );
  },
};
