function run(){
	var flag;
    api
        .use({
            server: 'api.cassianetworks.com',
            hub: $('.hubIp').val() || 'CC:1B:E0:E0:22:60',
            developer: 'tester',
            key: '10b83f9a2e823c47'
        })
        .oauth2({
        	success: function(){
        	api
				// .on('scan', function(a){
		  //       	api.conn({
		  //       		node: $('.devMac').val(),
		  //       		type: 'public'
		  //       	})
		  //       })
		        .on('notify', function(hub, data){
								// obj = JSON.parse(b.data)
					var node = $('.devMac').val()
					console.log(3333, data)


					if (data == ':keep-alive') return;

					var tem = JSON.parse(data).value
					
					if (tem.substring(2,4) == "24") {
						pro1_1 = tem.substring(8,10)
						pro1_2 = tem.substring(10,12)
						pro1 = parseInt("0x"+pro1_2+pro1_1,16)*0.001
						pro2_1 = tem.substring(12,14)
						pro2_2 = tem.substring(14,16)
						pro2 = parseInt("0x"+pro2_2+pro2_1,16)*0.001
						pro3_1 = tem.substring(16,18)
						pro3_2 = tem.substring(18,20)
						pro3 = parseInt("0x"+pro2_2+pro2_1,16)*0.001
						pro4_1 = tem.substring(20,22)
						pro4_2 = tem.substring(22,24)
						pro4 = parseInt("0x"+pro2_2+pro2_1,16)*0.001
						$(".Temperature").append([
							pro1, pro2, pro3, pro4
						].join())

						api
							.write({handle: 16, node: node, value: '2129000000'})
		        			.write({handle: 16, node: node, value: '2200a004000000'})
		        			flag = 'BatteryVoltage'
		        			// .write({handle: 16, node: node, value: '24'})

					}else if(tem.substring(2,4) == "25") {
							ppro1_1 = tem.substring(8,10)
							ppro1_2 = tem.substring(10,12)
							ppro1 = parseInt("0x"+ppro1_2+ppro1_1,16)*0.001
							ppro2_1 = tem.substring(16,18)
							ppro2_2 = tem.substring(18,20)
							ppro2 = parseInt("0x"+ppro2_2+ppro2_1,16)*0.001
							ppro3_1 = tem.substring(24,26)
							ppro3_2 = tem.substring(26,28)
							ppro3 = parseInt("0x"+ppro2_2+ppro2_1,16)*0.001
							ppro4_1 = tem.substring(32,34)
							ppro4_2 = tem.substring(34,36)
							ppro4 = parseInt("0x"+ppro2_2+ppro2_1,16)*0.001
							$(".BatteryVoltage").append([
								ppro1, ppro2, ppro3, ppro4
							].join())

							api
								.write({handle: 16, node: node, value: '2109000000'})
			        			.write({handle: 16, node: node, value: '22002004000000'})
			        			flag = 'Microphone'
					}else if(tem.substring(2,4) == "09"){
						
			        		$(".Microphone").append(tem)
			        		api
								.write({handle: 16, node: node, value: '2119000000'})
			        			.write({handle: 16, node: node, value: '22006004000000'})
			        			flag = 'Accelerometer'
					}else if(tem.substring(2,4) == "19"){
							$(".Accelerometer").append(tem)
								api
									.write({handle: 16, node: node, value: '2111000000'})
				        			.write({handle: 16, node: node, value: '22004004000000'})
				        			flag = 'Magnetometer'
					}else if(tem.substring(2,4) == "11"){

									$(".Magnetometer").append(tem)
					}else if(tem.substring(0,4) == "2601"){
											
												if (flag == "Temperature") {
													$(".Temperature").append("not used")
													api
														.write({handle: 16, node: node, value: '2129000000'})
		        										.write({handle: 16, node: node, value: '2200a004000000'})
		        										flag = "BatteryVoltage"
												}else if (flag == "Microphone") {
													$(".Microphone").append("not used")
													api
								.write({handle: 16, node: node, value: '2119000000'})
			        			.write({handle: 16, node: node, value: '22006004000000'})
			        					        		flag = "Accelerometer"

												}else if(flag == "Accelerometer") {
													$(".Accelerometer").append("not used")
													api
									.write({handle: 16, node: node, value: '2111000000'})
				        			.write({handle: 16, node: node, value: '22004004000000'})

				        					        	flag = "Magnetometer"

												}else if(flag == "BatteryVoltage") {
													$(".BatteryVoltage").append("not used")
													api
								.write({handle: 16, node: node, value: '2109000000'})
			        			.write({handle: 16, node: node, value: '22002004000000'})
			        					        		flag = "Microphone"

												}else if(flag == "Magnetometer") {
													$(".Magnetometer").append("not used")
												}
										
									
								
								
						}		
		        })
		        .on('conn', function(hub, node, data){
		        	if (node) {
		        		api
		        			.write({handle: 19, node: node, value: '0100'})
		        			.write({handle: 16, node: node, value: '620000'})
		        			.write({handle: 16, node: node, value: '2121000000'})
		        			.write({handle: 16, node: node, value: '22008004000000'})
		        			flag = 'Temperature'
		        			// .write({handle: 16, node: node, value: '24'})
		        	}
		        })
		        .conn({
	        		node: $('.devMac').val(),
	        		type: 'public'
	        	})
	        	.dis

        	}
        });
}



