import ejs from "ejs";
// 获取表单项配置
export const getModelRender = (list = []) => {
  const tempList = list.map((item) => {
    return `{
        label: "${item.label}",
        prop: "${item.attrs.rules.value.length ? item.attrs.key.value : ""}",
        component: () => ${ejs.render(item.template, { item: item })}
      }`;
  });
  let text = `renderList() {
      return [
        ${tempList.join(`,
        `)}
      ]
  }`;
  return text;
};

// 构建表单校验规则
export function buildRules(list = []) {
  const temp = list
    .filter((item) => item.attrs.rules)
    .map((item) => {
      const { options } = item.attrs.rules;
      const list = options
        .filter((option) => {
          return item.attrs.rules.value.includes(option.value);
        })
        .map((rule) => ejs.render(rule.value, { item: item }));
      if (list.length) {
        return `${item.attrs.key.value}: [
          ${list.join(`,
          `)}
        ]`;
      } else {
        return null;
      }
    })
    .filter(Boolean);
  return temp;
}

// 获取表单布局配置信息
export const getLayoutConfig = (layoutConfig) => {
  let textList = [];
  Object.keys(layoutConfig).forEach((key) => {
    const value =
      typeof layoutConfig[key] === "string"
        ? `"${layoutConfig[key]}"`
        : JSON.stringify(layoutConfig[key]);
    textList.push(`${key}: ${value}`);
  });
  return textList.join(",");
};

// 构建form对象
export function buildFormObj(list = []) {
  const str = list
    .map((item) => `${item.attrs.key.value}: '', // ${item.attrs.label.value}`)
    .join("\n");
  return str;
}

// 构建表单options对象
export function buildFormOption(list = []) {
  console.log("list", list);
  const needOptionList = ["下拉框", "多选框"];
  return list
    .filter((item) => needOptionList.includes(item.id))
    .map((item) => `${item.attrs.key.value}: [], // ${item.attrs.label.value}`)
    .join("\n");
}
