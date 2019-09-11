let util = {
    formatDate(time,format){
        format = format || "yyyy-MM-dd hh:mm:ss";
        let d = new Date();//创建时间对象
        let localTime = time;//当地时间戳
        let localOffset=d.getTimezoneOffset()*60000;//获得当地时间偏移的毫秒数
        let utc = localTime + localOffset; //utc即GMT时间
        let offset = 8;//中国在东8区
        time = utc + (3600000*offset); //真正的时间戳
        let date = new Date(time);
        var o = {
            "M+": date.getMonth() + 1, //month
            "d+": date.getDate(),    //day
            "h+": date.getHours(),   //hour
            "m+": date.getMinutes(), //minute
            "s+": date.getSeconds(), //second
            "q+": Math.floor((date.getMonth() + 3) / 3),  //quarter
            "S": date.getMilliseconds() //millisecond
        }
        if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o) if (new RegExp("(" + k + ")").test(format))
            format = format.replace(RegExp.$1,
                RegExp.$1.length == 1 ? o[k] :
                    ("00" + o[k]).substr(("" + o[k]).length));
        return format;
    },
    isIPad() {
        return WXEnvironment && (WXEnvironment.deviceModel.indexOf('iPad') === 0);
    },
    isAppleSimulator() {
        return WXEnvironment && (WXEnvironment.deviceModel === 'x86_64');
    },
    isIPhoneX() {
        return WXEnvironment && (WXEnvironment.deviceModel === 'iPhone10,3' || WXEnvironment.deviceModel === 'iPhone10,6' || WXEnvironment.deviceModel === 'iPhone11,6' || WXEnvironment.deviceModel === 'iPhone11,2' || WXEnvironment.deviceModel === 'iPhone11,4' || WXEnvironment.deviceModel === 'iPhone11,8');
    },
    isIPhone(){
        return WXEnvironment &&  WXEnvironment.platform === 'iOS';
    },
    isAndroid(){
        return WXEnvironment &&  WXEnvironment.platform === 'android';
    },
    // 适配
     fixStyle () {
         let that = util;
        if(that.isIPhoneX()){
            return {
                borderTopWidth : '80px',
                borderTopStyle : 'solid',
                borderTopColor : '#F39424',
            }
        }else if(that.isIPhone()){
            return {
                borderTopWidth : '40px',
                borderTopStyle : 'solid',
                borderTopColor : '#F39424',
            }
        }else if(that.isAndroid()){
            return {};
        }else {
            return {};
        }
    }

}

module.exports = util;