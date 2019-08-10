<template>
  <div class="menuList-wrap">
    <el-scrollbar class="live-scrollbar">
      <el-menu router :default-active="$route.path" class="el-menu-vertical-demo" background-color="#F4F5F8" text-color="#797979" active-text-color="#fff">

        <Menu-item :routes="routes"></Menu-item>
      </el-menu>
    </el-scrollbar>
  </div>

</template>

<script>
import MenuItem from "@/components/Layout/menuList/menuItem"
import { mapGetters } from 'vuex'
export default {
  name: "menuList",
  components: {
    MenuItem,
  },
  data() {
    return {
      // routes:[]
    }
  },
  created() {
    // this.routes = JSON.parse(sessionStorage.getItem('leftMenuList')).children
  },
  computed: {
    ...mapGetters([
      'index'
    ]),
    routes() {
      // 拿到业务管理数据
      const myroutes = JSON.parse(sessionStorage.getItem('xzdata')).children
      return myroutes
      // const index = this.index;
      // const myroutes = JSON.parse(sessionStorage.getItem('xzdata'))
      // const routes = myroutes.children[index].children
      // return routes
    },
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<style scoped>
.menuList-wrap {
  height: 500px;
}
.live-scrollbar {
  height: 100%;
}
/*   隐藏 横向滚动条*/
.el-scrollbar /deep/ .el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>