$(function(){

	$('.btn').on('click', run)

 



return;
})



// 	var ip = $(".hubIp").val()
// 	var mac = $(".devMac").val()
// 	$(".btn").click(function(){
// 		//扫描接口
// 		var a = "";
// 		var source=new EventSource("http://"+ip+"/gap/nodes/?event=1&mac="+mac+"&chip=0");
// 		source.onmessage=function(event)
// 	 		{
// 				a=event;
// 			};
// 		//连接，发送命令接口
// 		$.ajax({
// 			url:"http://"+ip+"/gap/nodes/"+mac+"/connection?mac=&chip=0&access_token=",
// 			type:"post",
// 			data:{},
// 			success:function(self){
// 				$.ajax({
// 					url:"http://"+ip+"/gatt/nodes/"+mac+"/handle/19/value/0100/?mac=&access_token=",
// 					type:"get",
// 					data:{},
// 					success:function(res){
// 						console.log(res)
// 					}
// 				})
// 				$.ajax({
// 					url:"http://"+ip+"/gatt/nodes/"+mac+"/handle/16/value/620000/?mac=&access_token=",
// 					type:"get",
// 					data:{},
// 					success:function(res){
// 						console.log(res)
// 					}
// 				})
// 			//温度
// 				$.ajax({
// 					url:"http://"+ip+"/gatt/nodes/"+mac+"/handle/16/value/2121000000/?mac=&access_token=",
// 					type:"get",
// 					data:{},
// 					success:function(res){
// 						$.ajax({
// 							url:"http://"+ip+"/gatt/nodes/"+mac+"/handle/16/value/22008004000000/?mac=&access_token=",
// 							type:"get",
// 							data:{},
// 							success:function(res){
// 								console.log(res)
// 							}
// 						})
// 					}
// 				})
// 				var b = "";
// 				var source = new EventSource("http://"+ip+"/gatt/nodes/?event=1&mac=");
// 				source.onmessage = function(event)
// 			 		{
// 						b = event;
// 						obj = JSON.parse(b.data)
// 						tem = obj.value
// 						if (tem.length>20) {
// 							pro1_1 = tem.substring(8,10)
// 							pro1_2 = tem.substring(10,12)
// 							pro1 = parseInt("0x"+pro1_2+pro1_1,16)
// 							pro2_1 = tem.substring(12,14)
// 							pro2_2 = tem.substring(14,16)
// 							pro2 = parseInt("0x"+pro2_2+pro2_1,16)
// 							pro3_1 = tem.substring(16,18)
// 							pro3_2 = tem.substring(18,20)
// 							pro3 = parseInt("0x"+pro2_2+pro2_1,16)
// 							pro4_1 = tem.substring(20,22)
// 							pro4_2 = tem.substring(22,24)
// 							pro4 = parseInt("0x"+pro2_2+pro2_1,16)
// 							ave = pro1+","+pro2+","+pro3+","+pro4
// 							// console.log(ave)
// 							$(".Temperature").append(ave)
// 						}
// 					}
// 					$.ajax({
// 							url:"http://"+ip+"/gatt/nodes/"+mac+"/handle/16/value/24/?mac=&access_token=",
// 							type:"get",
// 							data:{},
// 							success:function(res){
// 								alert(6767)
// 								console.log(res)
// 							}
// 						})
// 				// 电池组电压
// 				$.ajax({
// 					url:"http://"+ip+"/gatt/nodes/"+mac+"/handle/16/value/2129000000/?mac=&access_token=",
// 					type:"get",
// 					data:{},
// 					success:function(res){
// 						$.ajax({
// 							url:"http://"+ip+"/gatt/nodes/"+mac+"/handle/16/value/2200a004000000/?mac=&access_token=",
// 							type:"get",
// 							data:{},
// 							success:function(res){
// 								alert(12345)
// 								console.log(res)
// 							}
// 						})
// 					}
// 				})
// 				var b = "";
// 				var source = new EventSource("http://"+ip+"/gatt/nodes/?event=1&mac=");
// 				source.onmessage = function(event)
// 			 		{
// 						b = event;
// 						console.log(b.data)
// 						obj = JSON.parse(b.data)
// 						tem = obj.value
// 						console.log(tem)
// 						if (tem.length>20) {
// 							pro1_1 = tem.substring(8,10)
// 							pro1_2 = tem.substring(10,12)
// 							pro1 = parseInt("0x"+pro1_2+pro1_1,16)
// 							pro2_1 = tem.substring(16,18)
// 							pro2_2 = tem.substring(18,20)
// 							pro2 = parseInt("0x"+pro2_2+pro2_1,16)
// 							pro3_1 = tem.substring(24,26)
// 							pro3_2 = tem.substring(26,28)
// 							pro3 = parseInt("0x"+pro2_2+pro2_1,16)
// 							pro4_1 = tem.substring(32,34)
// 							pro4_2 = tem.substring(34,36)
// 							pro4 = parseInt("0x"+pro2_2+pro2_1,16)
// 							ave = pro1+","+pro2+","+pro3+","+pro4
// 							console.log(ave)
// 							$(".BatteryVoltage").append(ave)
// 						}
// 					}
// 			}
// 		})
// 	})
// })