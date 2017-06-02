$(document).ready(function(){
var buffer = {};
var nodearr = {};
var state = {};

var buffer_interval_time = 950;	
var buffer_interval;

var vpt = -75;//信号阈值
var win = 5;

var xiaonei = 1;
var xiaowai = 2;
/*
	---------------------结束的点击事件-------------
 */
$("#end").on("click",function(){
	clearInterval(buffer_interval);
	alert("已停止");
	state = null;
    state = {};

});

//----------------开始工作-------------------------

$("#start").on("click",function(){

	console.log(deviceMacArr,hubinArr,huboutArr);
	if($.isEmptyObject(deviceMacArr)){
		alert("先添加几个手环吧");
		return;
	}
	if(hubinArr.length == 0){
		alert("请添加校内路由器");
		return;
	}
	if(huboutArr.length == 0){
		alert("请添加校外路由器");
		return;
	}
	for(let i = 0; i < hubinArr.length;i++ ){
		scan(hubinArr[i],scan2buffer);
	}
	for(let i = 0; i < huboutArr.length;i++ ){
		scan(huboutArr[i],scan2buffer);
	}
//-------------------------------定时将buffer中的数据存到nodeArr中----------------------------------------------
    buffer_interval = setInterval(function(){	
		buffer2nodearr(hubinArr,huboutArr,buffer,nodearr);// 将buffer的数据存入 nodearr对象
		$.each(nodearr, function (index, obj) {
			let node = obj.node; 
			judgebuffer(nodearr,buffer,node);

			let status = judgeposition(obj.value,vpt);
			console.log(status);
			if(status !== undefined) ReportedPosition(status,nodearr,node);
		});
		buffer = null;
		buffer = {};


	},buffer_interval_time);
//------------------------------------------------------------------------------------

});

//---------------------scan2buffer   将扫描到的数据存入buffer对象
function scan2buffer(scanData,APIP){
	let data = JSON.parse(scanData);
	let deviceMac = data.bdaddrs[0].bdaddr;
	let rssi = data.rssi;
	if(deviceMacArr[deviceMac]){
		//console.log(deviceMac);
		if(!buffer[deviceMac]){
			buffer[deviceMac]={};
			buffer[deviceMac].data = {};
			buffer[deviceMac].data[APIP] = [rssi];
			buffer[deviceMac].deviceMac = deviceMac;

		}else{
			try{
				if(!buffer[deviceMac].data[APIP]){
					buffer[deviceMac].data[APIP] = [];
				}
				buffer[deviceMac].data[APIP].push(rssi);
				//console.log(buffer);
			}catch(e){};
		}
	};
}

// 将buffer中的数据 存入nodearr
function buffer2nodearr(hubinArr,huboutArr,buffer){
	$.each(buffer, function (index, obj) {
	//	console.log(obj)
		let node = obj.deviceMac;   //buffer对象中存储的deviceMac对象 
		let data = obj.data;
	let value = {};
	for(var i = 0;i < hubinArr.length;i++){
		value[hubinArr[i]] = null;
	}
	for(var i = 0;i < huboutArr.length;i++){
		value[huboutArr[i]] = null;
	}
	for(var key in data){
		value[key] = pingjun(data[key]);
	}
 	console.log(value);
	if(!nodearr[node]){
		nodearr[node] = {};
		nodearr[node].node = node;
		nodearr[node].position = "";
		nodearr[node].point = 0;
		nodearr[node].value = [];
		nodearr[node].value[0] = value;
		//console.log(nodearr);	
	}else{
		nodearr[node].point++;
		if(nodearr[node].point > win) nodearr[node].point = 0;
		let p = nodearr[node].point;
		nodearr[node].value[p] = value;
		//console.log(nodearr);
	} 
});
}

//---------------------如果buffer 不包含nodearr中的数据   就写入空
function judgebuffer(nodearr,buffer,node){

			if(!buffer[node]){
				nodearr[node].point++;
				if(nodearr[node].point > win){
					nodearr[node].point = 0;
				}
				let value = {};
				for(var i = 0;i < hubinArr.length;i++){
					value[hubinArr[i]] = null;
				}
				for(var i = 0;i < huboutArr.length;i++){
					value[huboutArr[i]] = null;
				}
				let p = nodearr[node].point;
				nodearr[node].value[p] = value;
			}
}


/*
valueArr：[
	{hub1:-10,hub2:-20,hub3:null},
	{hub1:-30,hub2:-10,hub3:null}
]

 */
 
//  获取手环的位置  离那个路由器近
function judgeposition(valueArr,vpt){
	let allHubs = {};
console.log(valueArr);
	$.each(valueArr, function (index, obj) {
		for(let key in obj){
			if(allHubs[key]){
				allHubs[key].sum += obj[key];
				if(obj[key] !== null) allHubs[key].n++;
			}else{
				if(obj[key] !== null) allHubs[key] = {sum:obj[key],n:1};
			}
		}
	});
	console.log(allHubs);
	let max = 0;
	let position;
	for(let key in allHubs){
		let avg = allHubs[key].sum/allHubs[key].n;
		if(max == 0){
			max = avg;
			position = key;
		} 
		if(max < avg){
			max = avg;
			position = key;
		}
	}
	//console.log(max);
	if( $.isEmptyObject(allHubs)|| max < vpt ){
		return "back";
	}

	if(position && allHubs[position].n > 1) return position;
	
	
}

//---------------对返回的位置进行处理和上报


function ReportedPosition(status,nodearr,node){

	if(status == "back"){
		if($.inArray(nodearr[node].position,hubinArr) > -1){
			console.log(state[node]);
			if(!state[node] || state[node] !== xiaonei){
				console.log(node,"进入学校",nodearr[node]);
				state[node] = xiaonei;
				var mydate = new Date();
				$("tbody").prepend(`<tr class="success"><td>`+deviceMacArr[node]+
					`</td><td>进入学校</td><td>`+mydate.getHours()+":"+mydate.getMinutes()+`</td></tr>`);
			}
		}
		if($.inArray(nodearr[node].position,huboutArr) > -1){
			if(!state[node] || state[node] !== xiaowai){
			console.log(node,"离开学校",nodearr[node]);
			state[node] = xiaowai;
			var mydate = new Date();
			$("tbody").prepend(`<tr class="danger"><td>`+deviceMacArr[node]+
				`</td><td>离开学校</td><td>`+mydate.getHours()+":"+mydate.getMinutes()+`</td></tr>`);
			}
		}

	}else{
		nodearr[node].position = status;
	}
}

});

































/*

buffer:{
	deviceMac:{
		deviceMac:deviceMac,
		hub1:[rssi,rssi,rssi..],
		bub2:[rssi,rssi,rssi..],
		hub...
	}
}




	// 将buffer 中的 deviceMac、每个路由器扫描的rssi 存在 一个nodearr对象中
 	
 	nodearr:{
 	  node:{
 	  	node:node;
 	  	position:"";
 	  	point:0;
 	  	value = [
 	  		{hub1:rssi,hub2:rss1,..}
 	  	];
 	  },
 	  node:{
 	  },
 	  ...
 	
 	}*/