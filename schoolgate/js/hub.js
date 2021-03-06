var hubinArr = [];
var huboutArr = [];


var hubLi = `
      <li style="margin-top: 10px;">
	        <div class="form-inline">
		      <div class="form-group">
			    <label for="##">路由器IP：</label>
			    <input type="text" class="form-control"  placeholder="IP">
			  </div>
		      <button class="btn btn-success">添加</button>
			  <button class="btn btn-info">修改</button>
			  <button class="btn btn-danger">删除</button>
			</div>
	      </li>
`;

//-----------添加蓝牙路由器IP地址-----
$("body").on("click",'.hub-in .btn-success',function(){
	let hubip = $(this).parent().find('input');
	let hubipval = hubip.val().trim();
	if(hubipval == ""){
		alert("输入不能为空");
		return;
	}

	if(hubinArr.indexOf(hubipval) != -1 || huboutArr.indexOf(hubipval) != -1){
		alert("不要重复添加");
		return;
	}	
	hubip.attr("disabled","disabled"); 
	$(this).attr("disabled","disabled"); 
	$(".hub-in").append(hubLi);
	hubinArr.push(hubipval);
	console.log(hubinArr)
});

$("body").on("click",'.hub-out .btn-success',function(){
	let hubip = $(this).parent().find('input');
	let hubipval = hubip.val().trim();
	if(hubipval == ""){
		alert("输入不能为空");
		return;
	}
	if(hubinArr.indexOf(hubipval) != -1 || huboutArr.indexOf(hubipval) != -1){
		alert("不要重复添加");
		return;
	}		
	hubip.attr("disabled","disabled");
	$(".hub-out").append(hubLi);
	$(this).attr("disabled","disabled"); 
	huboutArr.push(hubipval);
});
//-------------修改路由器ip地址----
$("body").on("click",'.hub .btn-info',function(){
	let hubip = $(this).parent().find('input');
	let hubipval = hubip.val().trim();
	$(this).prev().attr("disabled",false);
	hubip.attr("disabled",false);
	if(hubinArr.indexOf(hubipval) != -1 ) hubinArr.splice($.inArray(hubipval,hubinArr),1);
	if(huboutArr.indexOf(hubipval) != -1) huboutArr.splice($.inArray(hubipval,huboutArr),1);

});

//------------------删除---------
$("body").on("click",'.hub-in .btn-danger',function(){
	let hubip = $(this).parent().find('input');
	$(this).parent().parent().remove();
	hubinArr.splice($.inArray(hubip.val().trim(),hubinArr),1);
});
//------------------删除--------- 
$("body").on("click",'.hub-out .btn-danger',function(){
	let hubip = $(this).parent().find('input');
	$(this).parent().parent().remove();
	delete huboutArr[hubip.val().trim()];
	huboutArr.splice($.inArray(hubip.val().trim(),huboutArr),1);
});