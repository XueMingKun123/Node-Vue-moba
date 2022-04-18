<template>
  <div class="about">
    <h1>英雄列表</h1>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="230"> </el-table-column>
      <el-table-column prop="name" label="英雄名称"> </el-table-column>
      <el-table-column prop="title" label="称号"> </el-table-column>
      <el-table-column prop="avatar" label="头像"
        ><template slot-scope="scope">
          <img :src="scope.row.avatar" style="hight: 3rem" />
        </template>
      </el-table-column>

      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="$router.push(`/heroes/edit/${scope.row._id}`)"
            >编辑</el-button
          >
          <el-button type="text" size="small" @click="remove(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      items: [],
    };
  },
  methods: {
    //获取数据方法
    async fetch() {
      const res = await this.$http.get("rest/heroes");
      this.items = res.data;
    },
    //删除方法
    async remove(row) {
      this.$confirm(`是否确定删除分类"${row.name}"?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        const res = await this.$http.delete(`rest/heroes/${row._id}`); // eslint-disable-line no-unused-vars
        this.$message({
          type: "success",
          message: "删除成功!",
        });
        //删除成功后，再次获取数据
        this.fetch();
      });
    },
  },
  //created生命周期获取数据
  created() {
    //执行fetch方法
    this.fetch();
  },
};
</script>
