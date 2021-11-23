const useModal = {
  data: () => {
    return {
      visible: false
    }
  },
  // 渲染modal
  renderModal(contentRender) {
    const { className, style, attrs, props, domProps, on, directives, scopedSlots, slot, key, ref } = this
    return (
      <a-modal
      >
        {contentRender()}
      </a-modal>
    )
  }
}
module.exports = useModal