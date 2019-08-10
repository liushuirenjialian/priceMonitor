import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)


import Layout from '@/components/Layout/layout.vue'
// import menuList from '@/components/Layout/menuList/menuList.vue'
// import menuItem from '@/components/Layout/menuList/menuItem.vue'
const login = () =>
    import ('@/views/login.vue')
export default new Router({
    history: true,
    routes: [{
            path: '/login',
            component: login,
            hidden: true
        },
        {
            path: '/',
            component: Layout,
            redirect: '/dashboard',
            name: '首页',
            hidden: true,
            meta: {
                title: '内蒙自治区企业管理平台',
                icon: 'example'
            },
            children: [{
                path: 'dashboard',
                component: () =>
                    import ('@/views/dashboard/index'),
                name: '首页',
                meta: {
                    title: '内蒙自治区企业管理平台',
                    icon: 'example'
                }
            }]
        },

        {
            path: '/dailyManage',
            component: Layout,
            redirect: '/dailyManage/main',
            name: '日常管理',
            meta: { title: '日常管理', icon: 'example' },
            children: [{
                    path: 'main',
                    name: '通知公告',
                    component: () =>
                        import ('@/views/dailyManage/main'),
                    meta: { title: '通知公告', icon: 'table' }
                },
                {
                    path: 'main-detail',
                    name: '通知公告详情',
                    component: () =>
                        import ('@/views/dailyManage/main-detail'),
                    meta: { title: '通知公告详情', icon: 'table' },
                    hidden: true
                },
                {
                    path: 'newsPaper',
                    name: '期刊上传',
                    component: () =>
                        import ('@/views/dailyManage/news-paper-up'),
                    meta: { title: '期刊上传', icon: 'tree' }
                }
            ]
        },
        {
            path: '/onlineContribute',
            component: Layout,
            redirect: '/onlineContribute/index',
            name: '在线投稿',
            meta: { title: '在线投稿', icon: 'example' },
            children: [{
                    path: 'index',
                    name: '投稿',
                    component: () =>
                        import ('@/views/contribute/index'),
                    meta: { title: '投稿', icon: 'form' }
                },
                {
                    path: 'detail',
                    name: '投稿详情',
                    hidden: true,
                    component: () =>
                        import ('@/views/contribute/detail'),
                    meta: { title: '投稿详情', icon: 'form' }
                },

                {
                    path: 'check',
                    name: '审核/查询',
                    component: () =>
                        import ('@/views/contribute/check'),
                    meta: { title: '审核/查询', icon: 'form' }
                }
            ]
        },
        {
            path: '/monitorArea',
            component: Layout,
            redirect: '/monitorArea/reportTime',
            name: '系统管理',
            meta: { title: '系统设置', icon: 'example' },
            children: [{
                    path: 'reportTime',
                    name: '上报时间管理',
                    component: () =>
                        import ('@/views/monitorArea/reportTime'),
                    meta: { title: '上报时间管理', icon: 'form' }
                },
                {
                    path: 'reportTimeDetail',
                    name: '上报时间详情',
                    hidden: true,
                    component: () =>
                        import ('@/views/monitorArea/reportTimeDetail'),
                    meta: { title: '上报时间详情', icon: 'form' }
                },
                {
                    path: 'indicator',
                    name: '指标管理',
                    component: () =>
                        import ('@/views/monitorArea/indicator'),
                    meta: { title: '指标管理', icon: 'form' }
                },
                {
                    path: 'indicatorDetail',
                    name: '指标管理详情',
                    hidden: true,
                    component: () =>
                        import ('@/views/monitorArea/indicator-detail'),
                    meta: { title: '指标管理详情', icon: 'form' }
                },
                {
                    path: 'standard',
                    name: '标准管理',
                    component: () =>
                        import ('@/views/monitorArea/standard'),
                    meta: { title: '标准管理', icon: 'form' }
                },
                {
                    path: 'standardDetail',
                    name: '标准管理详情',
                    hidden: true,
                    component: () =>
                        import ('@/views/monitorArea/standard-detail'),
                    meta: { title: '标准管理详情', icon: 'form' }
                },
                {
                    path: 'unit',
                    name: '单位管理',
                    component: () =>
                        import ('@/views/monitorArea/unit'),
                    meta: { title: '单位管理', icon: 'form' }
                },
                {
                    path: 'unitDetail',
                    name: '单位管理详情',
                    hidden: true,
                    component: () =>
                        import ('@/views/monitorArea/unit-detail'),
                    meta: { title: '单位管理详情', icon: 'form' }
                },
                {
                    path: 'priceType',
                    name: '价格类型管理',
                    component: () =>
                        import ('@/views/monitorArea/priceType'),
                    meta: { title: '价格类型管理', icon: 'form' }
                },
                {
                    path: 'priceTypeDetail',
                    name: '价格类型管理详情',
                    hidden: true,
                    component: () =>
                        import ('@/views/monitorArea/priceType-detail'),
                    meta: { title: '价格类型管理详情', icon: 'form' }
                },
                {
                    path: 'target',
                    name: '监测点指标管理',
                    component: () =>
                        import ('@/views/monitorArea/target'),
                    meta: { title: '监测点指标管理', icon: 'form' }
                },
                {
                    path: 'targetSet',
                    name: '监测点标准管理',
                    component: () =>
                        import ('@/views/monitorArea/targetSet'),
                    meta: { title: '监测点标准管理', icon: 'form' }
                },
                {
                    path: 'targetUnit',
                    name: '监测点单位管理',
                    component: () =>
                        import ('@/views/monitorArea/targetUnit'),
                    meta: { title: '监测点单位管理', icon: 'form' }
                },
                {
                    path: 'targetPriceType',
                    name: '指标价格类型管理',
                    component: () =>
                        import ('@/views/monitorArea/targetPriceType'),
                    meta: { title: '指标价格类型管理', icon: 'form' }
                },


                {
                    path: 'provinceShort',
                    name: '省份简称管理',
                    component: () =>
                        import ('@/views/monitorArea/provinceShort'),
                    meta: { title: '省份简称管理', icon: 'form' }
                }, {
                    path: 'provinceShortDetail',
                    name: '省份简称管理详情',
                    hidden: true,
                    component: () =>
                        import ('@/views/monitorArea/priceType-detail'),
                    meta: { title: '省份简称管理详情', icon: 'form' }
                },

                {
                    path: 'reportType',
                    name: '周刊报表类型管理',
                    component: () =>
                        import ('@/views/monitorArea/paperReport'),
                    meta: { title: '周刊报表类型管理', icon: 'form' }
                },
                {
                    path: 'reportBaseInfo',
                    name: '周刊报表基本信息管理',
                    component: () =>
                        import ('@/views/monitorArea/paperReportBaseInfo'),
                    meta: { title: '周刊报表基本信息管理', icon: 'form' }
                },
                {
                    path: 'paperReportConfig',
                    name: '周刊报表配置',
                    component: () =>
                        import ('@/views/monitorArea/paperReportConfig'),
                    meta: { title: '周刊报表配置', icon: 'form' }
                },
                {
                    path: 'powerSet',
                    name: '权重设置',
                    component: () =>
                        import ('@/views/monitorArea/powerSet'),
                    meta: { title: '权重设置', icon: 'form' }
                },
                {
                    path: 'powerDetails',
                    name: '权重设置详情',
                    hidden: true,
                    component: () =>
                        import ('@/views/monitorArea/powerDetails'),
                    meta: { title: '权重设置详情', icon: 'form' }
                },
                {
                    path: 'resetCopy',
                    name: '系统恢复和备份',
                    component: () =>
                        import ('@/views/monitorArea/resetCopy'),
                    meta: { title: '系统恢复和备份', icon: 'form' }
                },
            ]
        },
    ]
})