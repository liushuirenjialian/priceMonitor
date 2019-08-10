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
          <!-- <el-tree :data="data1" show-checkbox node-key="id" default-expand-all :default-expanded-keys="expanded" :default-checked-keys="checkedArr" :props="defaultProps2" ref="checkedTree" @check-change="getData1">
          </el-tree> -->

          <el-table :data="tableData" ref="multipleTable" border style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column prop="priceTypeName" label="类型名称" width="180">
            </el-table-column>
            <el-table-column label="环比伐值">
              <template slot-scope="scope">
                <el-input v-model='scope.row.momVal'></el-input>
              </template>
            </el-table-column>
          </el-table>

        </el-card>
      </el-col>
    </el-row>
    <el-row style="margin-top:10px">
      <el-button type="primary" size="mini" @click="accept">授权</el-button>
    </el-row>

  </div>
</template>
<script>
import { allIndexTree, getPriceTable, priceTypeSave, queryPriceType } from '@/api/indexManage/index'
export default {
  data() {
    return {
      isShow: false,
      tableData: [],
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
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(value) {
      // value.some(item => {
      //   console.log(item.momVal)
      // })
      this.monitorForm.priceTypeVO = value
    },
    accept() {
      if (this.monitorForm.priceTypeVO.length > 0) {
        this.monitorForm.priceTypeVO.some(item => {
          console.log(item.momVal)
          if (item.momVal === "") {
            alert('请填写环比伐值')
          } else {
            priceTypeSave(this.monitorForm).then(res => {
              this.$message({
                type: 'success',
                message: '授权成功'
              })
            })
          }
        })
      } else {
        alert('请选择价格类型')
      }
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.orgName.indexOf(value.inputCon) !== -1 && data.orgType.indexOf(value.orgType) !== -1;
    },
    handleNodeClick(value) {
      this.isShow = true
      this.toggleSelection();
      this.tableData.map(item => {
        item.momVal = ""
      })
      this.monitorForm.indicatorId = value.id

      queryPriceType(value.id).then(res => {
        for (let i = 0; i < res.data.priceTypeVO.length; i++) {
          if (res.data.priceTypeVO[i].id === this.tableData[i].id) {
            this.toggleSelection([this.tableData[i]])
            this.tableData[i].momVal = res.data.priceTypeVO[i].momVal
          }
        }
      })
    }
  },
  created() {
    getPriceTable().then(res => {
      this.tableData = res.data.resultList
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
