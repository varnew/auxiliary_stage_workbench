<script>
import CodeEditor from "@/components/CodeEditor";
import _get from "lodash/get";
export default {
  components: { CodeEditor },
  data() {
    return {
      code: "",
      visible: false,
      tree: [],
    };
  },
  mounted() {
    this.getFiles();
  },
  methods: {
    async getFiles() {
      const res = await this.$api.getFiles();
      this.tree = res.data.data;
    },
    async handleClick(key, e) {
      const path = _get(e, "selectedNodes[0].data.props.dataRef.path");
      const index = path.indexOf("files") + 6;
      const fileName = path.substring(index);
      const res = await this.$api.loadFile({ name: fileName });
      this.code = res.data.data;
    },
  },
  render() {
    return (
      <section class="about">
        <code-editor vModel={this.code} />
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
          mask={false}
          visible={this.visible}
          on-close={() => {
            this.visible = false;
          }}
        >
          <a-tree
            defaultExpandAll
            tree-data={this.tree}
            on-select={this.handleClick}
          />
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
