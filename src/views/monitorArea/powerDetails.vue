<template>
  <div class="dashboard-container">
    <el-form :model="peopleform" :inline="true" ref="peopleform">
      <el-row>
        <el-col :span="8">
          <div>
            <el-form-item label="权重代码" class="fourLabel" label-width="80px">
              <el-input placeholder="自动生成" :disabled="true" v-model="peopleform.priceTypeName" clearable>
              </el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div>
            <el-form-item label="权重名称" class="fourLabel" label-width="80px">
              <el-input placeholder="自动生成" :disabled="true" v-model="peopleform.priceTypeName" clearable>
              </el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div>
            <el-form-item label="权重类别" class="fourLabel" label-width="80px">
              <el-select class="wdh" placeholder="请选择" v-model="peopleform.companyHierarchy" clearable>
                <el-option v-for="item in powerType" :key="item.value" :label="item.dictName" :value="item.dictName"></el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column label="序号" width="180">
          <template slot-scope="scope"><span>{{scope.$index+1}}</span></template>
        </el-table-column>
        <el-table-column prop="date" label="品种" width="180">
        </el-table-column>
        <el-table-column prop="name" label="备注" width="180">
        </el-table-column>
        <el-table-column label="权重值">
          <template slot-scope="scope">
            <el-input v-model='scope.row.name'></el-input>
          </template>
        </el-table-column>
      </el-table>
      <el-row style="margin-top:20px;">
        <el-col :span="8">
          <div>
            <el-form-item label="状态" class="fourLabel" label-width="80px">
              <el-select class="wdh" placeholder="请选择" v-model="peopleform.companyHierarchy" clearable>
                <el-option v-for="item in status" :key="item.value" :label="item.dictName" :value="item.dictName"></el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div>
            <el-form-item label="维护人员" class="fourLabel" label-width="80px">
              <el-input placeholder="自动生成" :disabled="true" v-model="peopleform.priceTypeName" clearable>
              </el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div>
            <el-form-item label="维护日期" class="fourLabel" label-width="80px">
              <el-date-picker v-model="peopleform.value6" type="date">
              </el-date-picker>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item>
          <el-button type="primary" size="mini" @click="submitForm('ruleForm')" :disabled="isShow">增加</el-button>
          <el-button size="mini" @click="resetForm('ruleForm')">关闭</el-button>
        </el-form-item>
      </el-row>

    </el-form>
  </div>
</template>
<script>
import { updatePriceType, priceTypeDetails, savePriceType } from '@/api/indexManage/index'

export default {
  data() {
    return {
      powerType: [{
        dictName: '全部',
        vaule: '1'
      }, {
        dictName: '集贸零售',
        vaule: '2'
      }, {
        dictName: '集贸批发',
        vaule: '3'
      }],
      status: [{
        dictName: '禁用',
        vaule: '1'
      }, {
        dictName: '应用',
        vaule: '1'
      }],
      isShow: false,
      dateyear: [],
      peopleform: {

      },
      rules: {
        priceTypeName: [
          { required: true, message: '请输入价格类型名称', trigger: 'blur' },
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ]
      },
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    };
  },
  created() {
    let date = new Date()
    let year = date.getFullYear()
    let peopleYear = date.getFullYear()
    for (var i = 0; i < 80; i++) {
      this.dateyear.push(year)
      year = year - 1
    }

    if (this.$route.query.id) {
      priceTypeDetails(this.$route.query.id).then(res => {
        this.ruleForm = res.data
      })
    }
    if (this.$route.query.state === 'detail') {
      this.isShow = true
    }

  },
  methods: {
    // 级联选择器
    handleChange(value) {
      console.log(value);
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.$route.query.state === 'update') {
            updatePriceType(this.ruleForm).then(res => {
              this.$message({
                type: "success",
                message: '修改成功'
              })
            })
          } else {
            savePriceType(this.ruleForm).then(res => {
              this.$message({
                type: "success",
                message: '保存成功'
              })
            })
          }
          this.$router.go(-1)
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      // this.$refs[formName].resetFields();
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>