<template>
  <div>
    <h1>欢迎您:</h1> <h1>{{name}} {{role}}</h1>
  </div>
</template>

<script>

export default {
  data () {
    return {
            name:'',
            role:''
    }
  },
  methods: {

  },
  created () {
    var  user= JSON.parse(sessionStorage.getItem("user"));
    console.log(user)
   if(user.studentName!=null){
     this.name=user.studentName
     this.role=user.role
   }
   else {
     this.name=user.username
     this.role=user.role
   }
  }
}
</script>

<style  >

</style>
