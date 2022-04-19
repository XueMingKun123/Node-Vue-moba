module.exports = (app) => {
  const express = require("express");
  const jwt = require("jsonwebtoken");
  const assert = require("http-assert");
  const AdminUser = require("../../models/AdminUser");
  const router = express.Router({
    mergeParams: true, //表示合并参数，子路由继承父路由的参数
  });
  // const req.Model = require("../../models/req.Model");
  // 登录校验中间件
  const authMiddleware = require("../../middleware/auth");

  //资源中间件，获取模型
  const resourceMiddleware = require("../../middleware/resource");

  //创建接口
  router.post("/", async (req, res) => {
    const model = await req.Model.create(req.body);
    res.send(model);
  });
  //编辑接口
  router.put("/:id", async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body); //调用findByIdAndUpdate（id,修改后的内容）来实现编辑内容
    res.send(model);
  });
  //删除接口
  router.delete("/:id", async (req, res) => {
    const model = await req.Model.findByIdAndDelete(req.params.id, req.body); //调用findByIdAndUpdate（id,修改后的内容）来实现编辑内容
    res.send({
      success: true,
    });
  });
  // 获取数据接口  关联查询有问题
  router.get(
    "/",

    async (req, res) => {
      let items;
      if (req.Model.modelName === "Category") {
        items = await req.Model.find().populate("parent");
      } else {
        items = await req.Model.find();
      }
      // const queryOptions = {};

      // if (req.Model.modelName === "Category") {
      //   queryOptions.populate = "parent";
      // }

      // const items = await req.Model.find().setOptions(queryOptions); //使用find limit为数量限制,调用populate关联取出我们设置分类模型为parent的数据
      res.send(items);
    }
  );
  //获取某一个id的详情信息
  router.get("/:id", async (req, res) => {
    const model = await req.Model.findById(req.params.id); //使用findById() 找到相应id的数据
    res.send(model);
  });
  app.use(
    "/admin/api/rest/:resourse",
    // 使用中间件实现登录鉴权
    authMiddleware(),
    // 使用中间件的形式获取模型
    resourceMiddleware(),
    router
  ); //resouse动态参数

  //上传接口
  const multer = require("multer");
  const upload = multer({ dest: __dirname + "/../../uploads" });
  app.post(
    "/admin/api/upload",
    authMiddleware(),
    upload.single("file"),
    async (req, res) => {
      const file = req.file;
      file.url = `http://localhost:3000/uploads/${file.filename}`;
      res.send(file);
    }
  );
  // 登录接口 async (req, res)对数据进行校验，返回给前端一个token ，后续通过token验证身份 实现鉴权
  app.post("/admin/api/login", async (req, res) => {
    const { username, password } = req.body;
    //1. 找用户，根据用户名找用户

    // findone寻找一条数据
    const user = await AdminUser.findOne({ username }).select("+password");
    // 判断user是否存在
    assert(user, 422, "用户不存在");

    //2. 校验密码
    // 由于密码使用bcypt加密的，所以校验时需要bcypt
    const isValid = require("bcrypt").compareSync(password, user.password);
    //判断密码是否正确
    assert(isValid, 422, "密码错误");

    //3. 返回token
    const jwt = require("jsonwebtoken");
    // 使用sign签名方法生成一个token,参数1：payload:放入到token中的数据,secret:密钥
    const token = jwt.sign(
      {
        id: user._id,
        // _id: user._id,
        // username: user.username,
      },
      // 使用app获取密钥
      app.get("secret")
    );
    res.send({ token });
  });

  // 错误处理函数
  app.use(async (err, req, res, next) => {
    res.status(err.statusCode || 500).send({
      message: err.message,
    });
  });
};
