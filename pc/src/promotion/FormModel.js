/**
 * @file [Please Input File Description]
 * @author leeight(leeight@gmail.com)
 */

define(function (require) {
    var FormModel = require('bat-ria/mvc/FormModel');
    var datasource = require('er/datasource');
    var api = require('common/config').api;
    var batUtil = require('bat-ria/util');

    /**
     * [Please Input Model Description]
     * 
     * @constructor
     */
    function PromotionFormModel() {
        FormModel.apply(this, arguments);

        // 表单数据请求器
        this.formRequester = api.adDetail;

        // 表单提交请求器 (*)
        this.submitRequester = api.adUpdate;
    }

    /**
     * @inheritDoc
     */
    PromotionFormModel.prototype.datasource = null;


    /**
     * @inheritDoc
     */
    PromotionFormModel.prototype.defaultArgs = {};

    /**
     * @inheritDoc
     */
    PromotionFormModel.prototype.getExtraData = function () {
        return {};
    };

    // return模块
    require('er/util').inherits(PromotionFormModel, FormModel);
    return PromotionFormModel;
});
