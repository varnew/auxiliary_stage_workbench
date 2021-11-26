<script>
import NavBar from "@/layout/nav";
import HeaderBar from "@/layout/header";
export default {
  name: "base-layout",
  components: { NavBar, HeaderBar },
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
            <header-bar
              collapsed={collapsed}
              on-collapsed={(e) => (this.collapsed = e)}
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
    padding: 0px;
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
