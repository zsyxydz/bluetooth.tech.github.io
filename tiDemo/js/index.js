$(document).ready(function(){

handle_value = {
    37:0100,39:01,45:0100,47:01,53:0100,55:01,69:0100,71:01
}
var device = {};
var host,username,password,APmac,node,token;


$(".disconbtn").on('click',function(){
    /*if(token) disconnect(host,mac,node,token)
    else{
        alert("失败")
    }*/
    oAuth("192.168.199.163","tester","10b83f9a2e823c47")
});

$(".conbtn").on('click',function(){
    host = $("#acaddress").val().trim();
    username = $("#username").val().trim();
    password = $("#password").val().trim();
    APmac = $("#apmac").val().trim();
    node = $("#node").val().trim();

    token = oAuth(host,username,password) // oauth
    if(token === "err" || !token){
        alert("获取token失败，请检查填写是否正确")
        return 
    }
    scan(host,APmac,token,conn);
    notification(host,APmac,token,notify2canvas);

});


function conn(scanData){
    let data = JSON.parse(scanData);
    let deviceMac = data.bdaddrs[0].bdaddr;
    if(deviceMac == node){
        connect(host,APmac,node,token,writeALL);
    }

}
function writeALL(){
    for(let key in handle_value)
    write(host,APmac,node,key,value,token);
}

function notify2canvas(notifyData){
    console.log(notifyData)
}












/*var myChart = echarts.init($(".temp")[0]);

        // 指定图表的配置项和数据
        var option = {
            title: {
                text: '温度'
            },
            tooltip: {},
            legend: {
                data:['销量']
            },
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36]
            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);*/
})