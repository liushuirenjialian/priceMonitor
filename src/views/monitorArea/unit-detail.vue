<template>
  <div class="dashboard-container">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
      <el-form-item label="指标单位名称" prop="unitName">
        <el-input v-model="ruleForm.unitName" :disabled="isShow"></el-input>
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
import { saveUnit, unitDetails, updateUnit } from '@/api/indexManage/index'
export default {
  data() {
    return {
      isShow: false,
      ruleForm: {
      },
      rules: {
        unitName: [
          { required: true, message: '指标单位名称', trigger: 'blur' },
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      }
    };
  },
  created() {
    if (this.$route.query.id) {
      unitDetails(this.$route.query.id).then(res => {
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
            updateUnit(this.ruleForm).then(res => {
              this.$message({
                type: "success",
                message: '修改成功'
              })
            })
          } else {
            saveUnit(this.ruleForm).then(res => {
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