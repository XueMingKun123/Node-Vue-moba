module.exports = (options) => {
  //使用闭包的思想 实现类似于插件功能的函数
  return async (req, res, next) => {
    // 使用inflection的classify方法来将resourse的名称转化为模型的名称
    const modelName = require("inflection").classify(req.params.resourse);
    // 通过require得到这个模型的类,并将其挂载为req对象上的一个属性
    req.Model = require(`../models/${modelName}`);
    //请求上面这个接口的时候 会先调用这个函数 然后next()向下继续执行
    req.Model.modelName = modelName;
    next();
  };
};
