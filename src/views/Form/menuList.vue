<script>
import draggable from "vuedraggable";
import eventBus from "./eventBus";
import renders from "./mixins/renders";
export default {
  name: "menu-list",
  components: { draggable },
  mixins: [renders],
  data() {
    return {};
  },
  computed: {
    itemList() {
      let list = [];
      this.sourceList.forEach((item) => {
        list = [...list, ...item.list];
      });
      return list;
    },
  },
  methods: {
    // 可用于修改拽宅携带的数据
    cloneDog(payload) {
      return { ...payload, uuid: Math.random() };
    },
    // 点击添加数据
    handleItemClick(item) {
      eventBus.$emit("clone", { ...item, uuid: Math.random() });
    },
  },
  render() {
    return (
      <div class="menu-list">
        {this.sourceList.map((group) => {
          return (
            <div class="menu-group">
              <h4 class="menu-title">{group.name}</h4>
              <draggable
                class="dragArea menu-main"
                list={group.list}
                group={{ name: "people", pull: "clone", put: false }}
                clone={this.cloneDog}
                sort={false}
              >
                {group.list.map((item) => (
                  <div
                    class="menu-item"
                    on-click={() => this.handleItemClick(item)}
                  >
                    {group.type === "render" ? item.render() : item.dragName}
                  </div>
                ))}
              </draggable>
            </div>
          );
        })}
      </div>
    );
  },
};
</script>

<style lang="less" scoped>
.menu-list {
  height: 100%;
  padding: 10px;
  .menu-group {
    .menu-title {
      font-weight: bold;
      margin: 6px 0;
    }
    .menu-main {
      display: flex;
      flex-wrap: wrap;
      .menu-item {
        width: calc(50% - 10px);
        text-align: center;
        padding: 6px 2px;
        margin: 6px 0px;
        cursor: move;
        &:hover {
          background-image: url(https://file.qingflow.com/assets/widget/cover.png);
          background-size: 100% 100%;
          background-repeat: no-repeat;
        }
      }
    }
  }
}
</style>
