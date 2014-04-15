/**
 * @file [Please Input File Description]
 * @author leeight(leeight@gmail.com)
 */

define(function (require) {
    // require template
    require('bat-ria/tpl!./form.tpl.html');

    var FormView = require('bat-ria/mvc/FormView');
    
    /**
     * [Please Input View Description]
     * 
     * @constructor
     */
    function PromotionFormView() {
        FormView.apply(this, arguments);
    }
    
    /**
     * @inheritDoc
     */
    PromotionFormView.prototype.template = 'TPL_promotion_form';

    /**
     * @inheritDoc
     */
    PromotionFormView.prototype.uiProperties = {};

    /**
     * @inheritDoc
     */
    PromotionFormView.prototype.uiEvents = {};

    require('er/util').inherits(PromotionFormView, FormView);
    return PromotionFormView;
});
