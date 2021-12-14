<script>
export default {
  data() {
    return {};
  },
  methods: {
    start() {},
  },
  render() {
    return (
      <section class="about">
        <a-button on-click={this.start}>开始</a-button>
        <a-button on-click={this.start}>this.$t('我们开始了')</a-button>
        <a-button on-click={this.start}>this.$t('我们开始了')0</a-button>
        <a-button on-click={this.start}>12this.$t('我们开始了')0</a-button>
      </section>
    );
  },
};
</script>
