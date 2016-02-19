(function(w){
    // js接口
    var javascriptInterface = 'Native';
    // 本地接口
    var mobileInterface = 'client';

    /**
     * 调用手机拨号程序拨打电话
     * @method 拨打电话
     * @param {String} phoneNumber 电话号码
     */
    function dial(number){
        console.log('调用本地拨号程序');
        w[mobileInterface] && w[mobileInterface].dial(number);
    };

    /**
     * 调用手机短信程序发送短信
     * @method 发送短信
     * @param {String} phoneNumber 电话号码
     * @param {String} message 短信内容
     */
    function sendSMS(number, message){
        console.log('调用本地短信程序');
        w[mobileInterface] && w[mobileInterface].sendSMS(number, message);
    };

    /**
     * 调用手机提示功能
     * @method 提示信息
     * @param message 信息内容
     */
    function showToast(message){
        console.log('调用本地提示程序');
        w[mobileInterface] && w[mobileInterface].showToast(message);
    };

    /**
     * 配置分享参数
     * @param options
     */
    function configShare(options){
        console.log('调用本地程序');
        if(isIOS()) {
            var params = [];
            for(var k in options){
                params.push(k + '=' + options[k]);
            }
            window.location.href = mobileInterface + '::configShare:' + params.join('&');
        } else {
            w[mobileInterface] && w[mobileInterface].configShare(JSON.stringify(options));
        }
    }

    /**
     * 打开分享框
     */
    function openShareDialog(){
        console.log('调用本地程序');
        if(isIOS()) {
            window.location.href = mobileInterface + '::openShareDialog:';
        } else {
            w[mobileInterface] && w[mobileInterface].openShareDialog();
        }
    }

    //是否IOS系统
    function isIOS(){
        return !!navigator.userAgent.toLowerCase().match(/iPhone|ipad.+OS/i);
    }

    w[javascriptInterface] = {
        dial: dial,
        sendSMS: sendSMS,
        showToast: showToast,
        configShare: configShare,
        openShareDialog: openShareDialog
    };
})(window);


