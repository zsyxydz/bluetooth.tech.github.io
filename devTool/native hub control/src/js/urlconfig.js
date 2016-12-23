import globalData from './globalData'


const $hubIp = $('#hubIp')
let data = {},
    urlArr = {}


data.hubIp = $hubIp.val().trim()
data.perMac = '*deviceMac*'
data.handle = '*handle*'
data.writeValue = '*writeValue*'

function updateUrlArr(hubIp) {
    urlArr.scan = `http://${hubIp}/gap/nodes/`
    urlArr.connectDevice = `http://${hubIp}/gap/nodes/${data.perMac}/connection/`
    urlArr.disconnectDevice = `http://${hubIp}/gap/nodes/${data.perMac}/connection`
    urlArr.getConnectedDeviceList = `http://${hubIp}/gap/nodes/?connection_state=connected`
    urlArr.getConnectState = `http://${hubIp}/management/nodes/connection-state`
    urlArr.getAllServices = `http://${hubIp}/gatt/nodes/${data.perMac}/services/characteristics/descriptors`
    urlArr.readByHandle = `http://${hubIp}/gatt/nodes/${data.perMac}/`
    urlArr.notifyMsg = `http://${hubIp}/gatt/nodes/?event=1`
    urlArr.writeByHandle = `http://${hubIp}/gatt/nodes/${data.perMac}/handle/${data.handle}/value/${data.writeValue}`
    urlArr.reboot = `http://${hubIp}/cassia/reboot`
}
updateUrlArr(data.hubIp)



$hubIp.on('blur', function() {
    data.hubIp = this.value.trim()
    updateUrlArr(data.hubIp)
    globalData.saved.hubIp = data.hubIp
})
$('#hubMac').on('blur', function() {
    globalData.hubMac = this.value.trim()
})

export default urlArr