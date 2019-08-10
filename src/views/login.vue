<template>
  <div style="width:100%;height:100%;background-color:#0441AB;display:flex;">
    <div class="wisdomBox" style="position:relative;">
      <div style="margin:4% 0px 0; width:100%;height:98px;line-height:98px;display:flex;justify-content:center;align-items:center;">
        <img src="../assets/wisdom_images/title.png" />
      </div>
      <!-- <div style="width:30%;position:absolute;top:25%;left:12%;">
      <img src="../assets/wisdom_images/flower.png" style="width:100%;" />
    </div>   -->
      <div class="login-card">
        <div class="login-content">
          <img src="../assets/wisdom_images/person.png" style="margin:0 0 40px;" />
          <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="0px" class="card-box login-form wisdomInput">
            <el-form-item prop="name">
              <el-input name="name" autoComplete="on" ref="userName" type="text" v-model="loginForm.name" placeholder="请输入用户名" style="position:relative;" @keyup.enter.native="handleLogin">
                <img src="../assets/wisdom_images/user.png" slot="prefix" style="padding:10px 6px;border-right:1px solid #d2d2d2;" />
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input name="password" autoComplete="on" type="password" v-model="loginForm.password" placeholder="请输入密码">
                <img src="../assets/wisdom_images/pass.png" slot="prefix" style="padding:10px 6px;border-right:1px solid #d2d2d2;" />
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button style="width:100%;margin-bottom:6%;background:#5675ef;color:#fff;" :loading="loading" @click.native.prevent="handleLogin">
                登录
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
// import Cookies from 'js-cookie'
// import findSiderMenuById from '@/api/login'
import axios from 'axios'
import {
  getInfo
} from '@/api/getInfo.js'
import { auth } from '@/api/getInfo.js'
export default {
  components: {},
  name: 'login',
  data() {
    //    const validatePass = (rule, value, callback) => {
    //      if (value.length < 5) {
    //        callback(new Error('密码不能小于5位'))
    //      } else {
    //        callback()
    //      }
    //    }
    return {
      loginForm: {
        name: null,
        password: null,
        code: null
      },
      loginRules: {
        name: [{
          required: true,
          message: '账户不能为空',
          trigger: 'change'
        },
        {
          min: 3,
          max: 20,
          message: '长度在 3 到 20 个字符',
          trigger: 'blur'
        }
        ],
        password: [{
          required: true,
          message: '密码不能为空',
          trigger: 'change'
        },
        {
          min: 5,
          message: '密码不能小于5位',
          trigger: 'blur'
        }]
      },
      loading: false,
      showDialog: false
    }
  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          // this.loginForm.password = Base.encode(this.loginForm.password);
          this.$store.dispatch('Login', this.loginForm).then(response => {
            if (response.infoCode === 200) {
              const LoginCode = {
                loginCode: '1',
                username: this.loginForm.name,
                password: this.loginForm.password
              }
              sessionStorage.setItem('LoginCode', JSON.stringify(LoginCode))

              this.loading = false
              this.$router.push({
                path: '/dashboard'
              })

              this.showDialog = true
            } else {
              this.$message({
                type: 'error',
                message: response.msg
              })
              this.loading = false
            }
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },
  created() {

  },
  mounted() {
    this.$refs['userName'].focus();
  },
  destroyed() { }
}

</script>

<style>
* {
  padding: 0;
  margin: 0;
}

.wisdomBox {
  width: 100%;
  min-width: 1200px;
  height: 100%;
  /* background: url(../assets/wisdom_images/loginbag.png) repeat-x left bottom;   */
  background: url(../assets/wisdom_images/loginbags.png) repeat-x center center;
  background-size: 100% 100%;
}

.wisdomInput > div > div > div > input {
  background: #ffffff;
  font-size: 16px;
  height: 40px;
  border: 0px none;
}

.wisdomInput > div > span > i {
  color: white;
}
.wisdomInput .el-input__inner {
  padding-left: 48px;
}
.login-card {
  background: url(../assets/wisdom_images/loginbg.png) no-repeat center center;
  width: 390px;
  height: 390px;
  margin: 1% auto 0;
  text-align: center;
}
.login-content {
  padding: 31px 50px 0px;
}
</style>
