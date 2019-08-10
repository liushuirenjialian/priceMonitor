<template>
  <div class="dashboard-container">
    <el-row>
      <el-col :span="12">
        <el-card class="box-card">
          <el-tree :data="data2" highlight-current node-key="id" default-expand-all :default-expanded-keys="expanded" :props="defaultProps" ref="checkedTree" @node-click="handleNodeClick">
          </el-tree>
        </el-card>
      </el-col>
      <el-col :span="10" v-show="isShow" style="margin-left:20px">
        <el-card class="box-card">
          <el-tree :data="data1" show-checkbox node-key="id" default-expand-all :default-expanded-keys="expanded" :default-checked-keys="checkedArr" :props="defaultProps2" ref="checkedTree" @check-change="getData1">
          </el-tree>

        </el-card>
      </el-col>
    </el-row>
    <el-row style="margin-top:10px">
      <el-button type="primary" size="mini" @click="accept">授权</el-button>
    </el-row>

  </div>
</template>
<script>
import { allIndexTree, getInstand, saveIndicatorStand, checkStandTree } from '@/api/indexManage/index'
export default {
  data() {
    return {
      isShow: false,
      defaultExpanded: [],
      expanded: [],
      data2: [],
      data1: [],
      checkedArr: [],
      defaultProps: {
        label: 'indName',
        value: 'id',
        children: 'children'
      },
      defaultProps2: {
        children: 'children',
        label: 'standardName',
        value: 'id'
      },
      // 多选树
      props: {
        label: 'name',
        children: 'zones'
      },
      count: 1,
      monitorForm: {}
    }
  },
  methods: {
    accept() {
      if (this.monitorForm.indicatorId && this.monitorForm.standardIds.length > 0) {
        saveIndicatorStand(this.monitorForm).then(res => {
          this.$message({
            type: 'success',
            message: '授权成功'
          })
        })
      } else {
        this.$message({
          type: 'warning',
          message: '请勾选指标等级'
        })
      }

    },
    getData1(key, data) {
      this.monitorForm.standardIds = this.$refs.checkedTree.getCheckedKeys()

    },
    filterNode(value, data) {
      if (!value) return true;
      return data.orgName.indexOf(value.inputCon) !== -1 && data.orgType.indexOf(value.orgType) !== -1;
    },
    handleNodeClick(value) {
      this.isShow = true
      this.$refs.checkedTree.setCheckedKeys([]);
      this.monitorForm.indicatorId = value.id

      checkStandTree(value.id).then(res => {
        this.checkedArr = res.data.standardIds
      })
    }
  },
  created() {
    getInstand().then(res => {
      let pObj = {
        standardName: '指标标准树',
        children: res.data.resultList
      }
      this.data1.push(pObj)
      // this.defaultExpanded.push(res.data.orgCode); 
    })
    allIndexTree().then(res => {
      this.data2 = res.data
    })
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
