import {
	api
} from './api'
import {
	showMethod
} from './showmethod'
import {
	showLog
} from './showlog'
import {
	htmlTemp
} from './getConnectList'
import urlArr from './urlconfig'
import globalData from './globalData'


const notifyStateAndFill = {}
notifyStateAndFill.start = function() {
	globalData.stateSSE.status = 'toOpen'
	if (globalData.stateSSE.es !== '') {
		return
	}
	const url = urlArr.getConnectState,
		ajaxResult = api.getConnectState(url, globalData.stateSSE),
		$parent = $('#connectState ul')
	let data = ''
	ajaxResult.addEventListener('message', function(e) {
		// debugger
		console.log('connectState:', e)
		showLog($parent, {
			message: e.data
		})
		if (e.data !== ":keep-alive") {
			// debugger
			data = JSON.parse(e.data)
			stateNotifyHandle(data)
				// console.log('notify:',e)
		}
	})
	showMethod('getConnectState')
}


function stateNotifyHandle(data) {
	const state = data.connectionState,
		mac = data.handle,
		$l3 = $('.box .l3 ul.bb1'),
		$li = $l3.children(`li:has(span.layui-input:contains("${mac}"))`)
		// debugger
		// console.log("~~~~~",$li)
	if (state === 'connected' && !$li[0]) {
		// debugger
		$l3.append(htmlTemp(mac, ''))
	} else if (state === 'disconnected') {
		// debugger
		$li[0] && $li.slideUp('normal', function() {
			this.remove()
		});

		// debugger
	}
}
notifyStateAndFill.stop = function() {
	globalData.stateSSE.status = 'toClosed'
	if (globalData.stateSSE.es) {
		globalData.stateSSE.es.close()
		console.log('has closed')
		globalData.stateSSE.status = 'closed'
		globalData.stateSSE.es = ''
	}
}


export default notifyStateAndFill