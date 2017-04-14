import {
	api
} from './api'
import {
	showMethod
} from './showmethod.js'
import {
	showLog
} from './showlog'
import {
    urlArr  
}from './urlconfig'


function htmlTemp(mac, name) {
	return `<li data-mac=${mac}>
				<div class="layui-form-item">
					<div class="layui-inline">
						<label class="layui-form-label">mac:</label>
						<div class="layui-input-inline">
							<span class="layui-input">${mac}</span>
						</div>
					</div>
					<div class="layui-inline">
						<label class="layui-form-label">name:</label>
						<div class="layui-input-inline">
							<span class="layui-input">${name}</span>
						</div>
					</div>
				</div>
				<div class="layui-form-item">
					<div class="layui-input-inline">
						<button class="layui-btn" data-mac=${mac} data-action='services'>Serivices</button>
					</div>
					<div class="layui-input-inline">
						<button class="layui-btn" data-mac=${mac} data-action='disconnect'>disconnect</button>
					</div>
				</div>
				<div class="layui-input-item tree">
					<ul data-mac=${mac}></ul> 
				</div>
			</li>`
}



function getConnectListAndFiil() {
	const parent1 = $('.l3 ul'),
		parent2 = $('#connectLists ul'),
		ajaxResult = api.getConnectList(urlArr.getConnectedDeviceList)
	showMethod('getConnectList')
	ajaxResult.done(function(e) {
		console.log(typeof e)
		let temp = '',
			mac,
			name
			// debugger
		showLog(parent2, {
			message: JSON.stringify(e)
		})
		e.nodes.forEach((item, index, arr) => {
			// debugger
			mac = item.id
			name = item.name
			temp += htmlTemp(mac, name)
		})
		parent1.html(temp)
		mac = null
		temp = null
		name = null
	})
}



export {
	getConnectListAndFiil,
	htmlTemp
}