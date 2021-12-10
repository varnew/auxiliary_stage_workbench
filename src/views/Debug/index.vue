<script>
import _get from "lodash/get";
import _uniq from "lodash/uniq";
import _cloneDeep from "lodash/cloneDeep";
import Edit from "./edit";
export default {
  name: "debug",
  components: { Edit },
  data() {
    return {
      loading: false,
      isReload: false,
      allDataSource: [],
      dataSource: [],
      form: {
        name: "",
        path: "",
        tags: "",
      },
      current: null,
      visible: false,
    };
  },
  computed: {
    columns() {
      return [
        {
          title: "名称",
          dataIndex: "name",
        },
        {
          title: "路径",
          dataIndex: "path",
        },
        {
          title: "分组",
          dataIndex: "tags",
          width: 150,
        },
        {
          title: "类型",
          dataIndex: "type",
          width: 80,
        },
        {
          title: "操作",
          dataIndex: "action",
          fixed: "right",
          width: 90,
          customRender: (text, record) => (
            <a-button
              type="primary"
              size="small"
              on-click={() => this.edit(record)}
            >
              编辑
            </a-button>
          ),
        },
      ];
    },
    names() {
      return this.form.name
        ? _uniq(this.allDataSource.map((item) => item.name))
        : [];
    },
    paths() {
      return this.form.path
        ? _uniq(this.allDataSource.map((item) => item.path))
        : [];
    },
    tags() {
      let _temp = [];
      this.allDataSource.forEach((item) => {
        _temp = [..._temp, ...item.tags];
      });
      return _uniq(_temp);
    },
  },
  mounted() {
    this.getApis();
  },
  methods: {
    async getApis() {
      this.loading = true;
      let res;
      if (this.isReload) {
        res = await this.$api.sw();
        localStorage.setItem("SW_API", JSON.stringify(res));
      } else {
        res = JSON.parse(localStorage.getItem("SW_API"));
      }
      this.loading = false;
      const paths = res.data.paths;
      const definitions = res.data.definitions;
      let list = [];
      Object.keys(paths).forEach((pathName) => {
        const fns = paths[pathName];
        Object.keys(fns).map((type) => {
          const api = fns[type];
          let params;
          const parameters = api.parameters;
          if (!parameters || parameters.length === 0) {
            params = null;
          } else if (
            parameters.length === 1 &&
            _get(api, "parameters[0].schema.originalRef")
          ) {
            const originalRef = _get(api, "parameters[0].schema.originalRef");
            const _params = definitions[originalRef];
            const required = _params.required || [];
            if (_params.type === "object") {
              params = Object.keys(_params.properties).map((key) => {
                const temp = _params.properties[key];
                return {
                  type: temp.type,
                  description: temp.description,
                  name: key,
                  require: required.indexOf(key) !== -1,
                };
              });
            }
          } else {
            params = parameters;
          }
          params &&
            params.forEach((item) => {
              item.formItemId = "0000";
            });
          const temp = {
            tags: api.tags,
            name: api.summary,
            type,
            params: params,
            path: pathName,
          };
          list.push(temp);
        });
      });
      this.dataSource = list;
      this.allDataSource = _cloneDeep(list);
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toUpperCase()
          .indexOf(input.toUpperCase()) >= 0
      );
    },
    edit(record) {
      this.current = record;
      this.visible = true;
    },
    search() {
      this.wanyi();
      const { name = "", path = "", tags = "" } = this.form;
      let filterList = this.allDataSource
        .filter((item) => {
          let isSame = false;
          for (let i = 0; i < item.tags.length; i++) {
            if (item.tags[i].indexOf(tags) !== -1) {
              isSame = true;
              break;
            }
          }
          return isSame;
        })
        .filter((item) => item.name.indexOf(name) !== -1)
        .filter((item) => item.path.indexOf(path) !== -1);
      this.dataSource = filterList;
    },
    async wanyi() {
      const res = await this.$api.serviceRequest({
        api: "https://v2.alapi.cn/api/comment",
        content: {
          id: 1400256289,
          token: "UAeGrSjsrhL0vIJV",
        },
        type: "POST",
      });
      console.log("res", res);
    },
  },
  render() {
    const renderFormItem = (label, key, dataSource) => (
      <a-form-model-item label={label}>
        <a-auto-complete
          vModel={this.form[key]}
          data-source={dataSource}
          filter-option={this.filterOption}
          allowClear
          size="small"
        ></a-auto-complete>
      </a-form-model-item>
    );
    return (
      <section class="debug-page">
        <div class="search-wrap">
          <a-space>
            请求:
            <a-switch size="small" vModel={this.isReload} />
            <a-button
              type="primary"
              size="small"
              loading={this.loading}
              on-click={this.getApis}
            >
              sw
            </a-button>
          </a-space>
          <a-form-model layout="inline" style="margin-right: -16px;">
            {renderFormItem("分组", "tags", this.tags)}
            {renderFormItem("路径", "path", this.paths)}
            {renderFormItem("名称", "name", this.names)}
            <a-form-model-item>
              <a-button type="primary" size="small" on-click={this.search}>
                查询
              </a-button>
            </a-form-model-item>
          </a-form-model>
        </div>
        <a-table
          columns={this.columns}
          data-source={this.dataSource}
          style="margin: 0px 10px;"
          scroll={{ y: "calc(100vh - 174px)" }}
          pagination={{ pageSize: 50, size: "small" }}
        />
        {this.visible && (
          <edit data={this.current} on-cancel={() => (this.visible = false)} />
        )}
      </section>
    );
  },
};
</script>

<style lang="less" scoped>
.debug-page {
  background: #fff;
  height: 100%;
  position: relative;
  .search-wrap {
    padding: 0 10px;
    display: flex;
    justify-content: space-between;
  }
  ::v-deep {
    .ant-table th,
    .ant-table-tbody > tr > td {
      padding: 4px 8px !important;
    }
    .ant-table-pagination.ant-pagination {
      margin: 10px 0px;
    }
  }
}
</style>
