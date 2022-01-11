const { notEmpty } = require('../utils.js');

module.exports = {
  description: '新建一个组件',
  prompts: [
  {
    type: 'input',
    name: 'name',
    message: '组件名称',
    validate: notEmpty('name'),
  },
  {
    type: 'input',
    name: 'path',
    message: '组件路径',
    validate: () => true,
  },
  {
    type: 'checkbox',
    name: 'blocks',
    message: '需要包含什么:',
    choices: [{
      name: '<template>',
      value: 'template',
      checked: true,
    },
    {
      name: '<script>',
      value: 'script',
      checked: true,
    },
    {
      name: 'style',
      value: 'style',
      checked: true,
    },
    ],
    validate(value) {
      if (value.indexOf('script') === -1 && value.indexOf('template') === -1) {
        return ' <template> 和 <script> 是必须的.';
      }
      return true;
    },
  },
  ],
  actions: (data) => {
    const name = '{{properCase name}}';
    const path = data.path;
    const actions = [{
      type: 'add',
      path: path || `src/components/${name}/index.vue`,
      templateFile: 'plop-templates/component/index.hbs',
      data: {
        name,
        template: data.blocks.includes('template'),
        script: data.blocks.includes('script'),
        style: data.blocks.includes('style'),
      },
    }];

    return actions;
  },
};
