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
    function PromotionListModel() {
        ListModel.apply(this, arguments);

        // 列表请求器 (*)
        this.listRequester = api.adList;
    }

    /**
     * @inheritDoc
     */
    PromotionListModel.prototype.datasource = null;

    /**
     * @inheritDoc
     */
    // PromotionListModel.prototype.defaultTimeRange = batUtil.getTimeRange();

    /**
     * @inheritDoc
     */
    PromotionListModel.prototype.defaultArgs = {
        order: 'desc',
        pageSize: 15
    };


    // return模块
    require('er/util').inherits(PromotionListModel, ListModel);
    return PromotionListModel;
});
