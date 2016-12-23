import globalData from './globalData'

function htmlString() {
  let temp = `<form class="layui-form  scan-tip tip" action="#">
  <div class="layui-form-item">
    <label class="layui-form-label">Scan：GET/SSE</label>
  </div>
  <fieldset class="layui-elem-field layui-field-title">
    <legend>参数</legend>
  </fieldset>
  <div class="layui-form-item">
    <label class="layui-form-label">chip:</label>
    <div class="layui-input-inline">
      <input type="text" name="chip"  value=${globalData.chip!=='' ? globalData.chip:'0'} placeholder="0或者1" lay-verify='zeroOrOne'  class="layui-input">
    </div>
     <div class="layui-form-mid layui-word-aux">(选填)</div>
  </div>
  <fieldset class="layui-elem-field layui-field-title">
    <legend>描述</legend>
  </fieldset>
  <div class="layui-form-item layui-form-text">
    <div class="descriptors scan-des">
      <p><b>接口URL：</b>调用接口后，此URL会自动生成在下面的”API接口”的窗口中</p>
      <p><b>接口描述：</b>此接口是sse长链接调用接口后，蓝牙路由器会扫描周边的设备,并将蓝牙设备的MAC地址(bdaddr)、广播type（bdaddrType）、广播报数据（adData/scanData）、设备名称（name）、信号强度（rssi）等信息以http response的形式返回（原始数据见“http response”窗口。</p>
      <p><b> 参数解释：chip：</b>蓝牙路由器共有两个芯片，芯片0和芯片1，在调用接口时可以通过添加queryString来选择芯片(?chip=0或者?chip=1)，如果不填,会默认用芯片0扫描，芯片0扫描距离会优于芯片1，也建议一般情况下使用芯片0扫描。</p>
      <p><b>SSE：</b>server-sent events，简称：see。是一种http的长链接，请求需要手动关闭，否则理论上在不报错的情况下会一直进行，每条数据会以“data: ” 开头。在调试中可以直接将sse的url输入在浏览器中进行调用。但是在编程中使用一般的http请求无法请求到数据(一般的http请求都是在请求结束后返回所有的数据)，我们目前提供了iOS/java/nodejs/js/c#等的demo来实现sse的调用，如果在这方面遇到困难可以参考。另外，当调用sse时，最好对该长链接进行监控，以便在长链接出现错误或意外停止后进行重启，或者其他操作。</p>
    
    </div>
  </div>
  
  <div class="layui-form-item">
    <div class="layui-input-block">
      <button class="layui-btn" lay-submit lay-filter="scan">do</button>
    </div>
  </div>
</form>`
  return temp
}


function scanTip(layer, form, $dom) {
  form.verify({
    zeroOrOne: function(value) {
      // debugger
      if (!(value === '0' || value === '1' || value === '')) {
        return '必须是0或者1';
      }
    }
  });

  function dos(layer, form) {
    // debugger
    form.on('submit(scan)', function(data) {
      globalData.chip = data.field.chip
      layer.closeAll('tips');
      return false
    });
  }
  // layer.open({
  //   type: 4,
  //   area: ['300px','auto'],
  //   // shade: 0,
  //   closeBtn: 0,
  //   shadeClose: true,
  //   fixed: false,
  //   maxmin: false,
  //   anim: 5, //0-6的动画形式，-1不开启
  //   tips: [2, '#2F4056'],
  //   content: [htmlString(), $dom],
  //   success: dos.bind(null,form, layer)
  // });
  tip(layer, htmlString, $dom, dos, form)


}


import tip from './tips'
export default scanTip