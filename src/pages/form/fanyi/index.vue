<script>
import axios from 'axios';
import { js_beautify } from 'js-beautify'
import Clipboard from 'clipboard'
export default {
  data() {
    return {
      content: '',
      rContent: ''
    }
  },
  mounted() {},
  methods: {
    // 翻译
    async enter() {
      this.rContent = ''
      const content = this.content
      const list = content.split(/[(\r\n)\r\n]+/)
      const res = await axios.get(`/fontconvert/convert?appkey=b61baecb78ee7cdf&content=${content}&type=2t`)
      let rContent = res.data.result.rcontent
      let index = 0
      const resultList = []
      list.forEach(item => {
        const text = rContent.substring(index, index + item.length)
        index += item.length
        resultList.push(text)
      })
      const zh_cn_list = list.map((item) => {
        return `"${item}": "${item}"`
      })
      const zh_hk_list = list.map((item,index) => {
        return `"${item}": "${resultList[index]}"`
      })
      this.rContent = js_beautify(`{
        messages: {
          "zh-CN": {
            ${zh_cn_list.join(',')}
          },
          "zh-HK": {
            ${zh_hk_list.join(',')}
          }
        }
      }`, { indent_size: 2 })
    },
    // 复制
    copy() {
      let clipboard = new Clipboard('#copyBtn')
      clipboard.on('success', () => {
        this.$message.warn(`已复制`)
        clipboard.destroy()
      })
    }
  },
  render() {
    return <div class="fanyi-page">
      <div class="tool-box">
        <a-space>
          <a-button type="primary" id="copyBtn" data-clipboard-text={this.rContent} on-click={this.copy}>复制</a-button>
          <a-button type="primary" on-click={this.enter}>翻译</a-button>
        </a-space>
      </div>
      <div class="container">
        <a-input class="text-area" type="textarea" autosize={{ minRows:36, maxRows: 100 }} vModel={this.content} />
        <pre class="result-box">{ this.rContent }</pre>
      </div>
    </div>
  }
}
</script>

<style lang="less" scoped>
.fanyi-page{
  height: 100%;
  background: #fff;
  padding: 10px;
  .tool-box{
    margin-bottom: 8px;
    display: flex;
    justify-content: flex-end;
  }
  .container{
    display: flex;
    .text-area{
      flex: 1;
    }
    .result-box{
      flex: 1;
      margin: 0 0 0 10px;
      border: 1px solid #ccc;
      border-radius: 8px;
    }
  }
  
}
</style>