import request from '@/utils/require'

import { getInfoApi, auth, User } from '@/api/index'



// 获取综合业务菜单林艳飞

export function getAllmenus(codes) {
    return request({
        url: `${User}/roleResources/findRoleResourcesTree?resourcesCode=RM1001003&roleCode=${codes}`,
        // url: `${User}/roleResources/findRoleResourcesTree?roleCode=${codes}`,
        method: 'post'
    })
}
// export function getAllmenus(codes) {
//     return request({
//         url: `${getInfoApi}/roleResources/findRoleResourcesTree?roleCode=${codes}`,
//         // url: `${User}/roleResources/findRoleResourcesTree?roleCode=${codes}`,
//         method: 'post'
//     })
// }


//导航菜单
export function getInfo() {
    return request({
        url: `${getInfoApi}/user/getCurrUserinfo`,
        method: 'get'
    })
}

// 登出
export function logout(token) {
    return request({
        url: `${getInfoApi}/user/logout`,
        method: 'post',
        params: { token }
    })
}


/* 用户信息*/
export function userInfo() {
    return request({
        url: `/myuser/login/userinfo`,
        method: 'post',
        data: ''
    })
}

export function userLogin(username, password) {
    return request({
        url: `${auth}/auth/login/1/${username}/${password}`,
        method: 'post',
        data: ''
    })
}