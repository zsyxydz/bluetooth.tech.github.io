import './src/css/index.css'
import * as handle from './src/js/mainHandle'
import scan from './src/js/scan'
import notifyStateAndFill from './src/js/notifyStateAndFill'
import notifyMsg from './src/js/notifyMsgAndFill'
import globalData from './src/js/globalData'
import i18n from  './src/js/i18n'

import {
	api
} from './src/js/api'

import urlArr from './src/js/urlconfig'


i18n();
(function () {
	$('#hubIp').val(globalData.saved.hubIp).triggerHandler('blur')
	$('#hubMac').val(globalData.saved.hubMac).triggerHandler('blur')
}())

layui.use(['layer', 'form'], function () {
	var layer = layui.layer,
		form = layui.form()
	$('#reboot').click(function () {
		console.log(urlArr.reboot)
		api.reboot(urlArr.reboot).done(
			layer.load(2, {
				time: 5 * 1000
			})
		)


	});
	form.on('select(lang)',function(data){
		i18n(data.value)
	})
	form.on('switch(switchScan)', function (data) {
		if (data.elem.checked) {
			console.log(globalData.saved)
			scan.start({
				chip: globalData.saved.chip || 0
			}, globalData.neverSave.scanSSE.timeOut)
				// data.elem.setAttribute('disabled', 'true')
		} else {
			scan.stop()
		}
		// console.log(data.elem); //得到checkbox原始DOM对象
		// console.log(data.elem.checked); //开关是否开启，true或者false
	});

	form.on('switch(switchNotifyState)', function (data) {
		if (data.elem.checked) {
			notifyStateAndFill.start()

			// data.elem.setAttribute('disabled', 'true')
		} else {
			notifyStateAndFill.stop()
		}
		// console.log(data.elem); //得到checkbox原始DOM对象
		// console.log(data.elem.checked); //开关是否开启，true或者false
	});

	form.on('switch(switchNotifyMsg)', function (data) {
		if (data.elem.checked) {
			notifyMsg.start()

			// data.elem.setAttribute('disabled', 'true')
		} else {
			notifyMsg.stop(0)
		}
		// console.log(data.elem); //得到checkbox原始DOM对象
		// console.log(data.elem.checked); //开关是否开启，true或者false
	});

	$('#clearNotify').on('click', function () {
		$('.box .l4 ul').empty()
	})



	handle.mainHandle(layer, form)
	handle.connectButton()
	handle.getConnectLists()
	handle.disConnectDevice()
	handle.getAllServices()


});

layui.use(['element'], function () {
	let element = layui.element();
	// element.tabChange('log', 1);
})



// let datad = [{ //节点
// 	name: 'Serivices',
// 	children: [{
// 		name: "uuid:00001800-0000-1000-8000-00805f9b34fb",
// 		children: [{
// 			name: 'startHandle:1'
// 		}, {
// 			name: 'endHandle:3'
// 		}, {
// 			name: 'primary:true'
// 		}, {
// 			name: 'characteristics',
// 			children: [{
// 					name: "uuid:00002a00-0000-1000-8000-00805f9b34fb",
// 					children: [{
// 						name: 'handle:2'
// 					}, {
// 						name: 'properites:10'
// 					}, {
// 						name: 'valueHandle:3'
// 					}, {
// 						name: 'descriptors'

// 					}]
// 				}

// 			]
// 		}]
// 	}, {
// 		name: "uuid:0000180f-0000-1000-8000-00805f9b34fb",
// 		children: [{
// 			name: 'startHandle:4'
// 		}, {
// 			name: 'endHandle:7'
// 		}, {
// 			name: 'primary:true'
// 		}, {
// 			name: 'characteristics',
// 			children: [{
// 					name: "uuid:00002a19-0000-1000-8000-00805f9b34fb",
// 					children: [{
// 						name: 'handle:5'
// 					}, {
// 						name: 'properites:18'
// 					}, {
// 						name: 'valueHandle:6'
// 					}, {
// 						name: 'descriptors',
// 						children: [{
// 							name: "uuid:00002902-0000-1000-8000-00805f9b34fb"
// 						}, {
// 							name: 'handle:7'
// 						}]
// 					}]
// 				}

// 			]
// 		}]
// 	}, {
// 		name: "uuid:0000ff00-0000-1000-8000-00805f9b34fb",
// 		children: [{
// 			name: 'startHandle:8'
// 		}, {
// 			name: 'endHandle:65535'
// 		}, {
// 			name: 'primary:true'
// 		}, {
// 			name: 'characteristics',
// 			children: [{
// 					name: "uuid:0000ff01-0000-1000-8000-00805f9b34fb",
// 					children: [{
// 						name: 'handle:9'
// 					}, {
// 						name: 'properites:16'
// 					}, {
// 						name: 'valueHandle:10'
// 					}, {
// 						name: 'descriptors',
// 						children: [{
// 							name: "uuid:00002902-0000-1000-8000-00805f9b34fb"
// 						}, {
// 							name: 'handle:11'
// 						}]
// 					}]
// 				}, {
// 					name: 'uuid:0000ff02-0000-1000-8000-00805f9b34fb',
// 					children: [{
// 						name: 'handle:12'
// 					}, {
// 						name: 'valueHandle:13'
// 					}, {
// 						name: 'properites:4'
// 					}, {
// 						name: 'descriptors'
// 					}]
// 				}

