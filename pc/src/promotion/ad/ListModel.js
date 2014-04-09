/**
 * @file [Please Input File Description]
 * @author leeight(leeight@gmail.com)
 */

define(function (require) {
    var ListModel = require('bat-ria/mvc/ListModel');
    var datasource = require('er/datasource');
    var api = require('common/config').api;
    var batUtil = require('bat-ria/util');

    /**
     * [Please Input Model Description]
     * 
     * @constructor
     */
    function ListModel() {
        ListModel.apply(this, arguments);

        // 绑定列表请求API配置（必须）
        // this.listRequester = api.someList;
    }

    /**
     * @inheritDoc
     */
    ListModel.prototype.datasource = null;

    /**
     * @inheritDoc
     */
    // ListModel.prototype.defaultTimeRange = batUtil.getTimeRange();

    /**
     * @inheritDoc
     */
    ListModel.prototype.defaultArgs = {
        order: 'desc',
        pageSize: 15
    };

    // return模块
    require('er/util').inherits(ListModel, ListModel);
    return ListModel;
});
