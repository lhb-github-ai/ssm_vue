Clazz.vue
College.vue
Index.vue
Login.vue
Student.vue
User.vue<template>
  <el-menu
    :default-active="activeIndex2"
    class="el-menu-demo"
    mode="horizontal"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    :data="userData">

    <el-submenu index="2" class="submenu">
      <!-- <template slot="title">{{user.userRealName}}</template> -->
      <template slot="title">
        <i class="el-icon-user-solid"></i>
        <span>{{userData.name}}</span>
      </template>
      <el-menu-item index="2-1">设置</el-menu-item>
      <el-menu-item index="2-2" >退出</el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>

    export default {
        name: "Topnav",
      data() {
        return {
          activeIndex: '1',
          activeIndex2: '1',
          userData:[]
        };
      },
    }
</script>

<style scoped>
  .submenu {
    float: right;
  }
</style>
