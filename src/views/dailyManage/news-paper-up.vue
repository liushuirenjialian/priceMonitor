<template>
  <div class="dashboard-container">
    <div class="dashboard-text">
     <el-form :model="peopleform" :inline="true" label-width="80px" ref="peopleform">
      <el-row>
          <el-col :span="8">
          <div>
            <el-form-item label="标题" class="fourLabel">
              <el-input placeholder="请输入" v-model="peopleform.companyName" clearable>
              </el-input>
            </el-form-item>
          </div>
        </el-col>
      
        <el-col :span="6"  :offset="10">
          <div>
            <el-button class="outButton" icon="el-icon-search" size="mini" type="primary">查询</el-button>
             <el-button class="outButton" icon="el-icon-search" size="mini" type="primary">新增</el-button>
          </div>
        </el-col>
        
      </el-row>
    </el-form>
    </div>
  </div>
</template>

<script>

export default {
  name: 'newsPaper',
  data(){
   return{
     peopleform:{

     }
   }
  },
  computed: {

  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  // &-text {
  //   font-size: 30px;
  //   line-height: 46px;
  // }
}
</style>
