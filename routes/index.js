var express = require('express');
var dateUtil = require('date-utils');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        userCode: '86044',
        userName: '王小军',
        commentCount: 25,//好评数
        takeWatchCount: 1422,//带看次数
        callTime: 5331,//总通话时长
        callCount: 422,//联系业主数
        joinTime: new Date().toFormat('YYYY年M月D日'),//加入链家时间
        workTimeAvg: 9 * 3600 * 1000,//平均工作时间
        latestWorkTime: '凌晨5点',//最晚工作时间
        successCount: 75,//成功套数
        tksCount: 83//感谢数
    });
});
router.get('/index', function (req, res, next) {
    res.render('index2', {
        userCode: '86044',
        userName: '王小军',
        takeWatchCustomerCount: '100',
        callTime: 5331,//总通话时长s
        workTime: 11,//平均工作时间
        latestTime: '凌晨2点',
        takeWatchDistance: 200,//带看次数
        joinTime: '1年前',//加入链家时间
        goodCount: 75,//好评数
        tksCount: 83//感谢数
    });
});

module.exports = router;
