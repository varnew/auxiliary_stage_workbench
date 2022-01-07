import _get from "lodash/get";
const chunk = (list, n) => {
  let result = [];
  for (let i = 0; i < list.length; i += n) {
    result.push(list.slice(i, i + n));
  }
  return result;
};
export default {
  data() {
    return {
      activeId: null,
    };
  },
  computed: {
    isInline() {
      return this.mode.indexOf("inline") !== -1;
    },
  },
  methods: {
    // 根据uuid找到项
    getIndexByUuid(uuid) {
      for (let i = 0; i < this.modelRender.length; i++) {
        const temp = this.modelRender[i];
        if (uuid === temp.uuid) {
          return i;
        }
      }
    },
    // 拖拽辅助块
    renderDragItem(item, render) {
      const { uuid } = item;
      return (
        <div
          class={{
            "drag-item": true,
            "inline-block": this.isInline,
          }}
          key={uuid}
        >
          {render && render(item)}
        </div>
      );
    },
    // 渲染表单项
    renderFormItem(item) {
      const { render, prop, label, wrapperCol, attrs } = item;
      let labelText = _get(attrs, "label.value") || label;
      if (typeof label === "function") {
        labelText = label();
      }
      const toRender = () => (
        <a-form-model-item
          prop={prop}
          label={labelText}
          wrapper-col={wrapperCol}
        >
          {render && render.apply(item)}
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
  render(h) {
    this.h = h;
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
    } = this;
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
    return (
      <a-form-model
        ref={ref}
        class={{
          "custom-form": true,
          "render-form": true,
        }}
        {...{ props: { ...modelProps } }}
      >
        {renderItem()}
      </a-form-model>
    );
  },
};
