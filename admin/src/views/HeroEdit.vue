<template>
  <div class="about">
    <!-- 使用三元运算符 根据id动态显示编辑还是新建分类 -->
    <h1>{{ id ? "编辑" : "新建" }}英雄</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-tabs type="border-card" value="skills">
        <!-- 第一个el-tabs-pane编辑基本信息 -->
        <el-tab-pane label="基础信息" name="basic">
          <el-form-item label="名称">
            <el-input v-model="model.name"></el-input>
          </el-form-item>

          <el-form-item label="称号">
            <el-input v-model="model.title"></el-input>
          </el-form-item>

          <el-form-item label="头像">
            <el-upload
              class="avatar-uploader"
              :action="$http.defaults.baseURL + '/upload'"
              :show-file-list="false"
              :on-success="afterUpload"
            >
              <img v-if="model.avatar" :src="model.avatar" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <el-form-item label="类型">
            <el-select v-model="model.categories" multiple>
              <el-option
                v-for="item in categories"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="难度">
            <el-rate
              style="margin-top: 0.7rem"
              :max="9"
              show-score
              v-model="model.scores.difficult"
            ></el-rate>
          </el-form-item>

          <el-form-item label="技能">
            <el-rate
              style="margin-top: 0.7rem"
              :max="9"
              show-score
              v-model="model.scores.skills"
            ></el-rate>
          </el-form-item>

          <el-form-item label="攻击">
            <el-rate
              style="margin-top: 0.7rem"
              :max="9"
              show-score
              v-model="model.scores.attack"
            ></el-rate>
          </el-form-item>

          <el-form-item label="生存">
            <el-rate
              style="margin-top: 0.7rem"
              :max="9"
              show-score
              v-model="model.scores.survive"
            ></el-rate>
          </el-form-item>

          <!-- 技能占位 -->
          <!-- 加点占位 -->
          <el-form-item label="顺风出装">
            <el-select v-model="model.items1" multiple>
              <el-option
                v-for="item in items"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="逆风出装">
            <el-select v-model="model.items2" multiple>
              <el-option
                v-for="item in items"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="使用技巧">
            <el-input type="textarea" v-model="model.usageTips"></el-input>
          </el-form-item>

          <el-form-item label="对抗技巧">
            <el-input type="textarea" v-model="model.battleTips"></el-input>
          </el-form-item>

          <el-form-item label="团战思路">
            <el-input type="textarea" v-model="model.teamTips"></el-input>
          </el-form-item>
        </el-tab-pane>

        <!-- 第二个el-tabs编辑技能信息 -->
        <el-tab-pane label="技能" name="skills">
          <el-button size="small" @click="model.skills.push({})"
            ><i class="el-icon-plus"></i>添加技能</el-button
          >
          <!--  -->
          <el-row type="flex" style="flex-wrap: wrap">
            <!-- col需要循环，展示英雄已有的技能 -->
            <el-col :md="12" v-for="(item, index) in model.skills" :key="index">
              <el-form-item label="名称">
                <el-input v-model="item.name"></el-input>
              </el-form-item>

              <el-form-item label="图标">
                <!-- 技能上传 使用$set设置防止icon为空时直接赋值不是响应式 -->
                <el-upload
                  class="avatar-uploader"
                  :action="$http.defaults.baseURL + '/upload'"
                  :show-file-list="false"
                  :on-success="(res) => $set(item, 'icon', res.url)"
                >
                  <img v-if="item.icon" :src="item.icon" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>

              <el-form-item label="描述">
                <el-input type="textarea" v-model="item.description"></el-input>
              </el-form-item>

              <el-form-item label="小提示">
                <el-input type="textarea" v-model="item.tips"></el-input>
              </el-form-item>

              <el-form-item>
                <el-button
                  size="small"
                  type="danger"
                  @click="model.skills.splice(index, 1)"
                  >删除</el-button
                >
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>

      <el-form-item>
        <el-button style="margin-top: 1rem" type="primary" native-type="submit"
          >保存</el-button
        >
        <!-- <el-button>取消</el-button> -->
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: {
        name: "",
        avatar: "",
        scores: { difficult: 0 },
        usageTips: "",
        battleTips: "",
        teamTips: "",
        skills: [],
      },
      categories: [],
      items: [],
    };
  },
  //声明props接受路由带来的id
  props: { id: {} },
  methods: {
    // afterUpload 图片上传成功的操作
    afterUpload(res) {
      // this.$set(this.model, "avatar", res.url);
      this.model.avatar = res.url;
    },
    // 保存数据
    async save() {
      //保存的时候需要进行条件判断 新建和编辑的请求方法不一样 post与put 路径也不一样、
      let res; // eslint-disable-line no-unused-vars
      // 通过id是否存在来判断是新建还是编辑
      if (this.id) {
        //如果有 编辑的方法
        res = await this.$http.put(`rest/heroes/${this.id}`, this.model); // eslint-disable-line no-unused-vars
      } else {
        //如果没有 新建方法
        res = await this.$http.post("rest/heroes", this.model); // eslint-disable-line no-unused-vars
      }
      this.$router.push("/heroes/list");
      this.$message({
        type: "success",
        message: "保存成功",
      });
    },
    //获取数据,实现自动填充我们需要修改的值
    async fetch() {
      const res = await this.$http.get(`rest/heroes/${this.id}`); // eslint-disable-line no-unused-vars
      this.model = Object.assign({}, this.model, res.data); //使用objcet.assign进行合并，避免model已有的属性被覆盖
    },
    //获取类型数据
    async fetchCategories() {
      const res = await this.$http.get(`rest/categories`); // eslint-disable-line no-unused-vars
      this.categories = res.data;
    },
    //获取装备数据
    async fetchItems() {
      const res = await this.$http.get(`rest/items`); // eslint-disable-line no-unused-vars
      this.items = res.data;
    },
  },
  created() {
    //creted生命周期根据id是否存在获取数据
    this.id && this.fetch();
    this.fetchCategories();
    this.fetchItems();
  },
};
</script>

<style></style>
