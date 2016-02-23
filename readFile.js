/**
 * Created by charles on 16/2/3.
 */
var fs = require('fs');
var mongoose = require('mongoose');
var ejs = require('ejs');

function generate(timestamp){
    mongoose.connect('mongodb://localhost/test');

    var db = mongoose.connection;
    var StaticsSchema = mongoose.Schema({
        userCode: String,
        userName: String,
        workTime: {type: Number, default: 0},
        latestTime: Number,
        fyCallTime: {type: Number, default: 0},
        kyCallTime: {type: Number, default: 0},
        takeWatchCount: {type: Number, default: 0},
        takeWatchCustomerCount: {type: Number, default: 0},
        thanksCount: {type: Number, default: 0},
        commentCount: {type: Number, default: 0},
        joinDate: Date
    });
    var Statics = mongoose.model('Statics', StaticsSchema);
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
        var outputDir = 'public/dest/html/';
        var today = new Date(),
            oneYear = 365 * 24 * 3600 * 1000;
        Statics.find(function(err, docs){
            console.log(docs.length);
            for (var i = 0; i < docs.length; i++) {
                if(!docs[i].userName) {
                    continue;
                }
                //if(docs[i].userCode < 81000 || docs[i].userCode > 81100) {
                //    continue;
                //}
                var data = {};
                data.timestamp = timestamp;
                data.userCode = docs[i].userCode;
                data.userName = docs[i].userName;
                data.takeWatchCustomerCount = docs[i].takeWatchCustomerCount;
                if(data.takeWatchCustomerCount < 30) {
                    data.takeWatchCustomerCount = 30;
                }
                data.callTime = Math.round((docs[i].fyCallTime + docs[i].kyCallTime) / 3600);
                if(data.callTime < 50) {
                    data.callTime = 50;
                }
                data.workTime = docs[i].workTime;
                if(data.workTime < 8) {
                    data.workTime = 8;
                }

                data.latestTime = (docs[i].latestTime || 19);
                if(data.latestTime <= 5) {
                    data.latestTime = '凌晨' + data.latestTime;
                } else if(data.latestTime < 19) {
                    data.latestTime = '19';
                }


                data.takeWatchDistance = (docs[i].takeWatchCount * 5 / 100).toFixed(1);
                if(data.takeWatchDistance < 1) {
                    data.takeWatchDistance = 1;
                }

                if(!docs[i].joinDate) {
                    console.log(docs[i]);
                    docs[i].joinDate = today;
                }
                var year = Math.floor((today.getTime() - docs[i].joinDate.getTime()) / oneYear);
                if(year < 1) {
                    year = 1;
                } else {
                    year = year + 1;
                }
                data.joinTime = year + '年前';
                data.goodCount = (docs[i].takeWatchCount - docs[i].commentCount) || 0;
                if(data.goodCount < 30) {
                    data.goodCount = 30;
                }

                data.tksCount = docs[i].thanksCount || 0;
                if(data.tksCount < 5) {
                    data.tksCount = 5;
                }

                var fn = ejs.render(fs.readFileSync('views/build/index2.ejs').toString().replace(/^\uFEFF/, ''), data);
                fs.writeFileSync(outputDir + docs[i].userCode + '.html', fn);
                console.log(outputDir + docs[i].userCode + '.html');
            }
            mongoose.disconnect();
        });

    });
}
module.exports = generate;