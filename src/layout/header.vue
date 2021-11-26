<script>
export default {
  name: "header-bar",
  props: {
    collapsed: Boolean,
  },
  render() {
    return (
      <section class="header-wrap">
        <a-icon
          class="trigger"
          type={this.collapsed ? "menu-unfold" : "menu-fold"}
          on-click={() => this.$emit("collapsed", !this.collapsed)}
        />
      </section>
    );
  },
};
</script>
<style lang="less" scoped>
.header-wrap {
  height: 100%;
  display: flex;
  align-items: center;
  background: #fff;
  .trigger {
    color: #379cff;
    margin-left: 10px;
  }
}
</style>
