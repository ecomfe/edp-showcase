var mockup = require('../../../tools/mockup');

exports.response = function (path, params) {

    return mockup.ok(
        {
            // id: 1
        }
    );

    // return mockup.globalFail('提交失败！');

    // return mockup.fieldFail(
    //     {
    //         // name: '名称过长！'
    //     }
    // );

};