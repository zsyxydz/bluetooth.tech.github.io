import {
    urlArr,
    updateUrlArr,
    data
}from './urlconfig'
function control(val,form){
	if(val == "local"){
		data.access_token = '';
		updateUrlArr(data.hubIp);
	}else if(val == "remote"){
		layer.open({
		  	title: 'Remote',
		  	type: 6,
		  	area: ['450px', 'auto'],
		  	shade: 0,
		  	shadeClose:true,
		  	closeBtn: 1,
		  	shadeClose: true,
		  	fixed: true,
		  	maxmin: false,
		  	anim: 5, //0-6的动画形式，-1不开启
		  	tips: [2, '#2F4056'],
		  	content:htmlString(),
		  	btn: ['确定','取消'],
		  	btn1: yes,
		  	btn2:function(index, layero){
		  		$('#control').val('local')
		  		form.render()
		  	},
		  	cancel:function(index, layero){
		  		$('#control').val('local')
		  		form.render()
		  	},
		})

			
	}
}

var htmlString = function() {
  let temp = `<form class="layui-form  tip" action="#">
  <fieldset class="layui-elem-field layui-field-title">
		<legend>oAuth认证</legend>
  </fieldset>
		<div class="layui-form-item" style="text-align:center">
		  <label class="layui-form-label">用户名:</label>
		  <div class="layui-input-inline">
		    <input type="text"  placeholder="用户名" class="layui-input" id="userName">
		  </div>
		   
		</div>
		<div class="layui-form-item">
		  <label class="layui-form-label">密码:</label>
		  <div class="layui-input-inline">
		    <input type="password"  placeholder="密码"  class="layui-input" id="password">
		  </div>
  		</div>
		<div class="layui-form-item">
		  <label class="layui-form-label">Host:</label>
		  <div class="layui-input-inline">
		    <input type="text"  placeholder="Host"  class="layui-input" id="host">
		  </div>
  		</div>
  <fieldset class="layui-elem-field layui-field-title">
    <legend i18n='description'>描述</legend>
  </fieldset>
  <div class="layui-form-item layui-form-text">
    <div class="descriptors scan-des">
      <p><b>接口URL：</b>调用接口后，此URL会自动生成在下面的”API接口”的窗口中。</p>
      <p><b>接口描述：</b>此接口是通过oAuth2.0认证实现云端远程控制。将用户名和密码以base64编码的方式添加在请求参数中，认证成功后获得1小时有效期的access_token,你可以添加参数access_token访问其他API，从而实现远程控制。</p>
      <p><b>参数解释：用户名/密码：</b>从Cassia请求的开发者账户和密码(会以base64编码的方式添加在请求中)</p>
      <p><b>Host：</b>和蓝牙路由器交互的服务器地址</p>
    
    </div>
  </div>

</form>` 
return temp
}
var yes = function(){
	console.log($('#userName').val())
	if($('#userName').val() === '' || $('#password').val() === '' || $('#host').val() === ''){
			layer.msg('输入不能为空', {icon:5,title:'oAuth2',time:1000});
		return
	}
	$.ajax({
			 type: 'POST',
			 url: "http://"+$('#host').val()+"/oauth2/token",
			 data: { "grant_type": "client_credentials"}, //data: {key:value}, 
			 headers : {
			 				"Authorization":'Basic '+btoa($('#userName').val()+':'+$('#password').val()),
			 				"Content-Type":"application/x-www-form-urlencoded"
						},
			 success: function(d){
			 	console.log(d.access_token)
			   if (d.access_token) {
			   	layer.alert('成功', {icon: 1,title:'oAuth2'});
			   	data.access_token = d.access_token
			   	updateUrlArr($('#host').val());
			   	layer.closeAll();
			   }else{
			   		layer.msg('失败', {icon: 2,title:'oAuth2',time: 1000});
			   }
			},
			error: function(e) { 
				layer.msg('失败', {icon: 2,title:'oAuth2',time: 1000});
			} 
	});
}
export {
    control
}