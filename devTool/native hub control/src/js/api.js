import $ from 'jquery'
import {
    methodConfig
} from './showmethod'

function addURLParam(url, data, flag = true) {
    for (var key in data) {
        url += (url.indexOf("?") === -1 ? "?" : "&");
        url += (flag ? encodeURIComponent(key) : key) + "=" + (flag ? encodeURIComponent(data[key]) : data[key]);
    }
    return url;
}


function start(url, data, scanSSE, cb) {
    // debugger
    let _data = Object.assign({
        event: 1,
        chip: 0
    }, data),
        _url = addURLParam(url, _data, false),
        virtualData = ''
    methodConfig.scan.url = _url
    let es = new EventSource(_url)

    function test(addFrequency, creatFrequency) {
        let n = 0,count=0, temp = addFrequency / creatFrequency
        setInterval(function () {
            count++
            console.time(count)
            virtualData += '<li>第' + count + '条数据：abdefghiklddfefefdfefefsfefe</li>'
            n++
            if (temp <= n) {
                $('#scanLog ul').append(virtualData)
                virtualData = ''
                n = 0
            }
            console.timeEnd(count)
        }, creatFrequency)

    }

    // test(3000, 50)

    es.addEventListener("open", function () {
        // debugger
        if (scanSSE.status === 'toClosed') {
            this.close()
            scanSSE.es = ''
            return
        }
        scanSSE.es = this
    }, false);
    es.addEventListener('message', function (e) {
        if (e.data !== ":keep-alive") {
            // let time = new Date()
            cb(e.data)
            // console.warn("time%s,data%s", new Date - time, e.data)
        }
    })
}



function connectDevice(url, data) {
    let _url = url
    if (data.qs.chip !== null)
        _url = addURLParam(url, data.qs, false)
    // debugger
    methodConfig.connectDevice.url = _url
    return $.ajax({
        url: _url,
        type: 'POST',
        data: {
            timeOut: 5000,
            type: data.type
        }
    })
}

function disconnectDevice(url) {
    methodConfig.disconnectDevice.url = url
    return $.ajax({
        url: url,
        type: 'DELETE'
    })
}


function getConnectList(url) {
    methodConfig.getConnectList.url = url
    return $.ajax({
        url: url,
        type: 'GET'
    })
}

function getConnectState(url, stateSSE) {
    const es = new EventSource(url)
    methodConfig.getConnectState.url = url
    // debugger
    es.addEventListener("open", function () {
        console.log('open')
        if (stateSSE.status === 'toClosed') {
            this.close()
            console.log('closed')
            stateSSE.status = 'closed'
            stateSSE.es = ''
            return
        }
        stateSSE.es = this
        stateSSE.status = 'open'
    }, false);
    return es
}

function reboot(url) {
    return $.ajax({
        url: url,
        type: 'GET'
    })
}

function getAllServices(url) {
    methodConfig.getAllServices.url = url
    return $.ajax({
        url: url,
        type: 'GET'
    })
}

function readByHandle(url, data) {
    var _url = addURLParam(url, data, false)
    $.ajax({
        url: _url,
        type: 'GET',
        data: data
    }).done(function (e) {
        console.log(e)
    }).fail(function (e) {
        console.error(e)

    })
}


function receiveNotification(url, notifySSE) {
    const es = new EventSource(url);
    // notifySSE.status = 'toOpen'
    console.log(notifySSE)
    methodConfig.notify.url = url
    es.addEventListener("open", function () {
        if (notifySSE.status === 'toClosed') {
            this.close()
            notifySSE.status = 'closed'
            notifySSE.es = ''
            return
        }
        console.log('open')
        notifySSE.es = this
        notifySSE.status = 'open'
    }, false);
    return es

}



function writeByHnadle(url, data) {
    methodConfig.writeByHandle.url = addURLParam(url, data, false)
    return $.ajax({
        url: url,
        type: 'GET',
        data: data
    })

}
let api = {
    start,
    connectDevice,
    disconnectDevice,
    getConnectList,
    getConnectState,
    reboot,
    getAllServices,
    writeByHnadle,
    readByHandle,
    receiveNotification,
    addURLParam

}

export {
    api
}