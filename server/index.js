const express = require("express");

const app = express();
// 在express实例app上使用set全局添加一个密钥, 使用时时app.get
app.set("secret", "12a31asd23d21jk3h21kj3");

app.use(require("cors")());
app.use(express.json());
//使用静态文件托管 让uploads中所有的静态文件可以通过/uploads来访问
app.use("/uploads", express.static(__dirname + "/uploads"));
require("./plugins/db")(app);
require("./routes/admin")(app);

app.listen(3000, () => {
  console.log("3000端口被监听了~");
});
