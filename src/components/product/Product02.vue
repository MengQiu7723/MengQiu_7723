<template>
  <div class="custom-tree-container">
    <!--面包屑导航区-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div class="block">
        <p>商品分类</p>
        <el-tree
          :data="data"
          :props="defaultProps"
          show-checkbox
          node-key="id"
          default-expand-all
          :expand-on-click-node="false"
        >
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>{{ node.label }}</span>
            <span>
              <el-button type="text" size="mini" @click="() => append(data)">
                +
              </el-button>
              <el-button
                type="text"
                size="mini"
                @click="() => remove(node, data)"
              >
                Delete
              </el-button>
            </span>
          </span>
        </el-tree>
      </div>
    </el-card>
  </div>
</template>

<script>
let id = 1000
export default {
  data() {
    const data = []
    return {
      data: JSON.parse(JSON.stringify(data)),
      id: '',
      defaultProps: {
        children: 'children',
        label: 'name',
      },
    }
  },
  created() {
    this.getBookTreeList()
  },
  methods: {
    iseEdit() {
      return 'sdf'
    },

    handleNodeClick(data) {
      console.log(data)
    },
    async getBookTreeList() {
      //get请求
      const { data: res } = await this.$http.get(
        'booksClass/selectAllWithBooksClass'
      )
      if (res.code == 0) {
        this.data = res.data
      } else if (res.code == 1) {
        this.$message.error(res.msg + '，登录失败！')
      }
    },
    append(data) {
      const newChild = { id: id++, label: 'testtest', children: [] }
      if (!data.children) {
        this.$set(data, 'children', [])
      }
      data.children.push(newChild)
    },
    remove(node, data) {
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex((d) => d.id === data.id)
      children.splice(index, 1)
    },
    renderContent(h, { node, data }) {
      return (
        <span class="custom-tree-node">
          <span>{node.label}</span>
          <span>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.append(data)}
            >
              Append
            </el-button>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.remove(node, data)}
            >
              Delete
            </el-button>
          </span>
        </span>
      )
    },
  },
}
</script>

<style lang="less" scoped>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>