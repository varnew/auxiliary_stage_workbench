<script>
import RenderForm from "./renderForm";
import MenuList from "./menuList.vue";
import ToolBox from "./toolBox.vue";
import eventBus from "./eventBus";
import AttrSetting from "./arrt.vue";
import Scrollbar from "@/components/Scrollbar";
import { downloadComponents } from "./downTemp";
export default {
  name: "drag-form",
  components: {
    RenderForm,
    MenuList,
    ToolBox,
    Scrollbar,
    AttrSetting,
  },
  data() {
    return {
      setting: {
        mode: "inline-horizontal",
        renderType: "PREVIEW", // PREVIEW | EDIT
        config: {},
      },
      currentFormItem: null,
    };
  },
  mounted() {
    eventBus.$on("updata:config", (payload) => {
      this.setting.config = payload;
    });
    eventBus.$on("updata:renderType", (payload) => {
      this.setting.renderType = payload;
    });
    eventBus.$on("updata:currentFormItem", (payload) => {
      this.currentFormItem = payload;
    });
    eventBus.$on("clone", (payload) => {
      const ref = this.$refs.RenderForm;
      ref && ref.modelRender.push(payload);
    });
    eventBus.$on("export", (payload) => {
      const ref = this.$refs.RenderForm;
      if (ref) {
        const form = ref.modelRender;
        downloadComponents(this.setting.config, form, payload);
      }
    });
  },
  render() {
    return (
      <section class="drag-page">
        <Scrollbar class="left-wrap">
          <MenuList setting={this.setting} />
        </Scrollbar>
        <Scrollbar class="right-wrap">
          <ToolBox setting={this.setting} />
          <RenderForm ref="RenderForm" setting={this.setting} />
        </Scrollbar>
        <AttrSetting config={this.currentFormItem} />
      </section>
    );
  },
};
</script>

<style lang="less" scoped>
.drag-page {
  background: #fff;
  height: 100%;
  display: flex;
  border-radius: 4px;
  .left-wrap {
    height: 100%;
    width: 220px;
    box-shadow: 0 4px 10px 0 rgba(12, 31, 80, 8%);
  }
  .right-wrap {
    flex: 1;
    height: 100%;
    ::v-deep {
      .container {
        padding: 0 0 200px;
      }
    }
  }
}
::v-deep .custom-form {
  margin: -1px -5px;
  .drag-item {
    position: relative;
    cursor: pointer;
    margin: 1px 5px;
  }
  &.drag-form {
    .drag-item {
      &.drag-active {
        border: 1px dashed #1a90ff;
      }
      &:hover {
        background: #fafafb;
      }
      .ant-form-item-control {
        pointer-events: none;
      }
      .drag-item-tool {
        min-width: 90px;
        display: inline-block;
        padding: 2px 0;
        position: absolute;
        top: -5px;
        right: 0px;
        border-radius: 10px;
        background: #e6f7ff;
        z-index: 1;
        .icon {
          width: 36px;
        }
      }
    }
    .form-item-full {
      position: absolute;
      top: 0px;
      left: 0px;
      right: 0px;
      bottom: 0px;
      background: red;
    }
  }
  .ant-form-item {
    margin: 0px !important;
    padding: 0px !important;
  }
  .inline-block {
    display: inline-block;
  }
}
::v-deep .ghost-item {
  height: 100% !important;
  background: green !important;
  overflow: hidden;
  font-size: 0px;
  display: inline-block;
  width: 2px;
}
</style>
