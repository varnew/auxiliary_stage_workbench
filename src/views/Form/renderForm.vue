<script>
import UseForm from "./useForm";
import draggable from "vuedraggable";
export default {
  name: "render-form",
  components: { draggable },
  mixins: [UseForm],
  props: {
    setting: {
      type: Object,
      default: () => null,
    },
  },
  data: () => {
    return {
      modelRender: [],
      form: {},
      rules: {
        input: [{ required: true, message: "请输入", trigger: "blur" }],
      },
    };
  },
  mounted() {},
  methods: {
    onSubmit() {
      const ref = this.ref || "form";
      this.$refs[ref].validate((valid) => {
        if (valid) {
          //
        } else {
          return false;
        }
      });
    },
    resetForm() {
      const ref = this.ref || "form";
      this.$refs[ref].resetFields();
    },
  },
};
</script>

<style></style>
