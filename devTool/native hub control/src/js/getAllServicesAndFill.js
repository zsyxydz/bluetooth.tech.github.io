import {
	api
} from './api'
import {
	writeByHnadleAndFill
} from './writeByHnadleAndFill.js'
import {
	showMethod
} from './showmethod'
import {
	showLog
} from './showlog'
import checkProp from './properties'
import urlArr from './urlconfig'
const hasGetServices = {}


// hasGetServices[deviceMac] = 0  '未获取'
// hasGetServices[deviceMac] = 1  '正在获取'
// hasGetServices[deviceMac] = 3  '获取失败'
// hasGetServices[deviceMac] = {}  '获取成功'



function getAllServicesAndFill(deviceMac) {
	layui.use(['tree', 'form', 'layer'], function() {
		const form = layui.form(),
			layer = layui.layer,
			$parent = $('.box .l3').find(`ul.bb1>li div.tree > ul[data-mac='${deviceMac}']`),
			url = urlArr.getAllServices.replace("*deviceMac*", deviceMac)

		if (hasGetServices[deviceMac] === 1)
			return
		if (typeof hasGetServices[deviceMac] === 'object') {
			if ($parent.children().length !== 0)
				return
			else {
				layui.tree({
					elem: $parent,
					nodes: hasGetServices[deviceMac]
				})
				setTimeout(function() {
					form.render()
				}, 500)
			}

			return
		}
		hasGetServices[deviceMac] = 1
		const ajaxResult = api.getAllServices(url),
			$parent2 = $('#getAllServices ul')
		showMethod('getAllServices')


		ajaxResult.done(function(e) {
			console.log($.extend(true, {}, e))

			showLog($parent2, {
				message: JSON.stringify(e, null, 2),
				class: 'success'
			})
			hasGetServices[deviceMac] = formatServicesData(e)
			layui.tree({
					elem: $parent,
					nodes: hasGetServices[deviceMac],
					click: function(node) {
						// if (node.flag)
						// 	writeByHnadleAndFill(node, deviceMac)
					}
				})
				// debugger
			clearTimeout($parent.timer)
			$parent.timer = setTimeout(function() {
				const $ul = $(`.l3 ul[data-mac='${deviceMac}']`)
				let writeValue
				form.render()

				$ul.find('button.js-try').click(function(e) {
					const handle = e.target.dataset.handle
					if ($ul.find(`input.js${handle}`).length === 2 && e.target.dataset.action === 'writeWithoutRes') {
						writeValue = $ul.find(`input.js${handle}`).eq(0).val().trim()
					} else if ($ul.find(`input.js${handle}`).length === 2 && e.target.dataset.action === 'writeWithRes') {
						writeValue = $ul.find(`input.js${handle}`).eq(1).val().trim()
					} else
						writeValue = $ul.find(`input.js${handle}`).eq(0).val().trim()
					writeByHnadleAndFill(e.target, {
						deviceMac,
						writeValue,
						handle
					})
				})

				form.on('switch(notify)', function(e) {
					// debugger
					const handle = e.elem.dataset.handle,
						writeValue = e.elem.checked ? '0100' : '0000'

					writeByHnadleAndFill(e.elem, {
						deviceMac,
						writeValue,
						handle
					})

				})
				form.on('switch(indicate)', function(e) {
					// debugger
					const handle = e.elem.dataset.handle,
						writeValue = e.elem.checked ? '0200' : '0000'

					writeByHnadleAndFill(e.elem, {
						deviceMac,
						writeValue,
						handle
					})

				})

			}, 500)


		}).fail(function(e) {
			// debugger
			if (e.responseText === 'DISCOVER WRONG')
				layer.open({
					title: '获取设备服务错误',
					content: deviceMac + '未连接!',
					icon: 2
				});
			hasGetServices[deviceMac] = 3
			showLog($parent2, {
				message: JSON.stringify(e, null, 2),
				class: 'fail'
			})
		})
	})
}


// function formatServicesData2(data) {
// 	let type = getType(data)
// 	switch (type) {
// 		case '[object Array]':
// 			break;
// 		case '[object object]':
// 			break;
// 		case '[object string]':
// 			break;
// 	}

// }

// function fn(data) {
// 	let nodes = []
// 	string(data)

// 	function string(data) {
// 		for (let item in data) {
// 			if (getType(data[item]) === '[object Array]') {
// 				nodes.push({
// 					name: item,
// 					children: []
// 				})
// 				string(data[item])
// 			} else if (getType(data[item]) === '[object object]') {
// 				nodes[nodes.length].children = ''

// 			} else if (getType(data[item]) === '[object string]') {
// 				nodes.push({
// 					name: item
// 				})
// 				return
// 			}
// 		}
// 	}
// 	return nodes
// }



// function getType(obj) {
// 	return Object.prototype.toString.call(obj)
// }


