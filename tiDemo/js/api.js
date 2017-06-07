function scan(host,mac,token,cb){
	let url = "http://"+host+"/api/gap/nodes/?mac="+mac+"&event=1&access_token="+token;
	let es = new EventSource(url);
	es.onmessage=function(event){
		cb(event.data);
	}
}
function connect(host,mac,node,token,cb){
	let url = "http://"+host+"/api/gap/nodes/"+node+"/connection?mac="+mac+"&access_token="+token;
	$.post(url,{"type":"public"},function(data){
		console.log(data)
		cb();
	});
}
function write(host,mac,node,handle,value,token){
	let url = "http://"+host+"/api/gatt/nodes/"+node+"/handle/"+handle+"/value/"+value+"/?mac="+mac+"&access_token="+token
	$.get(url,function(){});
}

function notification(host,mac,token,cb){
	let url = "http://"+host+"/api/gatt/nodes/?mac="+mac+"&event=1&access_token="+token; 
	let es = new EventSource(url);
	es.onmessage=function(event){
		cb(event.data);
	}
}
function disconnect(host,mac,node,token){
	let url = "https://"+host+"/api/gap/nodes/"+node+"/connection?mac="+mac+"access_token="+token;
	$.ajax({url:url,type: 'DELETE',
			success: function(result) {
				alert("disconnect");
			}
	});
}

function oAuth(host,userName,password){
	$.ajax({
		 type: 'POST',
		 url: "http:"+host+"/api/oauth2/token",
		 data: { "grant_type": "client_credentials"}, //data: {key:value}, 
		 //添加额外的请求头
		 headers : {
		 				"Authorization":"Basic " + btoa(userName +':'+password),
		 				"Content-Type":"application/x-www-form-urlencoded"
					},
		 //请求成功的回调函数
		 success: function(data){
		   console.log(data);
		   return data.access_token;
		},
		error: function(e) { 
			return "err"
		}
	});
}



/*S1100	1.11.10.62

Cassia-AC-v1.11.10.79*/