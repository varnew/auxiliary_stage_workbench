<script>
import { codemirror } from "vue-codemirror";
// base style
import "codemirror/lib/codemirror.css";
// theme css
import "codemirror/theme/base16-dark.css";
// language
import "codemirror/mode/vue/vue.js";
export default {
  name: "code-editor",
  components: { codemirror },
  props: {
    code: String,
  },
  data() {
    return {
      cmOption: {
        tabSize: 4,
        mode: "text/javascript",
        theme: "base16-dark",
        lineNumbers: true,
        line: true,
      },
    };
  },
  render() {
    return (
      <codemirror
        vModel={this.code}
        options={this.cmOption}
        style="height: 100%"
      />
    );
  },
};
</script>
<style lang="less" scoped>
::v-deep {
  .CodeMirror {
    height: 100% !important;
    .CodeMirror-scroll {
      height: 100%;
      overflow-y: hidden;
    }
    .CodeMirror-vscrollbar {
      display: none !important;
    }
  }
}
</style>
