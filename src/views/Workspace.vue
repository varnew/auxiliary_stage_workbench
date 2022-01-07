<script>
import businessTable from "@/views/Dep/table";
export default {
  name: "Home",
  components: { businessTable },
  data() {
    return {
      form: {
        name: "",
      },
    };
  },
  mounted() {},
  methods: {},
  render() {
    return <businessTable form={this.form}></businessTable>;
  },
};
</script>
