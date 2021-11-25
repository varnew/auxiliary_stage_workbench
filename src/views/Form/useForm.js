const chunk = (list, n) => {
  let result = [];
  for (let i = 0; i < list.length; i += n) {
    result.push(list.slice(i, i + n));
  }
  return result;
};
const UseForm = {
  data() {
    return {
      activeId: null,
    };
  },
  computed: {
    isInline() {
      return this.setting.mode.indexOf("inline") !== -1;
    },
    isRender() {
      return this.setting.renderType === "EDIT";
    },
    isDrag() {
      return this.setting.renderType === "PREVIEW";
    },
  },
  methods: {
    getIndexByUuid(uuid) {
      for (let i = 0; i < this.modelRender.length; i++) {
        const temp = this.modelRender[i];
        if (uuid === temp.uuid) {
          return i;
        }
      }
    },
    delete(item) {
      const index = this.getIndexByUuid(item.uuid);
      this.modelRender.splice(index, 1);
    },
    copy(item) {
      const index = this.getIndexByUuid(item.uuid);
      const copyItem = { ...this.modelRender[index], uuid: Math.random() };
      this.modelRender.splice(index, 0, copyItem);
    },
    dragItemClick({ uuid }) {
      if (this.activeId === uuid) {
        this.activeId = null;
      } else {
        this.activeId = uuid;
      }
    },
    // 渲染拖拽项工具栏
    renderDragTool(item) {
      return (
        <div class="drag-item-tool">
          <a-icon
            class="icon"
            type="delete"
            theme="twoTone"
            on-click={() => this.delete(item)}
          />
          <a-divider type="vertical" />
          <a-icon
            class="icon"
            type="copy"
            theme="twoTone"
            on-click={() => this.copy(item)}
          />
        </div>
      );
    },
    // 拖拽辅助块
    renderDragItem(item, render) {
      const { uuid } = item;
      return (
        <div
          class={{
            "drag-item": true,
            "drag-active": this.activeId === uuid && this.isDrag,
            "inline-block": this.isInline,
          }}
          key={uuid}
          on-click={() => this.dragItemClick(item)}
        >
          {this.activeId === uuid && this.isDrag && this.renderDragTool(item)}
          {render && render(item)}
        </div>
      );
    },
    // 渲染表单项
    renderFormItem(item) {
      const { render, prop, label, wrapperCol } = item;
      let labelText = label;
      if (typeof label === "function") {
        labelText = label();
      }
      const toRender = () => (
        <a-form-model-item
          prop={prop}
          label={labelText}
          wrapper-col={wrapperCol}
        >
          {render && render.apply(this)}
        </a-form-model-item>
      );
      return this.renderDragItem(item, toRender);
    },
    // 渲染表单项-分列
    rendeColFormItem(modelRender, col) {
      const total = 24;
      const single = total / col;
      const rowList = chunk(modelRender, col);
      return rowList.map((colList) => (
        <a-row>
          {colList.map((item) => (
            <a-col span={single}>{this.renderFormItem(item)}</a-col>
          ))}
        </a-row>
      ));
    },
  },
  render() {
    let { modelRender, ref = "form" } = this;
    let {
      layout,
      col,
      labelCol,
      wrapperCol,
      colon,
      hideRequiredMark,
      labelAlign,
      validateOnRuleChange,
    } = this.setting.config;
    let modelProps = {
      model: this.form,
      rules: this.rules,
      labelCol: labelCol,
      wrapperCol: wrapperCol,
      colon: colon,
      layout,
      hideRequiredMark,
      labelAlign,
      validateOnRuleChange,
    };
    if (["vertical", "inline"].indexOf(layout) !== -1) {
      modelProps.labelCol = {};
      modelProps.wrapperCol = {};
      col = undefined;
    }
    modelProps = JSON.parse(JSON.stringify(modelProps));
    const renderItem = () => {
      return col
        ? this.rendeColFormItem(modelRender, col)
        : modelRender.map((item) => {
            return this.renderFormItem(item);
          });
    };
    const renderDarg = () => (
      <draggable
        class="dragArea container"
        list={this.modelRender}
        group="people"
        chosen-class="chosen-item"
      >
        {renderItem()}
        {this.modelRender.length === 0 && (
          <a-empty
            image="https://file.qingflow.com/assets/empty-content/applying-editorial-tips.png"
            image-style={{ height: "200px" }}
            description="拖拽或点击左侧字段创建表单"
          />
        )}
      </draggable>
    );
    return (
      <a-form-model
        ref={ref}
        class={{
          "custom-form": true,
          "render-form": this.isRender,
          "drag-form": this.isDrag,
        }}
        {...{ props: { ...modelProps } }}
      >
        {this.isRender ? renderItem() : renderDarg()}
      </a-form-model>
    );
  },
};
module.exports = UseForm;