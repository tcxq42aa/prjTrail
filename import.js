/**
 * Created by charles on 16/2/6.
 */
var mongoose = require('mongoose');
var xlsx = require('node-xlsx');

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
    console.log('open');
    task9();
});
mongoose.connect('mongodb://localhost/test');

function numToDate(num) {
    return new Date(num * (24 * 60 * 60 * 1000) + new Date(Date.UTC(1899, 11, 30)).getTime());
}

function task1(){
    var sheets = xlsx.parse('file/2016年前入职的经纪人工号、姓名、入职时间.xlsx');
    for (var i = 0; i < sheets.length; i++) {
        for(var j = 1 ; j< sheets[i].data.length; j++){
            var line = sheets[i].data[j];
            Statics.findOneAndUpdate({userCode: line[0]},{
                userCode: line[0],
                joinDate: numToDate(line[1]),
                userName: line[2]
            }, {upsert: true}, function(err, docs){
                if(err)
                    console.log(err);
            });
        }
    }
}
function task2(){
    var sheets = xlsx.parse('file/2015年12月经纪人平均工作时长.xlsx');
    for (var i = 0; i < sheets.length; i++) {
        for(var j = 1 ; j< sheets[i].data.length; j++){
            var line = sheets[i].data[j];
            Statics.findOneAndUpdate({userCode: line[0]},{
                userCode: line[0],
                workTime: line[1],
            }, {upsert: true}, function(err, docs){
                if(err)
                    console.log(err);
            });
            console.log('end...');
        }
    }
}
function task3(){
    var sheets = xlsx.parse('file/2015年经纪人最晚下班时间.xlsx');
    for (var i = 0; i < sheets.length; i++) {
        for(var j = 1 ; j< sheets[i].data.length; j++){
            var line = sheets[i].data[j];
            Statics.findOneAndUpdate({userCode: line[0]},{
                userCode: line[0],
                latestTime: line[1]
            }, {upsert: true}, function(err, docs){
                if(err)
                    console.log(err);
            });
            console.log('end...');
        }
    }
}
function task4(){
    var sheets = xlsx.parse('file/2015年客源系统人均总通话时长.xlsx');
    for (var i = 0; i < sheets.length; i++) {
        for(var j = 1 ; j< sheets[i].data.length; j++){
            var line = sheets[i].data[j];
            Statics.findOneAndUpdate({userCode: line[0]},{
                userCode: line[0],
                kyCallTime: line[1]
            }, {upsert: true}, function(err, docs){
                if(err)
                    console.log(err);
            });
        }
        console.log('end...');
    }
}
function task5(){
    var sheets = xlsx.parse('file/2015年房源系统人均总通话时长.xlsx');
    for (var i = 0; i < sheets.length; i++) {
        for(var j = 1 ; j< sheets[i].data.length; j++){
            var line = sheets[i].data[j];
            Statics.findOneAndUpdate({userCode: line[0]},{
                userCode: line[0],
                fyCallTime: line[1]
            }, {upsert: true}, function(err, docs){
                if(err)
                    console.log(err);
            });
        }
        console.log('end...');
    }
}
function task6(){
    var sheets = xlsx.parse('file/2015年经纪人带看数量.xlsx');
    for (var i = 0; i < sheets.length; i++) {
        for(var j = 1 ; j< sheets[i].data.length; j++){
            var line = sheets[i].data[j];
            Statics.findOneAndUpdate({userCode: line[0]},{
                userCode: line[0],
                takeWatchCount: line[1]
            }, {upsert: true}, function(err, docs){
                if(err)
                    console.log(err);
                console.log(docs);
            });
        }
    }
}
function task7(){
    var sheets = xlsx.parse('file/2015年经纪人带看客户数量.xlsx');
    for (var i = 0; i < sheets.length; i++) {
        for(var j = 1 ; j< sheets[i].data.length; j++){
            var line = sheets[i].data[j];
            Statics.findOneAndUpdate({userCode: line[0]},{
                userCode: line[0],
                takeWatchCustomerCount: line[1]
            }, {upsert: true}, function(err, docs){
                if(err)
                    console.log(err);
                console.log(docs);
            });
        }
    }
}
function task8(){
    var sheets = xlsx.parse('file/2015年经纪人收到的感谢数量.xlsx');
    for (var i = 0; i < sheets.length; i++) {
        for(var j = 1 ; j< sheets[i].data.length; j++){
            var line = sheets[i].data[j];
            Statics.findOneAndUpdate({userCode: line[0]},{
                userCode: line[0],
                thanksCount: line[1]
            }, {upsert: true}, function(err, docs){
                if(err)
                    console.log(err);
                console.log(docs);
            });
        }
    }
}
function task9(){
    var sheets = xlsx.parse('file/2015年经纪人带看差评数量.xlsx');
    for (var i = 0; i < sheets.length; i++) {
        for(var j = 1 ; j< sheets[i].data.length; j++){
            var line = sheets[i].data[j];
            Statics.findOneAndUpdate({userCode: line[0]},{
                userCode: line[0],
                commentCount: line[1]
            }, {upsert: true}, function(err, docs){
                if(err)
                    console.log(err);
                console.log(docs);
            });
        }
    }
}