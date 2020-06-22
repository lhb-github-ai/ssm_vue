<template>
  <el-menu
    :default-active="activeIndex2"
    class="el-menu-demo"
    mode="horizontal"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    :data="userData">

    <el-submenu index="2" class="submenu" >
       <template slot="title" class="aaa">{{user.role}} &#8195;&#8195;&#8195;</template>
      <el-menu-item index="2-3" @click="logout">退出</el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>

export default {
  name: 'Topnav',
  data () {
    return {
      user:'',
      activeIndex: '1',
      activeIndex2: '1',
      userData: []
    }

  },
  methods:{
    logout(){
      window.sessionStorage.clear()
      this.$router.push("/")
    }
  },
  created () {
    var  user= JSON.parse(sessionStorage.getItem("user"));
    this.user=user
  }

}
</script>

<style scoped>
  .submenu {
    float: left;
  }
  .aaa{
   size: 100px;
  }
</style>
