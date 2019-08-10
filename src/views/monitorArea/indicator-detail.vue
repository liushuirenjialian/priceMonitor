<template>
  <div class="dashboard-container">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
      <el-form-item label="指标名称" prop="indName">
        <el-input v-model="ruleForm.indName" :disabled="isShow"></el-input>
      </el-form-item>
      <el-form-item label="使用年份" prop="useYear">
        <el-select class="wdh" placeholder="请选择" :disabled="isShow" v-model="ruleForm.useYear">
          <el-option :key="item.index" :label="item" :value="item" v-for="item in dateyear">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="指标代码" prop="indCode">
        <el-input v-model="ruleForm.indCode" :disabled="isShow"></el-input>
      </el-form-item>
      <el-form-item label="英文代码" prop="ensCode">
        <el-input v-model="ruleForm.ensCode" :disabled="isShow"></el-input>
      </el-form-item>
      <el-form-item label="级别" required>
        <el-col :span="11">
          <el-form-item prop="indLevel">
            <el-select :disabled="isShow" v-model="ruleForm.indLevel" placeholder="请选择">
              <el-option v-for="(item,index) in levelOptions" :key="index" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="类型" required>
        <el-col :span="11">
          <el-form-item prop="indType">
            <el-select :disabled="isShow" v-model="ruleForm.indType" placeholder="请选择">
              <el-option v-for="(item,index) in typeOptions" :key="index" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="父指标" prop="pind1">
        <el-cascader :disabled="isShow" v-model="ruleForm.pind1" change-on-select :options="options" :props="props">
        </el-cascader>
      </el-form-item>
      <el-form-item label="叶子节点" prop="isChild">
        <el-radio :disabled="isShow" v-model="ruleForm.isChild" label="1">是</el-radio>
        <el-radio :disabled="isShow" v-model="ruleForm.isChild" label="0">否</el-radio>

      </el-form-item>

      <el-form-item label="描述" prop="description">
        <el-input :disabled="isShow" type="textarea" v-model="ruleForm.description"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="mini" @click="submitForm('ruleForm')">增加</el-button>
        <el-button size="mini" @click="resetForm('ruleForm')" :disabled="false">关闭</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>
<script>
import { indexTree, saveIndex, indexDetails, updateIndex } from '@/api/indexManage/index'
export default {
  data() {
    return {
      isShow: false,
      pind: [],
      dateyear: [],
      props: {
        value: 'id',
        label: 'indName',
        children: 'children'
      },
      levelOptions: [{
        value: '1',
        label: '一级'
      }, {
        value: '2',
        label: '二级'
      }, {
        value: '1',
        label: '三级'
      }, {
        value: '2',
        label: '四级'
      }],
      typeOptions: [{
        value: '1',
        label: '原粮'
      }, {
        value: '2',
        label: '成品粮'
      }, {
        value: '3',
        label: '食用油及油料'
      }],
      options: [],
      selectedOptions: [],
      ruleForm: {
        isChild: '1',
        pind1: []
      },
      rules: {
        indName: [
          { required: true, message: '请输入指标名称', trigger: 'blur' },
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        pind: [
          { required: true, message: '请选择父指标', trigger: 'blur' }
        ],
        useYear: [
          { required: true, message: '请选择年份', trigger: 'change' }
        ],
        indCode: [
          { required: true, message: '请输入指标代码', trigger: 'blur' }
        ],
        indType: [
          { required: true, message: '请选择类型', trigger: 'change' }
        ],
        indLevel: [
          { required: true, message: '请选择级别', trigger: 'change' }
        ],
        ensCode: [
          { required: true, message: '请输入英文编码', trigger: 'blur' }
        ],
        isChild: [{
          required: true, message: '请选择叶子节点', trigger: 'change'
        }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.ruleForm.pind = this.ruleForm.pind1[this.ruleForm.pind1.length - 1]
          if (this.$route.query.state === 'update') {
            console.log(this.ruleForm)
            updateIndex(this.ruleForm).then(res => {
              this.$message({
                type: "success",
                message: '修改成功'
              })
            })
          } else {
            saveIndex(this.ruleForm).then(res => {
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
  },
  created() {
    indexTree().then(res => {
      this.options = res.data
    })

    if (this.$route.query.id) {
      indexDetails(this.$route.query.id).then(res => {
        this.ruleForm = res.data
        this.ruleForm.pind1 = res.data.pindList;
      })
    }
    if (this.$route.query.state === 'detail') {
      this.isShow = true
    } else {

    }

    let date = new Date()
    let year = date.getFullYear()
    let peopleYear = date.getFullYear()
    for (var i = 0; i < 80; i++) {
      this.dateyear.push(year)
      year = year - 1
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