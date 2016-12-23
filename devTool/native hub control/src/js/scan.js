import {
    api
} from './api'
import {
    showLog
} from './showlog.js';
let scanSSE = [],
    scan = {
        start: _scanHandle,
        stop: _stop,
    },
    itemHandle = {},
    $log = $('.log .right .scan ul')
itemHandle.add = function (data) {
    // debugger
    let _data = {
        mac: data.mesg.bdaddrs[0].bdaddr,
        name: data.mesg.name,
        type: data.mesg.bdaddrs[0].bdaddrType,
        rssi: data.mesg.rssi
    };

    if (data.allItem[_data.mac]) {
        // debugger
        if (_data.name !== "(unknown)")
            data.allItem[_data.mac].name.innerHTML = _data.name
        data.allItem[_data.mac].type.innerHTML = _data.type
        data.allItem[_data.mac].rssi.innerHTML = _data.rssi

        data.allItem[_data.mac].rssi.style.color = '#5FB878'
    } else {
        // debugger
        data.allItem[_data.mac] = createItem(_data)
        data.parentNode.append(data.allItem[_data.mac].li)
        data.allItem[_data.mac].rssi.style.color = 'red'
    }
    data.allItem[_data.mac].mesg = data.mesg
    data.allItem[_data.mac].flag = data.flag

    function createItem(data) {

        let li = document.createElement('li'),
            result = {
                li
            },
            temp,
            divLayuiFormItem,
            count = 0
        for (let i in data) {
            temp = _createItem(i, data[i])
            if (count % 2 === 0) {
                divLayuiFormItem = document.createElement('div')
                divLayuiFormItem.className = "layui-form-item"
            }

            divLayuiFormItem.appendChild(temp.divLayuiInline)
            li.appendChild(divLayuiFormItem)
            result[i] = temp.spanLayuiInput
            count++
        }

        divLayuiFormItem = document.createElement('div')
        divLayuiFormItem.className = "layui-form-item"
        divLayuiFormItem.innerHTML = `<div class="layui-input-inline">
								<button class="layui-btn" data-type=${data.type} data-mac=${data.mac}>connect</button>
							</div>`
        li.appendChild(divLayuiFormItem)

        count = null
        temp = null
        divLayuiFormItem = null

        return result


        function _createItem(name, value) {

            let divLayuiInline = document.createElement('div'),
                labelLyauiFomrLabel = document.createElement('label'),
                divlayuiInputInline = document.createElement('div'),
                spanLayuiInput = document.createElement('span')


            divLayuiInline.className = "layui-inline"
            labelLyauiFomrLabel.className = "layui-form-label"
            divlayuiInputInline.className = "layui-input-inline"
            spanLayuiInput.className = "layui-input"

            labelLyauiFomrLabel.innerHTML = `${name}:`
            spanLayuiInput.innerHTML = value


            divlayuiInputInline.appendChild(spanLayuiInput)
            divLayuiInline.appendChild(labelLyauiFomrLabel)
            divLayuiInline.appendChild(divlayuiInputInline)

            // debugger
            return {
                divLayuiInline,
                labelLyauiFomrLabel,
                spanLayuiInput
            }
        }
    }

}
itemHandle.destroy = function (data) {
    // debugger
    data.el.removeChild(data.allItem[data.mac].li)
    delete data.allItem[data.mac]
}

function _scanHandle(url, data, timeout) {
    let deviceData = {},
        _allItem = {},
        parentNode = document.querySelector('.l2 ul.bb1')
    parentNode.innerHTML=''
        // debugger
    scanSSE[0] = {
        es: null,
        timer: null
    }
    api.start(url, data, scanSSE, cb)


    scanSSE[0].timer = setInterval(function () {
        checkDeviceTimeout(_allItem)
    }, 1000)

    function checkDeviceTimeout(obj) {
        if (scanSSE.length === 0) {
            return
        }
        // console.log('old', obj)
        for (var index in obj) {
            if (obj[index].flag > 0) {
                obj[index].flag--
            } else {
                // debugger
                // !!!!!!!!!!console.log('delete', index)
                itemHandle.destroy({
                    el: parentNode,
                    mac: index,
                    allItem: _allItem
                })
                // !!!!!console.log('new', obj)
            }
        }
    }

    function cb(item) {
        let temp = JSON.parse(item),
            mac = temp.bdaddrs[0].bdaddr
        showLog($log, {message:item})
        itemHandle.add({
            parentNode: parentNode,
            mesg: JSON.parse(item),
            allItem: _allItem,
            flag: timeout

        })
    }
}

function _stop(id) {
    // debugger
    var _id = Number(id)
    Number.isInteger(_id) && scanSSE[_id].es && scanSSE[_id].es.close()
    clearInterval(scanSSE[0].timer)
    scanSSE.splice(_id, 1)
}


export default scan