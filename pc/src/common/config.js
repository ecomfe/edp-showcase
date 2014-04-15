/**
 * @file 全局配置
 * @author leeight(leeight@gmail.com)
 */

define(function (require) {

    // 接口配置
    // 如果期望添加API时工具自动配置，请保持apiConfig名称不变
    var apiConfig = {
        adUpdate: '/data/promotion/173/update',
        adDetail: '/data/promotion/173/read',
        adList: '/data/promotion/173/list',
        user: '/data/system/session',
        constants: '/data/system/constants'
    };

    var config = {

        // API配置
        api: apiConfig,

        // ER默认路径
        index: '/promotion/list'
    };

    return config;
});
