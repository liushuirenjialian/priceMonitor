<template>
  <div class="dashboard-container">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
      <el-form-item label="指标标准名称" prop="standardName">
        <el-input v-model="ruleForm.standardName" :disabled="isShow"></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input type="textarea" v-model="ruleForm.description" :disabled="isShow"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="mini" @click="submitForm('ruleForm')" :disabled="isShow">增加</el-button>
        <el-button size="mini" @click="resetForm('ruleForm')">关闭</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>
<script>
import { saveStandard, standardDetails, updateStandard } from '@/api/indexManage/index'
export default {
  data() {
    return {
      isShow: false,
      ruleForm: {

      },
      rules: {
        standardName: [
          { required: true, message: '指标标准名称', trigger: 'blur' },
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],

      }
    };
  },
  created() {
    if (this.$route.query.id) {
      standardDetails(this.$route.query.id).then(res => {
        this.ruleForm = res.data
      })
    }
    if (this.$route.query.state === 'detail') {
      this.isShow = true
    }
  },
  methods: {

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.$route.query.state === 'update') {
            updateStandard(this.ruleForm).then(res => {
              this.$message({
                type: "success",
                message: '修改成功'
              })
            })
          } else {
            saveStandard(this.ruleForm).then(res => {
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