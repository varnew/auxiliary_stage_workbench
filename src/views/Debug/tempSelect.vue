<script>
import render from "@/views/Form/mixins/renders";
export default {
  name: "temp-select",
  mixins: [render],
  props: {
    visible: Boolean,
    dataSource: Array,
  },
  data() {
    return {
      form: {},
      index: 0,
    };
  },
  computed: {
    current() {
      return this.dataSource[this.index] || {};
    },
    activeId() {
      return this.dataSource[this.index].formItemId;
    },
  },
  methods: {
    prev() {
      this.index -= 1;
      if (this.index < 0) {
        this.index = 0;
      }
    },
    next() {
      this.index += 1;
      if (this.index === this.dataSource.length - 1) {
        this.index = this.dataSource.length - 1;
      }
    },
    setting(id) {
      this.dataSource[this.index].formItemId = id;
    },
  },
  render() {
    return (
      <a-modal
        visible={this.visible}
        title="模版选择"
        footer={null}
        width="780px"
        centered
        on-cancel={() => this.$emit("cancel")}
      >
        <div>
          <div class="header">
            <a-space>
              <h6>key：{this.current.name}</h6>
              <h6>文本名称：{this.current.description}</h6>
              <h6>是否必填：{this.current.require ? "是" : "否"}</h6>
              <h6>模版：{this.current.formItemId}</h6>
            </a-space>
            <a-space>
              <a-button type="link" on-click={this.prev}>
                上一个
              </a-button>
              <span>{this.index}</span>
              <a-button type="link" on-click={this.next}>
                下一个
              </a-button>
            </a-space>
          </div>
          <a-form-model>
            {this.sourceList.map((group) => {
              return (
                <div class="render-wrap">
                  {group.list.map((item) => {
                    return (
                      <div
                        class={{
                          "render-item": true,
                          active: this.activeId === item.id,
                        }}
                        on-click={() => this.setting(item.id)}
                      >
                        <a-form-model-item label={item.dragName}>
                          {item.render.apply(this)}
                        </a-form-model-item>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </a-form-model>
        </div>
      </a-modal>
    );
  },
};
</script>

<style lang="less" scoped>
.header {
  display: flex;
  justify-content: space-between;
  margin-top: -10px;
}
.render-wrap {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .render-item {
    width: 366px;
    padding: 0px 5px;
    &.active {
      border: 2px dashed #1a90ff;
    }
    > div {
      pointer-events: none;
    }
  }
}
::v-deep {
  .ant-form-item {
    margin: 0px !important;
    padding: 0px !important;
  }
}
</style>
