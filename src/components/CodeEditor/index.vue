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
    value: {
      type: String,
      default: () => "",
    },
  },
  data() {
    return {
      currentCode: "",
      cmOption: {
        tabSize: 4,
        mode: "text/javascript",
        theme: "base16-dark",
        lineNumbers: true,
        line: true,
      },
    };
  },
  watch: {
    currentCode: {
      handler(newValue) {
        this.$emit(newValue, "input");
      },
    },
    value: {
      handler(newValue) {
        this.currentCode = newValue;
        this.key = Math.random();
      },
      immediate: true,
    },
  },
  methods: {
    onCodeChange(editor) {
      this.currentCode = editor.getValue();
    },
  },
  render() {
    return (
      <codemirror
        vModel={this.currentCode}
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
