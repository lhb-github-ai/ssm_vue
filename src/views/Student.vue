/* eslint-disable eqeqeq */
/* eslint-disable eqeqeq */
<template>
  <div>
    <el-button size="small" type="primary" icon="el-icon-plus" @click="xinzeng()" style="float:left">新增
    </el-button>
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
          <el-button @click="deleteStudent(scope.row)"
                     type="danger" size="small"
          >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row>
      <el-col :span="0.5" :offset="6">
        <el-pagination
          background
          layout="total,prev, pager, next, jumper, sizes"
          prev-text="上一页"
          next-text="下一页"
          :current-page="page"
          :page-size="size"
          :page-sizes="[2, 4, 6, 8,10]"
          @current-change="findPage"
          @size-change="handleSizeChange"
          :total="totals">
        </el-pagination>
      </el-col>
    </el-row>

    <!--新增-->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <el-form ref="form" :model="addFrom" label-width="80px" size="mini">
        <el-form-item label="学号">
          <el-input v-model="addFrom.studentId"></el-input>
        </el-form-item>
        <el-form-item label="学生姓名">
          <el-input v-model="addFrom.studentName"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="addFrom.password"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-input v-model="addFrom.sex"></el-input>
        </el-form-item>
        <el-form-item label="头像">
          <el-upload
            class="avatar-uploader"
            action="http://localhost:8085/filesystem/upload"
            name="file"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="学院" >

          <el-select v-model="addFrom.gradeId" clearable placeholder="请选择" style="width: 340px" @change="currentSel">
            <el-option
              v-for="item in college"
              :key="item.gradeId"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="班级">
          <el-select v-model="addFrom.clazzId" clearable placeholder="请选择" style="width: 340px">
            <el-option
              v-for="item in clazz"
              :key="item.clazzId"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="addFrom.remark"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addStudent">提交</el-button>
  </span>
    </el-dialog>

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
          <el-select v-model="editFrom.gradeName" clearable placeholder="请选择" style="width: 340px" @change="currentSel2">
            <el-option
              v-for="item in college"
              :key="item.name"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="班级">
          <el-select v-model="editFrom.clazzName" clearable placeholder="请选择" style="width: 340px">
            <el-option
              v-for="item in clazz"
              :key="item.clazzName"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
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

import { findAll, save, deleteStudent, update, findAllCollege, findAllClazz ,findAllClazzName} from '@/api/Student'

export default {
  name: 'User',
  data () {
    return {
      loading: false,
      college: [{
        id: '选项1',
        name: '黄金糕'
      }, {
        id: '选项2',
        name: '双皮奶'
      }],
      clazz: [{
        id: '',
        name: ''
      }],
      imageUrl: '',
      dialogImageUrl: '',
      dialogEdit: false,
      dialogVisible: false,
      Student: [{
        id: '1',
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
      loading: '',
      search: '',
      page: 1,
      size: 4,
      totals: 0,
      addFrom: {},
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
  methods: {
    currentSel (selVal) {
      this.id = selVal.id
      findAllClazz(selVal).then(res => {
        this.clazz = res.data.clazzes
        // console.log(res.data)
      })
    },
    currentSel2 (selVal) {
     this.editFrom.clazzName=''
      findAllClazzName(selVal).then(res => {
         this.clazz = res.data.clazzes
        console.log(res.data)
       })
      console.log(selVal)
    },
    xinzeng () {
      this.dialogVisible = true
    },
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
      this.editFrom.photo=URL.createObjectURL(file.raw)
      this.addFrom.photo = "http://120.79.195.245/"+res.fileId;
      this.editFrom.photo = "http://120.79.195.245/"+res.fileId;
      console.log(this.addFrom.photo)
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
    findPage (page) {
      this.page = page
      this.findAllByPage(page, this.size)
    },
    findAllByPage () {
      this.loading = true;
      findAll(this.page, this.size).then(res => {
        this.loading = false;
        // this.Student=res.li
        this.Student = res.data.list
        console.log(res.data.list)
        this.total = res.data.total
        this.page = res.data.pageNum
        this.size = res.data.pageSize
        this.totals = res.data.total

      })
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
    addStudent () {
      console.log(this.addFrom)
      this.$confirm('确认提交吗？')
        .then(_ => {
          save(this.addFrom).then(res => {
            console.log(res.data)
            if (res.data.type == 'success') {
              this.$message({
                message: '添加成功',
                type: 'success'
              })
              this.dialogVisible = false
              this.findAllByPage()
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
    deleteStudent (row) {
      // console.log(row.id)
      this.$confirm('确认删除？')
        .then(_ => {
          deleteStudent(row.id).then(res => {
            if (res.data.type == 'success') {
              this.$message({
                message: '删除成功',
                type: 'success'
              })
              this.findAllByPage()
            } else {
              this.$message({
                message: '删除失败',
                type: 'error'
              })
            }
          })
            .catch(_ => {
            })
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
      findAllClazz(row.gradeId).then(res => {
        this.clazz = res.data.clazzes
        // console.log(res.data)
      })
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
              this.findAllByPage()
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
    }
  },
  created () {
    this.findAllByPage()
    findAllCollege().then(res => {
      this.college = res.data.list
    })
  }
}
</script>

<style scoped>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
