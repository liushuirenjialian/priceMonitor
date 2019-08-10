import { price, User } from '@/api'

import request from '@/utils/require'
// 指标管理开始
export function saveIndex(obj) {
    return request({
        url: `${price}/indicator/`,
        method: 'post',
        data: obj
    })
}

export function updateIndex(obj) {
    return request({
        url: `${price}/indicator/`,
        method: 'put',
        data: obj
    })
}

export function indexTree() {
    return request({
        url: `${price}/indicatorsTree?treeCode=1`,
        method: 'get',
    })
}

export function indexpage(obj, dataObj) {
    return request({
        url: `${price}/indicators?page=${obj.page}&size=${obj.size}`,
        method: 'post',
        data: dataObj
    });
}
export function indexDetails(id) {
    return request({
        url: `${price}/indicator/${id}/`,
        method: 'get',
    })
}

export function indexDelete(obj) {
    return request({
        url: `${price}/indicators`,
        method: 'delete',
        data: obj
    })
}
// 指标管理结束

// 指标标准管理开始
export function saveStandard(obj) {
    return request({
        url: `${price}/indStandard/`,
        method: 'post',
        data: obj
    })
}

export function updateStandard(obj) {
    return request({
        url: `${price}/indStandard/`,
        method: 'put',
        data: obj
    })
}


export function standardpage(obj, dataObj) {
    return request({
        url: `${price}/indStandards?page=${obj.page}&size=${obj.size}`,
        method: 'post',
        data: dataObj
    });
}
export function standardDetails(id) {
    return request({
        url: `${price}/indStandard/${id}/`,
        method: 'get',
    })
}
export function standardDelete(obj) {
    return request({
        url: `${price}/indStandards`,
        method: 'delete',
        data: obj
    })
}
// 指标标准管理结束

// 指标单位管理开始
export function saveUnit(obj) {
    return request({
        url: `${price}/indUnit/`,
        method: 'post',
        data: obj
    })
}

export function updateUnit(obj) {
    return request({
        url: `${price}/indUnit/`,
        method: 'put',
        data: obj
    })
}


export function unitPage(obj, dataObj) {
    return request({
        url: `${price}/indUnits?page=${obj.page}&size=${obj.size}`,
        method: 'post',
        data: dataObj
    });
}
export function unitDetails(id) {
    return request({
        url: `${price}/indUnit/${id}/`,
        method: 'get',
    })
}

export function unitDelete(obj) {
    return request({
        url: `${price}/indUnits`,
        method: 'delete',
        data: obj
    })
}
// 指标单位管理结束


// 价格类型管理开始
export function savePriceType(obj) {
    return request({
        url: `${price}/priceType/`,
        method: 'post',
        data: obj
    })
}

export function updatePriceType(obj) {
    return request({
        url: `${price}/priceType/`,
        method: 'put',
        data: obj
    })
}


export function priceTypePage(obj, dataObj) {
    return request({
        url: `${price}/priceTypes?page=${obj.page}&size=${obj.size}`,
        method: 'post',
        data: dataObj
    });
}
export function priceTypeDetails(id) {
    return request({
        url: `${price}/priceType/${id}/`,
        method: 'get',
    })
}
export function PriceTypeDelete(obj) {
    return request({
        url: `${price}/priceTypes`,
        method: 'delete',
        data: obj
    })
}

// 价格类型管理结束


// 组织机构树

export function treeOrg() {
    return request({
        url: `${User}/org/tree`,
        method: 'post',
    })
}

// 点击查询树
export function queryTree(id) {
    return request({
        url: `${price}/indicatorMonitor/?monitorId=${id}`,
        method: 'get',
    })
}

export function checkStandTree(id) {
    return request({
        url: `${price}/indicatorStandard/?indicatorId=${id}`,
        method: 'get',
    })
}
// 所有的指标树
export function allIndexTree() {
    return request({
        url: `${price}/indicatorsTree?treeCode=0`,
        method: 'get',
    })
}


export function saveIndicator(obj) {
    return request({
        url: `${price}/indicatorMonitor/`,
        method: 'post',
        data: obj
    })
}

//指标标准树报讯
export function saveIndicatorStand(obj) {
    return request({
        url: `${price}/indicatorStandard/`,
        method: 'post',
        data: obj
    })
}

// 查询所欲指标标准
export function getInstand() {
    return request({
        url: `${price}/indStandards`,
        method: 'get',
    })
}


// 指标单位树
export function getIndUnite() {
    return request({
        url: `${price}/indUnits`,
        method: 'get',
    })
}

export function accessIndica(obj) {
    return request({
        url: `${price}/indicator/`,
        method: 'put',
        data: obj
    })
}

// 查询已经授权的单位指标

export function getAccessedInd(id) {
    return request({
        url: `${price}/indicator/${id}/`,
        method: 'get',
    })
}


// 查询所有价格类型
export function getPriceTable() {
    return request({
        url: `${price}/priceTypes`,
        method: 'get',
    })
}


export function priceTypeSave(obj) {
    return request({
        url: `${price}/indicatorPriceType/`,
        method: 'post',
        data: obj
    })
}

export function queryPriceType(id) {
    return request({
        url: `${price}/indicatorPriceType/?indicatorId=${id}`,
        method: 'get',
    })
}