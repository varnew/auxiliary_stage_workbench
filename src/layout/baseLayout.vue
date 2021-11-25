<script>
import NavBar from "@/layout/nav";
export default {
  name: "base-layout",
  components: { NavBar },
  data() {
    return {
      collapsed: true,
    };
  },
  render() {
    const { collapsed } = this;
    return (
      <a-layout class="base-layout">
        <a-layout-sider
          theme="light"
          trigger={null}
          collapsible
          vModel={this.collapsed}
        >
          <nav-bar collapsed={collapsed} />
        </a-layout-sider>
        <a-layout>
          <a-layout-header class="header">
            <a-icon
              class="trigger"
              type={collapsed ? "menu-unfold" : "menu-fold"}
              on-click={() => (this.collapsed = !collapsed)}
            />
          </a-layout-header>
          <a-layout-content class="content">
            <router-view />
          </a-layout-content>
          {!this && (
            <a-layout-footer class="footer">
              备案号：
              <a href="http://beian.miit.gov.cn/" target="_blank" class="icp">
                粤ICP备17042598号-2
              </a>
            </a-layout-footer>
          )}
        </a-layout>
      </a-layout>
    );
  },
};
</script>

<style lang="less" scoped>
.base-layout {
  height: 100%;
  .header {
    height: 50px;
    line-height: 50px;
    padding: 0px;
    background: #fff;
    .trigger {
      color: #379cff;
      margin-left: 10px;
    }
  }
  .content {
    padding: 6px;
    > div {
      border-radius: 4px;
    }
  }
  .footer {
    padding: 0 5px;
    text-align: center;
    .icp {
      color: rgba(0, 0, 0, 0.65);
    }
  }
}
</style>
