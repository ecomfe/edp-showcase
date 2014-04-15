var mockup = require('../../../tools/mockup');

exports.response = function (path, params) {
    var result = [
        {
            "adId": 123,
            "adName": "20140101-123-ROW-1",
            "contractLineId": 12345,
            "contractNo": 2387,
            "status": "LAUNCHING",
            "startTime": "20140101000000",
            "endTime": "20140301235959",
            "impression": 12345,
            "click": 212,
            "ctr": 0.017,
            "version": 111
        },
        {
            "adId": 124,
            "adName": "20140101-123-ROW-2",
            "contractLineId": 12346,
            "contractNo": 2388,
            "status": "LAUNCHING",
            "startTime": "20140101000000",
            "endTime": "20140301235959",
            "impression": 12345,
            "click": 212,
            "ctr": 0.017,
            "version": 111
        },
        {
            "adId": 125,
            "adName": "20140101-123-ROW-3",
            "contractLineId": 12347,
            "contractNo": 2388,
            "status": "NOT_LAUNCHING",
            "startTime": "20140101000000",
            "endTime": "20140301235959",
            "impression": 12345,
            "click": 212,
            "ctr": 0.017,
            "version": 111
        },
        {
            "adId": 126,
            "adName": "20140101-123-ROW-4",
            "contractLineId": 12348,
            "contractNo": 2388,
            "status": "END",
            "startTime": "20140101000000",
            "endTime": "20140301235959",
            "impression": 12345,
            "click": 212,
            "ctr": 0.017,
            "version": 111
        },
        {
            "adId": 127,
            "adName": "20140101-123-ROW-5",
            "contractLineId": 12349,
            "contractNo": 2388,
            "status": "PAUSED",
            "startTime": "20140101000000",
            "endTime": "20140301235959",
            "impression": 12345,
            "click": 212,
            "ctr": 0.017,
            "version": 111
        }
    ];

    return mockup.list( result );
};
