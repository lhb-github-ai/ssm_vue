<template>

  <el-menu
    default-active="1"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    :unique-opened="true"

    style="height: 100%">
    <div class="logobox">
    </div>
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-menu"></i>
        <span>用户管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="1-1">
       <i class="iconfont icon-user"></i>
          <router-link to="/User">用户列表</router-link>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-menu"></i>
      <span slot="title">学院信息管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="2-1">
          <i class="iconfont icon-college-"></i>
          <router-link to="/College">学院信息列表</router-link>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="3">
      <template slot="title">
        <i class="el-icon-menu"></i>
        <span slot="title">班级信息管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="3-1">
          <i class="iconfont icon-class"></i>
          <router-link to="/Clazz">班级信息列表</router-link>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="4">
      <template slot="title">
        <i class="el-icon-menu"></i>
        <span slot="title">学生信息管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="4-1">
          <span class="iconfont icon-Student"></span>
          <router-link to="/Student">学生信息列表</router-link>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>

</template>

<script>
    export default {
        name: "Leftnav",
      methods: {
        handleOpen(key, keyPath) {

        },
        handleClose(key, keyPath) {

        }
      }
    }
</script>

<style scoped>

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    border: none;
    text-align: left;
  }
  .logobox {
    height: 40px;
    line-height: 40px;
    color: white;
    font-size: 20px;
    text-align: center;
    padding: 20px 0px;
  }
  .logoimg {
    height: 40px;
  }
  a {
    text-decoration: none;
    color: white;
  }

.iconfont{
  font-size: 25px;
  margin-right: 20px;
  margin-left: -20px;
}
</style>
