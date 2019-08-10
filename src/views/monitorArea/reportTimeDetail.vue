<template>
  <div class="dashboard-container">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
      <el-form-item label="监测点等级" prop="name">
        <el-select v-model="ruleForm.value" placeholder="请选择">
          <el-option v-for="item in levelOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="开始时间" prop="name">
        <el-select v-model="ruleForm.value" placeholder="请选择">
          <el-option v-for="item in startOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="结束时间">
        <el-select v-model="ruleForm.value1" placeholder="请选择">
          <el-option v-for="item in startOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="mini" @click="submitForm('ruleForm')">增加</el-button>
        <el-button size="mini" @click="resetForm('ruleForm')">关闭</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>
<script>
export default {
  data() {
    return {
      levelOptions: [{
        value: '1',
        label: '一级监测点'
      }, {
        value: '2',
        label: '二级监测点'
      }, {
        value: '3',
        label: '三级监测点'
      }],
      startOptions: [{
        value: '1',
        label: '周一'
      }, {
        value: '2',
        label: '周二'
      }, {
        value: '3',
        label: '周三'
      }, {
        value: '3',
        label: '周四'
      }, {
        value: '3',
        label: '周五'
      }],
      ruleForm: {

      },
      rules: {
        name: [
          { required: true, message: '指标标准名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请输入显示顺序', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
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