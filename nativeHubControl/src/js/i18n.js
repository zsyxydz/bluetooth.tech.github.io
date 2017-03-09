import globalData from './globalData'
 const i18n = function(language) {
    
    var cn = {
            //--common--//
            '_lang':'cn',
            'lang':'语言',
            'title':'Cassia 蓝牙调试工具',
            'header': 'cassia 蓝牙调试工具',
            'reboot': '重启',
            'allApi': '总览API',
            'scanDevice': '扫描设备',
            'connDevice': '连接设备',
            'connedDevice': '已连接设备',
            'discoverServices': '发现设备服务',
            'openNotify': '打开Hub通知',
            'stateChange': '连接状态变化',
            'writeCom':'写入指令',
            'disCon':'断开连接',
            'scanList':'扫描列表',
            'startScan':'开始扫描',
            'devcieAndService':'设备及服务列表',
            'getList':'获取已连接设备',
            'stateChangeNotify':'连接状态变化通知',
            'notifyList':'通知列表',
            'openHubNotify':'打开Hub通知',
            'clearList':'清空此列表',
            'apiSocket':'API接口',
            'scanResult':'扫描结果',
            'disService':'发现服务',
            'getMsg':'接收设备信息',
            'deviceConStateChange':'设备连接转态变化',           
            'arguments':'参数',
            'optional':'(选填)',
            'required':'(必填)',
            'description':'描述',
            'hubNotifyStatus':'Hub通知状态',
            'method':'方法名',
            'addMore':'加载更多'
        },
        en = {
            '_lang':'en',
            'lang':'Language',
            'title':'Cassia Blooth Dev Tools',
            'header': 'Cassia Blooth Dev Tools',
            'reboot': 'Reboot',
            'allApi': 'API Info',
            'scanDevice': 'Scan Device',
            'connDevice': 'Connect Device',
            'connedDevice': 'Connected Devices',
            'discoverServices': 'Discover Device Services',
            'openNotify': 'Open Hub Notify',
            'stateChange': 'Connection State Changes',
            'writeCom':'Write Instruction',
            'disCon':'Disconnect',
            'scanList':'Scan List',
            'startScan':'Start Scan',
            'devcieAndService':'Device and Services List',
            'getList':'Connected Devices',
            'stateChangeNotify':'Connection State Changes Notify',
            'notifyList':'Notify List',
            'openHubNotify':'Open Hub Notify',
            'clearList':'Clear List',
            'apiSocket':'Api Interfaces',
            'scanResult':'Scan Results',
            'disService':'Discover Services',
            'getMsg':'Devices\'s Messages',
            'deviceConStateChange':'Devices Connection State Changes',
            'arguments':'Parameter',
            'optional':'(optional)',
            'required':'(Required)',
            'description':'Description',
            'hubNotifyStatus':'Hub Notify Status',
            'method':'Method',
            'addMore':'Add More'
        },
        lang = {},
        i18n = function(k) {
            return lang[k] || null;
        },
        auto = function() {
            var bl = (navigator.language || navigator.browserLanguage).toLowerCase();
            bl.match('cn') ? (lang = cn) : (lang = en)
        };

    /* auto select language form settings */
    if(!language){
        try {
            var s = JSON.parse(localStorage.getItem('settings'));
            if (!s.language || s.language === 0) {
                auto();
            } else {
                (s.language === 'cn') ? (lang = cn) : (lang = en);
            }
        } catch (e) {
            auto()
        }
        globalData.lang = lang._lang
    }
   

    /**
     * i18n.format
     *
     * @param {String} String template (set String `{0},{1},{2}` in your arguments)
     * @param {String} String arguments as data
     * @return {String} String response
     * @example
     *      var number = 30;
     *      el.innerHTML = i18n.format('查看所有 {0} 条',number);
     */
    i18n.format = function(str) {
        if (arguments.length === 1) return str;
        var args = Array.prototype.slice.call(arguments, 1);
        return String(str).replace(/\{(\d+)\}/g, function(m, i) {
            return args[i]
        })
    };

    i18n.render = function(language) {
        console.error(language)
        if (language === 'cn') {
            lang = cn
            globalData.lang = 'cn'
        }else if(language){
            lang = en
            globalData.lang = 'en'
        }
        // globalData.lang= lang._lang
        console.warn(globalData.lang)
        
        $('#lang option').removeAttr('checked')
        $('#lang').val(globalData.lang)
        // $(`#lang option[value='${globalData.lang}']`).attr('selected','true')

        setTimeout(function() {
            // $('*').each(function () {
            var a = document.getElementsByTagName('*'),
                t, s;
            for (var i in a) {
                t = a[i];
                if (t && t.getAttribute) {
                    s = t.getAttribute('i18n');
                    console.log('#######',t.getAttribute('i18n-loaded')!==globalData.lang)
                    if (s && i18n(s) && t.getAttribute('i18n-loaded')!==globalData.lang) {
                        t.innerHTML = i18n(s);
                        t.setAttribute('i18n-loaded', globalData.lang);
                    }
                }
            }
            // });
        }, 15);
    };
    i18n.render(language);
    document.body.removeEventListener('DOMNodeInserted',function(){i18n.render()},false)
    document.body.addEventListener('DOMNodeInserted', function(){i18n.render()},false);
  
}

export default i18n