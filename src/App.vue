<script>
import BaseLayout from "@/layout/baseLayout";
export default {
  components: { BaseLayout },
  render() {
    return (
      <div id="app">
        <base-layout />
      </div>
    );
  },
};
</script>
<style lang="less">
html {
  height: 100%;
  body {
    height: 100%;
    padding: 0px;
    margin: 0px;
    #app {
      height: 100%;
    }
  }
}
</style>
