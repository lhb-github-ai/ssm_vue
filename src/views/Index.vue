<template>
  <el-container style="height: 100vh" >
    <el-aside width="200px" >
      <leftnav></leftnav>
    </el-aside>
    <el-container style="width: 100vw" direction="vertical">
      <el-header style="padding: 0px">
        <topnav></topnav>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>

  </el-container>
</template>

<script>
import Leftnav from './public/Leftnav'
import Topnav from './public/Topnav'
import test from "./test"
export default {
  name: 'Index',
  components: { Topnav, Leftnav,test }
}
</script>

<style scoped>

</style>
