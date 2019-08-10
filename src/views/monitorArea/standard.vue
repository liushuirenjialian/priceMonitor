<template>
  <div class="dashboard-container">
    <el-form :model="peopleform" :inline="true" ref="peopleform">
      <el-row>
        <el-col :span="12">
          <div>
            <el-form-item label="指标标准名称" class="fourLabel" label-width="98px">
              <el-input placeholder="请输入" v-model="peopleform.standardName" clearable>
              </el-input>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <div>
            <el-button class="outButton" icon="el-icon-search" size="mini" @click="query" type="primary">查询</el-button>
            <!-- <el-button class="outButton" icon="el-icon-search" size="mini" type="primary">清空</el-button> -->
            <el-button class="outButton" icon="el-icon-search" size="mini" @click="addBtn" type="primary">新增</el-button>
          </div>
        </el-col>
      </el-row>
    </el-form>
    <el-row>
      <el-table tooltip-effect="dark" style="width: 100%;margin-top:10px;" align="center" border stripe highlight-current-rowv-loading="tableLoading" :data="tableData">
        <el-table-column align="center" label="序号" width="60">
          <template slot-scope="scope"><span>{{scope.$index+1}}</span></template>
        </el-table-column>
        <el-table-column align="center" :show-overflow-tooltip="true" label="指标标准名称" prop="standardName">
        </el-table-column>
        <el-table-column align="center" :show-overflow-tooltip="true" prop="description" label="备注">
        </el-table-column>
        <el-table-column width="300" label="操作">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="light" content="查看" placement="top">
              <el-button class="button" size="mini" type="primary" @click.stop="see('see',scope.row)">
                <i class="el-icon-zoom-in"></i>
              </el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="light" content="修改" placement="top">
              <el-button class="button" size="mini" type="primary" @click.stop="see('edit',scope.row)">
                <i class="el-icon-edit-outline"></i>
              </el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="light" content="删除" placement="top">
              <el-button class="button" size="mini" type="primary" @click.stop="deleteFn(scope.row)">
                <i class="el-icon-delete"></i>
              </el-button>
            </el-tooltip>

          </template>
        </el-table-column>
      </el-table>
      <!-- 分页开始 -->
      <div class="pagination-container">
        <el-pagination class="right" :current-page.sync="limit.page" :page-size="limit.size" :page-sizes="[10,20,30,40]" :total="limit.total" @size-change="handleChangeSize" @current-change="handleCurrentChangePage" layout="total, sizes, prev, pager, next, jumper">
        </el-pagination>
      </div>
    </el-row>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { standardpage, standardDelete } from '@/api/indexManage/index'
export default {
  name: 'Daily',
  data() {
    return {
      peopleform: {},
      yearArr: [{
        index: 1,
        value: '发布'
      }],
      status: [{
        index: 1,
        dictName: '未提交',
      }, {
        index: 2,
        dictName: '已提交',
      }, {
        index: 3,
        dictName: '审核通过',
      }, {
        index: 4,
        dictName: '驳回',
      }],
      dataDictioPubArr: [{
        index: 1
      }],
      tableData: [{
        index: 1
      }],
      limit: {
        page: 1,
        size: 10,
        total: 0
      }
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  methods: {
    deleteFn(row) {
      let arr = [];
      arr.push(row.id)
      standardDelete(arr).then(res => {
        this.$message({
          type: "success",
          message: '删除成功'
        })
        this.getAll(this.limit, {})
      })
    },
    see(state, row) {
      if (state === 'see') {
        this.$router.push({ path: '/monitorArea/standardDetail', query: { id: row.id, state: 'detail' } })
      } else {
        this.$router.push({ path: '/monitorArea/standardDetail', query: { id: row.id, state: 'update' } })
      }
    },
    handleChangeSize(value) {
      this.limit.size = value
      this.getAll(this.limit, {})
    },
    handleCurrentChangePage(value) {
      this.limit.page = value
      this.getAll(this.limit, {})
    },
    addBtn() {
      this.$router.push({ path: '/monitorArea/standardDetail' })
    },

    getAll(obj, data) {
      standardpage(obj, data).then(res => {
        this.tableData = res.data.resultList
        this.limit.total = res.data.total
      })
    },
    query() {
      this.getAll(this.limit, this.peopleform)
    }
  },
  mounted() {
    this.getAll(this.limit, {})
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
