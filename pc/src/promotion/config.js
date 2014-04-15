/**
 * @file [Please Input File Description]
 * @author leeight(leeight@gmail.com)
 */

define(function (require) {
    var u = require('underscore');

    // Action配置
    // 如果期望添加action时工具自动配置，请保持actionsConfig名称不变
    var actionsConfig = [
        {
            type: 'promotion/Form',
            path: '/promotion/form'
        },
        {
            type: 'promotion/List',
            path: '/promotion/list'
        }
    ];

    var controller = require('er/controller');
    u.each(actionsConfig, controller.registerAction);

    // 这里可以添加一些模块配置
    // 如请求地址，表格fields等
    // 国际化相关语言定义，请使用lang，不建议在config中定义
    var config = {
    };

    return config;
} );
