<script>
import { routes } from "@/router";
export default {
  name: "nav-bar",
  props: {
    collapsed: Boolean,
  },
  data() {
    return {
      selectedKeys: [],
    };
  },
  watch: {
    "$route.path": {
      handler(path) {
        this.selectedKeys = [path];
      },
    },
  },
  methods: {
    handleClick({ key }) {
      this.$router.push({ path: key });
    },
  },
  render() {
    return (
      <section class="nav-wrap">
        <div class={{ logo: true, max: !this.collapsed }} />
        <a-menu
          class="nav"
          theme="light"
          mode="inline"
          vModel={this.selectedKeys}
          on-click={this.handleClick}
        >
          {routes.map((route) => (
            <a-menu-item class="nav-item" key={route.path}>
              <a-icon type={route.meta.icon} />
              <span class="nav-text">{route.meta.name}</span>
            </a-menu-item>
          ))}
        </a-menu>
      </section>
    );
  },
};
</script>
<style lang="less" scoped>
.nav-wrap {
  height: 100%;
  box-shadow: 0 4px 10px 0 rgba(12, 31, 80, 8%);
  .logo {
    height: 50px;
    background: url(http://ilxdh.com/images/new_logo.png) no-repeat;
    background-size: 96%;
    background-position: center;
    &.max {
      background-size: 80%;
      background-position: center 2px;
    }
  }
  .nav {
    border: none;
    .nav-item {
      margin: 0;
    }
  }
}
</style>
