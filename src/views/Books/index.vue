<script>
export default {
  data() {
    return {
      menu: [
        "books/**01-Chrome架构：仅仅打开了1个页面，为什么有4个进程？_For_vip_user_001.pdf",
        "books/**02-TCP协议：如何保证页面文件能被完整送达浏览器？_For_vip_user_001.pdf",
        "books/**03-HTTP请求流程：为什么很多站点第二次打开速度会很快？_For_vip_user_001.pdf",
        "books/**04-导航流程：从输入URL到页面展示，这中间发生了什么？_For_vip_user_001.pdf",
        "books/**05-渲染流程（上）：HTML、CSS和JavaScript，是如何变成页面的？_For_vip_user_001.pdf",
        "books/**06-渲染流程（下）：HTML、CSS和JavaScript，是如何变成页面的？_For_vip_user_001.pdf",
        "books/**07-变量提升：JavaScript代码是按顺序执行的吗？_For_vip_user_001.pdf",
        "books/**08-调用栈：为什么JavaScript代码会出现栈溢出？_For_vip_user_001.pdf",
        "books/**09-块级作用域：var缺陷以及为什么要引入let和const？_For_vip_user_001.pdf",
        "books/**10-作用域链和闭包：代码中出现相同的变量，JavaScript引擎是如何选择的？_For_vip_user_001.pdf",
        "books/**11-this：从JavaScript执行上下文的视角讲清楚this_For_vip_user_001.pdf",
        "books/**12-栈空间和堆空间：数据是如何存储的？_For_vip_user_001.pdf",
        "books/**13-垃圾回收：垃圾数据是如何自动回收的？_For_vip_user_001.pdf",
        "books/**14-编译器和解释器：V8是如何执行一段JavaScript代码的？_For_vip_user_001.pdf",
        "books/**15-消息队列和事件循环：页面是怎么“活”起来的？_For_vip_user_001.pdf",
        "books/**16-WebAPI：setTimeout是如何实现的？_For_vip_user_001.pdf",
        "books/**17-WebAPI：XMLHttpRequest是怎么实现的？_For_vip_user_001.pdf",
        "books/**18-宏任务和微任务：不是所有任务都是一个待遇_For_vip_user_001.pdf",
        "books/**19-Promise：使用Promise，告别回调函数_For_vip_user_001.pdf",
        "books/**20-asyncawait：使用同步的方式去写异步代码_For_vip_user_001.pdf",
        "books/**21-Chrome开发者工具：利用网络面板做性能分析_For_vip_user_001.pdf",
        "books/**22-DOM树：JavaScript是如何影响DOM树构建的？_For_vip_user_001.pdf",
        "books/**23-渲染流水线：CSS如何影响首次加载时的白屏时间？_For_vip_user_001.pdf",
        "books/**24-分层和合成机制：为什么CSS动画比JavaScript高效？_For_vip_user_001.pdf",
        "books/**25-页面性能：如何系统地优化页面？_For_vip_user_001.pdf",
        "books/**26-虚拟DOM：虚拟DOM和实际的DOM有何不同？_For_vip_user_001.pdf",
        "books/**27-渐进式网页应用（PWA）：它究竟解决了Web应用的哪些问题？_For_vip_user_001.pdf",
        "books/**28-WebComponent：像搭积木一样构建Web应用_For_vip_user_001.pdf",
        "books/**29-HTTP1：HTTP性能优化_For_vip_user_001.pdf",
        "books/**30｜HTTP2：如何提升网络速度？_For_vip_user_001.pdf",
        "books/**31｜HTTP3：甩掉TCP、TLS的包袱，构建高效网络_For_vip_user_001.pdf",
        "books/**32-同源策略：为什么XMLHttpRequest不能跨域请求资源？_For_vip_user_001.pdf",
        "books/**33-跨站脚本攻击（XSS）：为什么Cookie中有HttpOnly属性？_For_vip_user_001.pdf",
        "books/**34-CSRF攻击：陌生链接不要随便点_For_vip_user_001.pdf",
        "books/**35-安全沙箱：页面和系统之间的隔离墙_For_vip_user_001.pdf",
        "books/**36-HTTPS：让数据传输更安全_For_vip_user_001.pdf",
        "books/**开篇词-参透了浏览器的工作原理，你就能解决80%的前端难题_For_vip_user_001.pdf",
        "books/**结束语-大道至简_For_vip_user_001.pdf",
      ],
      bookDetil: null,
    };
  },
  methods: {
    async detail() {
      const res = await this.$api.serviceRequest({
        api: "http://r46v2cj4d.hn-bkt.clouddn.com/books/%2A%2A01-Chrome%E6%9E%B6%E6%9E%84%EF%BC%9A%E4%BB%85%E4%BB%85%E6%89%93%E5%BC%80%E4%BA%861%E4%B8%AA%E9%A1%B5%E9%9D%A2%EF%BC%8C%E4%B8%BA%E4%BB%80%E4%B9%88%E6%9C%894%E4%B8%AA%E8%BF%9B%E7%A8%8B%EF%BC%9F_For_vip_user_001.pdf",
        type: "get",
      });
      console.log("res", res);
      const blob = new window.Blob([res.data], {
        type: "application/pdf",
      });
      const href = URL.createObjectURL(blob);
      window.open(href);
      this.bookDetil = href;
    },
  },
  render() {
    return (
      <section class="book-page">
        <div class="book-menu">
          {this.menu.map((book) => {
            return (
              <div class="book-item" on-click={() => this.detail(book)}>
                {book}
              </div>
            );
          })}
        </div>
        <iframe class="book-main" href={this.bookDetil}></iframe>
      </section>
    );
  },
};
</script>

<style lang="less" scoped>
.boox-page {
}
</style>
