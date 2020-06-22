<template>
  <div>
  <el-table
    :data="Student"
    style="width: 100%"
    highlight-current-row v-loading="loading"
    border element-loading-text="拼命加载中"
    :row-class-name="tableRowClassName">
    <el-table-column
      prop="id"
      label="编号"
      width="100">
    </el-table-column>
    <el-table-column
      prop="studentId"
      label="学号"
      width="120">
    </el-table-column>
    <el-table-column
      prop="studentName"
      label="学生姓名"
      width="120">
    </el-table-column>
    <el-table-column
      prop="password"
      label="密码"
      width="120">
    </el-table-column>
    <el-table-column
      prop="sex"
      label="性别"
      width="115">
    </el-table-column>
    <el-table-column label="头像" width="140" >
      <template   slot-scope="scope">
        <img :src="scope.row.photo"  min-width="70" height="60" />
      </template>


    </el-table-column>
    <el-table-column
      prop="gradeName"
      label="学院名称"
      width="125">
    </el-table-column>
    <el-table-column
      prop="clazzName"
      label="班级名称"
      width="125">
    </el-table-column>
    <el-table-column
      prop="remark"
      label="备注" width="125">
    </el-table-column>
    <el-table-column
    >
      <template slot="header" slot-scope="scope">
        <div>操作</div>
      </template>
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="primary" @click="editStudent(scope.row)"
        >修改
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <!--    修改-->
  <el-dialog
    title="提示"
    :visible.sync="dialogEdit"
    width="30%"
    :before-close="handleClose">
    <el-form ref="form" :model="editFrom" label-width="80px" size="mini">
      <el-form-item label="id"  prop="id">
        <el-input v-model="editFrom.id" readonly></el-input>
      </el-form-item>
      <el-form-item label="学号" prop="name">
        <el-input v-model="editFrom.studentId" readonly></el-input>
      </el-form-item>
      <el-form-item label="学生姓名" prop="name">
        <el-input v-model="editFrom.studentName" ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="name">
        <el-input v-model="editFrom.password" ></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="name">
        <el-input v-model="editFrom.sex" ></el-input>
      </el-form-item>
      <el-form-item label="头像">
        <el-upload
          class="avatar-uploader"
          action="http://localhost:8085/filesystem/upload"
          name="file"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="editFrom.photo" :src="editFrom.photo" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="备注" prop="remark" >
        <el-input v-model="editFrom.remark"></el-input>
      </el-form-item>
      <el-form-item label="学院">
          <el-input v-model="editFrom.gradeName" readonly></el-input>
      </el-form-item>
      <el-form-item label="班级">
        <el-input v-model="editFrom.clazzName" readonly ></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
    <el-button @click="dialogEdit = false">取 消</el-button>
    <el-button type="primary" @click="editStudent2">提交</el-button>
  </span>
  </el-dialog>
</div>
</template>

<script>
  import { findPerson, update} from '@/api/Student'
  export default {
    name: 'Personal',
    data(){
      return{
        Student: [{
          id: '',
          imageUrl:'',
          studentId: '2',
          studentName: '是啥',
          password: '123',
          sex: '男',
          photo: '',
          src: '',
          clazzId: '1',
          clazzName: ' ',
          gradeId: '',
          gradeName: '',
          remark: '上海市普陀区金沙江路 1518 弄'
        }],
        loading:false,
        dialogImageUrl: '',
        dialogEdit: false,
        dialogVisible: false,
        user:'',
        editFrom: {
          id: '1',
          studentId: '2',
          studentName: '是啥',
          password: '123',
          sex: '男',
          photo: '',
          clazzId: '1',
          clazzName: 'dw ',
          gradeId: '23',
          gradeName: '三大',
          remark: '上海市普陀区金沙江路 1518 弄'

        }
      }
    },
    methods:{
      handleAvatarSuccess (res, file) {
        this.imageUrl = URL.createObjectURL(file.raw)
        this.editFrom.photo=URL.createObjectURL(file.raw)
        this.editFrom.photo = "http://120.79.195.245/"+res.fileId;

      },
      beforeAvatarUpload (file) {
        const isJPG = file.type === 'image/jpeg'
        const isLt1M = file.size / 1024 / 1024 < 1

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!')
        }
        if (!isLt1M) {
          this.$message.error('上传头像图片大小不能超过 1MB!')
        }
        return isJPG && isLt1M
      },
      handleSizeChange (size) {
        this.size = size
        this.findAllByPage(this.page, size)
      },
      tableRowClassName ({ row, rowIndex }) {
        if (rowIndex === 1) {
          return 'warning-row'
        } else if (rowIndex === 3) {
          return 'success-row'
        }
        return ''
      },
      handleClose (done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done()
          })
          .catch(_ => {
          })
      },
      editStudent (row) {
        this.dialogEdit = true
        console.log(row)
        this.editFrom.id = row.id
        this.editFrom.studentId = row.studentId
        this.editFrom.studentName = row.studentName
        this.editFrom.password = row.password
        this.editFrom.sex = row.sex
        this.editFrom.photo = row.photo
        this.editFrom.clazzName = row.clazzName
        this.editFrom.gradeId = row.gradeId
        this.editFrom.gradeName = row.gradeName
        this.editFrom.remark = row.remark
      },
      editStudent2 () {
        console.log(this.editFrom)
        this.$confirm('确认提交吗？')
          .then(_ => {
            update(this.editFrom).then(res => {
              console.log(res.data)
              if (res.data.type == 'success') {
                this.$message({
                  message: '修改成功',
                  type: 'success'
                })
                this.dialogEdit = false
                this.findPerson(this.user.studentName)
              } else {
                this.$message({
                  message: '提交失败',
                  type: 'error'
                })
              }
            })
          })
          .catch(_ => {
          })
      },
      findPerson(studentName){
        findPerson(studentName).then(res=>{
        // console.log(res.data.student);
       this.Student=res.data.student;
  })
      }
    },
    created () {
      var  user= JSON.parse(sessionStorage.getItem("user"));
      this.user=user
     this.findPerson(user.studentName)
    }
  }
</script>

<style scoped>

</style>
