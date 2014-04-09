/**
 * @file [Please Input File Description]
 * @author leeight(leeight@gmail.com)
 */

define(function (require) {
    // require template
    require('bat-ria/tpl!./list.tpl.html');

    var ListView = require('bat-ria/mvc/ListView');
    
    /**
     * [Please Input View Description]
     * 
     * @constructor
     */
    function ListView() {
        ListView.apply(this, arguments);
    }
    
    /**
     * @inheritDoc
     */
    ListView.prototype.template = 'TPL_promotion_ad_list';

    /**
     * @inheritDoc
     */
    ListView.prototype.uiProperties = {
    };

    /**
     * @inheritDoc
     */
    ListView.prototype.uiEvents = {
    };

    require('er/util').inherits(ListView, ListView);
    return ListView;
});
