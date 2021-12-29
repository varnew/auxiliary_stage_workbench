<script>
export default {
  name: "Home",
  data() {
    return {
      arr: [1, 2, 3],
      obj: {
        a: {
          name: "12",
        },
      },
    };
  },
  methods: {
    handle() {},
  },
  render() {
    return (
      <section>
        {this.test}
        <a-button on-click={this.handle}>点击</a-button>
      </section>
    );
  },
};
</script>
