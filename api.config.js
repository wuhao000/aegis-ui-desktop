module.exports = {
  typeRoot: 'src/types2',
  apiRoot: 'src/api2',
  // 如果需要多个应用的接口，可以添加多个配置
  configs: [
    {
      // swagger接口数据地址
      url: 'http://uc.aegis-info.com/api/management/apis?access_token=d9dd328c-7502-48f8-b53d-50da6524f41f',
      // 数据对象定义的泛型参数映射，带有泛型参数的对象定义，swagger没有指定泛型与那个属性相关，所以需要手动指定
      // 存在多个泛型参数时数量和顺序与实际数据保持一致
      typeParameterReflects: [{
        // 数据对象名称为Page，泛型参数关联content属性，则生成的类型定义为
        // Page<T> {
        //   content: T[];
        // }
        // 之所以是T[]而不是T是因为content属性是一个数组类型的属性
        name: 'Page',
        typeProperties: ['content']
      }, {
        // ExecuteCommandResult<T> {
        //   output: T;
        // }
        name: 'ExecuteCommandResult',
        typeProperties: ['output']
      }, {
        name: 'KeyValue',
        typeProperties: ['key', 'value']
      }],
      // 需要生成定义的接口路径正则
      includes: [
        // /^(\/user)\/.*/
      ],
      // 不需要生成定义的接口路径正则
      excludes: [
        // /\/app\/.*/
      ]
    }
  ]
};
