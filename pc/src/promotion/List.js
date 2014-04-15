/**
 * @file [Please Input File Description]
 * @author leeight(leeight@gmail.com)
 */

define(function (require) {
    var ListAction = require('bat-ria/mvc/ListAction');

    /**
     * [Please Input Action Description]
     * 
     * @constructor
     */
    function PromotionList() {
        ListAction.apply(this, arguments);
    }

    PromotionList.prototype.modelType = require('./ListModel');
    PromotionList.prototype.viewType = require('./ListView');

    /**
     * 初始化交互行为
     *
     * @protected
     * @override
     */
    PromotionList.prototype.initBehavior = function () {};

    require('er/util').inherits(PromotionList, ListAction);
    return PromotionList;
});
