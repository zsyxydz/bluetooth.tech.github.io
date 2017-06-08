$(document).ready(function(){

 


//---------------------

//--------------------



handle_value = {
    37:"0100",39:"01",45:"0100",47:"01",53:"0100",55:"01",69:"0100",71:"01"
}
var host,username,password,APmac,node,token,isconnect = false;
var lang = {
    en: {
        'SamplingFrequency': 'Sampling Frequency',
        'RefreshRate': 'Refresh Rate',
        'connect': 'Connect',
        'disconnectAll': 'DisconnectAll',
        'receivepacket': 'Receive packet',
        //'Accelerometer': 'Accelerometer',
        //'Gyroscope': 'Gyroscope',
        //'Magneto': 'Magneto-meter',
        'Humidity': 'Humidity',
        'Pressure': 'Pressure',
        'Temperature': 'Temperature',
        //'Acoustic': 'Acoustic',
        'Digitlight': 'Digit light'

    },
    cn: {
        'SamplingFrequency': '采样频率',
        'RefreshRate': '页面刷新频率',
        'connect': '连接',
        'disconnectAll': '断开所有连接',
        'receivepacket': '收到数据包:',
        //'Accelerometer': '加速度',
        //'Gyroscope': '陀螺仪',
        //'Magneto': '磁感',
        'Humidity': '湿度',
        'Pressure': '压力',
        'Temperature': '温度',
        //'Acoustic': '声感',
        'Digitlight': '光照'
    },
    //useLang: getCookie('useLang') || 'en'
    useLang: mystorage.get('useLang') || 'en'
    //useLang: "cn" || 'en'
}


$(".disconbtn").on('click',function(){
    disconnect(host,APmac,node,token)
  /*  oAuth("192.168.199.237","tester","10b83f9a2e823c47")*/
});


$(".conbtn").on('click',function(){
    host = $("#acaddress").val().trim();
    username = $("#username").val().trim();
    password = $("#password").val().trim();
    APmac = $("#apmac").val().trim();
    node = $("#node").val().trim();
    oAuth(host,username,password).then(function(value){
        console.log(value)
        token = value;
        if(token === "err" || !token){
            alert("获取token失败，请检查填写是否正确")
            return 
        }
        else{
            scan(host,APmac,token,conn);
            notification(host,APmac,token,notify2canvas);
        }
    }) // oauth

});
var connectNum = 0;
function conn(scanData){
        console.log(scanData)
        let data = JSON.parse(scanData);
        let mac = data.bdaddrs[0].bdaddr;
        if(mac == node){
            if (!device.real[mac]) {
                device.newItem = true
                device.real[mac] = {
                    name: data.name,
                    connect: false,
                    created: false,
                    lastConnect: 1
                }
                if (connectNum === 0) {
                    $.extend(true, 
                        device.real[mac], 
                    device.real.temp)
                    delete device.real.temp
                }
            }
            if(! isconnect){
                connect(host,APmac,mac,token,writeALL);
                isconnect = true;
            }
    }
}
function writeALL(){
    co(function*(){
        try {
        for(let key in handle_value) {
            console.log(key,handle_value[key])
            yield write(host,APmac,node,key,handle_value[key],token);
        }               
        } catch(e) {
            console.log(e);
        }
    });
}

function notify2canvas(notifyData){
    //console.log(notifyData)
    let data = JSON.parse(notifyData);
    let mac = data.id;
    let handle = data.handle;
    let value = data.value;
    if (typeof device.real[mac] === 'undefined')
            return
    //console.log(handle,value);
    let //accxData = device.real[mac].accxData,
        //accyData = device.real[mac].accyData,
        //acczData = device.real[mac].acczData,
        //accDate = device.real[mac].accDate,
        //gyroxData = device.real[mac].gyroxData,
        //gyroyData = device.real[mac].gyroyData,
        //gyrozData = device.real[mac].gyrozData,
        //gyroDate = device.real[mac].gyroDate,
        lightData = device.real[mac].lightData || [],
        lightDate = device.real[mac].lightDate || [],
        temperatureData = device.real[mac].temperatureData || [],
        temperatureDate = device.real[mac].temperatureDate || [],
        humData = device.real[mac].humData || [],
        humDate = device.real[mac].humDate || [],
        pressureData = device.real[mac].pressureData || [],
        pressureDate = device.real[mac].pressureDate || [];
        
        let date = new Date();
        let dateStr = [date.getHours(), date.getMinutes(), date.getSeconds()].join(':');

       /* if (lightData.length >= 10) {
            lightData.shift();
            lightDate.shift();
            temperatureData.shift();
            temperatureDate.shift();
            humData.shift();
            humDate.shift();
            pressureData.shift();
            pressureDate.shift();
        }*/
    switch(handle){
        case 36:
            let temp = sensorTmp007Convert(value);
            temperatureData.push(temp);
            temperatureDate.push(dateStr);
            if(temperatureData.length >= 15){
                temperatureData.shift();
                temperatureDate.shift();
            }
            device.real[mac].temperatureData = temperatureData;
            device.real[mac].temperatureDate = temperatureDate;
            device.real[mac].temperatureChart.setOption({
                xAxis: {
                    data: temperatureDate
                },
                series: [{
                    data: temperatureData
                }]
            });
            
        break;

        case 44:
            let hum = sensorHdc1000Convert(value);
            humData.push(hum);
            humDate.push(dateStr);
            device.real[mac].humData = humData;
            device.real[mac].humDate = humDate;
            if(humData.length >= 15){
                humData.shift();
                humDate.shift();
            }
            device.real[mac].humChart.setOption({
                xAxis: {
                    data: humDate
                },
                series: [{
                    data: humData
                }]
            });
        break;
        case 52:
            let pressure = calcBmp280(value);
            pressureData.push(pressure);
            pressureDate.push(dateStr);
            if(pressureData.length >= 15){
                pressureData.shift();
                pressureDate.shift();
            }
            device.real[mac].pressureData = pressureData;
            device.real[mac].pressureDate = pressureDate;
            device.real[mac].pressureChart.setOption({
                xAxis: {
                    data: pressureDate
                },
                series: [{
                    data: pressureData
                }]
            });
            
        break;
        case 68:
            let light = SensorOpt3001_convert(value);
            lightData.push(light);
            lightDate.push(dateStr);
            if(lightData.length >= 15){
                lightData.shift();
                lightDate.shift();
            }
            device.real[mac].lightData = lightData;
            device.real[mac].lightDate = lightDate;
            device.real[mac].lightChart.setOption({
                xAxis: {
                    data: lightDate
                },
                series: [{
                    data: lightData
                }]
            });
            
        break;

    }
}

let device = {
    fre1: '64000000',
    fre2: 1000,
    real: {
        temp: {}
    },
    real2: [], //真实的mac
    virtualSensor: [], //添加的chart的virtual Mac会在这里
    virtualMacArr: false, //总的virtual MAC 会shift头mac
    macRouterMap: {},
    newItem: false
}

$('#lang').on('change', function () {
    console.log($(this).val())
        if ($(this).val() === 'en') {
            lang.useLang = 'en'
        } else {
            lang.useLang = 'cn'
        }
       // setCookie('useLang', lang.useLang, 100)
        mystorage.set('useLang',lang.useLang)
        location.reload()
    });

function changeSelectLangShow() {
    $('#lang').val(lang.useLang)
}

function changeUiLangShow() {
    var text = ''
    $('.i18n').each(function () {
        text = lang[lang.useLang][$(this).attr('i18n')]
        if (text) {
            $(this).html(text)
        }
    })
}
changeSelectLangShow()
changeUiLangShow()



var chartInit = function (n, mac) {
    let _mac = mac || 'temp',
        _n = n - 1
   // device.real[_mac].accChart = echarts.init($('.acc')[_n])
    //device.real[_mac].gyroChart = echarts.init($('.gyro')[_n])
    device.real[_mac].lightChart = echarts.init($('.light')[_n])
    device.real[_mac].temperatureChart = echarts.init($('.temperature')[_n])
    device.real[_mac].humChart = echarts.init($('.hum')[_n])
    device.real[_mac].pressureChart = echarts.init($('.pressure')[_n])


        let tooltip = {
            trigger: 'axis',
            // formatter: function (params) {
            //     params = params[0];
            //     let date = new Date(params.name);
            //     return date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + '</br>' ;
            // },
        };
        let xAxis = {
                nameLocation: 'middle',
                name: 'time',
                type: 'category',
                boundaryGap: false,
                data: []
            }
        let grid = {
                left: '3%',
                right: '0%',
                bottom: '3%',
                containLabel: true
            };
        device.real[_mac].lightChart.setOption({
            title: {
                text: lang[lang.useLang].Digitlight
            },
            tooltip: tooltip,
            xAxis: xAxis,
            yAxis: {
                name: 'lux'
            },
            grid: grid,
            series: [{
                name: lang[lang.useLang].Digitlight,
                type: 'line',
                sampling: 'average'
            }]
        });

        device.real[_mac].temperatureChart.setOption({
            title: {
                text: lang[lang.useLang].Temperature
            },
            tooltip: tooltip,
            xAxis: xAxis,
            yAxis: {
                name: '℃'
            },
            grid: grid,
            series: [{
                name: lang[lang.useLang].Temperature,
                type: 'line',
                sampling: 'average'
            }]
        });

        device.real[_mac].humChart.setOption({
            title: {
                text: lang[lang.useLang].Humidity
            },
            tooltip: tooltip,
            xAxis: xAxis,
            yAxis: {
                name: 'rh%'
            },
            grid: grid,
            series: [{
                name: lang[lang.useLang].Humidity,
                type: 'line',
                sampling: 'average'
            }]
        });
        device.real[_mac].pressureChart.setOption({
            title: {
                text: lang[lang.useLang].Pressure
            },
            tooltip: tooltip,
            xAxis: xAxis,
            yAxis: {
                name: 'kPa'
            },
            grid: grid,
            series: [{
                name: lang[lang.useLang].Pressure,
                type: 'line',
                sampling: 'average'
            }]
        });
        mac === 'temp' ? device.real[_mac].created = true : 0;
};
    chartInit(1);
});

