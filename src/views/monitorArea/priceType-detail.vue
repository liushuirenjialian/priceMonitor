<template>
  <div class="dashboard-container">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
      <el-form-item label="价格类型名称" prop="priceTypeName">
        <el-input v-model="ruleForm.priceTypeName" :disabled="isShow"></el-input>
      </el-form-item>
      <el-form-item label="使用年份" required>
        <el-col :span="11">
          <el-form-item prop="useYear">
            <el-select class="wdh" placeholder="请选择" :disabled="isShow" v-model="ruleForm.useYear">
              <el-option :key="item.index" :label="item" :value="item" v-for="item in dateyear">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="描述">
        <el-input type="textarea" :disabled="isShow" v-model="ruleForm.description"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="mini" @click="submitForm('ruleForm')" :disabled="isShow">增加</el-button>
        <el-button size="mini" @click="resetForm('ruleForm')">关闭</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { updatePriceType, priceTypeDetails, savePriceType } from '@/api/indexManage/index'

export default {
  data() {
    return {
      isShow: false,
      dateyear: [],
      ruleForm: {

      },
      rules: {
        priceTypeName: [
          { required: true, message: '请输入价格类型名称', trigger: 'blur' },
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],

      }
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