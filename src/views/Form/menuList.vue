<script>
import draggable from "vuedraggable";
import eventBus from "./eventBus";
export default {
  name: "menu-list",
  components: { draggable },
  data() {
    return {
      sourceList: [
        {
          name: "基础表单",
          list: [
            {
              dragName: "输入框",
              id: "0000",
              label: "输入框",
              prop: "input",
              render: function () {
                return <a-input vModel={this.form.input} />;
              },
            },
            {
              dragName: "选择框",
              id: "0001",
              label: "选择框",
              prop: "select",
              render: function () {
                return (
                  <a-select vModel={this.form.select}>
                    {[].map((option) => (
                      <a-select-option value={option.value}>
                        {option.name}
                      </a-select-option>
                    ))}
                  </a-select>
                );
              },
            },
            {
              dragName: "时间",
              id: "0002",
              label: "时间",
              prop: "name",
              render: function () {
                return <a-date-picker vModel={this.form.time} type="date" />;
              },
            },
            {
              dragName: "多行文本",
              id: "0003",
              label: "多行文本",
              prop: "textarea",
              render: function () {
                return <a-input vModel={this.form.textarea} type="textarea" />;
              },
            },
            {
              dragName: "按钮",
              id: "0004",
              label: "",
              prop: "",
              render: function () {
                return <a-button type="primary">按钮</a-button>;
              },
            },
          ],
        },
        {
          name: "高级表单",
          list: [
            {
              dragName: "输入-输入",
              id: "0100",
              label: "",
              prop: "input",
              render: function () {
                return (
                  <a-input-group compact>
                    <a-input
                      style="width: 30%"
                      vModel={this.form.inputGroup1}
                    />
                    <a-input
                      style="width: 70%"
                      vModel={this.form.inputGroup2}
                    />
                  </a-input-group>
                );
              },
            },
            {
              dragName: "选择-输入",
              id: "0101",
              label: "",
              prop: "input",
              render: function () {
                return (
                  <a-input-group compact>
                    <a-select vModel={this.form.inputGroup3}>
                      {[].map((option) => (
                        <a-select-option value={option.value}>
                          {option.name}
                        </a-select-option>
                      ))}
                    </a-select>
                    <a-input
                      style="width: 50%"
                      vModel={this.form.inputGroup4}
                    />
                  </a-input-group>
                );
              },
            },
          ],
        },
      ],
    };
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
                    {item.dragName}
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
  box-shadow: 0 4px 10px 0 rgba(12, 31, 80, 8%);
  .menu-group {
    .menu-title {
      font-weight: bold;
      margin: 6px 0;
    }
    .menu-main {
      display: flex;
      flex-wrap: wrap;
      .menu-item {
        width: 50%;
        text-align: center;
        padding: 6px 2px;
        margin: 6px 0px;
        cursor: move;
        &:hover {
          background-image: url(https://file.qingflow.com/assets/widget/cover.png);
          background-size: 100%;
        }
      }
    }
  }
}
</style>
