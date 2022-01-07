<script>
export default {
  name: "file-upload",
  data() {
    return {
      file: "",
    };
  },
  methods: {
    handleChange(e) {
      const file = e.target.files[0];
      const chunkList = this.getChunks(file, 140000);
      this.upload(chunkList);
    },
    getChunks(file, chunkSize = 1400) {
      const { name, size } = file;
      const chunks = [];
      let index = 0;
      while (index < size) {
        chunks.push({
          file: file.slice(index, index + chunkSize),
          name,
        });
        index += chunkSize;
      }
      return chunks;
    },
    batch(asyncList = []) {
      let succssCount = 0;
      let errorCount = 0;
      let errList = [];
      for (let i = 0; i < asyncList.length; i++) {
        const featch = asyncList[i];
        console.log("开始执行片段" + featch.uuid);
        featch()
          .then(
            () => {
              succssCount++;
            },
            () => {
              errorCount++;
              errList.push(featch);
            }
          )
          .then(() => {
            if (succssCount + errorCount === asyncList.length) {
              console.log(`完成! 成功：${succssCount}, 失败： ${errorCount}`);
              if (errorCount) {
                this.$confirm({
                  title: "存在上传失败的节点，是否再次上传？",
                  onOk: () => this.batch(errList),
                });
              }
            }
          });
      }
    },
    upload(chunks = []) {
      const files = chunks.map((item, index) => {
        item.file.index = index;
        return item;
      });
      const asyncList = files.map((item, index) => {
        const featch = () => this.api(item);
        featch.uuid = item.name + index;
        return featch;
      });
      this.batch(asyncList);
    },
    async api(file) {
      const res = await new Promise((resolve, reject) => {
        setTimeout(() => {
          const isValid = Math.random() > 0.3 ? true : false;
          if (isValid) {
            resolve({
              code: 200,
              data: file,
            });
          } else {
            reject({
              code: 502,
            });
          }
        }, 5000 * Math.random());
      });
      return res;
    },
  },
  render() {
    return (
      <section>
        <label
          for="file"
          style="display:inline-block;height: 32px;line-height: 24px;cursor:pointer;background: #fff;padding: 0px 15px;border-radius: 4px;border: 1px solid #d9d9d9; box-shadow: 0 2px 0 rgb(0 0 0 / 2%);"
        >
          选择文件
          <input
            style="width: 0px;height: 0px;"
            type="file"
            id="file"
            on-input={this.handleChange}
          />
        </label>
      </section>
    );
  },
};
</script>
