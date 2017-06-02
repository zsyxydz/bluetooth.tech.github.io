var deviceMacArr;
var shouhuanLi = `<li style="margin:10px 0;">
	        <div class="form-inline">
	          <div class="form-group">
			    <labelan1 for="">手环&姓名：</label>
			    <input type="text" class="form-control" placeholder="手环Mac">
			    <input type="text" class="form-control" placeholder="姓名">
			  </div>
			  <button class="btn btn-success">添加</button>
			  <button class="btn btn-info">修改</button>
			  <button class="btn btn-danger">删除</button>
			</div>
	  	  </li>`;

function onloadDevice(){
	deviceMacArr = JSON.parse(mystorage.get("deviceMacArr")) || {};
	console.log(deviceMacArr);
	if(!$.isEmptyObject(deviceMacArr)){
		for(let key in deviceMacArr){
			$(".shouhuan").prepend(`<li style="margin:10px 0;">
	        <div class="form-inline">
	          <div class="form-group">
			    <labelan1 for="">手环&姓名：</label>
			    <input type="text" class="form-control" placeholder="手环Mac" disabled="disabled" value="`+key+`">
			    <input type="text" class="form-control" placeholder="姓名" disabled="disabled" value="`+deviceMacArr[key]+`">
			  </div>
			  <button class="btn btn-success" disabled="disabled">添加</button>
			  <button class="btn btn-info">修改</button>
			  <button class="btn btn-danger">删除</button>
			</div>
	  	  </li>`);
		}
	}
}
onloadDevice();


//------------------添加手环mac地址----------

$("body").on("click",'.shouhuan .btn-success',function(){
	let device = $(this).parent().find("input:first");
	let name = $(this).parent().find("input:last");
	if(device.val() == "" || name.val() == ""){
		alert("输入不能为空");
		return;
	}
	if(deviceMacArr[device.val()]){
		alert("不要重复添加");
		return;
	}
	deviceMacArr[device.val()] = name.val();
	device.attr("disabled","disabled");
	$(this).attr("disabled","disabled");
	name.attr("disabled","disabled");
	$(".shouhuan").append(shouhuanLi);
	mystorage.set("deviceMacArr",JSON.stringify(deviceMacArr));

});				
//----------修改手环的mac地址
$("body").on("click",'.shouhuan .btn-info',function(){
	let device = $(this).parent().find("input:first");
	$(this).parent().find("input:last").attr("disabled",false);
	device.attr("disabled",false);
	delete deviceMacArr[device.val()];
	mystorage.set("deviceMacArr",JSON.stringify(deviceMacArr));

});
//------------删除手环mac地址---------------
$("body").on("click",'.shouhuan .btn-danger',function(){
	let device = $(this).parent().find("input:first");
	delete deviceMacArr[device.val()];
	$(this).parent().parent().remove();
	mystorage.set("deviceMacArr",JSON.stringify(deviceMacArr));
});