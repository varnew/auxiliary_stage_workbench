<script>
import CodeEditor from "@/components/CodeEditor";
export default {
  components: { CodeEditor },
  data() {
    return {
      code: "",
      visible: false,
    };
  },
  methods: {
    async handleClick(fileName) {
      const res = await this.$api.loadFile({ name: fileName });
      this.code = res.data.data;
    },
  },
  render() {
    return (
      <section class="about">
        <code-Editor code={this.code} />
        <div class="hover-icon">
          <a-icon
            type="folder-open"
            theme="twoTone"
            on-click={() => {
              this.visible = true;
            }}
          />
        </div>
        <a-drawer
          title="记忆百宝盒"
          placement="right"
          visible={this.visible}
          on-close={() => {
            this.visible = false;
          }}
        >
          <div class="menu">
            <div
              class="menu-item"
              on-click={() => {
                this.handleClick("vue-router.js");
              }}
            >
              vue-router
            </div>
          </div>
        </a-drawer>
      </section>
    );
  },
};
</script>
<style lang="less" scoped>
.about {
  height: 100%;
  position: relative;
  .hover-icon {
    position: absolute;
    top: 0px;
    right: 0px;
    background: #fff;
    padding: 3px 6px;
    border-radius: 100%;
    cursor: pointer;
    z-index: 999;
  }
}
.menu {
  margin: -20px -10px;
  .menu-item {
    text-align: center;
    background: #e8e8e8;
    cursor: pointer;
    margin: 10px 0px;
  }
}
</style>
