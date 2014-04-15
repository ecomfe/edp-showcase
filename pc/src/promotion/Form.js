/**
 * @file [Please Input File Description]
 * @author leeight(leeight@gmail.com)
 */

define(function (require) {
    var FormAction = require('bat-ria/mvc/FormAction');

    /**
     * [Please Input Action Description]
     * 
     * @constructor
     */
    function PromotionForm() {
        FormAction.apply(this, arguments);
    }

    PromotionForm.prototype.modelType = require('./FormModel');
    PromotionForm.prototype.viewType = require('./FormView');

    /**
     * 初始化交互行为
     *
     * @protected
     * @override
     */
    PromotionForm.prototype.initBehavior = function () {};

    require('er/util').inherits(PromotionForm, FormAction);
    return PromotionForm;
});
