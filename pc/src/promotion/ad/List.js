/**
 * @file [Please Input File Description]
 * @author leeight(leeight@gmail.com)
 */

define(function (require) {
    var Action = require('bat-ria/mvc/ListAction');

    /**
     * [Please Input Action Description]
     * 
     * @constructor
     */
    function PromotionAdList() {
        Action.apply(this, arguments);
    }

    PromotionAdList.prototype.modelType = require('./ListModel');
    PromotionAdList.prototype.viewType = require('./ListView');

    /**
     * 初始化交互行为
     *
     * @protected
     * @override
     */
    PromotionAdList.prototype.initBehavior = function () {
    };

    require('er/util').inherits(PromotionAdList, Action);
    return PromotionAdList;
});
