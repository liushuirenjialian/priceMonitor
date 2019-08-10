<template>
  <div class="dashboard-container">
    <el-form :model="peopleform" :inline="true" label-width="88px" ref="peopleform">
      <el-row>
        <el-col :span="7">
          <div>
            <el-form-item label="监测点" class="fourLabel" label-width="60px">
              <el-input placeholder="请输入" v-model="peopleform.companyName" clearable>
              </el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="14">
          <div>
            <el-form-item label="维护日期" class="fourLabel" label-width="80px">
              <el-date-picker v-model="peopleform.value6" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <div>
            <el-button class="outButton" icon="el-icon-search" size="mini" type="primary">查询</el-button>
            <el-button class="outButton" icon="el-icon-search" size="mini" type="primary">清空</el-button>
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
        <el-table-column align="center" :show-overflow-tooltip="true" label="粮食类型" width="210px" prop="companyName">
        </el-table-column>
        <el-table-column align="center" :show-overflow-tooltip="true" label="指标名称" width="110px" prop="companyName">
        </el-table-column>
        <el-table-column align="center" :show-overflow-tooltip="true" label="排序顺序" prop="companyHierarchy">
        </el-table-column>

        <el-table-column width="300" label="操作">
          <template slot-scope="scope">

            <el-tooltip class="item" effect="light" content="查看" placement="top">
              <el-button class="button" size="mini" type="primary" @click.stop="see(scope.row)">
                <i class="el-icon-zoom-in"></i>
              </el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="light" content="修改" placement="top">
              <el-button class="button" size="mini" type="primary" @click.stop="see(scope.row)">
                <i class="el-icon-edit-outline"></i>
              </el-button>
            </el-tooltip>

            <el-tooltip class="item" effect="light" content="删除" placement="top">
              <el-button class="button" size="mini" type="primary" @click.stop="see(scope.row)">
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

    <el-dialog title="新增周刊报表指标" :visible.sync="reportDialog" width="40%" center>
      <el-row>
        <el-col :span="24">
          <el-form :model="reportForm" status-icon :rules="rules" ref="reportForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="粮食类型" prop="oldPassword">
              <el-select class="wdh" placeholder="请选择" v-model="peopleform.companyHierarchy" clearable>
                <el-option v-for="item in dataDictioPubArr" :key="item.value" :label="item.dictName" :value="item.dictName"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="指标名称" prop="oldPassword">
              <el-input type="text" v-model.number="reportForm.oldPassword"></el-input>
            </el-form-item>
            <el-form-item label="显示顺序" prop="pass">
              <el-input type="password" v-model="reportForm.newPassword" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="描述" prop="pass">
              <el-input type="textarea" v-model="reportForm.newPassword" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('reportForm')">增加</el-button>
              <el-button @click="reportDialog = false">关闭</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Daily',
  data() {
    return {
      ruleForm2: {},
      reportForm: {},
      reportDialog: false,
      dataDictioPubArr: [{
        index: 1
      }],
      rules2: {
        monitorName: [
          { required: true, message: '监测点类型名称', trigger: 'blur' },
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
      },
      rules: {
        monitorName: [
          { required: true, message: '监测点类型名称', trigger: 'blur' },
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
      },
      tableData3: [{
        index: 1
      }],
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
    handleSelectionChange(value) {

    },

    see(row) {

    },
    handleChangeSize(value) {

    },
    handleCurrentChangePage(value) {
    },
    addBtn() {
      this.reportDialog = true
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
