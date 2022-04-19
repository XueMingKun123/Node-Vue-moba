<template>
  <div class="about">
    <!-- 使用三元运算符 根据id动态显示编辑还是新建分类 -->
    <h1>{{ id ? "编辑" : "新建" }}物品</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <!-- <el-form-item label="上级分类">
        <el-select v-model="model.parent">
          <el-option
            v-for="item in parents"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          >
          </el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :headers="getAuthHeaders()"
          :show-file-list="false"
          :on-success="afterUpload"
        >
          <img v-if="model.icon" :src="model.icon" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: {},
    };
  },
  //声明props接受路由带来的id
  props: { id: {} },
  methods: {
    // afterUpload 图片上传成功的操作
    afterUpload(res) {
      this.$set(this.model, "icon", res.url);
      // this.model.icon = res.url;
    },
    // 保存数据
    async save() {
      //保存的时候需要进行条件判断 新建和编辑的请求方法不一样 post与put 路径也不一样、
      let res; // eslint-disable-line no-unused-vars
      // 通过id是否存在来判断是新建还是编辑
      if (this.id) {
        //如果有 编辑的方法
        res = await this.$http.put(`rest/items/${this.id}`, this.model); // eslint-disable-line no-unused-vars
      } else {
        //如果没有 新建方法
        res = await this.$http.post("rest/items", this.model); // eslint-disable-line no-unused-vars
      }
      this.$router.push("/items/list");
      this.$message({
        type: "success",
        message: "保存成功",
      });
    },
    //获取数据,实现自动填充我们需要修改的值
    async fetch() {
      const res = await this.$http.get(`rest/items/${this.id}`); // eslint-disable-line no-unused-vars
      this.model = res.data;
    },
  },
  created() {
    //creted生命周期根据id是否存在获取数据并将数据填充的input框里 便于修改
    this.id && this.fetch();
  },
};
</script>

<style></style>
