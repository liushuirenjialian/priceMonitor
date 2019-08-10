<template>
  <div class="dashboard-container">
    <el-form :model="peopleform" :inline="true" label-width="88px" ref="peopleform">
      <el-row>
        <el-col :span="8">
          <div>
            <el-form-item label="所属地区" class="fourLabel">
              <el-select class="wdh" placeholder="请选择" v-model="peopleform.companyHierarchy" clearable>
                <el-option v-for="item in dataDictioPubArr" :key="item.value" :label="item.dictName" :value="item.dictName"></el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div>
            <el-form-item label="所属监测点" class="fourLabel">
              <el-input placeholder="请输入" v-model="peopleform.companyName" clearable>
              </el-input>
            </el-form-item>
          </div>
        </el-col>

        <el-col :span="8">
          <div>
            <el-form-item label="状态" class="fourLabel">
              <el-select class="wdh" placeholder="请选择" v-model="peopleform.status" clearable>
                <el-option v-for="item in status" :key="item.value" :label="item.dictName" :value="item.dictName"></el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div>
            <el-form-item label="用户名称" class="fourLabel">
              <el-input placeholder="请输入" v-model="peopleform.companyName" clearable>
              </el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div>
            <el-form-item label="标题" class="fourLabel">
              <el-input placeholder="请输入" v-model="peopleform.companyName" clearable>
              </el-input>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <div>
            <el-button class="outButton" icon="el-icon-search" size="mini" type="primary">查询</el-button>
            <el-button class="outButton" icon="el-icon-search" size="mini" type="primary">清空</el-button>
            <el-button class="outButton" icon="el-icon-search" size="mini" @click="addBtn" type="primary">发布</el-button>
          </div>
        </el-col>
      </el-row>
    </el-form>
    <el-row>
      <el-table tooltip-effect="dark" style="width: 100%;margin-top:10px;" align="center" border stripe highlight-current-rowv-loading="tableLoading" :data="tableData">
        <el-table-column align="center" label="序号" width="60">
          <template slot-scope="scope"><span>{{scope.$index+1}}</span></template>
        </el-table-column>
        <el-table-column align="center" :show-overflow-tooltip="true" label="所属地区" prop="companyName">
        </el-table-column>
        <el-table-column align="center" :show-overflow-tooltip="true" label="所属监测点" prop="companyHierarchy">
        </el-table-column>
        <el-table-column align="center" :show-overflow-tooltip="true" prop="reporter" label="用户名称">
        </el-table-column>
        <el-table-column align="center" :show-overflow-tooltip="true" prop="reporter" label="状态">
        </el-table-column>
        <el-table-column align="center" :show-overflow-tooltip="true" prop="reporter" label="稿件标题">
        </el-table-column>
        <el-table-column align="center" :show-overflow-tooltip="true" prop="reporter" label="投稿时间">
        </el-table-column>
        <el-table-column width="200" label="操作">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="light" content="审核" placement="top">
              <el-button class="button" size="mini" type="primary" @click.stop="see(scope.row)">
                <i class="el-icon-upload2"></i>
              </el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="light" content="查看" placement="top">
              <el-button class="button" size="mini" type="primary" @click.stop="see(scope.row)">
                <i class="el-icon-zoom-in"></i>
              </el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="light" content="编辑" placement="top">
              <el-button class="button" size="mini" type="primary" @click.stop="see(scope.row)">
                <i class="el-icon-zoom-in"></i>
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
    see(row) {

    },
    handleChangeSize(value) {

    },
    handleCurrentChangePage(value) {
    },
    addBtn() {
      this.$router.push({ path: '/dailyManage/main-detail' })
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
