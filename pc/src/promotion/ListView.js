/**
 * @file [Please Input File Description]
 * @author leeight(leeight@gmail.com)
 */

define(function (require) {
    // require template
    require('bat-ria/tpl!./list.tpl.html');

    var u = require('underscore');
    var moment = require('moment');
    var ListView = require('bat-ria/mvc/ListView');

    /**
     * [Please Input View Description]
     *
     * @constructor
     */
    function PromotionListView() {
        ListView.apply(this, arguments);
    }


    var tableFields = [
        {
            title: '推广计划',
            field: 'adName',
            subEntry: true,
            sortable: true,
            resizable: true,
            editable: true,
            editContent: 'adName',
            content: function (item) {
                return '<a href="#/promotion/detail~id='
                    + u.escape(item.adId) + '">'
                    + u.escape(item.adName) + '</a>';
            }
        },
        {
            title: '订单行 ID',
            field: 'contractLineId',
            resizable: true,
            sortable: true,
            content: 'contractLineId'
        },
        // {
        //     title: '状态',
        //     field: 'status',
        //     resizable: true,
        //     content: function (item) {
        //         var util = require('ecma/util');
        //         var statusList = require('ecma/system/constants').get('AD_STATUS');
        //         var status = util.toMap(statusList, 'value')[item.status];

        //         if (status) {
        //             status = '<span class="bl-status-' + u.dasherize(item.status)
        //                 + '">' + status.text + '</span>';
        //         }
        //         return status || '-';
        //     }
        // },
        {
            title: '展现次数',
            field: 'impression',
            sortable: true,
            resizable: true,
            content: function (item) {
                return u.formatNumber(item.impression);
            }
        },
        {
            title: '点击次数',
            field: 'click',
            sortable: true,
            resizable: true,
            content: function (item) {
                return u.formatNumber(item.click);
            }
        },
        {
            title: '点击率',
            field: 'ctr',
            sortable: true,
            resizable: true,
            content: function (item) {
                return u.formatNumber(item.ctr * 100, 2) + '%';
            }
        }
    ];



    function expandRow(e) {
        var table = this.get('table');
        var item = e.item;

        var rawFormat = 'YYYYMMDDHHmmss';
        var displayFormat = 'YYYY-MM-DD';

        table.getSubrow(e.index).innerHTML = [
            '<table class="list-subrow">',
                '<tr>',
                    '<th>推广计划 ID</th>',
                    '<th>开始时间</th>',
                    '<th>结束时间</th>',
                    '<th>合同号</th>',
                '</tr>',
                '<tr>',
                    '<td>' + item.adId + '</td>',
                    '<td>' + moment(item.startTime, rawFormat).format(displayFormat) + '</td>',
                    '<td>' + moment(item.endTime, rawFormat).format(displayFormat) + '</td>',
                    '<td>' + item.contractNo + '</td>',
                '</tr>',
            '</table>'
        ].join('');
    }

    /**
     * @inheritDoc
     */
    PromotionListView.prototype.template = 'TPL_promotion_list';

    /**
     * @inheritDoc
     */
    PromotionListView.prototype.uiProperties = {
        table: {
            fields: tableFields,
            sortable: true,
            subrow: true,
            editable: true,
            columnResizable: true
        }
    };

    /**
     * @inheritDoc
     */
    PromotionListView.prototype.uiEvents = {
        'table:subrowopen': expandRow
    };

    require('er/util').inherits(PromotionListView, ListView);
    return PromotionListView;
});