// 			]
// 		}]
// 	}]
// }, { //节点
// 	name: 'Serivices',
// 	children: [{
// 		name: "uuid:00001800-0000-1000-8000-00805f9b34fb",
// 		children: [{
// 			name: 'startHandle:1'
// 		}, {
// 			name: 'endHandle:3'
// 		}, {
// 			name: 'primary:true'
// 		}, {
// 			name: 'characteristics',
// 			children: [{
// 					name: "uuid:00002a00-0000-1000-8000-00805f9b34fb",
// 					children: [{
// 						name: 'handle:2'
// 					}, {
// 						name: 'properites:10'
// 					}, {
// 						name: 'valueHandle:3'
// 					}, {
// 						name: 'descriptors'

// 					}]
// 				}

// 			]
// 		}]
// 	}, {
// 		name: "uuid:0000180f-0000-1000-8000-00805f9b34fb",
// 		children: [{
// 			name: 'startHandle:4'
// 		}, {
// 			name: 'endHandle:7'
// 		}, {
// 			name: 'primary:true'
// 		}, {
// 			name: 'characteristics',
// 			children: [{
// 					name: "uuid:00002a19-0000-1000-8000-00805f9b34fb",
// 					children: [{
// 						name: 'handle:5'
// 					}, {
// 						name: 'properites:18'
// 					}, {
// 						name: 'valueHandle:6'
// 					}, {
// 						name: 'descriptors',
// 						children: [{
// 							name: "uuid:00002902-0000-1000-8000-00805f9b34fb"
// 						}, {
// 							name: 'handle:7'
// 						}]
// 					}]
// 				}

// 			]
// 		}]
// 	}, {
// 		name: "uuid:0000ff00-0000-1000-8000-00805f9b34fb",
// 		children: [{
// 			name: 'startHandle:8'
// 		}, {
// 			name: 'endHandle:65535'
// 		}, {
// 			name: 'primary:true'
// 		}, {
// 			name: 'characteristics',
// 			children: [{
// 					name: "uuid:0000ff01-0000-1000-8000-00805f9b34fb",
// 					children: [{
// 						name: 'handle:9'
// 					}, {
// 						name: 'properites:16'
// 					}, {
// 						name: 'valueHandle:10'
// 					}, {
// 						name: 'descriptors',
// 						children: [{
// 							name: "uuid:00002902-0000-1000-8000-00805f9b34fb"
// 						}, {
// 							name: 'handle:11'
// 						}]
// 					}]
// 				}, {
// 					name: 'uuid:0000ff02-0000-1000-8000-00805f9b34fb',
// 					children: [{
// 						name: 'handle:12'
// 					}, {
// 						name: 'valueHandle:13'
// 					}, {
// 						name: 'properites:4'
// 					}, {
// 						name: 'descriptors'
// 					}]
// 				}

// 			]
// 		}]
// 	}]
// }, { //节点
// 	name: 'Serivices',
// 	children: [{
// 		name: "uuid:00001800-0000-1000-8000-00805f9b34fb",
// 		children: [{
// 			name: 'startHandle:1'
// 		}, {
// 			name: 'endHandle:3'
// 		}, {
// 			name: 'primary:true'
// 		}, {
// 			name: 'characteristics',
// 			children: [{
// 					name: "uuid:00002a00-0000-1000-8000-00805f9b34fb",
// 					children: [{
// 						name: 'handle:2'
// 					}, {
// 						name: 'properites:10'
// 					}, {
// 						name: 'valueHandle:3'
// 					}, {
// 						name: 'descriptors'

// 					}]
// 				}

// 			]
// 		}]
// 	}, {
// 		name: "uuid:0000180f-0000-1000-8000-00805f9b34fb",
// 		children: [{
// 			name: 'startHandle:4'
// 		}, {
// 			name: 'endHandle:7'
// 		}, {
// 			name: 'primary:true'
// 		}, {
// 			name: 'characteristics',
// 			children: [{
// 					name: "uuid:00002a19-0000-1000-8000-00805f9b34fb",
// 					children: [{
// 						name: 'handle:5'
// 					}, {
// 						name: 'properites:18'
// 					}, {
// 						name: 'valueHandle:6'
// 					}, {
// 						name: 'descriptors',
// 						children: [{
// 							name: "uuid:00002902-0000-1000-8000-00805f9b34fb"
// 						}, {
// 							name: 'handle:7'
// 						}]
// 					}]
// 				}

// 			]
// 		}]
// 	}, {
// 		name: "uuid:0000ff00-0000-1000-8000-00805f9b34fb",
// 		children: [{
// 			name: 'startHandle:8'
// 		}, {
// 			name: 'endHandle:65535'
// 		}, {
// 			name: 'primary:true'
// 		}, {
// 			name: 'characteristics',
// 			children: [{
// 					name: "uuid:0000ff01-0000-1000-8000-00805f9b34fb",
// 					children: [{
// 						name: 'handle:9'
// 					}, {
// 						name: 'properites:16'
// 					}, {
// 						name: 'valueHandle:10'
// 					}, {
// 						name: 'descriptors',
// 						children: [{
// 							name: "uuid:00002902-0000-1000-8000-00805f9b34fb"
// 						}, {
// 							name: 'handle:11'
// 						}]
// 					}]
// 				}, {
// 					name: 'uuid:0000ff02-0000-1000-8000-00805f9b34fb',
// 					children: [{
// 						name: 'handle:12'
// 					}, {
// 						name: 'valueHandle:13'
// 					}, {
// 						name: 'properites:4'
// 					}, {
// 						name: 'descriptors'
// 					}]
// 				}

// 			]
// 		}]
// 	}]
// }]