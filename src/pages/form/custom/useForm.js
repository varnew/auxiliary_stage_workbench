const chunk = (list, n) => {
  let result = []
  for(let i=0; i<list.length; i+=n) {
    result.push(list.slice(i, i+n))
  }
  return result
}
const UseForm = {
  methods: {
    renderFormItem(item) {
      const { render, prop, label, wrapperCol } = item
      let labelText = label
      if(typeof label === 'function') { labelText = label() }
      return (
        <a-form-model-item prop={prop} label={ labelText } wrapper-col={wrapperCol}>
          {render && render.apply(this)}
        </a-form-model-item>
      )
    },
    rendeColFormItem(modelRender, col) {
      const total = 24
      const single = total / col
      const rowList = chunk(modelRender, col)
      return (
        rowList.map(colList => <a-row>
            {
              colList.map(item => <a-col span={single}>{ this.renderFormItem(item) }</a-col>)
            }
          </a-row>
        )
      )
    }
  },
  render() {
    let { layout, modelRender, col, ref="form" } = this
    let modelProps = {
      model: this.form,
      rules: this.rules,
      labelCol: this.labelCol,
      wrapperCol: this.wrapperCol,
      colon: this.colon,
      layout,
      hideRequiredMark: this.hideRequiredMark,
      labelAlign: this.labelAlign,
      validateOnRuleChange: this.validateOnRuleChange
    }
    if(['vertical', 'inline'].indexOf(layout) !== -1) { modelProps.labelCol = {}; modelProps.wrapperCol = {}; col = undefined; }
    modelProps = JSON.parse(JSON.stringify(modelProps))
    return (
      <a-form-model ref={ref}
        { ...{ props: {...modelProps} }}
      >
        {
          !col && modelRender.map(item => {
            return this.renderFormItem(item)
          })
        }
        {
          col && this.rendeColFormItem(modelRender, col)
        }
      </a-form-model>
    )
  }
}
module.exports = UseForm