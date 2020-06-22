<template>
  <div>
    <el-button size="small" type="primary" icon="el-icon-plus" @click="dialogVisible = true" style="float:left">新增
    </el-button>
    <el-table
      :data="Clazz"
      style="width: 100%"
      highlight-current-row v-loading="loading"
      border element-loading-text="拼命加载中"
      :row-class-name="tableRowClassName">
      <el-table-column
        prop="id"
        label="编号"
        width="260">
      </el-table-column>
      <el-table-column
        prop="name"
        label="班级名称"
        width="260">
      </el-table-column>
      <el-table-column
        prop="gradeName"
        label="学院名称" width="260">
      </el-table-column>
      <el-table-column
        prop="remark"
        label="备注" width="260">
      </el-table-column>
      <el-table-column
      >
        <template slot="header" slot-scope="scope">
          <div>操作</div>
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary" @click="editClazz(scope.row)"
          >修改
          </el-button>
          <el-button @click="deleteClazz(scope.row)"
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
        <el-form-item label="班级名称">
          <el-input v-model="addFrom.name"></el-input>
        </el-form-item>
        <el-form-item label="学院">
          <el-select v-model="addFrom.gradeId" clearable placeholder="请选择" style="width: 340px">
            <el-option
              v-for="item in college"
              :key="item.gradeId"
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
    <el-button type="primary" @click="addClazz">提交</el-button>
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
        <el-form-item label="班级名称" prop="name">
          <el-input v-model="editFrom.name"></el-input>
        </el-form-item>
        <el-form-item label="学院名称" prop="gradeName" >
          <el-select v-model="editFrom.gradeName" clearable placeholder="请选择" style="width: 340px">
            <el-option
              v-for="item in college"
              :key="item.gradeName"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="remark" >
          <el-input v-model="editFrom.remark"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogEdit = false">取 消</el-button>
    <el-button type="primary" @click="editClazz2">提交</el-button>
  </span>
    </el-dialog>

  </div>
</template>

<script>

import { findAll, save, deleteClazz, update, findAllCollege } from '@/api/Clazz'
export default {
  name: 'Clazz',
  data () {
    return {
      $loading:false,
      college: [{
        id: '选项1',
        name: '黄金糕'
      }, {
        id: '选项2',
        name: '双皮奶'
      }],
      value: '',
      dialogEdit: false,
      dialogVisible: false,
      Clazz: [{
        id: '2',
        name: '123',
        gradeName: '312312',
        gradeId: '2',
        remark: '3213123'
      }, {
        id: '2',
        name: '123',
        gradeName: '312312',
        gradeId: '2',
        remark: '3213123'
      }],
      loading: '',
      search: '',
      page: 1,
      size: 4,
      totals: 0,
      addFrom: {},
      editFrom: {
        gradeId: '2',
        name: '张三',
        gradeName: '312312',
        remark: '3213123'
      }

    }
  },
  methods: {
    handleSizeChange (size) {
      this.size = size
      this.findAllByPage(this.page, size)
    },
    findPage (page) {
      this.page = page
      this.findAllByPage(page, this.size)
    },
    findAllByPage () {
      this.loading=true;
      findAll(this.page, this.size).then(res => {
        // this.Clazz=res.li
        this.loading=false
        this.Clazz = res.data.list
        // console.log(res.data.list)
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
    addClazz () {
      // console.log(this.addFrom);
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
              this.addFrom.Clazzname = ''
              this.addFrom.password = ''
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
    deleteClazz (row) {
      // console.log(row.id)
      this.$confirm('确认删除？')
        .then(_ => {
          deleteClazz(row.id).then(res => {
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
    editClazz (row) {
      this.dialogEdit = true
      // console.log(row)
      this.editFrom.id = row.id
      this.editFrom.name = row.name
      this.editFrom.gradeName = row.gradeName
      this.editFrom.remark = row.remark
      this.gradeId = row.gradeId
    },
    editClazz2 () {
      console.log(this.editFrom)
      this.$confirm('确认提交吗？')
        .then(_ => {
          update(this.editFrom).then(res => {
            // console.log(res.data)
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
</style>
