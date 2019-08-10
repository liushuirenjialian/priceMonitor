<template>
  <div class="dashboard-container">
    <el-row>
      <el-col :span="12">
        <el-card class="box-card">
          <el-tree :data="data" :props="defaultProps" :filter-node-method="filterNode" highlight-current :default-expanded-keys='defaultExpanded' ref="tree" @node-click="handleNodeClick"></el-tree>
        </el-card>
      </el-col>
      <el-col :span="10" v-show="isShow" style="margin-left:20px">
        <el-card class="box-card">
          <el-tree :data="data2" show-checkbox node-key="id" default-expand-all :default-checked-keys="checkedArr" :props="defaultProps2" ref="checkedTree" @check-change="getData1">
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
import { treeOrg, queryTree, allIndexTree, saveIndicator } from '@/api/indexManage/index'
export default {
  data() {
    return {
      isShow: false,
      defaultExpanded: [],
      expanded: [],
      data2: [],
      data: [],
      checkedArr: [],
      defaultProps: {
        label: 'orgName',
        value: 'orgCode',
        children: 'children'
      },
      defaultProps2: {
        children: 'children',
        label: 'indName',
        value: 'id'
      },
      // 多选树
      props: {
        label: 'name',
        children: 'zones'
      },
      count: 1,
      monitorForm: {
        indicatorIds: []
      }
    }
  },
  methods: {
    accept() {
      if (this.monitorForm.monitorId && this.monitorForm.indicatorIds.length > 0) {
        saveIndicator(this.monitorForm).then(res => {
          this.$message({
            type: 'success',
            message: '授权成功'
          })
        })
      } else {
        this.$message({
          type: 'warning',
          message: '请勾选指标'
        })
      }
    },
    getData1(key, data) {
      // if(this.monitorForm.monitorId){

      this.monitorForm.indicatorIds = this.$refs.checkedTree.getCheckedKeys()

      // }else{
      //   alert('请选择左侧节点')
      //   return
      // }

    },
    filterNode(value, data) {
      if (!value) return true;
      return data.orgName.indexOf(value.inputCon) !== -1 && data.orgType.indexOf(value.orgType) !== -1;
    },
    handleNodeClick(value) {
      this.isShow = true
      this.$refs.checkedTree.setCheckedKeys([]);
      this.monitorForm.monitorId = value.orgCode

      queryTree(value.orgCode).then(res => {
        this.checkedArr = res.data.indicatorIds
      })
    }
  },
  created() {
    treeOrg().then(res => {
      this.data.push(res.data);
      this.defaultExpanded.push(res.data.orgCode);
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
