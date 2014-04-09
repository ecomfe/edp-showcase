/**
 * @file 全局配置
 * @author leeight(leeight@gmail.com)
 */

define(function (require) {

    var config = {

        // 接口配置
        api: {
            user: '/data/system/session',
            constants: '/data/system/constants'
        },

        // ER默认路径
        index: '/'
    };

    return config;
});