function formatServicesData(data) {
	let nodes = []

	function key2name(obj) {
		Object.keys(obj).forEach(function(k) {
			if (typeof obj[k] === 'object') return
			if (k === 'uuid') return
			if (k === 'primary') return
			if (k === 'endHandle') return
			if (k === 'startHandle') {
				obj.children.push({
					name: 'handle:' + obj[k]
				})
				return
			}

			if (k === 'handle') {
				// debugger
				obj.children.push({

					name: 'handle:' + obj[k]
						// `<span class='layui-form ml2'>NOTIFY<input type="checkbox" name="close" lay-skin="switch"></span> `
				})
				return
			}

			if (k === 'properties') {

				let method = checkProp(obj[k])
					// debugger
				obj.children.push({

					name: 'properties:' + `<span class='prop-msg'>&nbsp;&nbsp;${method}</span>`
				})
				if (method.indexOf('read') !== -1) {

					// obj.children.push({
					// 	name: `read:
					// 				<span class="layui-form-item">
					// 					<span class="layui-inline">
					// 						<span class="layui-input-inline" style="width: 100px;">
					// 							<input type="text" class="layui-input" readonly value='123332'>
					// 						</span>
					// 						<span class="layui-form-mid"></span>
					// 						<button class="layui-btn">read</button>
					// 					</span>
					// 				</span>
					// 			</span>`
					// })
				}
				if (method.indexOf('write without response') !== -1) {

					obj.children.push({
						name: `write without response:&nbsp;0x
									<span class="layui-form-item">
										<span class="layui-inline">
											<span class="layui-input-inline" style="width: 100px;">
												<input type="text" class="layui-input js${obj.valueHandle}"  placeholder='0100'>
											</span>
											<span class="layui-form-mid"></span>
											<button class="layui-btn js-try" lay-submit lay-filter='writeWithoutRes' data-action='writeWithoutRes' data-handle=${obj.valueHandle}>try</button>
										</span>
									</span>
								</span>`,
						flag: 'writeWithoutRes',
						valueHandle: obj.valueHandle
					})
					obj.children.push({
						name: `<span style="visibility:hidden">write without response:&nbsp;</span>(0x0100)</span>`
					})
				}
				if (method.indexOf('write with response') !== -1) {

					obj.children.push({
						name: `write with response:&nbsp;0x
									<span class="layui-form-item">
										<span class="layui-inline">
											<span class="layui-input-inline" style="width: 100px;">
												<input type="text" class="layui-input js${obj.valueHandle}"  placeholder='0F04'>
											</span>
											<span class="layui-form-mid"></span>
											<button class="layui-btn js-try" lay-submit lay-filter='writeWithRes' data-action='writeWithRes' data-handle=${obj.valueHandle}>try</button>
										</span>
									</span>
								</span>`,
						flag: 'writeWithRes',
						valueHandle: obj.valueHandle
					})
					obj.children.push({
						name: `<span style="visibility:hidden">write with response:&nbsp;</span>(0x0100)</span>`
					})
				}
				if (method.indexOf('notify') !== -1) {
					const realHandle = obj.descriptors.filter(function(item) {
						return item.uuid.indexOf('2902') !== -1
					});
					obj.children.push({
						// `write without response:&nbsp;0x
						// 			<span class="layui-form-item">
						// 				<span class="layui-inline">
						// 					<span class="layui-input-inline" style="width: 100px;">
						// 						<input type="text" class="layui-input"  value='123332'>
						// 					</span>
						// 					<span class="layui-form-mid"></span>
						// 					<button class="layui-btn">try</button>
						// 				</span>
						// 			</span>
						// 		</span>`
						// name: `<span class='layui-form'>notify</span></span>`,
						name: `notify
									<span class="layui-form-item">
										<span class="layui-inline">
											<span class="layui-form-mid"></span>
											<input type="checkbox"  lay-skin="switch" class='js-switch' data-action='notify' data-handle=${realHandle[0].handle} lay-filter='notify'>
										</span>
									</span>
								</span>`,
						flag: 'notify',
						handle: realHandle[0].handle
					})
				}
				if (method.indexOf('indicate') !== -1) {
					const realHandle = obj.descriptors.filter(function(item) {
						return item.uuid.indexOf('2902') !== -1
					});
					obj.children.push({
						name: `indicate
									<span class="layui-form-item">
										<span class="layui-inline">
											<span class="layui-form-mid"></span>
											<input type="checkbox"  lay-skin="switch" class='js-switch' data-action='indicate' data-handle=${realHandle[0].handle} lay-filter='notify'>
										</span>
									</span>
								</span>`,
						flag: 'indicate',
						handle: realHandle[0].handle
					})
				}
				// debugger

				return
			}
			obj.children.push({

					name: k + ':' + obj[k]
				})
				// delete obj[k]
		})
	}
	data.services.forEach(function(s) {
		nodes.push(s)
		s.children = []
		key2name(s)
		s.children.push({
			name: 'characteristics',
			children: s.characteristics.map(function(c) {
				c.children = []
				key2name(c, 'c')
				if (c.descriptors.length !== 0) {
					c.children.push({

						name: 'descriptors',
						children: c.descriptors.map(function(d) {
							d.children = []

							// if (d.uuid.indexOf('2902') !== -1) {
							// 	key2name(d, 'd')
							// 	d.name = 'uuid:' + d.uuid
							// 	return d
							// }
							key2name(d)
							d.name = 'uuid:' + d.uuid
							return d
						})
					})
				}
				delete c.descriptors
				c.name = 'uuid:' + c.uuid
				return c
			})
		})
		delete s.characteristics
		s.name = 'uuid:' + s.uuid
	})

	// debugger

	// function fnswap(obj) {
	// 	let temp = null
	// 	// debugger
	// 	Object.keys(obj).forEach(function(key) {
	// 		if (typeof obj[key].children)
	// 			fnswap(obj[key])
	// 		else {
	// 			temp = obj[key].pop()
	// 			obj[key].unshift(temp)
	// 			return
	// 		}
	// 	})
	// }
	// fnswap(nodes)

	return [{
		name: 'services',
		children: nodes
	}]
}

export {
	getAllServicesAndFill

}