import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样式
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth' // 验权
import {
    getAllmenus,
    userInfo
} from '@/api/getInfo.js'

const whiteList = ['/login'] // 不重定向白名单

router.beforeEach((to, from, next) => {
    NProgress.start()
    if (sessionStorage.getItem('TOKENL')) {
        //  首先走else 获取用户信息，然后不清空用户信息token，还是会跳转到首页
        if (to.path === '/login') {
            console.log('登录')
            next({
                path: '/'
            })
            NProgress.done()
                // if current page is dashboard will not trigger  afterEach hook, so manually handle it
        } else {
            // if (store.getters.data.length === 0) {
            store.dispatch('GetInfo').then(res => {
                    localStorage.setItem('countyCode', res.data.countyCode)
                    localStorage.setItem('userInfo', JSON.stringify(res.data))
                    const codes = res.data.userRole
                    getAllmenus(codes).then(res => {
                        const xzdata = res.data[0].children[0]
                        sessionStorage.setItem('xzdata', JSON.stringify(xzdata))
                        next()
                    })

                }).catch((err) => {
                    store.dispatch('FedLogOut').then(() => {
                        Message.error(err || 'Verification failed, please login again')
                        if (from.path != '/login') {
                            next({
                                path: '/'
                            })
                        }
                        return
                    })
                })
                // } else {
                //     next()
                // }
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            console.log(whiteList.indexOf(to.path))
            next()


        } else {
            next('/login')
            NProgress.done()
        }
    }
})

router.afterEach(() => {
    NProgress.done() // 结束Progress
})