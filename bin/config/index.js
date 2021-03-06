/*
  @dest: 使用配置文件
  @Author: tree
 */
module.exports  = {
  npmUrl: 'https://registry.npmjs.org/shc-cli/latest',
  promptTypeList:[{
      type: 'list',
      message: '请选择拉取的模版类型:',
      name: 'type',
      choices: [{
        name: 'pc',
        value: {
          url: 'https://github.com/puffing/vue-libra-cli-template.git',
          gitName: 'vue-libra-cli-template',
          val:'PC端模版'
        }
      }]
  }],
};
