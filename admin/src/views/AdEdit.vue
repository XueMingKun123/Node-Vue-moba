<template>
  <div class="about">
    <!-- 使用三元运算符 根据id动态显示编辑还是新建分类 -->
    <h1>{{ id ? "编辑" : "新建" }}广告位</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>

      <el-form-item label="广告">
        <!-- 添加广告位的按钮 -->
        <el-button size="small" @click="model.items.push({})"
          ><i class="el-icon-plus"></i>添加广告位</el-button
        >

        <el-row type="flex" style="flex-wrap: wrap">
          <!-- col需要循环，展示英雄已有的技能 -->
          <el-col :md="24" v-for="(item, index) in model.items" :key="index">
            <el-form-item label="跳转链接" style="margin-left: -3rem">
              <el-input v-model="item.url"></el-input>
            </el-form-item>

            <el-form-item
              label="图片"
              style="margin-top: 0.5rem; margin-left: -3rem"
            >
              <!-- 技能上传 使用$set设置防止icon为空时直接赋值不是响应式 -->
              <el-upload
                class="avatar-uploader"
                :action="$http.defaults.baseURL + '/upload'"
                :show-file-list="false"
                :on-success="(res) => $set(item, 'image', res.url)"
              >
                <img v-if="item.image" :src="item.image" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>

            <el-form-item>
              <el-button
                size="small"
                type="danger"
                @click="model.items.splice(index, 1)"
                style="margin-left: 5rem"
                >删除</el-button
              >
            </el-form-item>

            <el-divider></el-divider>
          </el-col>
        </el-row>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: { items: [] },
    };
  },
  //声明props接受路由带来的id
  props: { id: {} },
  methods: {
    // 保存数据
    async save() {
      //保存的时候需要进行条件判断 新建和编辑的请求方法不一样 post与put 路径也不一样、
      let res; // eslint-disable-line no-unused-vars
      // 通过id是否存在来判断是新建还是编辑
      if (this.id) {
        //如果有 编辑的方法
        res = await this.$http.put(`rest/ads/${this.id}`, this.model); // eslint-disable-line no-unused-vars
      } else {
        //如果没有 新建方法
        res = await this.$http.post("rest/ads", this.model); // eslint-disable-line no-unused-vars
      }
      this.$router.push("/ads/list");
      this.$message({
        type: "success",
        message: "保存成功",
      });
    },
    //获取数据,实现自动填充我们需要修改的值
    async fetch() {
      const res = await this.$http.get(`rest/ads/${this.id}`); // eslint-disable-line no-unused-vars
      this.model = Object.assign({}, this.model, res.data);
    },
  },
  created() {
    //creted生命周期根据id是否存在获取数据并将数据填充的input框里 便于修改
    this.id && this.fetch();
  },
};
</script>

<style></style>
