let methodNames = {
    scan: '扫描设备',
    connectDevice: '连接设备',
    getConnectList: '已连接备',
    getAllServices: '发现服务',
    notify: '接收设备信息',
    getConnectState: '设备连接状态变化',
    writeByHandle: '写入指令',
    disconnectDevice: '断开连接'
}

let methodConfig = {
    scan: {
        type: 'GET/SSE',
        url: '',
        methodName: methodNames.scan
    },
    connectDevice: {
        type: 'POST',
        methodName: methodNames.connectDevice,
        url: ''
    },
    getConnectList: {
        type: 'GET',
        methodName: methodNames.getConnectList,
        url: ''
    },
    getConnectState: {
        type: 'GET/SSE',
        methodName: methodNames.getConnectState,
        url: ''
    },
    disconnectDevice: {
        type: 'DELETE',
        methodName: methodNames.disconnectDevice,
        url: ''
    },
    getAllServices:{
        type:'GET',
        methodName:methodNames.getAllServices,
        utl:''
    },
    notify:{
        type:'GET/SSE',
        methodName:methodNames.notify,
        url:''
    },
    writeByHandle:{
        type:'GET',
        methodName:methodNames.writeByHandle,
        url:''
    }
}
let $showMethods = $('.log .left .order')

function showMethod(method) {
    let _methodName = methodConfig[method].methodName,
        _type = methodConfig[method].type,
        _url = methodConfig[method].url,
        oLi = `<li>
					<p><span>方法名</span><span>${_methodName}</span><span>${_type}</span></p>
					<p><em>URL:</em>${_url}</p>
				</li>`
    $showMethods.append(oLi);



}



export {
    methodConfig,
    showMethod

}