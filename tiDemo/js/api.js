var es;
function scan(host,mac,token,cb){
	let url = "http://"+host+"/gap/nodes/?mac="+mac+"&event=1&access_token="+token;
	es = new EventSource(url);
	es.onmessage=function(event){
		if(event.data !== ":keep-alive"){
			cb(event.data);
		}
	}
}
function connect(host,mac,node,token,cb){
	let url = "http://"+host+"/gap/nodes/"+node+"/connection?mac="+mac+"&access_token="+token;
	$.post(url,{"type":"public"},function(data){
		alert("Connected")
		es.close();
		cb();
	});
}
function write(host,mac,node,handle,value,token){
	return new Promise(function(resolve, reject) {
		let url = "http://"+host+"/gatt/nodes/"+node+"/handle/"+handle+"/value/"+value+"/?mac="+mac+"&access_token="+token
		$.get(url,function(){
			resolve();
		});
	})
}

function notification(host,mac,token,cb){
	let url = "http://"+host+"/gatt/nodes/?mac="+mac+"&event=1&access_token="+token; 
	let es = new EventSource(url);
	es.onmessage=function(event){
		if(event.data !== ":keep-alive"){
			cb(event.data);
		}
	}
}
function disconnect(host,mac,node,token){
	let url = "http://"+host+"/gap/nodes/"+node+"/connection?mac="+mac+"&access_token="+token;
	$.ajax({url:url,type: 'DELETE',
			success: function(result) {
				alert("disconnect");
				location.reload();
			}
	});
}

function oAuth(host,userName,password){
	return new Promise(function(resolve, reject) {
		$.ajax({
			 type: 'POST',
			 url: "http://"+host+"/oauth2/token",
			 data: { "grant_type": "client_credentials"}, //data: {key:value}, 
			 //添加额外的请求头
			 headers : {
			 				"Authorization":"Basic " + btoa(userName +':'+password),
			 				"Content-Type":"application/x-www-form-urlencoded"
						},
			 //请求成功的回调函数
			 success: function(data){
			   console.log(data);
			   resolve(data.access_token);
			  // console.log(data.access_token)
			   //return data.access_token;
			},
			error: function(e) { 
				reject(e)
			}
		});
	});
}



/*S1100	1.11.10.62

Cassia-AC-v1.11.10.79*/