/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(/*! ./src/css/index.css */ 1);
	
	var _mainHandle = __webpack_require__(/*! ./src/js/mainHandle */ 5);
	
	var handle = _interopRequireWildcard(_mainHandle);
	
	var _scan = __webpack_require__(/*! ./src/js/scan */ 109);
	
	var _scan2 = _interopRequireDefault(_scan);
	
	var _notifyStateAndFill = __webpack_require__(/*! ./src/js/notifyStateAndFill */ 105);
	
	var _notifyStateAndFill2 = _interopRequireDefault(_notifyStateAndFill);
	
	var _notifyMsgAndFill = __webpack_require__(/*! ./src/js/notifyMsgAndFill */ 104);
	
	var _notifyMsgAndFill2 = _interopRequireDefault(_notifyMsgAndFill);
	
	var _globalData = __webpack_require__(/*! ./src/js/globalData */ 48);
	
	var _globalData2 = _interopRequireDefault(_globalData);
	
	var _i18n = __webpack_require__(/*! ./src/js/i18n */ 117);
	
	var _i18n2 = _interopRequireDefault(_i18n);
	
	var _api = __webpack_require__(/*! ./src/js/api */ 10);
	
	var _urlconfig = __webpack_require__(/*! ./src/js/urlconfig */ 54);
	
	var _urlconfig2 = _interopRequireDefault(_urlconfig);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	(0, _i18n2.default)();
	(function () {
		$('#hubIp').val(_globalData2.default.saved.hubIp).triggerHandler('blur');
		$('#hubMac').val(_globalData2.default.saved.hubMac).triggerHandler('blur');
	})();
	
	layui.use(['layer', 'form'], function () {
		var layer = layui.layer,
		    form = layui.form();
		$('#reboot').click(function () {
			console.log(_urlconfig2.default.reboot);
			_api.api.reboot(_urlconfig2.default.reboot).done(layer.load(2, {
				time: 5 * 1000
			}));
		});
		form.on('select(lang)', function (data) {
			(0, _i18n2.default)(data.value);
		});
		form.on('switch(switchScan)', function (data) {
			if (data.elem.checked) {
				console.log(_globalData2.default.saved);
				_scan2.default.start({
					chip: _globalData2.default.saved.chip || 0
				}, _globalData2.default.neverSave.scanSSE.timeOut);
			} else {
				_scan2.default.stop();
			}
		});
	
		form.on('switch(switchNotifyState)', function (data) {
			if (data.elem.checked) {
				_notifyStateAndFill2.default.start();
			} else {
				_notifyStateAndFill2.default.stop();
			}
		});
	
		form.on('switch(switchNotifyMsg)', function (data) {
			if (data.elem.checked) {
				_notifyMsgAndFill2.default.start();
			} else {
				_notifyMsgAndFill2.default.stop(0);
			}
		});
	
		$('#clearNotify').on('click', function () {
			$('.box .l4 ul').empty();
		});
	
		handle.mainHandle(layer, form);
		handle.connectButton();
		handle.getConnectLists();
		handle.disConnectDevice();
		handle.getAllServices();
	});
	
	layui.use(['element'], function () {
		var element = layui.element();
	});

/***/ },
/* 1 */
/*!***************************!*\
  !*** ./src/css/index.css ***!
  \***************************/
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */
/*!******************************!*\
  !*** ./src/js/mainHandle.js ***!
  \******************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.getAllServices = exports.disConnectDevice = exports.getConnectLists = exports.connectButton = exports.mainHandle = undefined;
	
	var _connectDevice = __webpack_require__(/*! ./connectDevice */ 6);
	
	var _connectDevice2 = _interopRequireDefault(_connectDevice);
	
	var _disConnectDeviceAndFill = __webpack_require__(/*! ./disConnectDeviceAndFill */ 56);
	
	var _disConnectDeviceAndFill2 = _interopRequireDefault(_disConnectDeviceAndFill);
	
	var _getConnectList = __webpack_require__(/*! ./getConnectList */ 57);
	
	var _getAllServicesAndFill = __webpack_require__(/*! ./getAllServicesAndFill */ 58);
	
	var _notifyMsgAndFill = __webpack_require__(/*! ./notifyMsgAndFill */ 104);
	
	var _notifyMsgAndFill2 = _interopRequireDefault(_notifyMsgAndFill);
	
	var _notifyStateAndFill = __webpack_require__(/*! ./notifyStateAndFill */ 105);
	
	var _notifyStateAndFill2 = _interopRequireDefault(_notifyStateAndFill);
	
	var _connectTip = __webpack_require__(/*! ./connectTip */ 106);
	
	var _scanTip = __webpack_require__(/*! ./scanTip */ 108);
	
	var _scanTip2 = _interopRequireDefault(_scanTip);
	
	var _connectListTip = __webpack_require__(/*! ./connectListTip */ 110);
	
	var _connectListTip2 = _interopRequireDefault(_connectListTip);
	
	var _getAllServicesTip = __webpack_require__(/*! ./getAllServicesTip */ 111);
	
	var _getAllServicesTip2 = _interopRequireDefault(_getAllServicesTip);
	
	var _notifyMsgTip = __webpack_require__(/*! ./notifyMsgTip */ 112);
	
	var _notifyMsgTip2 = _interopRequireDefault(_notifyMsgTip);
	
	var _notifyStateTip = __webpack_require__(/*! ./notifyStateTip */ 113);
	
	var _notifyStateTip2 = _interopRequireDefault(_notifyStateTip);
	
	var _disconnectTip = __webpack_require__(/*! ./disconnectTip */ 114);
	
	var _disconnectTip2 = _interopRequireDefault(_disconnectTip);
	
	var _writeByHandleTip = __webpack_require__(/*! ./writeByHandleTip.js */ 115);
	
	var _writeByHandleTip2 = _interopRequireDefault(_writeByHandleTip);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var $l1 = $('.box .l1'),
	    $l3 = $('.box .l3');
	
	function mainHandle(layer, form) {
	    $l1.on('click', function (e) {
	        var targetId = e.target.id;
	        switch (targetId) {
	            case 'bscan':
	                {
	                    (0, _scanTip2.default)(layer, form, e.target);
	                    break;
	                }
	            case 'bConnect':
	                {
	                    (0, _connectTip.connectTips)(layer, form, e.target);
	                    break;
	                }
	
	            case 'bconnectList':
	                {
	                    e.target.fn = _getConnectList.getConnectListAndFiil;
	                    (0, _connectListTip2.default)(layer, form, e.target);
	
	                    break;
	                }
	            case 'bdiscoverSer':
	                {
	
	                    e.target.fn = _getAllServicesAndFill.getAllServicesAndFill;
	                    (0, _getAllServicesTip2.default)(layer, form, e.target);
	                    break;
	                }
	            case 'bnotify':
	                {
	                    e.target.start = _notifyMsgAndFill2.default.start;
	                    e.target.stop = _notifyMsgAndFill2.default.stop;
	                    (0, _notifyMsgTip2.default)(layer, form, e.target);
	                    break;
	                }
	            case 'bnotifyState':
	                {
	                    e.target.start = _notifyStateAndFill2.default.start;
	                    e.target.stop = _notifyStateAndFill2.default.stop;
	                    (0, _notifyStateTip2.default)(layer, form, e.target);
	                    break;
	                }
	            case 'bwrite':
	                {
	                    (0, _writeByHandleTip2.default)(layer, form, e.target);
	                    break;
	                }
	            case 'bdisconnect':
	                {
	                    e.target.fn = _disConnectDeviceAndFill2.default;
	                    (0, _disconnectTip2.default)(layer, form, e.target);
	                    break;
	                }
	        }
	    });
	}
	
	function connectButton() {
	    $('.box .l2').on('click', '.layui-btn', function () {
	        var deviceMac = this.dataset.mac,
	            type = this.dataset.type;
	        (0, _connectDevice2.default)(null, type, deviceMac);
	    });
	}
	
	function disConnectDevice() {
	    $l3.on('click', "[data-action='disconnect']", function () {
	        var deviceMac = this.dataset.mac;
	        (0, _disConnectDeviceAndFill2.default)(deviceMac);
	    });
	}
	
	function getAllServices() {
	
	    $l3.on('click', "button[data-action='services']", function () {
	        var deviceMac = this.dataset.mac;
	        (0, _getAllServicesAndFill.getAllServicesAndFill)(deviceMac);
	    });
	}
	
	function getConnectLists() {
	    $l3.on('click', '.connectList', function () {
	        (0, _getConnectList.getConnectListAndFiil)();
	    });
	}
	
	exports.mainHandle = mainHandle;
	exports.connectButton = connectButton;
	exports.getConnectLists = getConnectLists;
	exports.disConnectDevice = disConnectDevice;
	exports.getAllServices = getAllServices;

/***/ },
/* 6 */
/*!*********************************!*\
  !*** ./src/js/connectDevice.js ***!
  \*********************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _stringify = __webpack_require__(/*! babel-runtime/core-js/json/stringify */ 7);
	
	var _stringify2 = _interopRequireDefault(_stringify);
	
	var _api = __webpack_require__(/*! ./api */ 10);
	
	var _urlconfig = __webpack_require__(/*! ./urlconfig */ 54);
	
	var _urlconfig2 = _interopRequireDefault(_urlconfig);
	
	var _showmethod = __webpack_require__(/*! ./showmethod */ 47);
	
	var _showlog = __webpack_require__(/*! ./showlog */ 55);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function connectDevice(chip, type, deviceMac) {
		var url = _urlconfig2.default.connectDevice.replace("*deviceMac*", deviceMac),
		    $parent = $('#connect ul');
	
		_api.api.connectDevice(url, {
			qs: {
				chip: chip
			},
			type: type
		}).done(function (e) {
			(0, _showlog.showLog)($parent, {
				before: 'mac:' + deviceMac + '&nbsp;&nbsp;',
				message: (0, _stringify2.default)(e),
				class: 'success'
			});
		}).fail(function (e) {
			(0, _showlog.showLog)($parent, {
				before: 'mac:' + deviceMac + '&nbsp;&nbsp;',
				message: (0, _stringify2.default)(e),
				class: 'fail'
			});
		}).always(function (e) {
			console.log('connect:', e);
		});
	
		(0, _showmethod.showMethod)('connectDevice');
	}
	exports.default = connectDevice;

/***/ },
/* 7 */
/*!***********************************************************!*\
  !*** ./~/.6.23.0@babel-runtime/core-js/json/stringify.js ***!
  \***********************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(/*! core-js/library/fn/json/stringify */ 8), __esModule: true };

/***/ },
/* 8 */
/*!*******************************************************!*\
  !*** ./~/.2.4.1@core-js/library/fn/json/stringify.js ***!
  \*******************************************************/
/***/ function(module, exports, __webpack_require__) {

	var core  = __webpack_require__(/*! ../../modules/_core */ 9)
	  , $JSON = core.JSON || (core.JSON = {stringify: JSON.stringify});
	module.exports = function stringify(it){ // eslint-disable-line no-unused-vars
	  return $JSON.stringify.apply($JSON, arguments);
	};

/***/ },
/* 9 */
/*!***************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/_core.js ***!
  \***************************************************/
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 10 */
/*!***********************!*\
  !*** ./src/js/api.js ***!
  \***********************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.api = undefined;
	
	var _assign = __webpack_require__(/*! babel-runtime/core-js/object/assign */ 11);
	
	var _assign2 = _interopRequireDefault(_assign);
	
	var _showmethod = __webpack_require__(/*! ./showmethod */ 47);
	
	var _globalData = __webpack_require__(/*! ./globalData */ 48);
	
	var _globalData2 = _interopRequireDefault(_globalData);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function addURLParam(url, data) {
	    var flag = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
	
	    for (var key in data) {
	        url += url.indexOf("?") === -1 ? "?" : "&";
	        url += (flag ? encodeURIComponent(key) : key) + "=" + (flag ? encodeURIComponent(data[key]) : data[key]);
	    }
	    return url;
	}
	
	function start(url, data, scanSSE, cb) {
	    var _data = (0, _assign2.default)({
	        event: 1,
	        chip: 0
	    }, data),
	        _url = addURLParam(url, _data, false),
	        virtualData = '';
	    _showmethod.methodConfig.scan.url = _url;
	    var es = new EventSource(_url);
	
	    es.addEventListener("open", function () {
	        if (scanSSE.status === 'toClosed') {
	            this.close();
	            scanSSE.es = '';
	            return;
	        }
	        scanSSE.es = this;
	    }, false);
	
	
	    layui.use('flow', function () {
	        var flow = layui.flow,
	            num = 10;
	        es.addEventListener('message', function (e) {
	            if (e.data !== "keep-alive") {
	                _globalData2.default.neverSave.scanData.push(e.data);
	
	                cb(e.data);
	            }
	        });
	
	        flow.load({
	            elem: '#scanLog ul',
	            scrollElem: '.layui-tab-content',
	            mb: 100,
	            done: function done(page, next) {
	                var lis = _globalData2.default.neverSave.scanData;
	                if (page === 1) {
	                    setTimeout(function () {
	                        next('<li>' + lis.slice(0, num).join('</li><li>') + '</li>', num < lis.length);
	                        page++;
	                    }, 1000);
	                } else {
	                    next('<li>' + lis.slice((page - 1) * num, page * num).join('</li><li>') + '</li>', page * num <= lis.length);
	                    page++;
	                }
	            }
	        });
	    });
	}
	
	function connectDevice(url, data) {
	    var _url = url;
	    if (data.qs.chip !== null) _url = addURLParam(url, data.qs, false);
	
	    _showmethod.methodConfig.connectDevice.url = _url;
	    return $.ajax({
	        url: _url,
	        type: 'POST',
	        data: {
	            timeOut: 5000,
	            type: data.type
	        }
	    });
	}
	
	function disconnectDevice(url) {
	    _showmethod.methodConfig.disconnectDevice.url = url;
	    return $.ajax({
	        url: url,
	        type: 'DELETE'
	    });
	}
	
	function getConnectList(url) {
	    _showmethod.methodConfig.getConnectList.url = url;
	    return $.ajax({
	        url: url,
	        type: 'GET'
	    });
	}
	
	function getConnectState(url, stateSSE) {
	    var es = new EventSource(url);
	    _showmethod.methodConfig.getConnectState.url = url;
	
	    es.addEventListener("open", function () {
	        console.log('open');
	        if (stateSSE.status === 'toClosed') {
	            this.close();
	            console.log('closed');
	            stateSSE.status = 'closed';
	            stateSSE.es = '';
	            return;
	        }
	        stateSSE.es = this;
	        stateSSE.status = 'open';
	    }, false);
	    return es;
	}
	
	function reboot(url) {
	    return $.ajax({
	        url: url,
	        type: 'GET'
	    });
	}
	
	function getAllServices(url) {
	    _showmethod.methodConfig.getAllServices.url = url;
	    return $.ajax({
	        url: url,
	        type: 'GET'
	    });
	}
	
	function readByHandle(url, data) {
	    var _url = addURLParam(url, data, false);
	    $.ajax({
	        url: _url,
	        type: 'GET',
	        data: data
	    }).done(function (e) {
	        console.log(e);
	    }).fail(function (e) {
	        console.error(e);
	    });
	}
	
	function receiveNotification(url, notifySSE) {
	    var es = new EventSource(url);
	
	    console.log(notifySSE);
	    _showmethod.methodConfig.notify.url = url;
	    es.addEventListener("open", function () {
	        if (notifySSE.status === 'toClosed') {
	            this.close();
	            notifySSE.status = 'closed';
	            notifySSE.es = '';
	            return;
	        }
	        console.log('open');
	        notifySSE.es = this;
	        notifySSE.status = 'open';
	    }, false);
	    return es;
	}
	
	function writeByHnadle(url, data) {
	    _showmethod.methodConfig.writeByHandle.url = addURLParam(url, data, false);
	    return $.ajax({
	        url: url,
	        type: 'GET',
	        data: data
	    });
	}
	var api = {
	    start: start,
	    connectDevice: connectDevice,
	    disconnectDevice: disconnectDevice,
	    getConnectList: getConnectList,
	    getConnectState: getConnectState,
	    reboot: reboot,
	    getAllServices: getAllServices,
	    writeByHnadle: writeByHnadle,
	    readByHandle: readByHandle,
	    receiveNotification: receiveNotification,
	    addURLParam: addURLParam
	
	};
	
	exports.api = api;

/***/ },
/* 11 */
/*!**********************************************************!*\
  !*** ./~/.6.23.0@babel-runtime/core-js/object/assign.js ***!
  \**********************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(/*! core-js/library/fn/object/assign */ 12), __esModule: true };

/***/ },
/* 12 */
/*!******************************************************!*\
  !*** ./~/.2.4.1@core-js/library/fn/object/assign.js ***!
  \******************************************************/
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(/*! ../../modules/es6.object.assign */ 13);
	module.exports = __webpack_require__(/*! ../../modules/_core */ 9).Object.assign;

/***/ },
/* 13 */
/*!***************************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/es6.object.assign.js ***!
  \***************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.1 Object.assign(target, source)
	var $export = __webpack_require__(/*! ./_export */ 14);
	
	$export($export.S + $export.F, 'Object', {assign: __webpack_require__(/*! ./_object-assign */ 28)});

/***/ },
/* 14 */
/*!*****************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/_export.js ***!
  \*****************************************************/
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(/*! ./_global */ 15)
	  , core      = __webpack_require__(/*! ./_core */ 9)
	  , ctx       = __webpack_require__(/*! ./_ctx */ 16)
	  , hide      = __webpack_require__(/*! ./_hide */ 18)
	  , PROTOTYPE = 'prototype';
	
	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE]
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(a, b, c){
	        if(this instanceof C){
	          switch(arguments.length){
	            case 0: return new C;
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if(IS_PROTO){
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library` 
	module.exports = $export;

/***/ },
/* 15 */
/*!*****************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/_global.js ***!
  \*****************************************************/
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 16 */
/*!**************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/_ctx.js ***!
  \**************************************************/
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(/*! ./_a-function */ 17);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 17 */
/*!*********************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/_a-function.js ***!
  \*********************************************************/
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 18 */
/*!***************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/_hide.js ***!
  \***************************************************/
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(/*! ./_object-dp */ 19)
	  , createDesc = __webpack_require__(/*! ./_property-desc */ 27);
	module.exports = __webpack_require__(/*! ./_descriptors */ 23) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 19 */
/*!********************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/_object-dp.js ***!
  \********************************************************/
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(/*! ./_an-object */ 20)
	  , IE8_DOM_DEFINE = __webpack_require__(/*! ./_ie8-dom-define */ 22)
	  , toPrimitive    = __webpack_require__(/*! ./_to-primitive */ 26)
	  , dP             = Object.defineProperty;
	
	exports.f = __webpack_require__(/*! ./_descriptors */ 23) ? Object.defineProperty : function defineProperty(O, P, Attributes){
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if(IE8_DOM_DEFINE)try {
	    return dP(O, P, Attributes);
	  } catch(e){ /* empty */ }
	  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	  if('value' in Attributes)O[P] = Attributes.value;
	  return O;
	};

/***/ },
/* 20 */
/*!********************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/_an-object.js ***!
  \********************************************************/
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(/*! ./_is-object */ 21);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 21 */
/*!********************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/_is-object.js ***!
  \********************************************************/
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 22 */
/*!*************************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/_ie8-dom-define.js ***!
  \*************************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(/*! ./_descriptors */ 23) && !__webpack_require__(/*! ./_fails */ 24)(function(){
	  return Object.defineProperty(__webpack_require__(/*! ./_dom-create */ 25)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 23 */
/*!**********************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/_descriptors.js ***!
  \**********************************************************/
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(/*! ./_fails */ 24)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 24 */
/*!****************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/_fails.js ***!
  \****************************************************/
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 25 */
/*!*********************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/_dom-create.js ***!
  \*********************************************************/
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(/*! ./_is-object */ 21)
	  , document = __webpack_require__(/*! ./_global */ 15).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 26 */
/*!***********************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/_to-primitive.js ***!
  \***********************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(/*! ./_is-object */ 21);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 27 */
/*!************************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/_property-desc.js ***!
  \************************************************************/
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 28 */
/*!************************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/_object-assign.js ***!
  \************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 19.1.2.1 Object.assign(target, source, ...)
	var getKeys  = __webpack_require__(/*! ./_object-keys */ 29)
	  , gOPS     = __webpack_require__(/*! ./_object-gops */ 44)
	  , pIE      = __webpack_require__(/*! ./_object-pie */ 45)
	  , toObject = __webpack_require__(/*! ./_to-object */ 46)
	  , IObject  = __webpack_require__(/*! ./_iobject */ 33)
	  , $assign  = Object.assign;
	
	// should work with symbols and should have deterministic property order (V8 bug)
	module.exports = !$assign || __webpack_require__(/*! ./_fails */ 24)(function(){
	  var A = {}
	    , B = {}
	    , S = Symbol()
	    , K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function(k){ B[k] = k; });
	  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
	}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
	  var T     = toObject(target)
	    , aLen  = arguments.length
	    , index = 1
	    , getSymbols = gOPS.f
	    , isEnum     = pIE.f;
	  while(aLen > index){
	    var S      = IObject(arguments[index++])
	      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
	      , length = keys.length
	      , j      = 0
	      , key;
	    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
	  } return T;
	} : $assign;

/***/ },
/* 29 */
/*!**********************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/_object-keys.js ***!
  \**********************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(/*! ./_object-keys-internal */ 30)
	  , enumBugKeys = __webpack_require__(/*! ./_enum-bug-keys */ 43);
	
	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 30 */
/*!*******************************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/_object-keys-internal.js ***!
  \*******************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(/*! ./_has */ 31)
	  , toIObject    = __webpack_require__(/*! ./_to-iobject */ 32)
	  , arrayIndexOf = __webpack_require__(/*! ./_array-includes */ 36)(false)
	  , IE_PROTO     = __webpack_require__(/*! ./_shared-key */ 40)('IE_PROTO');
	
	module.exports = function(object, names){
	  var O      = toIObject(object)
	    , i      = 0
	    , result = []
	    , key;
	  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while(names.length > i)if(has(O, key = names[i++])){
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

/***/ },
/* 31 */
/*!**************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/_has.js ***!
  \**************************************************/
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 32 */
/*!*********************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/_to-iobject.js ***!
  \*********************************************************/
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(/*! ./_iobject */ 33)
	  , defined = __webpack_require__(/*! ./_defined */ 35);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 33 */
/*!******************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/_iobject.js ***!
  \******************************************************/
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(/*! ./_cof */ 34);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 34 */
/*!**************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/_cof.js ***!
  \**************************************************/
/***/ function(module, exports) {

	var toString = {}.toString;
	
	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 35 */
/*!******************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/_defined.js ***!
  \******************************************************/
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 36 */
/*!*************************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/_array-includes.js ***!
  \*************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(/*! ./_to-iobject */ 32)
	  , toLength  = __webpack_require__(/*! ./_to-length */ 37)
	  , toIndex   = __webpack_require__(/*! ./_to-index */ 39);
	module.exports = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = toIObject($this)
	      , length = toLength(O.length)
	      , index  = toIndex(fromIndex, length)
	      , value;
	    // Array#includes uses SameValueZero equality algorithm
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    // Array#toIndex ignores holes, Array#includes - not
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 37 */
/*!********************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/_to-length.js ***!
  \********************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(/*! ./_to-integer */ 38)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 38 */
/*!*********************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/_to-integer.js ***!
  \*********************************************************/
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 39 */
/*!*******************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/_to-index.js ***!
  \*******************************************************/
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(/*! ./_to-integer */ 38)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 40 */
/*!*********************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/_shared-key.js ***!
  \*********************************************************/
/***/ function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(/*! ./_shared */ 41)('keys')
	  , uid    = __webpack_require__(/*! ./_uid */ 42);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 41 */
/*!*****************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/_shared.js ***!
  \*****************************************************/
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(/*! ./_global */ 15)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 42 */
/*!**************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/_uid.js ***!
  \**************************************************/
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 43 */
/*!************************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/_enum-bug-keys.js ***!
  \************************************************************/
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ },
/* 44 */
/*!**********************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/_object-gops.js ***!
  \**********************************************************/
/***/ function(module, exports) {

	exports.f = Object.getOwnPropertySymbols;

/***/ },
/* 45 */
/*!*********************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/_object-pie.js ***!
  \*********************************************************/
/***/ function(module, exports) {

	exports.f = {}.propertyIsEnumerable;

/***/ },
/* 46 */
/*!********************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/_to-object.js ***!
  \********************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(/*! ./_defined */ 35);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 47 */
/*!******************************!*\
  !*** ./src/js/showmethod.js ***!
  \******************************/
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var methodNames = {
	    scan: 'scanDevice',
	    connectDevice: 'connDevice',
	    getConnectList: 'connedDevice',
	    getAllServices: 'disService',
	    notify: 'getMsg',
	    getConnectState: 'deviceConStateChange',
	    writeByHandle: 'writeCom',
	    disconnectDevice: 'disCon'
	};
	
	var methodConfig = {
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
	    getAllServices: {
	        type: 'GET',
	        methodName: methodNames.getAllServices,
	        utl: ''
	    },
	    notify: {
	        type: 'GET/SSE',
	        methodName: methodNames.notify,
	        url: ''
	    },
	    writeByHandle: {
	        type: 'GET',
	        methodName: methodNames.writeByHandle,
	        url: ''
	    }
	};
	var $showMethods = $('.log .left .order');
	
	function showMethod(method) {
	    var _methodName = methodConfig[method].methodName,
	        _type = methodConfig[method].type,
	        _url = methodConfig[method].url,
	        oLi = '<li>\n\t\t\t\t\t<p><span i18n=\'method\'>\u65B9\u6CD5\u540D</span><span i18n=\'' + _methodName + '\'></span><span>' + _type + '</span></p>\n\t\t\t\t\t<p><em>URL:</em>' + _url + '</p>\n\t\t\t    </li>';
	    $showMethods.append(oLi);
	}
	
	exports.methodConfig = methodConfig;
	exports.showMethod = showMethod;

/***/ },
/* 48 */
/*!******************************!*\
  !*** ./src/js/globalData.js ***!
  \******************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _defineProperties = __webpack_require__(/*! babel-runtime/core-js/object/define-properties */ 49);
	
	var _defineProperties2 = _interopRequireDefault(_defineProperties);
	
	var _localStorage = __webpack_require__(/*! ./localStorage */ 53);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var firstFlag = true,
	    saved = void 0;
	var localStorageKey = 'cassiaSDKTool',
	    neverSave = {
		notifySSE: {
			status: 'closed',
			es: ''
		},
		stateSSE: {
			status: 'closed',
			es: ''
		},
		scanSSE: {
			status: 'closed',
			es: '',
			timeOut: 5
		},
		scanData: [],
		length: null
	},
	    savedInit = {
		_deviceMac: '',
		_hubMac: '',
		_hubIp: '',
		_chip: '0',
		_commond: ''
	};
	(0, _defineProperties2.default)(savedInit, {
		deviceMac: {
			get: function get() {
				return this._deviceMac;
			},
			set: function set(newValue) {
				this._deviceMac = newValue;
				(0, _localStorage.storage)(localStorageKey, this);
			}
		},
		hubMac: {
			get: function get() {
				return this._hubMac;
			},
			set: function set(newValue) {
				this._hubMac = newValue;
				(0, _localStorage.storage)(localStorageKey, this);
			}
		},
		hubIp: {
			get: function get() {
				return this._hubIp;
			},
			set: function set(newValue) {
				this._hubIp = newValue;
				(0, _localStorage.storage)(localStorageKey, this);
			}
		},
		chip: {
			get: function get() {
				return this._chip;
			},
			set: function set(newValue) {
				this._chip = newValue;
				(0, _localStorage.storage)(localStorageKey, this);
			}
		},
		commond: {
			get: function get() {
				return this._commond;
			},
			set: function set(newValue) {
				this._commond = newValue;
				(0, _localStorage.storage)(localStorageKey, this);
			}
		}
	});
	
	if (firstFlag) {
		firstFlag = false;
		saved = (0, _localStorage.readStorage)(localStorageKey, savedInit);
	}
	
	var globalData = {
		neverSave: neverSave,
		saved: saved
	
	};
	
	exports.default = globalData;

/***/ },
/* 49 */
/*!*********************************************************************!*\
  !*** ./~/.6.23.0@babel-runtime/core-js/object/define-properties.js ***!
  \*********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(/*! core-js/library/fn/object/define-properties */ 50), __esModule: true };

/***/ },
/* 50 */
/*!*****************************************************************!*\
  !*** ./~/.2.4.1@core-js/library/fn/object/define-properties.js ***!
  \*****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(/*! ../../modules/es6.object.define-properties */ 51);
	var $Object = __webpack_require__(/*! ../../modules/_core */ 9).Object;
	module.exports = function defineProperties(T, D){
	  return $Object.defineProperties(T, D);
	};

/***/ },
/* 51 */
/*!**************************************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/es6.object.define-properties.js ***!
  \**************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(/*! ./_export */ 14);
	// 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
	$export($export.S + $export.F * !__webpack_require__(/*! ./_descriptors */ 23), 'Object', {defineProperties: __webpack_require__(/*! ./_object-dps */ 52)});

/***/ },
/* 52 */
/*!*********************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/_object-dps.js ***!
  \*********************************************************/
/***/ function(module, exports, __webpack_require__) {

	var dP       = __webpack_require__(/*! ./_object-dp */ 19)
	  , anObject = __webpack_require__(/*! ./_an-object */ 20)
	  , getKeys  = __webpack_require__(/*! ./_object-keys */ 29);
	
	module.exports = __webpack_require__(/*! ./_descriptors */ 23) ? Object.defineProperties : function defineProperties(O, Properties){
	  anObject(O);
	  var keys   = getKeys(Properties)
	    , length = keys.length
	    , i = 0
	    , P;
	  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

/***/ },
/* 53 */
/*!********************************!*\
  !*** ./src/js/localStorage.js ***!
  \********************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.readStorage = exports.storage = undefined;
	
	var _assign = __webpack_require__(/*! babel-runtime/core-js/object/assign */ 11);
	
	var _assign2 = _interopRequireDefault(_assign);
	
	var _stringify = __webpack_require__(/*! babel-runtime/core-js/json/stringify */ 7);
	
	var _stringify2 = _interopRequireDefault(_stringify);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function getType(data) {
		return Object.prototype.toString.call(data).match(/^\[object\s(.*)\]$/)[1];
	}
	
	function verifylocalStorageData(localData, expectationData, exclude) {
		var result = true;
	
		function fn(localData, expectationData, exclude) {
			var type = getType(expectationData),
			    type2 = getType(localData);
			if (type === 'Object' || type === 'Array') {
				if (type === type2) {
					for (var key in expectationData) {
						if (exclude && exclude.indexOf(key) > -1) continue;
						if (localData.hasOwnProperty(key)) {
							if (getType(expectationData[key]) === getType(localData[key])) {
								fn(localData[key], expectationData[key]);
							} else result = false;
						} else result = false;
					}
				} else result = false;
			} else {}
		}
		fn(localData, expectationData, exclude);
		return result;
	}
	
	function storage(key, data) {
	
		if (!window.localStorage) return;
		var storage = window.localStorage;
		storage.setItem(key, (0, _stringify2.default)(data));
	}
	
	function readStorage(key, expectationData) {
		if (!window.localStorage) return expectationData;
		var storage = window.localStorage,
		    localData = JSON.parse(storage.getItem(key));
	
	
		return (0, _assign2.default)(expectationData, localData);
	}
	
	exports.storage = storage;
	exports.readStorage = readStorage;

/***/ },
/* 54 */
/*!*****************************!*\
  !*** ./src/js/urlconfig.js ***!
  \*****************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _globalData = __webpack_require__(/*! ./globalData */ 48);
	
	var _globalData2 = _interopRequireDefault(_globalData);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var $hubIp = $('#hubIp');
	var data = {},
	    urlArr = {};
	
	data.hubIp = $hubIp.val().trim();
	data.perMac = '*deviceMac*';
	data.handle = '*handle*';
	data.writeValue = '*writeValue*';
	
	function updateUrlArr(hubIp) {
	    urlArr.scan = 'http://' + hubIp + '/gap/nodes/';
	    urlArr.connectDevice = 'http://' + hubIp + '/gap/nodes/' + data.perMac + '/connection/';
	    urlArr.disconnectDevice = 'http://' + hubIp + '/gap/nodes/' + data.perMac + '/connection';
	    urlArr.getConnectedDeviceList = 'http://' + hubIp + '/gap/nodes/?connection_state=connected';
	    urlArr.getConnectState = 'http://' + hubIp + '/management/nodes/connection-state';
	    urlArr.getAllServices = 'http://' + hubIp + '/gatt/nodes/' + data.perMac + '/services/characteristics/descriptors';
	    urlArr.readByHandle = 'http://' + hubIp + '/gatt/nodes/' + data.perMac + '/';
	    urlArr.notifyMsg = 'http://' + hubIp + '/gatt/nodes/?event=1';
	    urlArr.writeByHandle = 'http://' + hubIp + '/gatt/nodes/' + data.perMac + '/handle/' + data.handle + '/value/' + data.writeValue;
	    urlArr.reboot = 'http://' + hubIp + '/cassia/reboot';
	}
	updateUrlArr(data.hubIp);
	
	$hubIp.on('blur', function () {
	    data.hubIp = this.value.trim();
	    updateUrlArr(data.hubIp);
	    _globalData2.default.saved.hubIp = data.hubIp;
	});
	$('#hubMac').on('blur', function () {
	    _globalData2.default.saved.hubMac = this.value.trim();
	});
	
	exports.default = urlArr;

/***/ },
/* 55 */
/*!***************************!*\
  !*** ./src/js/showlog.js ***!
  \***************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.showLog = undefined;
	
	var _assign = __webpack_require__(/*! babel-runtime/core-js/object/assign */ 11);
	
	var _assign2 = _interopRequireDefault(_assign);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function showLog(parent, data) {
		var _data = (0, _assign2.default)({
			before: '',
			message: '',
			after: '',
			class: ''
		}, data);
	
		var temp = '<li><pre class=\'' + _data.class + '\'>' + _data.before + _data.message + _data.after + '</pre></li>';
	
		parent.append(temp);
	}
	
	exports.showLog = showLog;

/***/ },
/* 56 */
/*!*******************************************!*\
  !*** ./src/js/disConnectDeviceAndFill.js ***!
  \*******************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _stringify = __webpack_require__(/*! babel-runtime/core-js/json/stringify */ 7);
	
	var _stringify2 = _interopRequireDefault(_stringify);
	
	var _api = __webpack_require__(/*! ./api */ 10);
	
	var _urlconfig = __webpack_require__(/*! ./urlconfig */ 54);
	
	var _urlconfig2 = _interopRequireDefault(_urlconfig);
	
	var _showmethod = __webpack_require__(/*! ./showmethod */ 47);
	
	var _showlog = __webpack_require__(/*! ./showlog */ 55);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function disConnectDeviceAndFill(deviceMac) {
		var url = _urlconfig2.default.connectDevice.replace("*deviceMac*", deviceMac),
		    parent = $('#disconnectLog ul');
		var ajaxResult = _api.api.disconnectDevice(url);
		(0, _showmethod.showMethod)('disconnectDevice');
		ajaxResult.done(function (e) {
			(0, _showlog.showLog)(parent, {
				before: 'mac:&nbsp;&nbsp;' + deviceMac + ' disconnect',
				message: (0, _stringify2.default)(e, null, 2),
				class: 'success'
			});
			$('.l3 ul li[data-mac=\'' + deviceMac + '\']').slideUp('normal', function () {
				this.remove();
			});
		}).fail(function (e) {
			(0, _showlog.showLog)(parent, {
				before: 'mac:&nbsp;&nbsp;' + deviceMac + ' disconnect',
				message: (0, _stringify2.default)(e, null, 2),
				class: 'fail'
			});
		});
	}
	
	exports.default = disConnectDeviceAndFill;

/***/ },
/* 57 */
/*!**********************************!*\
  !*** ./src/js/getConnectList.js ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.htmlTemp = exports.getConnectListAndFiil = undefined;
	
	var _stringify = __webpack_require__(/*! babel-runtime/core-js/json/stringify */ 7);
	
	var _stringify2 = _interopRequireDefault(_stringify);
	
	var _api = __webpack_require__(/*! ./api */ 10);
	
	var _showmethod = __webpack_require__(/*! ./showmethod.js */ 47);
	
	var _showlog = __webpack_require__(/*! ./showlog */ 55);
	
	var _urlconfig = __webpack_require__(/*! ./urlconfig */ 54);
	
	var _urlconfig2 = _interopRequireDefault(_urlconfig);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function htmlTemp(mac, name) {
		return '<li data-mac=' + mac + '>\n\t\t\t\t<div class="layui-form-item">\n\t\t\t\t\t<div class="layui-inline">\n\t\t\t\t\t\t<label class="layui-form-label">mac:</label>\n\t\t\t\t\t\t<div class="layui-input-inline">\n\t\t\t\t\t\t\t<span class="layui-input">' + mac + '</span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="layui-inline">\n\t\t\t\t\t\t<label class="layui-form-label">name:</label>\n\t\t\t\t\t\t<div class="layui-input-inline">\n\t\t\t\t\t\t\t<span class="layui-input">' + name + '</span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class="layui-form-item">\n\t\t\t\t\t<div class="layui-input-inline">\n\t\t\t\t\t\t<button class="layui-btn" data-mac=' + mac + ' data-action=\'services\'>Serivices</button>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="layui-input-inline">\n\t\t\t\t\t\t<button class="layui-btn" data-mac=' + mac + ' data-action=\'disconnect\'>disconnect</button>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class="layui-input-item tree">\n\t\t\t\t\t<ul data-mac=' + mac + '></ul> \n\t\t\t\t</div>\n\t\t\t</li>';
	}
	
	function getConnectListAndFiil() {
		var parent1 = $('.l3 ul'),
		    parent2 = $('#connectLists ul'),
		    ajaxResult = _api.api.getConnectList(_urlconfig2.default.getConnectedDeviceList);
		(0, _showmethod.showMethod)('getConnectList');
		ajaxResult.done(function (e) {
			var temp = '',
			    mac = void 0,
			    name = void 0;
	
			(0, _showlog.showLog)(parent2, {
				message: (0, _stringify2.default)(e)
			});
			e.nodes.forEach(function (item, index, arr) {
				mac = item.id;
				name = item.name;
				temp += htmlTemp(mac, name);
			});
			parent1.html(temp);
			mac = null;
			temp = null;
			name = null;
		});
	}
	
	exports.getConnectListAndFiil = getConnectListAndFiil;
	exports.htmlTemp = htmlTemp;

/***/ },
/* 58 */
/*!*****************************************!*\
  !*** ./src/js/getAllServicesAndFill.js ***!
  \*****************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.getAllServicesAndFill = undefined;
	
	var _stringify = __webpack_require__(/*! babel-runtime/core-js/json/stringify */ 7);
	
	var _stringify2 = _interopRequireDefault(_stringify);
	
	var _typeof2 = __webpack_require__(/*! babel-runtime/helpers/typeof */ 59);
	
	var _typeof3 = _interopRequireDefault(_typeof2);
	
	var _api = __webpack_require__(/*! ./api */ 10);
	
	var _writeByHnadleAndFill = __webpack_require__(/*! ./writeByHnadleAndFill.js */ 93);
	
	var _showmethod = __webpack_require__(/*! ./showmethod */ 47);
	
	var _showlog = __webpack_require__(/*! ./showlog */ 55);
	
	var _urlconfig = __webpack_require__(/*! ./urlconfig */ 54);
	
	var _urlconfig2 = _interopRequireDefault(_urlconfig);
	
	var _formatServicesData = __webpack_require__(/*! ./formatServicesData */ 94);
	
	var _formatServicesData2 = _interopRequireDefault(_formatServicesData);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var hasGetServices = {};
	
	function getAllServicesAndFill(deviceMac) {
		layui.use(['tree', 'form', 'layer'], function () {
			var form = layui.form(),
			    layer = layui.layer,
			    $parent = $('.box .l3').find('ul.bb1>li div.tree > ul[data-mac=\'' + deviceMac + '\']'),
			    url = _urlconfig2.default.getAllServices.replace("*deviceMac*", deviceMac);
	
			if (hasGetServices[deviceMac] === 1) return;
			if ((0, _typeof3.default)(hasGetServices[deviceMac]) === 'object') {
				if ($parent.children().length !== 0) return;else {
					layui.tree({
						elem: $parent,
						nodes: hasGetServices[deviceMac]
					});
					setTimeout(function () {
						form.render();
					}, 500);
				}
				return;
			}
			hasGetServices[deviceMac] = 0;
			var ajaxResult = _api.api.getAllServices(url),
			    $parent2 = $('#getAllServices ul');
			(0, _showmethod.showMethod)('getAllServices');
			(function (deviceMac, form, layer, $parent, url, ajaxResult, $parent2) {
	
				ajaxResult.done(function (e) {
					console.log($.extend(true, {}, e));
					(0, _showlog.showLog)($parent2, {
						message: (0, _stringify2.default)(e, null, 2),
						class: 'success'
					});
					hasGetServices[deviceMac] = (0, _formatServicesData2.default)(e, deviceMac);
					layui.tree({
						elem: $parent,
						nodes: hasGetServices[deviceMac]
					});
					clearTimeout($parent.timer);
					$parent.timer = setTimeout(function () {
						var $ul = $('.l3 ul[data-mac=\'' + deviceMac + '\']');
						var writeValue = void 0;
						form.render();
						$ul.find('button.js-try').click(function (e) {
							var handle = e.target.dataset.handle,
							    deviceMac = e.target.dataset.devicemac;
							if ($ul.find('input.js' + handle).length === 2 && e.target.dataset.action === 'writeWithoutRes') {
								writeValue = $ul.find('input.js' + handle).eq(0).val().trim();
							} else if ($ul.find('input.js' + handle).length === 2 && e.target.dataset.action === 'writeWithRes') {
								writeValue = $ul.find('input.js' + handle).eq(1).val().trim();
							} else writeValue = $ul.find('input.js' + handle).eq(0).val().trim();
							(0, _writeByHnadleAndFill.writeByHnadleAndFill)(e.target, {
								deviceMac: deviceMac,
								writeValue: writeValue,
								handle: handle
							});
						});
	
						form.on('switch(notify)', function (e) {
							var handle = e.elem.dataset.handle,
							    writeValue = e.elem.checked ? '0100' : '0000',
							    deviceMac = e.elem.dataset.devicemac;
	
							(0, _writeByHnadleAndFill.writeByHnadleAndFill)(e.elem, {
								deviceMac: deviceMac,
								writeValue: writeValue,
								handle: handle
							});
						});
						form.on('switch(indicate)', function (e) {
							var handle = e.elem.dataset.handle,
							    writeValue = e.elem.checked ? '0200' : '0000',
							    deviceMac = e.elem.dataset.devicemac;
							(0, _writeByHnadleAndFill.writeByHnadleAndFill)(e.elem, {
								deviceMac: deviceMac,
								writeValue: writeValue,
								handle: handle
							});
						});
					}, 500);
				}).fail(function (e) {
					if (e.responseText === 'DISCOVER WRONG') layer.open({
						title: '获取设备服务错误',
						content: deviceMac + '未连接!',
						icon: 2
					});
					hasGetServices[deviceMac] = 3;
					(0, _showlog.showLog)($parent2, {
						message: (0, _stringify2.default)(e, null, 2),
						class: 'fail'
					});
				});
			})(deviceMac, form, layer, $parent, url, ajaxResult, $parent2);
		});
	}
	
	exports.getAllServicesAndFill = getAllServicesAndFill;

/***/ },
/* 59 */
/*!***************************************************!*\
  !*** ./~/.6.23.0@babel-runtime/helpers/typeof.js ***!
  \***************************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _iterator = __webpack_require__(/*! ../core-js/symbol/iterator */ 60);
	
	var _iterator2 = _interopRequireDefault(_iterator);
	
	var _symbol = __webpack_require__(/*! ../core-js/symbol */ 79);
	
	var _symbol2 = _interopRequireDefault(_symbol);
	
	var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
	  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
	} : function (obj) {
	  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
	};

/***/ },
/* 60 */
/*!************************************************************!*\
  !*** ./~/.6.23.0@babel-runtime/core-js/symbol/iterator.js ***!
  \************************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(/*! core-js/library/fn/symbol/iterator */ 61), __esModule: true };

/***/ },
/* 61 */
/*!********************************************************!*\
  !*** ./~/.2.4.1@core-js/library/fn/symbol/iterator.js ***!
  \********************************************************/
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(/*! ../../modules/es6.string.iterator */ 62);
	__webpack_require__(/*! ../../modules/web.dom.iterable */ 74);
	module.exports = __webpack_require__(/*! ../../modules/_wks-ext */ 78).f('iterator');

/***/ },
/* 62 */
/*!*****************************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/es6.string.iterator.js ***!
  \*****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(/*! ./_string-at */ 63)(true);
	
	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(/*! ./_iter-define */ 64)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ },
/* 63 */
/*!********************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/_string-at.js ***!
  \********************************************************/
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(/*! ./_to-integer */ 38)
	  , defined   = __webpack_require__(/*! ./_defined */ 35);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 64 */
/*!**********************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/_iter-define.js ***!
  \**********************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(/*! ./_library */ 65)
	  , $export        = __webpack_require__(/*! ./_export */ 14)
	  , redefine       = __webpack_require__(/*! ./_redefine */ 66)
	  , hide           = __webpack_require__(/*! ./_hide */ 18)
	  , has            = __webpack_require__(/*! ./_has */ 31)
	  , Iterators      = __webpack_require__(/*! ./_iterators */ 67)
	  , $iterCreate    = __webpack_require__(/*! ./_iter-create */ 68)
	  , setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ 71)
	  , getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 73)
	  , ITERATOR       = __webpack_require__(/*! ./_wks */ 72)('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';
	
	var returnThis = function(){ return this; };
	
	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
	    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
	    , methods, key, IteratorPrototype;
	  // Fix native
	  if($anyNative){
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
	    if(IteratorPrototype !== Object.prototype){
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if(DEF_VALUES && $native && $native.name !== VALUES){
	    VALUES_BUG = true;
	    $default = function values(){ return $native.call(this); };
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES ? $default : getMethod(VALUES),
	      keys:    IS_SET     ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 65 */
/*!******************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/_library.js ***!
  \******************************************************/
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 66 */
/*!*******************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/_redefine.js ***!
  \*******************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(/*! ./_hide */ 18);

/***/ },
/* 67 */
/*!********************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/_iterators.js ***!
  \********************************************************/
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 68 */
/*!**********************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/_iter-create.js ***!
  \**********************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var create         = __webpack_require__(/*! ./_object-create */ 69)
	  , descriptor     = __webpack_require__(/*! ./_property-desc */ 27)
	  , setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ 71)
	  , IteratorPrototype = {};
	
	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(/*! ./_hide */ 18)(IteratorPrototype, __webpack_require__(/*! ./_wks */ 72)('iterator'), function(){ return this; });
	
	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 69 */
/*!************************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/_object-create.js ***!
  \************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject    = __webpack_require__(/*! ./_an-object */ 20)
	  , dPs         = __webpack_require__(/*! ./_object-dps */ 52)
	  , enumBugKeys = __webpack_require__(/*! ./_enum-bug-keys */ 43)
	  , IE_PROTO    = __webpack_require__(/*! ./_shared-key */ 40)('IE_PROTO')
	  , Empty       = function(){ /* empty */ }
	  , PROTOTYPE   = 'prototype';
	
	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(/*! ./_dom-create */ 25)('iframe')
	    , i      = enumBugKeys.length
	    , lt     = '<'
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(/*! ./_html */ 70).appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
	  return createDict();
	};
	
	module.exports = Object.create || function create(O, Properties){
	  var result;
	  if(O !== null){
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty;
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};


/***/ },
/* 70 */
/*!***************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/_html.js ***!
  \***************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(/*! ./_global */ 15).document && document.documentElement;

/***/ },
/* 71 */
/*!****************************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/_set-to-string-tag.js ***!
  \****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(/*! ./_object-dp */ 19).f
	  , has = __webpack_require__(/*! ./_has */ 31)
	  , TAG = __webpack_require__(/*! ./_wks */ 72)('toStringTag');
	
	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 72 */
/*!**************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/_wks.js ***!
  \**************************************************/
/***/ function(module, exports, __webpack_require__) {

	var store      = __webpack_require__(/*! ./_shared */ 41)('wks')
	  , uid        = __webpack_require__(/*! ./_uid */ 42)
	  , Symbol     = __webpack_require__(/*! ./_global */ 15).Symbol
	  , USE_SYMBOL = typeof Symbol == 'function';
	
	var $exports = module.exports = function(name){
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};
	
	$exports.store = store;

/***/ },
/* 73 */
/*!*********************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/_object-gpo.js ***!
  \*********************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has         = __webpack_require__(/*! ./_has */ 31)
	  , toObject    = __webpack_require__(/*! ./_to-object */ 46)
	  , IE_PROTO    = __webpack_require__(/*! ./_shared-key */ 40)('IE_PROTO')
	  , ObjectProto = Object.prototype;
	
	module.exports = Object.getPrototypeOf || function(O){
	  O = toObject(O);
	  if(has(O, IE_PROTO))return O[IE_PROTO];
	  if(typeof O.constructor == 'function' && O instanceof O.constructor){
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

/***/ },
/* 74 */
/*!**************************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/web.dom.iterable.js ***!
  \**************************************************************/
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(/*! ./es6.array.iterator */ 75);
	var global        = __webpack_require__(/*! ./_global */ 15)
	  , hide          = __webpack_require__(/*! ./_hide */ 18)
	  , Iterators     = __webpack_require__(/*! ./_iterators */ 67)
	  , TO_STRING_TAG = __webpack_require__(/*! ./_wks */ 72)('toStringTag');
	
	for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
	  var NAME       = collections[i]
	    , Collection = global[NAME]
	    , proto      = Collection && Collection.prototype;
	  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
	  Iterators[NAME] = Iterators.Array;
	}

/***/ },
/* 75 */
/*!****************************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/es6.array.iterator.js ***!
  \****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(/*! ./_add-to-unscopables */ 76)
	  , step             = __webpack_require__(/*! ./_iter-step */ 77)
	  , Iterators        = __webpack_require__(/*! ./_iterators */ 67)
	  , toIObject        = __webpack_require__(/*! ./_to-iobject */ 32);
	
	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(/*! ./_iter-define */ 64)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');
	
	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;
	
	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ },
/* 76 */
/*!*****************************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/_add-to-unscopables.js ***!
  \*****************************************************************/
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 77 */
/*!********************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/_iter-step.js ***!
  \********************************************************/
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 78 */
/*!******************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/_wks-ext.js ***!
  \******************************************************/
/***/ function(module, exports, __webpack_require__) {

	exports.f = __webpack_require__(/*! ./_wks */ 72);

/***/ },
/* 79 */
/*!***************************************************!*\
  !*** ./~/.6.23.0@babel-runtime/core-js/symbol.js ***!
  \***************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(/*! core-js/library/fn/symbol */ 80), __esModule: true };

/***/ },
/* 80 */
/*!*****************************************************!*\
  !*** ./~/.2.4.1@core-js/library/fn/symbol/index.js ***!
  \*****************************************************/
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(/*! ../../modules/es6.symbol */ 81);
	__webpack_require__(/*! ../../modules/es6.object.to-string */ 90);
	__webpack_require__(/*! ../../modules/es7.symbol.async-iterator */ 91);
	__webpack_require__(/*! ../../modules/es7.symbol.observable */ 92);
	module.exports = __webpack_require__(/*! ../../modules/_core */ 9).Symbol;

/***/ },
/* 81 */
/*!********************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/es6.symbol.js ***!
  \********************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var global         = __webpack_require__(/*! ./_global */ 15)
	  , has            = __webpack_require__(/*! ./_has */ 31)
	  , DESCRIPTORS    = __webpack_require__(/*! ./_descriptors */ 23)
	  , $export        = __webpack_require__(/*! ./_export */ 14)
	  , redefine       = __webpack_require__(/*! ./_redefine */ 66)
	  , META           = __webpack_require__(/*! ./_meta */ 82).KEY
	  , $fails         = __webpack_require__(/*! ./_fails */ 24)
	  , shared         = __webpack_require__(/*! ./_shared */ 41)
	  , setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ 71)
	  , uid            = __webpack_require__(/*! ./_uid */ 42)
	  , wks            = __webpack_require__(/*! ./_wks */ 72)
	  , wksExt         = __webpack_require__(/*! ./_wks-ext */ 78)
	  , wksDefine      = __webpack_require__(/*! ./_wks-define */ 83)
	  , keyOf          = __webpack_require__(/*! ./_keyof */ 84)
	  , enumKeys       = __webpack_require__(/*! ./_enum-keys */ 85)
	  , isArray        = __webpack_require__(/*! ./_is-array */ 86)
	  , anObject       = __webpack_require__(/*! ./_an-object */ 20)
	  , toIObject      = __webpack_require__(/*! ./_to-iobject */ 32)
	  , toPrimitive    = __webpack_require__(/*! ./_to-primitive */ 26)
	  , createDesc     = __webpack_require__(/*! ./_property-desc */ 27)
	  , _create        = __webpack_require__(/*! ./_object-create */ 69)
	  , gOPNExt        = __webpack_require__(/*! ./_object-gopn-ext */ 87)
	  , $GOPD          = __webpack_require__(/*! ./_object-gopd */ 89)
	  , $DP            = __webpack_require__(/*! ./_object-dp */ 19)
	  , $keys          = __webpack_require__(/*! ./_object-keys */ 29)
	  , gOPD           = $GOPD.f
	  , dP             = $DP.f
	  , gOPN           = gOPNExt.f
	  , $Symbol        = global.Symbol
	  , $JSON          = global.JSON
	  , _stringify     = $JSON && $JSON.stringify
	  , PROTOTYPE      = 'prototype'
	  , HIDDEN         = wks('_hidden')
	  , TO_PRIMITIVE   = wks('toPrimitive')
	  , isEnum         = {}.propertyIsEnumerable
	  , SymbolRegistry = shared('symbol-registry')
	  , AllSymbols     = shared('symbols')
	  , OPSymbols      = shared('op-symbols')
	  , ObjectProto    = Object[PROTOTYPE]
	  , USE_NATIVE     = typeof $Symbol == 'function'
	  , QObject        = global.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;
	
	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS && $fails(function(){
	  return _create(dP({}, 'a', {
	    get: function(){ return dP(this, 'a', {value: 7}).a; }
	  })).a != 7;
	}) ? function(it, key, D){
	  var protoDesc = gOPD(ObjectProto, key);
	  if(protoDesc)delete ObjectProto[key];
	  dP(it, key, D);
	  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
	} : dP;
	
	var wrap = function(tag){
	  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
	  sym._k = tag;
	  return sym;
	};
	
	var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
	  return typeof it == 'symbol';
	} : function(it){
	  return it instanceof $Symbol;
	};
	
	var $defineProperty = function defineProperty(it, key, D){
	  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
	  anObject(it);
	  key = toPrimitive(key, true);
	  anObject(D);
	  if(has(AllSymbols, key)){
	    if(!D.enumerable){
	      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
	      D = _create(D, {enumerable: createDesc(0, false)});
	    } return setSymbolDesc(it, key, D);
	  } return dP(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P){
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P))
	    , i    = 0
	    , l = keys.length
	    , key;
	  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P){
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key){
	  var E = isEnum.call(this, key = toPrimitive(key, true));
	  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
	  it  = toIObject(it);
	  key = toPrimitive(key, true);
	  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
	  var D = gOPD(it, key);
	  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it){
	  var names  = gOPN(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
	  } return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
	  var IS_OP  = it === ObjectProto
	    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
	  } return result;
	};
	
	// 19.4.1.1 Symbol([description])
	if(!USE_NATIVE){
	  $Symbol = function Symbol(){
	    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
	    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
	    var $set = function(value){
	      if(this === ObjectProto)$set.call(OPSymbols, value);
	      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    };
	    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
	    return wrap(tag);
	  };
	  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
	    return this._k;
	  });
	
	  $GOPD.f = $getOwnPropertyDescriptor;
	  $DP.f   = $defineProperty;
	  __webpack_require__(/*! ./_object-gopn */ 88).f = gOPNExt.f = $getOwnPropertyNames;
	  __webpack_require__(/*! ./_object-pie */ 45).f  = $propertyIsEnumerable;
	  __webpack_require__(/*! ./_object-gops */ 44).f = $getOwnPropertySymbols;
	
	  if(DESCRIPTORS && !__webpack_require__(/*! ./_library */ 65)){
	    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }
	
	  wksExt.f = function(name){
	    return wrap(wks(name));
	  }
	}
	
	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});
	
	for(var symbols = (
	  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
	).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);
	
	for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);
	
	$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function(key){
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(key){
	    if(isSymbol(key))return keyOf(SymbolRegistry, key);
	    throw TypeError(key + ' is not a symbol!');
	  },
	  useSetter: function(){ setter = true; },
	  useSimple: function(){ setter = false; }
	});
	
	$export($export.S + $export.F * !USE_NATIVE, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});
	
	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
	})), 'JSON', {
	  stringify: function stringify(it){
	    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
	    var args = [it]
	      , i    = 1
	      , replacer, $replacer;
	    while(arguments.length > i)args.push(arguments[i++]);
	    replacer = args[1];
	    if(typeof replacer == 'function')$replacer = replacer;
	    if($replacer || !isArray(replacer))replacer = function(key, value){
	      if($replacer)value = $replacer.call(this, key, value);
	      if(!isSymbol(value))return value;
	    };
	    args[1] = replacer;
	    return _stringify.apply($JSON, args);
	  }
	});
	
	// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(/*! ./_hide */ 18)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);

/***/ },
/* 82 */
/*!***************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/_meta.js ***!
  \***************************************************/
/***/ function(module, exports, __webpack_require__) {

	var META     = __webpack_require__(/*! ./_uid */ 42)('meta')
	  , isObject = __webpack_require__(/*! ./_is-object */ 21)
	  , has      = __webpack_require__(/*! ./_has */ 31)
	  , setDesc  = __webpack_require__(/*! ./_object-dp */ 19).f
	  , id       = 0;
	var isExtensible = Object.isExtensible || function(){
	  return true;
	};
	var FREEZE = !__webpack_require__(/*! ./_fails */ 24)(function(){
	  return isExtensible(Object.preventExtensions({}));
	});
	var setMeta = function(it){
	  setDesc(it, META, {value: {
	    i: 'O' + ++id, // object ID
	    w: {}          // weak collections IDs
	  }});
	};
	var fastKey = function(it, create){
	  // return primitive with prefix
	  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return 'F';
	    // not necessary to add metadata
	    if(!create)return 'E';
	    // add missing metadata
	    setMeta(it);
	  // return object ID
	  } return it[META].i;
	};
	var getWeak = function(it, create){
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return true;
	    // not necessary to add metadata
	    if(!create)return false;
	    // add missing metadata
	    setMeta(it);
	  // return hash weak collections IDs
	  } return it[META].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function(it){
	  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
	  return it;
	};
	var meta = module.exports = {
	  KEY:      META,
	  NEED:     false,
	  fastKey:  fastKey,
	  getWeak:  getWeak,
	  onFreeze: onFreeze
	};

/***/ },
/* 83 */
/*!*********************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/_wks-define.js ***!
  \*********************************************************/
/***/ function(module, exports, __webpack_require__) {

	var global         = __webpack_require__(/*! ./_global */ 15)
	  , core           = __webpack_require__(/*! ./_core */ 9)
	  , LIBRARY        = __webpack_require__(/*! ./_library */ 65)
	  , wksExt         = __webpack_require__(/*! ./_wks-ext */ 78)
	  , defineProperty = __webpack_require__(/*! ./_object-dp */ 19).f;
	module.exports = function(name){
	  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
	  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
	};

/***/ },
/* 84 */
/*!****************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/_keyof.js ***!
  \****************************************************/
/***/ function(module, exports, __webpack_require__) {

	var getKeys   = __webpack_require__(/*! ./_object-keys */ 29)
	  , toIObject = __webpack_require__(/*! ./_to-iobject */ 32);
	module.exports = function(object, el){
	  var O      = toIObject(object)
	    , keys   = getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

/***/ },
/* 85 */
/*!********************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/_enum-keys.js ***!
  \********************************************************/
/***/ function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var getKeys = __webpack_require__(/*! ./_object-keys */ 29)
	  , gOPS    = __webpack_require__(/*! ./_object-gops */ 44)
	  , pIE     = __webpack_require__(/*! ./_object-pie */ 45);
	module.exports = function(it){
	  var result     = getKeys(it)
	    , getSymbols = gOPS.f;
	  if(getSymbols){
	    var symbols = getSymbols(it)
	      , isEnum  = pIE.f
	      , i       = 0
	      , key;
	    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
	  } return result;
	};

/***/ },
/* 86 */
/*!*******************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/_is-array.js ***!
  \*******************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(/*! ./_cof */ 34);
	module.exports = Array.isArray || function isArray(arg){
	  return cof(arg) == 'Array';
	};

/***/ },
/* 87 */
/*!**************************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/_object-gopn-ext.js ***!
  \**************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(/*! ./_to-iobject */ 32)
	  , gOPN      = __webpack_require__(/*! ./_object-gopn */ 88).f
	  , toString  = {}.toString;
	
	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];
	
	var getWindowNames = function(it){
	  try {
	    return gOPN(it);
	  } catch(e){
	    return windowNames.slice();
	  }
	};
	
	module.exports.f = function getOwnPropertyNames(it){
	  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
	};


/***/ },
/* 88 */
/*!**********************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/_object-gopn.js ***!
  \**********************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
	var $keys      = __webpack_require__(/*! ./_object-keys-internal */ 30)
	  , hiddenKeys = __webpack_require__(/*! ./_enum-bug-keys */ 43).concat('length', 'prototype');
	
	exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
	  return $keys(O, hiddenKeys);
	};

/***/ },
/* 89 */
/*!**********************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/_object-gopd.js ***!
  \**********************************************************/
/***/ function(module, exports, __webpack_require__) {

	var pIE            = __webpack_require__(/*! ./_object-pie */ 45)
	  , createDesc     = __webpack_require__(/*! ./_property-desc */ 27)
	  , toIObject      = __webpack_require__(/*! ./_to-iobject */ 32)
	  , toPrimitive    = __webpack_require__(/*! ./_to-primitive */ 26)
	  , has            = __webpack_require__(/*! ./_has */ 31)
	  , IE8_DOM_DEFINE = __webpack_require__(/*! ./_ie8-dom-define */ 22)
	  , gOPD           = Object.getOwnPropertyDescriptor;
	
	exports.f = __webpack_require__(/*! ./_descriptors */ 23) ? gOPD : function getOwnPropertyDescriptor(O, P){
	  O = toIObject(O);
	  P = toPrimitive(P, true);
	  if(IE8_DOM_DEFINE)try {
	    return gOPD(O, P);
	  } catch(e){ /* empty */ }
	  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
	};

/***/ },
/* 90 */
/*!******************************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/es6.object.to-string.js ***!
  \******************************************************************/
/***/ function(module, exports) {



/***/ },
/* 91 */
/*!***********************************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/es7.symbol.async-iterator.js ***!
  \***********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(/*! ./_wks-define */ 83)('asyncIterator');

/***/ },
/* 92 */
/*!*******************************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/es7.symbol.observable.js ***!
  \*******************************************************************/
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(/*! ./_wks-define */ 83)('observable');

/***/ },
/* 93 */
/*!****************************************!*\
  !*** ./src/js/writeByHnadleAndFill.js ***!
  \****************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.writeByHnadleAndFill = undefined;
	
	var _stringify = __webpack_require__(/*! babel-runtime/core-js/json/stringify */ 7);
	
	var _stringify2 = _interopRequireDefault(_stringify);
	
	var _api = __webpack_require__(/*! ./api */ 10);
	
	var _urlconfig = __webpack_require__(/*! ./urlconfig */ 54);
	
	var _urlconfig2 = _interopRequireDefault(_urlconfig);
	
	var _showmethod = __webpack_require__(/*! ./showmethod */ 47);
	
	var _showlog = __webpack_require__(/*! ./showlog */ 55);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var writeByHnadleAndFill = function writeByHnadleAndFill(event, _ref) {
		var deviceMac = _ref.deviceMac,
		    writeValue = _ref.writeValue,
		    handle = _ref.handle;
	
		var url = void 0,
		    ajaxResult = void 0,
		    action = event.dataset.action;
	
		url = _urlconfig2.default.writeByHandle.replace(/\*((deviceMac)|(handle)|(writeValue))\*/g, function (match, pos, originalText) {
			switch (match) {
				case '*deviceMac*':
					return deviceMac;
				case '*handle*':
					return handle;
				case '*writeValue*':
					return writeValue;
			}
		});
	
		if (action === 'writeWithRes') {
			ajaxResult = _api.api.writeByHnadle(url, null);
		} else if (action === 'writeWithoutRes') {
			ajaxResult = _api.api.writeByHnadle(url, {
				option: 'cmd'
			});
		} else if (action === 'notify') {
			ajaxResult = _api.api.writeByHnadle(url, null);
		} else if (action === 'indicate') {
			ajaxResult = _api.api.writeByHnadle(url, null);
		}
		(0, _showmethod.showMethod)('writeByHandle');
		ajaxResult.done(function (e) {
			(0, _showlog.showLog)($('#writeValueLog'), {
				message: deviceMac + ':' + (0, _stringify2.default)(e),
				class: 'success'
			});
		}).fail(function (e) {
			(0, _showlog.showLog)($('#writeValueLog'), {
				message: deviceMac + ':' + (0, _stringify2.default)(e, null, 2),
				class: 'fail'
			});
		});
	};
	
	exports.writeByHnadleAndFill = writeByHnadleAndFill;

/***/ },
/* 94 */
/*!**************************************!*\
  !*** ./src/js/formatServicesData.js ***!
  \**************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _typeof2 = __webpack_require__(/*! babel-runtime/helpers/typeof */ 59);
	
	var _typeof3 = _interopRequireDefault(_typeof2);
	
	var _keys = __webpack_require__(/*! babel-runtime/core-js/object/keys */ 95);
	
	var _keys2 = _interopRequireDefault(_keys);
	
	var _properties = __webpack_require__(/*! ./properties */ 99);
	
	var _properties2 = _interopRequireDefault(_properties);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function formatServicesData(data, deviceMac) {
		var nodes = [];
	
		function key2name(obj) {
			(0, _keys2.default)(obj).forEach(function (k) {
				if ((0, _typeof3.default)(obj[k]) === 'object') return;
				if (k === 'uuid') return;
				if (k === 'primary') return;
				if (k === 'endHandle') return;
				if (k === 'startHandle') {
					obj.children.push({
						name: 'handle:' + obj[k]
					});
					return;
				}
	
				if (k === 'handle') {
					obj.children.push({
						name: 'handle:' + obj[k]
					});
					return;
				}
	
				if (k === 'properties') {
					var method = (0, _properties2.default)(obj[k]);
	
					obj.children.push({
						name: 'properties:' + ('<span class=\'prop-msg\'>&nbsp;&nbsp;' + method + '</span>')
					});
					if (method.indexOf('read') !== -1) {}
					if (method.indexOf('write without response') !== -1) {
						obj.children.push({
							name: 'write without response:&nbsp;0x\n\t\t\t\t\t\t\t\t\t<span class="layui-form-item">\n\t\t\t\t\t\t\t\t\t\t<span class="layui-inline">\n\t\t\t\t\t\t\t\t\t\t\t<span class="layui-input-inline" style="width: 100px;">\n\t\t\t\t\t\t\t\t\t\t\t\t<input type="text" class="layui-input js' + obj.valueHandle + '"  placeholder=\'0100\'>\n\t\t\t\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t\t\t\t<span class="layui-form-mid"></span>\n\t\t\t\t\t\t\t\t\t\t\t<button class="layui-btn js-try" lay-submit lay-filter=\'writeWithoutRes\'  data-devicemac=' + deviceMac + '  data-action=\'writeWithoutRes\' data-handle=' + obj.valueHandle + '>try</button>\n\t\t\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t</span>',
							flag: 'writeWithoutRes',
							valueHandle: obj.valueHandle
						});
						obj.children.push({
							name: '<span style="visibility:hidden">write without response:&nbsp;</span>(0x0100)</span>'
						});
					}
					if (method.indexOf('write with response') !== -1) {
						obj.children.push({
							name: 'write with response:&nbsp;0x\n\t\t\t\t\t\t\t\t\t<span class="layui-form-item">\n\t\t\t\t\t\t\t\t\t\t<span class="layui-inline">\n\t\t\t\t\t\t\t\t\t\t\t<span class="layui-input-inline" style="width: 100px;">\n\t\t\t\t\t\t\t\t\t\t\t\t<input type="text" class="layui-input js' + obj.valueHandle + '"  placeholder=\'0F04\'>\n\t\t\t\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t\t\t\t<span class="layui-form-mid"></span>\n\t\t\t\t\t\t\t\t\t\t\t<button class="layui-btn js-try" lay-submit lay-filter=\'writeWithRes\' data-devicemac=' + deviceMac + ' data-action=\'writeWithRes\' data-handle=' + obj.valueHandle + '>try</button>\n\t\t\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t</span>',
							flag: 'writeWithRes',
							valueHandle: obj.valueHandle
						});
						obj.children.push({
							name: '<span style="visibility:hidden">write with response:&nbsp;</span>(0x0100)</span>'
						});
					}
					if (method.indexOf('notify') !== -1) {
						var realHandle = obj.descriptors.filter(function (item) {
							return item.uuid.indexOf('2902') !== -1;
						});
						obj.children.push({
							name: 'notify\n\t\t\t\t\t\t\t\t\t<span class="layui-form-item">\n\t\t\t\t\t\t\t\t\t\t<span class="layui-inline">\n\t\t\t\t\t\t\t\t\t\t\t<span class="layui-form-mid"></span>\n\t\t\t\t\t\t\t\t\t\t\t<input type="checkbox"  lay-skin="switch" class=\'js-switch\' data-action=\'notify\' data-devicemac=' + deviceMac + ' data-handle=' + (realHandle[0] ? realHandle[0].handle : 'undefined') + ' lay-filter=\'notify\'>\n\t\t\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t</span>',
							flag: 'notify',
							handle: realHandle[0] ? realHandle[0].handle : 'undefined'
						});
					}
					if (method.indexOf('indicate') !== -1) {
						var _realHandle = obj.descriptors.filter(function (item) {
							return item.uuid.indexOf('2902') !== -1;
						});
						obj.children.push({
							name: 'indicate\n\t\t\t\t\t\t\t\t\t<span class="layui-form-item">\n\t\t\t\t\t\t\t\t\t\t<span class="layui-inline">\n\t\t\t\t\t\t\t\t\t\t\t<span class="layui-form-mid"></span>\n\t\t\t\t\t\t\t\t\t\t\t<input type="checkbox"  lay-skin="switch" class=\'js-switch\' data-devicemac=' + deviceMac + ' data-action=\'indicate\' data-handle=' + _realHandle[0].handle + ' lay-filter=\'indicate\'>\n\t\t\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t</span>',
							flag: 'indicate',
							handle: _realHandle[0].handle
						});
					}
	
	
					return;
				}
				obj.children.push({
	
					name: k + ':' + obj[k]
				});
			});
		}
		data.services.forEach(function (s) {
			nodes.push(s);
			s.children = [];
			key2name(s);
			s.children.push({
				name: 'characteristics',
				children: s.characteristics.map(function (c) {
					c.children = [];
					key2name(c, 'c');
					if (c.descriptors.length !== 0) {
						c.children.push({
	
							name: 'descriptors',
							children: c.descriptors.map(function (d) {
								d.children = [];
								key2name(d);
								d.name = 'uuid:' + d.uuid;
								return d;
							})
						});
					}
					delete c.descriptors;
					c.name = 'uuid:' + c.uuid;
					return c;
				})
			});
			delete s.characteristics;
			s.name = 'uuid:' + s.uuid;
		});
	
		return [{
			name: 'services',
			children: nodes
		}];
	}
	exports.default = formatServicesData;

/***/ },
/* 95 */
/*!********************************************************!*\
  !*** ./~/.6.23.0@babel-runtime/core-js/object/keys.js ***!
  \********************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(/*! core-js/library/fn/object/keys */ 96), __esModule: true };

/***/ },
/* 96 */
/*!****************************************************!*\
  !*** ./~/.2.4.1@core-js/library/fn/object/keys.js ***!
  \****************************************************/
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(/*! ../../modules/es6.object.keys */ 97);
	module.exports = __webpack_require__(/*! ../../modules/_core */ 9).Object.keys;

/***/ },
/* 97 */
/*!*************************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/es6.object.keys.js ***!
  \*************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 Object.keys(O)
	var toObject = __webpack_require__(/*! ./_to-object */ 46)
	  , $keys    = __webpack_require__(/*! ./_object-keys */ 29);
	
	__webpack_require__(/*! ./_object-sap */ 98)('keys', function(){
	  return function keys(it){
	    return $keys(toObject(it));
	  };
	});

/***/ },
/* 98 */
/*!*********************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/_object-sap.js ***!
  \*********************************************************/
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(/*! ./_export */ 14)
	  , core    = __webpack_require__(/*! ./_core */ 9)
	  , fails   = __webpack_require__(/*! ./_fails */ 24);
	module.exports = function(KEY, exec){
	  var fn  = (core.Object || {})[KEY] || Object[KEY]
	    , exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
	};

/***/ },
/* 99 */
/*!******************************!*\
  !*** ./src/js/properties.js ***!
  \******************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _isInteger = __webpack_require__(/*! babel-runtime/core-js/number/is-integer */ 100);
	
	var _isInteger2 = _interopRequireDefault(_isInteger);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var checkProp = function checkProp(value) {
		var msg = [],
		    msgBox = {
			0X01: 'broadcasts',
			0X02: 'read',
			0X04: 'write without response',
			0X08: 'write with response',
			0X10: 'notify',
			0X20: 'indicate',
			0X40: 'authen',
			0X80: 'extended'
		};
		if (!(0, _isInteger2.default)(value)) return 'properties value must be integer';
		for (var i in msgBox) {
			if (value & i) msg.push(msgBox[i]);
		}
		return msg.join(',');
	};
	exports.default = checkProp;

/***/ },
/* 100 */
/*!**************************************************************!*\
  !*** ./~/.6.23.0@babel-runtime/core-js/number/is-integer.js ***!
  \**************************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(/*! core-js/library/fn/number/is-integer */ 101), __esModule: true };

/***/ },
/* 101 */
/*!**********************************************************!*\
  !*** ./~/.2.4.1@core-js/library/fn/number/is-integer.js ***!
  \**********************************************************/
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(/*! ../../modules/es6.number.is-integer */ 102);
	module.exports = __webpack_require__(/*! ../../modules/_core */ 9).Number.isInteger;

/***/ },
/* 102 */
/*!*******************************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/es6.number.is-integer.js ***!
  \*******************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.3 Number.isInteger(number)
	var $export = __webpack_require__(/*! ./_export */ 14);
	
	$export($export.S, 'Number', {isInteger: __webpack_require__(/*! ./_is-integer */ 103)});

/***/ },
/* 103 */
/*!*********************************************************!*\
  !*** ./~/.2.4.1@core-js/library/modules/_is-integer.js ***!
  \*********************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.3 Number.isInteger(number)
	var isObject = __webpack_require__(/*! ./_is-object */ 21)
	  , floor    = Math.floor;
	module.exports = function isInteger(it){
	  return !isObject(it) && isFinite(it) && floor(it) === it;
	};

/***/ },
/* 104 */
/*!************************************!*\
  !*** ./src/js/notifyMsgAndFill.js ***!
  \************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _stringify = __webpack_require__(/*! babel-runtime/core-js/json/stringify */ 7);
	
	var _stringify2 = _interopRequireDefault(_stringify);
	
	var _api = __webpack_require__(/*! ./api */ 10);
	
	var _showmethod = __webpack_require__(/*! ./showmethod */ 47);
	
	var _showlog = __webpack_require__(/*! ./showlog */ 55);
	
	var _urlconfig = __webpack_require__(/*! ./urlconfig */ 54);
	
	var _urlconfig2 = _interopRequireDefault(_urlconfig);
	
	var _globalData = __webpack_require__(/*! ./globalData */ 48);
	
	var _globalData2 = _interopRequireDefault(_globalData);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var notifyMsgAndFill = {};
	notifyMsgAndFill.start = function () {
		_globalData2.default.neverSave.notifySSE.status = 'toOpen';
		if (_globalData2.default.neverSave.notifySSE.es !== '') {
			return;
		}
		var ajaxResult = _api.api.receiveNotification(_urlconfig2.default.notifyMsg, _globalData2.default.neverSave.notifySSE),
		    $parent1 = $('.l4 ul'),
		    $parent2 = $('#notify ul');
		ajaxResult.addEventListener('message', function (e) {
			var data = null;
			if (e.data !== "keep-alive") {
				data = JSON.parse(e.data);
				(0, _showlog.showLog)($parent1, {
					message: '<b>mac:' + data.id + '</b>&nbsp;&nbsp;&nbsp;' + data.value
				});
				(0, _showlog.showLog)($parent2, {
					message: (0, _stringify2.default)(data, null, 2)
				});
			} else {
				(0, _showlog.showLog)($parent2, {
					message: e.data
				});
			}
		});
		(0, _showmethod.showMethod)('notify');
	};
	
	notifyMsgAndFill.stop = function () {
		console.log(_globalData2.default);
		_globalData2.default.neverSave.notifySSE.status = 'toClosed';
		if (_globalData2.default.neverSave.notifySSE.es) {
			_globalData2.default.neverSave.notifySSE.es.close();
			_globalData2.default.neverSave.notifySSE.status = 'closed';
			_globalData2.default.neverSave.notifySSE.es = '';
		}
	};
	
	exports.default = notifyMsgAndFill;

/***/ },
/* 105 */
/*!**************************************!*\
  !*** ./src/js/notifyStateAndFill.js ***!
  \**************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _api = __webpack_require__(/*! ./api */ 10);
	
	var _showmethod = __webpack_require__(/*! ./showmethod */ 47);
	
	var _showlog = __webpack_require__(/*! ./showlog */ 55);
	
	var _getConnectList = __webpack_require__(/*! ./getConnectList */ 57);
	
	var _urlconfig = __webpack_require__(/*! ./urlconfig */ 54);
	
	var _urlconfig2 = _interopRequireDefault(_urlconfig);
	
	var _globalData = __webpack_require__(/*! ./globalData */ 48);
	
	var _globalData2 = _interopRequireDefault(_globalData);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var notifyStateAndFill = {};
	notifyStateAndFill.start = function () {
		_globalData2.default.neverSave.stateSSE.status = 'toOpen';
		if (_globalData2.default.neverSave.stateSSE.es !== '') {
			return;
		}
		var url = _urlconfig2.default.getConnectState,
		    ajaxResult = _api.api.getConnectState(url, _globalData2.default.neverSave.stateSSE),
		    $parent = $('#connectState ul');
		var data = '';
		ajaxResult.addEventListener('message', function (e) {
			(0, _showlog.showLog)($parent, {
				message: e.data
			});
			if (e.data !== "keep-alive") {
				data = JSON.parse(e.data);
				stateNotifyHandle(data);
			}
		});
		(0, _showmethod.showMethod)('getConnectState');
	};
	
	function stateNotifyHandle(data) {
		var state = data.connectionState,
		    mac = data.handle,
		    $l3 = $('.box .l3 ul.bb1'),
		    $li = $l3.children('li:has(span.layui-input:contains("' + mac + '"))');
	
		if (state === 'connected' && !$li[0]) {
			$l3.append((0, _getConnectList.htmlTemp)(mac, ''));
		} else if (state === 'disconnected') {
			$li[0] && $li.slideUp('normal', function () {
				this.parentNode.removeChild(this);
			});
		}
	}
	notifyStateAndFill.stop = function () {
		_globalData2.default.neverSave.stateSSE.status = 'toClosed';
		if (_globalData2.default.neverSave.stateSSE.es) {
			_globalData2.default.neverSave.stateSSE.es.close();
			console.log('has closed');
			_globalData2.default.neverSave.stateSSE.status = 'closed';
			_globalData2.default.neverSave.stateSSE.es = '';
		}
	};
	
	exports.default = notifyStateAndFill;

/***/ },
/* 106 */
/*!******************************!*\
  !*** ./src/js/connectTip.js ***!
  \******************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.connectTips = undefined;
	
	var _globalData = __webpack_require__(/*! ./globalData */ 48);
	
	var _globalData2 = _interopRequireDefault(_globalData);
	
	var _connectDevice = __webpack_require__(/*! ./connectDevice */ 6);
	
	var _connectDevice2 = _interopRequireDefault(_connectDevice);
	
	var _tips = __webpack_require__(/*! ./tips */ 107);
	
	var _tips2 = _interopRequireDefault(_tips);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function htmlString() {
	  var temp = '<form class="layui-form  connect-tip tip" action="#">\n  <div class="layui-form-item">\n    <label class="layui-form-label">Connect a device\uFF1AGET</label>\n  </div>\n  <fieldset class="layui-elem-field layui-field-title">\n    <legend  i18n=\'arguments\'>\u53C2\u6570</legend>\n  </fieldset>\n  <div class="layui-form-item">\n    <label class="layui-form-label">chip:</label>\n    <div class="layui-input-inline">\n      <input type="text" name="chip"  placeholder="0 OR 1" lay-verify=\'zeroOne\'  value="' + (_globalData2.default.saved.chip ? _globalData2.default.saved.chip : '') + '" class="layui-input">\n    </div>\n     <div class="layui-form-mid layui-word-aux" i18n = \'required\'>(\u5FC5\u586B)</div>\n  </div>\n  <div class="layui-form-item">\n    <label class="layui-form-label">deviceMac:</label>\n    <div class="layui-input-inline">\n      <input type="text" name="deviceMac"  placeholder="CC:1B:E0:E0:10:C1" value="' + (_globalData2.default.saved.deviceMac ? _globalData2.default.saved.deviceMac : '') + '" lay-verify=\'deviceMac\'  class="layui-input">\n    </div>\n    <div class="layui-form-mid layui-word-aux" i18n = \'required\'>(\u5FC5\u586B)</div>\n  </div>\n  <div class="layui-form-item select">\n    <label class="layui-form-label">type:</label>\n    <div class="layui-inline">\n     <select name="type">\n      <option value="public" ' + (_globalData2.default.type === 'public' ? 'selected' : null) + '>public</option>\n      <option value="random" ' + (_globalData2.default.type === 'random' ? 'selected' : null) + '>random</option>\n     </select>\n    </div>\n  </div>\n  \n  <fieldset class="layui-elem-field layui-field-title">\n    <legend i18n = \'description\'>\u63CF\u8FF0</legend>\n  </fieldset>\n  <div class="layui-form-item layui-form-text">\n    <div class="descriptors connect-des">\n      <p><b>chip\uFF1A</b>\u84DD\u7259\u8DEF\u7531\u5668\u5171\u6709\u4E24\u4E2A\u82AF\u7247\uFF0C\u82AF\u72470\u548C\u82AF\u72471\uFF0C\u5728\u8C03\u7528\u63A5\u53E3\u65F6\u53EF\u4EE5\u901A\u8FC7\u6DFB\u52A0queryString\u6765\u9009\u62E9\u82AF\u7247(?chip=0\u6216\u8005?chip=1)\uFF0C\u6BCF\u4E2A\u82AF\u7247\u7684\u8FDE\u63A5\u4E0A\u9650\u662F11\u4E2A\u8BBE\u5907\uFF0C\u5982\u679C\u4E0D\u586B\u6B64\u53C2\u6570\uFF0C\u84DD\u7259\u8DEF\u7531\u5668\u4F1A\u6839\u636E\u8FDE\u63A5\u6570\u91CF\u81EA\u52A8\u5339\u914D\u82AF\u7247\u3002</p>\n      <p><b>deviceMac\uFF1A</b>\u8981\u8FDE\u63A5\u7684\u8BBE\u5907\u7684MAC\u5730\u5740\u3002</p>\n      <p><b>type\uFF1A</b>\u6B64\u53C2\u6570\u5728body\u4E2D\uFF0C\u662F\u5FC5\u586B\u9879\u3002\u84DD\u7259\u8BBE\u5907\u7684MAC\u5730\u5740\u5206\u4E3Arandom\u548Cpublic\u4E24\u79CD\uFF0C\u6240\u4EE5\u5728\u8FDE\u63A5\u8BBE\u5907\u65F6\uFF0C\u9700\u8981\u6307\u51FA\u8BBE\u5907\u7684\u5E7F\u64ADtype\uFF0C\u5E7F\u64ADtype\u53EF\u4EE5\u4ECE\u626B\u63CF\u6570\u636E\u4E2D\u83B7\u53D6\u3002</p>\n    </div>\n  </div>\n  <div class="layui-form-item">\n    <div class="layui-input-block">\n      <button class="layui-btn" lay-submit lay-filter="connect">do</button>\n    </div>\n  </div>\n</form>';
	  return temp;
	}
	
	function connectTips(layer, form, $dom) {
	  form.verify({
	    deviceMac: [/^([0-9a-f]{2}:){5}[0-9a-f]{2}$/gi, '请输入正确的mac地址'],
	    zeroOne: [/^[01]$/, '请输入chip,0或者1']
	  });
	
	  function dos(layer, form) {
	    form.on('submit(connect)', function (data) {
	      _globalData2.default.saved.chip = data.field.chip;
	      _globalData2.default.saved.deviceMac = data.field.deviceMac;
	      _globalData2.default.type = data.field.type;
	      var deviceMac = data.field.deviceMac,
	          type = data.field.type,
	          chip = data.field.chip;
	      (0, _connectDevice2.default)(chip, type, deviceMac);
	      layer.closeAll('tips');
	      return false;
	    });
	  }
	  (0, _tips2.default)(layer, htmlString, $dom, dos, form);
	  form.render();
	}
	
	exports.connectTips = connectTips;

/***/ },
/* 107 */
/*!************************!*\
  !*** ./src/js/tips.js ***!
  \************************/
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	function tip(layer, htmlString, $dom, dos, form) {
		layer.open({
			type: 4,
			area: ['400px', 'auto'],
	
			closeBtn: 0,
			shadeClose: true,
			fixed: false,
			maxmin: false,
			anim: 5,
			tips: [2, '#2F4056'],
			content: [htmlString(), $dom],
			success: dos.bind(null, layer, form, $dom)
		});
	}
	
	exports.default = tip;

/***/ },
/* 108 */
/*!***************************!*\
  !*** ./src/js/scanTip.js ***!
  \***************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _globalData = __webpack_require__(/*! ./globalData */ 48);
	
	var _globalData2 = _interopRequireDefault(_globalData);
	
	var _scan = __webpack_require__(/*! ./scan */ 109);
	
	var _scan2 = _interopRequireDefault(_scan);
	
	var _tips = __webpack_require__(/*! ./tips */ 107);
	
	var _tips2 = _interopRequireDefault(_tips);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function htmlString() {
	  var temp = '<form class="layui-form  scan-tip tip" action="#">\n  <div class="layui-form-item">\n    <label class="layui-form-label">Scan\uFF1AGET/SSE</label>\n  </div>\n  <fieldset class="layui-elem-field layui-field-title">\n    <legend i18n = \'arguments\'>\u53C2\u6570</legend>\n  </fieldset>\n  <div class="layui-form-item">\n    <label class="layui-form-label">chip:</label>\n    <div class="layui-input-inline">\n      <input type="text" name="chip"  value=' + (_globalData2.default.saved.chip !== '' ? _globalData2.default.saved.chip : '0') + ' placeholder="0\u6216\u80051" lay-verify=\'zeroOrOne\'  class="layui-input">\n    </div>\n     <div class="layui-form-mid layui-word-aux" i18n=\'optional\'>(\u9009\u586B)</div>\n  </div>\n  <fieldset class="layui-elem-field layui-field-title">\n    <legend i18n=\'description\'>\u63CF\u8FF0</legend>\n  </fieldset>\n  <div class="layui-form-item layui-form-text">\n    <div class="descriptors scan-des">\n      <p><b>\u63A5\u53E3URL\uFF1A</b>\u8C03\u7528\u63A5\u53E3\u540E\uFF0C\u6B64URL\u4F1A\u81EA\u52A8\u751F\u6210\u5728\u4E0B\u9762\u7684\u201DAPI\u63A5\u53E3\u201D\u7684\u7A97\u53E3\u4E2D</p>\n      <p><b>\u63A5\u53E3\u63CF\u8FF0\uFF1A</b>\u6B64\u63A5\u53E3\u662Fsse\u957F\u94FE\u63A5\u8C03\u7528\u63A5\u53E3\u540E\uFF0C\u84DD\u7259\u8DEF\u7531\u5668\u4F1A\u626B\u63CF\u5468\u8FB9\u7684\u8BBE\u5907,\u5E76\u5C06\u84DD\u7259\u8BBE\u5907\u7684MAC\u5730\u5740(bdaddr)\u3001\u5E7F\u64ADtype\uFF08bdaddrType\uFF09\u3001\u5E7F\u64AD\u62A5\u6570\u636E\uFF08adData/scanData\uFF09\u3001\u8BBE\u5907\u540D\u79F0\uFF08name\uFF09\u3001\u4FE1\u53F7\u5F3A\u5EA6\uFF08rssi\uFF09\u7B49\u4FE1\u606F\u4EE5http response\u7684\u5F62\u5F0F\u8FD4\u56DE\uFF08\u539F\u59CB\u6570\u636E\u89C1\u201Chttp response\u201D\u7A97\u53E3\u3002</p>\n      <p><b> \u53C2\u6570\u89E3\u91CA\uFF1Achip\uFF1A</b>\u84DD\u7259\u8DEF\u7531\u5668\u5171\u6709\u4E24\u4E2A\u82AF\u7247\uFF0C\u82AF\u72470\u548C\u82AF\u72471\uFF0C\u5728\u8C03\u7528\u63A5\u53E3\u65F6\u53EF\u4EE5\u901A\u8FC7\u6DFB\u52A0queryString\u6765\u9009\u62E9\u82AF\u7247(?chip=0\u6216\u8005?chip=1)\uFF0C\u5982\u679C\u4E0D\u586B,\u4F1A\u9ED8\u8BA4\u7528\u82AF\u72470\u626B\u63CF\uFF0C\u82AF\u72470\u626B\u63CF\u8DDD\u79BB\u4F1A\u4F18\u4E8E\u82AF\u72471\uFF0C\u4E5F\u5EFA\u8BAE\u4E00\u822C\u60C5\u51B5\u4E0B\u4F7F\u7528\u82AF\u72470\u626B\u63CF\u3002</p>\n      <p><b>SSE\uFF1A</b>server-sent events\uFF0C\u7B80\u79F0\uFF1Asee\u3002\u662F\u4E00\u79CDhttp\u7684\u957F\u94FE\u63A5\uFF0C\u8BF7\u6C42\u9700\u8981\u624B\u52A8\u5173\u95ED\uFF0C\u5426\u5219\u7406\u8BBA\u4E0A\u5728\u4E0D\u62A5\u9519\u7684\u60C5\u51B5\u4E0B\u4F1A\u4E00\u76F4\u8FDB\u884C\uFF0C\u6BCF\u6761\u6570\u636E\u4F1A\u4EE5\u201Cdata: \u201D \u5F00\u5934\u3002\u5728\u8C03\u8BD5\u4E2D\u53EF\u4EE5\u76F4\u63A5\u5C06sse\u7684url\u8F93\u5165\u5728\u6D4F\u89C8\u5668\u4E2D\u8FDB\u884C\u8C03\u7528\u3002\u4F46\u662F\u5728\u7F16\u7A0B\u4E2D\u4F7F\u7528\u4E00\u822C\u7684http\u8BF7\u6C42\u65E0\u6CD5\u8BF7\u6C42\u5230\u6570\u636E(\u4E00\u822C\u7684http\u8BF7\u6C42\u90FD\u662F\u5728\u8BF7\u6C42\u7ED3\u675F\u540E\u8FD4\u56DE\u6240\u6709\u7684\u6570\u636E)\uFF0C\u6211\u4EEC\u76EE\u524D\u63D0\u4F9B\u4E86iOS/java/nodejs/js/c#\u7B49\u7684demo\u6765\u5B9E\u73B0sse\u7684\u8C03\u7528\uFF0C\u5982\u679C\u5728\u8FD9\u65B9\u9762\u9047\u5230\u56F0\u96BE\u53EF\u4EE5\u53C2\u8003\u3002\u53E6\u5916\uFF0C\u5F53\u8C03\u7528sse\u65F6\uFF0C\u6700\u597D\u5BF9\u8BE5\u957F\u94FE\u63A5\u8FDB\u884C\u76D1\u63A7\uFF0C\u4EE5\u4FBF\u5728\u957F\u94FE\u63A5\u51FA\u73B0\u9519\u8BEF\u6216\u610F\u5916\u505C\u6B62\u540E\u8FDB\u884C\u91CD\u542F\uFF0C\u6216\u8005\u5176\u4ED6\u64CD\u4F5C\u3002</p>\n    \n    </div>\n  </div>\n  \n  <div class="layui-form-item">\n    <div class="layui-input-block">\n      <button class="layui-btn" lay-submit lay-filter="scan">do</button>\n    </div>\n  </div>\n</form>';
	  return temp;
	}
	
	function scanTip(layer, form, $dom) {
	  form.verify({
	    zeroOrOne: function zeroOrOne(value) {
	      if (!(value === '0' || value === '1' || value === '')) {
	        return '必须是0或者1';
	      }
	    }
	  });
	
	  function dos(layer, form) {
	
	    form.on('submit(scan)', function (data) {
	      _globalData2.default.saved.chip = data.field.chip;
	      $('#scanSwitch').prop('checked', true);
	      _scan2.default.start({
	        chip: _globalData2.default.saved.chip || 0
	      }, _globalData2.default.timeOut);
	
	      form.render('checkbox');
	      layer.closeAll('tips');
	      return false;
	    });
	  }
	  (0, _tips2.default)(layer, htmlString, $dom, dos, form);
	}
	
	exports.default = scanTip;

/***/ },
/* 109 */
/*!************************!*\
  !*** ./src/js/scan.js ***!
  \************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _api = __webpack_require__(/*! ./api */ 10);
	
	var _showlog = __webpack_require__(/*! ./showlog */ 55);
	
	var _globalData = __webpack_require__(/*! ./globalData */ 48);
	
	var _globalData2 = _interopRequireDefault(_globalData);
	
	var _showmethod = __webpack_require__(/*! ./showmethod */ 47);
	
	var _urlconfig = __webpack_require__(/*! ./urlconfig */ 54);
	
	var _urlconfig2 = _interopRequireDefault(_urlconfig);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var scan = {
	    start: scanHandle,
	    stop: stop
	},
	    itemHandle = {},
	    $log = $('#scanLog ul');
	itemHandle.add = function (data) {
	    var _data = {
	        mac: data.mesg.bdaddrs[0].bdaddr,
	        name: data.mesg.name,
	        type: data.mesg.bdaddrs[0].bdaddrType,
	        rssi: data.mesg.rssi
	    };
	
	    if (data.allItem[_data.mac]) {
	        if (_data.name !== "(unknown)") data.allItem[_data.mac].name.innerHTML = _data.name;
	
	        if (data.allItem[_data.mac].lastUpdate !== data.allItem[_data.mac].flag) {
	            if (data.allItem[_data.mac].rssi.innerHTML !== _data.rssi) {
	                data.allItem[_data.mac].rssi.innerHTML = _data.rssi;
	                data.allItem[_data.mac].lastUpdate = data.allItem[_data.mac].flag;
	            }
	        }
	
	        data.allItem[_data.mac].rssi.style.color = '#5FB878';
	    } else {
	        data.allItem[_data.mac] = createItem(_data);
	        data.parentNode.appendChild(data.allItem[_data.mac].li);
	        data.allItem[_data.mac].rssi.style.color = 'red';
	    }
	    data.allItem[_data.mac].mesg = data.mesg;
	    data.allItem[_data.mac].flag = data.flag;
	    data.allItem[_data.mac].lastUpdate = data.flag;
	
	    function createItem(data) {
	
	        var li = document.createElement('li'),
	            result = {
	            li: li
	        },
	            temp = void 0,
	            divLayuiFormItem = void 0,
	            count = 0;
	        for (var i in data) {
	            temp = _createItem(i, data[i]);
	            if (count % 2 === 0) {
	                divLayuiFormItem = document.createElement('div');
	                divLayuiFormItem.className = "layui-form-item";
	            }
	
	            divLayuiFormItem.appendChild(temp.divLayuiInline);
	            li.appendChild(divLayuiFormItem);
	            result[i] = temp.spanLayuiInput;
	            count++;
	        }
	
	        divLayuiFormItem = document.createElement('div');
	        divLayuiFormItem.className = "layui-form-item";
	        divLayuiFormItem.innerHTML = '<div class="layui-input-inline">\n\t\t\t\t\t\t\t\t<button class="layui-btn" data-type=' + data.type + ' data-mac=' + data.mac + '>connect</button>\n\t\t\t\t\t\t\t</div>';
	        li.appendChild(divLayuiFormItem);
	
	        count = null;
	        temp = null;
	        divLayuiFormItem = null;
	
	        return result;
	
	        function _createItem(name, value) {
	
	            var divLayuiInline = document.createElement('div'),
	                labelLyauiFomrLabel = document.createElement('label'),
	                divlayuiInputInline = document.createElement('div'),
	                spanLayuiInput = document.createElement('span');
	
	            divLayuiInline.className = "layui-inline";
	            labelLyauiFomrLabel.className = "layui-form-label";
	            divlayuiInputInline.className = "layui-input-inline";
	            spanLayuiInput.className = "layui-input";
	
	            labelLyauiFomrLabel.innerHTML = name + ':';
	            spanLayuiInput.innerHTML = value;
	
	            divlayuiInputInline.appendChild(spanLayuiInput);
	            divLayuiInline.appendChild(labelLyauiFomrLabel);
	            divLayuiInline.appendChild(divlayuiInputInline);
	
	            return {
	                divLayuiInline: divLayuiInline,
	                labelLyauiFomrLabel: labelLyauiFomrLabel,
	                spanLayuiInput: spanLayuiInput
	            };
	        }
	    }
	};
	itemHandle.destroy = function (data) {
	    data.el.removeChild(data.allItem[data.mac].li);
	    delete data.allItem[data.mac];
	};
	
	function scanHandle(data, timeout) {
	    if (_globalData2.default.neverSave.scanSSE.es !== '') return;
	    _globalData2.default.neverSave.scanSSE.status = 'toOpen';
	    var _allItem = {},
	        parentNode = document.querySelector('.l2 ul.bb1'),
	        url = _urlconfig2.default.scan;
	    parentNode.innerHTML = '';
	    _globalData2.default.neverSave.scanSSE.timer = null;
	    _globalData2.default.neverSave.scanSSE.es = null;
	    _api.api.start(url, data, _globalData2.default.neverSave.scanSSE, cb.bind(null, timeout));
	    (0, _showmethod.showMethod)('scan');
	
	    _globalData2.default.neverSave.scanSSE.timer = setInterval(function () {
	        checkDeviceTimeout(_allItem);
	    }, 1000);
	
	    function checkDeviceTimeout(obj) {
	        if (_globalData2.default.neverSave.scanSSE.status === 'toClosed') {
	            return;
	        }
	
	        for (var index in obj) {
	            if (obj[index].flag > 0) {
	                obj[index].flag--;
	            } else {
	                itemHandle.destroy({
	                    el: parentNode,
	                    mac: index,
	                    allItem: _allItem
	                });
	            }
	        }
	    }
	
	    function cb(timeout, item) {
	        itemHandle.add({
	            parentNode: parentNode,
	            mesg: JSON.parse(item),
	            allItem: _allItem,
	            flag: timeout
	
	        });
	    }
	}
	
	function stop() {
	    _globalData2.default.neverSave.scanSSE.status = 'toClosed';
	    _globalData2.default.neverSave.scanSSE.es && _globalData2.default.neverSave.scanSSE.es.close();
	    clearInterval(_globalData2.default.neverSave.scanSSE.timer);
	    _globalData2.default.neverSave.scanSSE.es = '';
	}
	
	exports.default = scan;

/***/ },
/* 110 */
/*!**********************************!*\
  !*** ./src/js/connectListTip.js ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _tips = __webpack_require__(/*! ./tips */ 107);
	
	var _tips2 = _interopRequireDefault(_tips);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function htmlString() {
		var temp = '<form class="layui-form  connect-tip tip" action="#">\n  <div class="layui-form-item">\n    <label class="layui-form-label">Get connected devices as list\uFF1AGET</label>\n  </div>\n  <fieldset class="layui-elem-field layui-field-title">\n    <legend i18n=\'arguments\'>\u63CF\u8FF0</legend>\n  </fieldset>\n  <div class="layui-form-item layui-form-text">\n    <div class="descriptors connect-des">\n      <p><b>\u63A5\u53E3URL\uFF1A</b>\u8C03\u7528\u63A5\u53E3\u540E\uFF0C\u6B64URL\u4F1A\u81EA\u52A8\u751F\u6210\u5728\u4E0B\u9762\u7684\u201DAPI\u63A5\u53E3\u201D\u7684\u7A97\u53E3\u4E2D\u3002</p>\n      <p><b>\u63A5\u53E3\u63CF\u8FF0\uFF1A</b>\u6B64\u63A5\u53E3\u662FGET\u8BF7\u6C42\uFF0C\u8C03\u7528\u63A5\u53E3\u540E\uFF0C\u84DD\u7259\u8DEF\u7531\u5668\u4F1A\u5C06\u76EE\u524D\u8FDE\u63A5\u7684\u8BBE\u5907\u7684\u5217\u8868\u8FD4\u56DE\u5230pc\u7AEF\u3002</p>\n    </div>\n  </div>\n  <div class="layui-form-item">\n    <div class="layui-input-block">\n      <button class="layui-btn" lay-submit lay-filter="connectList">do</button>\n    </div>\n  </div>\n</form>';
		return temp;
	}
	
	function connectListTip(layer, form, $dom) {
		form.verify({
			deviceMac: [/^([0-9a-f]{2}:){5}[0-9a-f]{2}$/gi, '请输入正确的mac地址'],
			zeroOne: [/^[01]$/, '请输入chip,0或者1']
		});
	
		function dos(layer, form, $dom) {
			$('form.connect-tip button[lay-filter="connectList"]')[0].fn = $dom.fn;
			form.on('submit(connectList)', function (data) {
				data.elem.fn && data.elem.fn();
				layer.closeAll('tips');
				return false;
			});
		}
	
		(0, _tips2.default)(layer, htmlString, $dom, dos, form);
		form.render();
	}
	
	exports.default = connectListTip;

/***/ },
/* 111 */
/*!*************************************!*\
  !*** ./src/js/getAllServicesTip.js ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
			value: true
	});
	
	var _globalData = __webpack_require__(/*! ./globalData */ 48);
	
	var _globalData2 = _interopRequireDefault(_globalData);
	
	var _tips = __webpack_require__(/*! ./tips */ 107);
	
	var _tips2 = _interopRequireDefault(_tips);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function getAllServicesTip(layer, form, $dom) {
	
			function htmlString() {
					var temp = '<form class="layui-form  getAllServices-tip tip" action="#">\n  <div class="layui-form-item">\n    <label class="layui-form-label">Get all services\uFF1AGET</label>\n  </div>\n  <fieldset class="layui-elem-field layui-field-title">\n    <legend i18n =\'arguments\'>\u53C2\u6570</legend>\n  </fieldset>\n  <div class="layui-form-item">\n    <label class="layui-form-label">deviceMac:</label>\n    <div class="layui-input-inline">\n      <input type="text" name="deviceMac"  placeholder="CC:1B:E0:E0:10:C1" value="' + (_globalData2.default.saved.deviceMac ? _globalData2.default.saved.deviceMac : '') + '" lay-verify=\'deviceMac\'  class="layui-input">\n    </div>\n    <div class="layui-form-mid layui-word-aux" i18n = \'required\'>(\u5FC5\u586B)</div>\n  </div>\n  <fieldset class="layui-elem-field layui-field-title">\n    <legend i18n = \'description\'>\u63CF\u8FF0</legend>\n  </fieldset>\n  <div class="layui-form-item layui-form-text">\n    <div class="descriptors connect-des">\n      <p><b>\u63A5\u53E3URL\uFF1A</b>\u8C03\u7528\u63A5\u53E3\u540E\uFF0C\u6B64URL\u4F1A\u81EA\u52A8\u751F\u6210\u5728\u4E0B\u9762\u7684\u201DAPI\u63A5\u53E3\u201D\u7684\u7A97\u53E3\u4E2D\u3002</p>\n      <p><b>\u63A5\u53E3\u63CF\u8FF0\uFF1A</b>\u6B64\u63A5\u53E3\u662FGET\u8BF7\u6C42\uFF0C\u8C03\u7528\u63A5\u53E3\u540E\uFF0C\u84DD\u7259\u8DEF\u7531\u5668\u4F1A\u5411\u6307\u5B9A\u7684\u84DD\u7259\u8BBE\u5907\u8BF7\u6C42\u5176\u670D\u52A1\u7684\u6811\u5F62\u5217\u8868\uFF0C\u8C03\u7528\u6B21\u63A5\u53E3\u7684\u4E3B\u8981\u76EE\u7684\u662F\u4E3A\u5BF9\u84DD\u7259\u8BBE\u5907\u8FDB\u884C\u8BFB\u5199\u64CD\u4F5C\u65F6\uFF0C\u83B7\u53D6\u84DD\u7259\u8BBE\u5907\u7684characteristic\u6240\u5BF9\u5E94\u7684valueHandle\u6216\u8005handle\u3002</p>\n      <p><b>\u53C2\u6570\u89E3\u91CA\uFF1AdeviceMac\uFF1A</b>\u8981\u8BF7\u6C42\u670D\u52A1\u5217\u8868\u7684\u8BBE\u5907\u7684MAC\u5730\u5740\u3002</p>\n    </div>\n  </div>\n  <div class="layui-form-item">\n    <div class="layui-input-block">\n      <button class="layui-btn" lay-submit lay-filter="bdiscoverSer">do</button>\n    </div>\n  </div>\n</form>';
					return temp;
			}
	
			form.verify({
					deviceMac: [/^([0-9a-f]{2}:){5}[0-9a-f]{2}$/gi, '请输入正确的mac地址'],
					zeroOne: [/^[01]$/, '请输入chip,0或者1']
			});
	
			function dos(layer, form, $dom) {
					$('form.getAllServices-tip button[lay-filter="bdiscoverSer"]')[0].fn = $dom.fn;
					form.on('submit(bdiscoverSer)', function (data) {
							_globalData2.default.saved.deviceMac = $('.getAllServices-tip input').val().trim();
							data.elem.fn && data.elem.fn(_globalData2.default.saved.deviceMac);
							layer.closeAll('tips');
							return false;
					});
			}
	
	
			(0, _tips2.default)(layer, htmlString, $dom, dos, form);
			form.render();
	}
	
	exports.default = getAllServicesTip;

/***/ },
/* 112 */
/*!********************************!*\
  !*** ./src/js/notifyMsgTip.js ***!
  \********************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
			value: true
	});
	
	var _globalData = __webpack_require__(/*! ./globalData */ 48);
	
	var _globalData2 = _interopRequireDefault(_globalData);
	
	var _tips = __webpack_require__(/*! ./tips */ 107);
	
	var _tips2 = _interopRequireDefault(_tips);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function htmlString() {
			console.log(_globalData2.default.neverSave.notifySSE.status);
			var temp = '<form class="layui-form  notifyMsg-tip tip" action="#">\n  <div class="layui-form-item">\n    <label class="layui-form-label">Receive indication &amp; notification\uFF1AGET/SSE</label>\n  </div>\n  <fieldset class="layui-elem-field layui-field-title">\n    <legend i18n =\'hubNotifyStatus\'>Hub\u901A\u77E5\u72B6\u6001</legend>\n  </fieldset>\n  <div class="layui-form-item">\n    <div class="layui-inline">\n\t\t<label class="layui-form-label" style="width:auto" i18n=\'openHubNotify\'>\u6253\u5F00Hub\u901A\u77E5</label>\n\t\t<input type="checkbox" lay-skin="switch" lay-filter="switchNotifyMsg1" title="\u6253\u5F00\u901A\u77E5" ' + (_globalData2.default.neverSave.notifySSE.status.indexOf('pen') !== -1 ? 'checked' : '') + '>\n\t</div>\n  </div>\n  <fieldset class="layui-elem-field layui-field-title">\n    <legend i18n=\'description\'>\u63CF\u8FF0</legend>\n  </fieldset>\n  <div class="layui-form-item layui-form-text">\n    <div class="descriptors connect-des">\n      <p><b>\u63A5\u53E3URL\uFF1A</b>\u8C03\u7528\u63A5\u53E3\u540E\uFF0C\u6B64URL\u4F1A\u81EA\u52A8\u751F\u6210\u5728\u4E0B\u9762\u7684\u201DAPI\u63A5\u53E3\u201D\u7684\u7A97\u53E3\u4E2D\u3002</p>\n      <p><b>\u63A5\u53E3\u63CF\u8FF0\uFF1A</b>\u6B64\u63A5\u53E3\u662Fsse\u957F\u94FE\u63A5\uFF0C\u5F53\u6253\u5F00\u84DD\u7259\u8BBE\u5907\u7684notification/indication\u540E\uFF0C\u84DD\u7259\u8BBE\u5907\u4F1A\u5C06\u6D88\u606F\u4E0A\u62A5\u5230\u84DD\u7259\u8DEF\u7531\u5668\uFF0C\u4F46\u662F\u5982\u679C\u5728pc\u4E0A\u5E0C\u671B\u63A5\u6536\u5230\u6B64\u6D88\u606F\uFF0C\u8FD8\u9700\u8981\u8C03\u7528\u6B64\u63A5\u53E3\u6765\u5EFA\u7ACB\u84DD\u7259\u8DEF\u7531\u5668\u5230pc\u7AEF\u7684\u6570\u636E\u901A\u8DEF\uFF0C\u8FD9\u6837\u84DD\u7259\u8DEF\u7531\u5668\u624D\u4F1A\u5C06\u6536\u5230\u7684\u84DD\u7259\u8BBE\u5907\u7684\u6570\u636E\u8F6C\u53D1\u5230pc\u7AEF\u3002</p>\n      <p><b>SSE\uFF1A</b>server-sent events\uFF0C\u7B80\u79F0\uFF1Asee\u3002\u662F\u4E00\u79CDhttp\u7684\u957F\u94FE\u63A5\uFF0C\u8BF7\u6C42\u9700\u8981\u624B\u52A8\u5173\u95ED\uFF0C\u5426\u5219\u7406\u8BBA\u4E0A\u5728\u4E0D\u62A5\u9519\u7684\u60C5\u51B5\u4E0B\u4F1A\u4E00\u76F4\u8FDB\u884C\uFF0C\u6BCF\u6761\u6570\u636E\u4F1A\u4EE5\u201Cdata: \u201D \u5F00\u5934\u3002\u5728\u8C03\u8BD5\u4E2D\u53EF\u4EE5\u76F4\u63A5\u5C06sse\u7684url\u8F93\u5165\u5728\u6D4F\u89C8\u5668\u4E2D\u8FDB\u884C\u8C03\u7528\u3002\u4F46\u662F\u5728\u7F16\u7A0B\u4E2D\u4F7F\u7528\u4E00\u822C\u7684http\u8BF7\u6C42\u65E0\u6CD5\u8BF7\u6C42\u5230\u6570\u636E(\u4E00\u822C\u7684http\u8BF7\u6C42\u90FD\u662F\u5728\u8BF7\u6C42\u7ED3\u675F\u540E\u8FD4\u56DE\u6240\u6709\u7684\u6570\u636E)\uFF0C\u6211\u4EEC\u76EE\u524D\u63D0\u4F9B\u4E86iOS/java/nodejs/js/c#\u7B49\u7684demo\u6765\u5B9E\u73B0sse\u7684\u8C03\u7528\uFF0C\u5982\u679C\u5728\u8FD9\u65B9\u9762\u9047\u5230\u56F0\u96BE\u53EF\u4EE5\u53C2\u8003\u3002\u53E6\u5916\uFF0C\u5F53\u8C03\u7528sse\u65F6\uFF0C\u6700\u597D\u5BF9\u8BE5\u957F\u94FE\u63A5\u8FDB\u884C\u76D1\u63A7\uFF0C\u4EE5\u4FBF\u5728\u957F\u94FE\u63A5\u51FA\u73B0\u9519\u8BEF\u6216\u610F\u5916\u505C\u6B62\u540E\u8FDB\u884C\u91CD\u542F\uFF0C\u6216\u8005\u5176\u4ED6\u64CD\u4F5C\u3002</p>\n    </div>\n  </div>\n  <div class="layui-form-item">\n    <div class="layui-input-block">\n      <button class="layui-btn" lay-submit lay-filter="bnotify">do</button>\n    </div>\n  </div>\n</form>';
			return temp;
	}
	
	function notifyMsgTip(layer, form, $dom) {
			function dos(layer, form, $dom) {
					$('form.notifyMsg-tip button[lay-filter="bnotify"]')[0].start = $dom.start;
					$('form.notifyMsg-tip button[lay-filter="bnotify"]')[0].stop = $dom.stop;
					form.on('submit(bnotify)', function (data) {
							if ($('form.notifyMsg-tip input[type="checkbox"]').prop('checked')) {
	
									if (_globalData2.default.neverSave.notifySSE.es === '' && _globalData2.default.neverSave.notifySSE.status !== 'toOpen') {
											_globalData2.default.neverSave.notifySSE.status = 'toOpen';
											$('.l4 input[type="checkbox"]').prop('checked', true);
											form.render('checkbox');
											data.elem.start && data.elem.start();
											layer.closeAll('tips');
									}
							} else {
									$('.l4 input[type="checkbox"]').prop('checked', false);
									form.render('checkbox');
									data.elem.stop && data.elem.stop();
							}
							layer.closeAll('tips');
							return false;
					});
			}
	
			(0, _tips2.default)(layer, htmlString, $dom, dos, form);
			form.render();
	}
	
	exports.default = notifyMsgTip;

/***/ },
/* 113 */
/*!**********************************!*\
  !*** ./src/js/notifyStateTip.js ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
			value: true
	});
	
	var _globalData = __webpack_require__(/*! ./globalData */ 48);
	
	var _globalData2 = _interopRequireDefault(_globalData);
	
	var _notifyMsgAndFill = __webpack_require__(/*! ./notifyMsgAndFill */ 104);
	
	var _notifyMsgAndFill2 = _interopRequireDefault(_notifyMsgAndFill);
	
	var _tips = __webpack_require__(/*! ./tips */ 107);
	
	var _tips2 = _interopRequireDefault(_tips);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function htmlString() {
			console.log(_globalData2.default.neverSave.stateSSE.status);
			var temp = '<form class="layui-form  notifyState-tip tip" action="#">\n  <div class="layui-form-item">\n    <label class="layui-form-label">Receive indication &amp; notification\uFF1AGET/SSE</label>\n  </div>\n  <fieldset class="layui-elem-field layui-field-title">\n    <legend i18n=\'hubNotifyStatus\'>Hub\u901A\u77E5\u72B6\u6001</legend>\n  </fieldset>\n  <div class="layui-form-item">\n    <div class="layui-inline">\n\t\t<label class="layui-form-label" style="width:auto" i18n=\'openHubNotify\'>\u6253\u5F00Hub\u901A\u77E5</label>\n\t\t<input type="checkbox" lay-skin="switch" lay-filter="" title="\u6253\u5F00\u901A\u77E5" ' + (_globalData2.default.neverSave.stateSSE.status.indexOf('pen') !== -1 ? 'checked' : '') + '>\n\t</div>\n  </div>\n  <fieldset class="layui-elem-field layui-field-title">\n    <legend i18n=\'description\'>\u63CF\u8FF0</legend>\n  </fieldset>\n  <div class="layui-form-item layui-form-text">\n    <div class="descriptors connect-des">\n      <p><b>\u63A5\u53E3URL\uFF1A</b>\u8C03\u7528\u63A5\u53E3\u540E\uFF0C\u6B64URL\u4F1A\u81EA\u52A8\u751F\u6210\u5728\u4E0B\u9762\u7684\u201DAPI\u63A5\u53E3\u201D\u7684\u7A97\u53E3\u4E2D\u3002</p>\n      <p><b>\u63A5\u53E3\u63CF\u8FF0\uFF1A</b>\u6B64\u63A5\u53E3\u662Fsse\u957F\u94FE\u63A5\uFF0C\u5F53\u84DD\u7259\u8DEF\u7531\u5668\u4E0A\u7684\u84DD\u7259\u8BBE\u5907\u7684\u8FDE\u63A5\u72B6\u6001\u53D1\u751F\u6539\u53D8\u65F6\uFF08\u8FDE\u63A5\u6210\u529F\u6216\u8005\u53D1\u751F\u65AD\u8FDE\uFF09\uFF0C\u4F1A\u901A\u8FC7\u6B64\u63A5\u53E3\u5C06\u6D88\u606F\u901A\u77E5\u5230pc\u7AEF\u3002</p>\n      <p><b>SSE\uFF1A</b>server-sent events\uFF0C\u7B80\u79F0\uFF1Asee\u3002\u662F\u4E00\u79CDhttp\u7684\u957F\u94FE\u63A5\uFF0C\u8BF7\u6C42\u9700\u8981\u624B\u52A8\u5173\u95ED\uFF0C\u5426\u5219\u7406\u8BBA\u4E0A\u5728\u4E0D\u62A5\u9519\u7684\u60C5\u51B5\u4E0B\u4F1A\u4E00\u76F4\u8FDB\u884C\uFF0C\u6BCF\u6761\u6570\u636E\u4F1A\u4EE5\u201Cdata: \u201D \u5F00\u5934\u3002\u5728\u8C03\u8BD5\u4E2D\u53EF\u4EE5\u76F4\u63A5\u5C06sse\u7684url\u8F93\u5165\u5728\u6D4F\u89C8\u5668\u4E2D\u8FDB\u884C\u8C03\u7528\u3002\u4F46\u662F\u5728\u7F16\u7A0B\u4E2D\u4F7F\u7528\u4E00\u822C\u7684http\u8BF7\u6C42\u65E0\u6CD5\u8BF7\u6C42\u5230\u6570\u636E(\u4E00\u822C\u7684http\u8BF7\u6C42\u90FD\u662F\u5728\u8BF7\u6C42\u7ED3\u675F\u540E\u8FD4\u56DE\u6240\u6709\u7684\u6570\u636E)\uFF0C\u6211\u4EEC\u76EE\u524D\u63D0\u4F9B\u4E86iOS/java/nodejs/js/c#\u7B49\u7684demo\u6765\u5B9E\u73B0sse\u7684\u8C03\u7528\uFF0C\u5982\u679C\u5728\u8FD9\u65B9\u9762\u9047\u5230\u56F0\u96BE\u53EF\u4EE5\u53C2\u8003\u3002\u53E6\u5916\uFF0C\u5F53\u8C03\u7528sse\u65F6\uFF0C\u6700\u597D\u5BF9\u8BE5\u957F\u94FE\u63A5\u8FDB\u884C\u76D1\u63A7\uFF0C\u4EE5\u4FBF\u5728\u957F\u94FE\u63A5\u51FA\u73B0\u9519\u8BEF\u6216\u610F\u5916\u505C\u6B62\u540E\u8FDB\u884C\u91CD\u542F\uFF0C\u6216\u8005\u5176\u4ED6\u64CD\u4F5C\u3002</p>\n    </div>\n  </div>\n  <div class="layui-form-item">\n    <div class="layui-input-block">\n      <button class="layui-btn" lay-submit lay-filter="bnotifyState">do</button>\n    </div>\n  </div>\n</form>';
			return temp;
	}
	
	function notifyStateTip(layer, form, $dom) {
			function dos(layer, form, $dom) {
					$('form.notifyState-tip button[lay-filter="bnotifyState"]')[0].start = $dom.start;
					$('form.notifyState-tip button[lay-filter="bnotifyState"]')[0].stop = $dom.stop;
					form.on('submit(bnotifyState)', function (data) {
							if ($('form.notifyState-tip input[type="checkbox"]').prop('checked')) {
	
									if (_globalData2.default.neverSave.stateSSE.es === '' && _globalData2.default.neverSave.stateSSE.status !== 'toOpen') {
											_globalData2.default.neverSave.stateSSE.status = 'toOpen';
											$('.l3 .layui-form>.layui-form-item  input[type="checkbox"]').prop('checked', true);
											form.render('checkbox');
											data.elem.start && data.elem.start();
											layer.closeAll('tips');
									}
							} else {
									$('.l3 .layui-form>.layui-form-item  input[type="checkbox"]').prop('checked', false);
									form.render('checkbox');
									data.elem.stop && data.elem.stop();
							}
							layer.closeAll('tips');
							return false;
					});
			}
	
			(0, _tips2.default)(layer, htmlString, $dom, dos, form);
			form.render();
	}
	
	exports.default = notifyStateTip;

/***/ },
/* 114 */
/*!*********************************!*\
  !*** ./src/js/disconnectTip.js ***!
  \*********************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
			value: true
	});
	
	var _globalData = __webpack_require__(/*! ./globalData */ 48);
	
	var _globalData2 = _interopRequireDefault(_globalData);
	
	var _tips = __webpack_require__(/*! ./tips */ 107);
	
	var _tips2 = _interopRequireDefault(_tips);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function htmlString() {
			var temp = '<form class="layui-form  disconnect-tip tip" action="#">\n  <div class="layui-form-item">\n    <label class="layui-form-label">Disconnect a device\uFF1ADELETE</label>\n  </div>\n  <fieldset class="layui-elem-field layui-field-title">\n    <legend i18n =\'arguments\'>\u53C2\u6570</legend>\n  </fieldset>\n  <div class="layui-form-item">\n    <label class="layui-form-label">deviceMac:</label>\n    <div class="layui-input-inline">\n      <input type="text" name="deviceMac"  placeholder="CC:1B:E0:E0:10:C1" value="' + (_globalData2.default.saved.deviceMac ? _globalData2.default.saved.deviceMac : '') + '" lay-verify=\'deviceMac\'  class="layui-input">\n    </div>\n    <div class="layui-form-mid layui-word-aux" i18n = \'required\'>(\u5FC5\u586B)</div>\n  </div>\n  <fieldset class="layui-elem-field layui-field-title">\n    <legend i18n =\'description\'>\u63CF\u8FF0</legend>\n  </fieldset>\n  <div class="layui-form-item layui-form-text">\n    <div class="descriptors connect-des">\n      <p><b>\u63A5\u53E3URL\uFF1A</b>\u8C03\u7528\u63A5\u53E3\u540E\uFF0C\u6B64URL\u4F1A\u81EA\u52A8\u751F\u6210\u5728\u4E0B\u9762\u7684\u201DAPI\u63A5\u53E3\u201D\u7684\u7A97\u53E3\u4E2D\u3002</p>\n      <p><b>\u63A5\u53E3\u63CF\u8FF0\uFF1A</b>\u6B64\u63A5\u53E3\u662FDELETE\u8BF7\u6C42\uFF0C\u8C03\u7528\u63A5\u53E3\u540E\uFF0C\u84DD\u7259\u8DEF\u7531\u5668\u4F1A\u4E0E\u6307\u5B9AMAC\u5730\u5740\u7684\u84DD\u7259\u8BBE\u5907\u65AD\u8FDE\u3002</p>\n      <p><b>\u53C2\u6570\u89E3\u91CA\uFF1AdeviceMac\uFF1A</b>\u8981\u65AD\u8FDE\u7684\u8BBE\u5907\u7684MAC\u5730\u5740\u3002</p>\n    </div>\n  </div>\n  <div class="layui-form-item">\n    <div class="layui-input-block">\n      <button class="layui-btn" lay-submit lay-filter="bdisconnect">do</button>\n    </div>\n  </div>\n</form>';
			return temp;
	}
	
	function getAllServicesTip(layer, form, $dom) {
			form.verify({
					deviceMac: [/^([0-9a-f]{2}:){5}[0-9a-f]{2}$/gi, '请输入正确的mac地址']
			});
	
			function dos(layer, form, $dom) {
					$('form.disconnect-tip button[lay-filter="bdisconnect"]')[0].fn = $dom.fn;
					form.on('submit(bdisconnect)', function (data) {
							var deviceMac = _globalData2.default.saved.deviceMac = $('.disconnect-tip input').val().trim();
							data.elem.fn && data.elem.fn(deviceMac);
							layer.closeAll('tips');
							return false;
					});
			}
	
			(0, _tips2.default)(layer, htmlString, $dom, dos, form);
			form.render();
	}
	
	exports.default = getAllServicesTip;

/***/ },
/* 115 */
/*!************************************!*\
  !*** ./src/js/writeByHandleTip.js ***!
  \************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _globalData = __webpack_require__(/*! ./globalData */ 48);
	
	var _globalData2 = _interopRequireDefault(_globalData);
	
	var _writeByHandleDeferAndFill = __webpack_require__(/*! ./writeByHandleDeferAndFill */ 116);
	
	var _writeByHandleDeferAndFill2 = _interopRequireDefault(_writeByHandleDeferAndFill);
	
	var _tips = __webpack_require__(/*! ./tips */ 107);
	
	var _tips2 = _interopRequireDefault(_tips);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function htmlString() {
	  var temp = '<form class="layui-form  write-tip tip" action="#">\n  <div class="layui-form-item">\n    <label class="layui-form-label">Write by handle\uFF1AGET</label>\n  </div>\n  <fieldset class="layui-elem-field layui-field-title">\n    <legend i18n=\'arguments\'>\u53C2\u6570</legend>\n  </fieldset>\n  <div class="layui-form-item">\n    <label class="layui-form-label" >deviceMac:</label>\n    <div class="layui-input-inline">\n      <input type="text" name="deviceMac"  placeholder="CC:1B:E0:E0:10:C1" value="' + (_globalData2.default.saved.deviceMac ? _globalData2.default.saved.deviceMac : '') + '" lay-verify=\'deviceMac\'  class="layui-input">\n    </div>\n    <div class="layui-form-mid layui-word-aux" i18n=\'required\'>(\u5FC5\u586B)</div>\n  </div>\n   <div class="layui-form-item">\n    <label class="layui-form-label" style="width:auto">handle & value</label>\n    <div class="layui-form-mid layui-word-aux" i18n=\'required\'>(\u5FC5\u586B)</div>\n    <div class="">\n    <textarea placeholder="25:55AA101E\n27:55AA00FF"  class="layui-textarea" lay-verify="valueHandleArr">' + (_globalData2.default.saved.commond ? _globalData2.default.saved.commond : '') + '</textarea>\n    </div>\n  </div>\n\n<fieldset class="layui-elem-field layui-field-title">\n  <legend i18n=\'description\'>\u63CF\u8FF0</legend>\n</fieldset>\n<div class="layui-form-item layui-form-text">\n  <div class="descriptors connect-des">\n    <p><b>\u63A5\u53E3URL\uFF1A</b>\u8C03\u7528\u63A5\u53E3\u540E\uFF0C\u6B64URL\u4F1A\u81EA\u52A8\u751F\u6210\u5728\u4E0B\u9762\u7684\u201DAPI\u63A5\u53E3\u201D\u7684\u7A97\u53E3\u4E2D\u3002</p>\n    <p><b>\u63A5\u53E3\u63CF\u8FF0\uFF1A</b>\u672C\u63A5\u53E3\u662F\u8D1F\u8D23\u4E0E\u8BBE\u5907\u901A\u8BAF\u7684\u4E3B\u8981\u63A5\u53E3\uFF0C\u5177\u4F53\u8D1F\u8D23\u5411\u84DD\u7259\u8BBE\u5907\u5199\u5165\u6307\u4EE4\u4EE5\u53CA\u6253\u5F00\u84DD\u7259\u8BBE\u5907\u7684notification/indication\uFF0C\u4E0B\u9762\u4F1A\u5177\u4F53\u8BB2\u89E3\u4E24\u4E2A\u529F\u80FD\u5206\u522B\u5982\u4F55\u5B9E\u73B0\u3002</p>\n    <p><b>1\u3001\u5BF9\u84DD\u7259\u8BBE\u5907\u5199\u5165\u6307\u4EE4\uFF1A</b>\u5F53\u9700\u8981\u5F80\u84DD\u7259\u8BBE\u5907\u6307\u5B9A\u7684characteristic\u5199\u5165\u6307\u4EE4\u65F6\uFF0C\u5148\u8C03\u7528\u201C\u53D1\u73B0\u670D\u52A1\u201D\u7684\u63A5\u53E3\uFF0C\u5F53\u8FD4\u56DE\u84DD\u7259\u8BBE\u5907\u670D\u52A1\u4FE1\u606F\u7684\u6811\u5F62\u5217\u8868\u540E\uFF0C\u5BFB\u627E\u6307\u5B9A\u7684characteristic\u6240\u5BF9\u5E94\u7684valueHandle\uFF08characteristic\u5185\u5305\u542Bhandle\u3001valueHandle\u3001properties\u3001descriptors\u7B49\u5C5E\u6027\uFF09\uFF0C\u7136\u540E\u8C03\u7528\u6B64\u63A5\u53E3\u65F6\uFF0Chandle\u5BF9\u5E94\u7684\u503C\u662Fcharacteristic\u7684valueHandle\uFF0Cvalue\u5BF9\u5E94\u7684\u503C\u662F\u9700\u8981\u5199\u5165\u7684\u6307\u4EE4\u5185\u5BB9\uFF08\u5C06\u6307\u4EE4\u7684\u6BCF\u4E2Abyte\u987A\u5E8F\u62FC\u5728\u4E00\u8D77\u5199\u6210\u4E00\u4E2A\u5B57\u7B26\u4E32\uFF09\u3002</p>\n    <p><b>2\u3001\u6253\u5F00\u84DD\u7259\u8BBE\u5907\u7684notification/indication\uFF1A</b>\u5F53\u9700\u8981\u63A5\u6536\u84DD\u7259\u8BBE\u5907\u53D1\u6765\u7684\u6570\u636E\u65F6\uFF0C\u9700\u8981\u5148\u6253\u5F00\u84DD\u7259\u8BBE\u5907\u7684notification\u6216\u8005indication\uFF08\u6253\u5F00\u7684\u8FC7\u7A0B\u5728\u672C\u8D28\u4E0A\u4E5F\u662F\u5BF9\u84DD\u7259\u8BBE\u5907\u4E0B\u53D1\u7684\u4E00\u4E2A\u6307\u4EE4\uFF09\uFF0C\u5F53\u9700\u8981\u6253\u5F00\u6307\u5B9Acharacteristic\u7684notification\u6216\u8005indication\u65F6\uFF0C\u4E5F\u662F\u5148\u8C03\u7528\u201C\u53D1\u73B0\u670D\u52A1\u201D\u7684\u65B9\u6CD5\uFF0C\u627E\u5230\u6307\u5B9A\u7684characteristic\u6240\u5BF9\u5E94\u7684descriptors\uFF0C\u6253\u5F00descriptors\uFF0C\u627E\u5230uuid\u5305\u542B\u201C00002902\u201D\u6240\u5BF9\u5E94\u7684handle\uFF0C\u7136\u540E\u8C03\u7528\u6B64\u63A5\u53E3\uFF0C\u63A5\u53E3\u4E2D\u7684handle\u5C31\u662F\u4E0A\u9762descriptor\u7684handle\uFF0C\u5982\u679C\u662F\u6253\u5F00notification\uFF0Cvalue\u5BF9\u5E94\u7684\u662F\u201C0100\u201D\uFF0C\u5982\u679C\u662F\u6253\u5F00indication\uFF0Cvalue\u5BF9\u5E94\u7684\u662F\u201C0200\u201D\uFF0C\u5982\u679C\u662F\u5173\u95EDnotification/indication\uFF0Cvalue\u5BF9\u5E94\u7684\u662F\u201C0000\u201D\u3002</p>\n    <p><b>\u53C2\u6570\u89E3\u91CA\uFF1A deviceMac\uFF1A</b>\u8981\u5199\u5165\u6307\u4EE4\u7684\u8BBE\u5907\u7684MAC\u5730\u5740\u3002</p>\n    <p><b>handle\uFF1A</b>\u901A\u8FC7\u201C\u53D1\u73B0\u670D\u52A1\u63A5\u53E3\u201D\u6240\u627E\u5230\u7684characteristic\u6240\u5BF9\u5E94\u7684valueHandle\u6216\u8005handle\u3002</p>\n    <p><b>value\uFF1A</b>\u8981\u5199\u5165\u7684\u6307\u4EE4\u7684\u503C\uFF0C\u6216\u8005\u201C0100\u201D\uFF08\u6253\u5F00notification\uFF09\u3001\u201C0200\u201D\uFF08\u6253\u5F00indication\uFF09\u3001\u201C0000\u201D\uFF08\u5173\u95EDnotification\u548Cindication\uFF09\u3002</p>\n    <p><b>handle & value\u8F93\u5165\u683C\u5F0F</b>\n    <p>\u5355\u6761\u6307\u4EE4\u683C\u5F0F handle:value1,type</p>\n    <p>handle\u4E3A\u8981\u5199\u5165\u7684handle\u598220</p>\n    <p>value1 \u4E3A\u8981\u5199\u5165\u7684\u503C\uFF08\u5341\u516D\u8FDB\u5236\uFF09</p>\n    <p>type\u4E3A\u5199\u5165\u7C7B\u578B\uFF0C0\u4EE3\u8868write without response\uFF0C1\u4EE3\u8868write with response</p>\n    <p>\u591A\u6761\u8BED\u53E5\u4E4B\u95F4\u7528\u56DE\u8F66\u952E\u6362\u884C</p>\n  </div>\n</div>\n<div class="layui-form-item">\n  <div class="layui-input-block">\n    <button class="layui-btn" lay-submit lay-filter="write">do</button>\n  </div>\n</div>\n</form>';
	  return temp;
	}
	
	function writeByHnadleTip(layer, form, $dom) {
	  form.verify({
	    valueHandleArr: function valueHandleArr(value) {
	      var temp = value.split('\n').map(function (item) {
	        return item.trim();
	      }),
	          errMsg = '';
	      temp = temp.filter(function (item) {
	        return item;
	      });
	
	      if (temp.length === 0) return '请输入正确的指令';
	      temp.forEach(function (item, index) {
	        if (item.indexOf('interval') > -1) {
	          if (!/^[\u0030-\u0039]+\:[\u0030-\u0039\u0041-\u0046]+\,interval\:[\u0030-\u0039]+\,[\u0030-\u0039]+$/gi.test(item.trim())) {
	            errMsg += '\u7B2C' + (index + 1) + '\u6761\u6307\u4EE4\u9519\u8BEF</br>';
	          }
	        } else {
	          if (!/^[\u0030-\u0039]+\:[\u0030-\u0039\u0041-\u0046]+\,[\u0030-\u0039](\,[\u0030-\u0039]+)?$/gi.test(item.trim())) {
	            errMsg += '\u7B2C' + (index + 1) + '\u6761\u6307\u4EE4\u9519\u8BEF</br>';
	          }
	        }
	      });
	      if (errMsg) {
	        return errMsg;
	      }
	    },
	    deviceMac: function deviceMac(value) {
	      if (!/^([0-9a-f]{2}:){5}[0-9a-f]{2}$/gi.test(value)) {
	        return '请输入正确的MAC地址';
	      }
	    }
	  });
	
	  function dos(layer, form) {
	    form.on('submit(write)', function (data) {
	      var textareaValue = $('form.write-tip textarea').val();
	      _globalData2.default.saved.commond = textareaValue;
	      var arr = textareaValue.split('\n').filter(function (item) {
	        return item.trim();
	      }),
	          deviceMac = $('form.write-tip input').val();
	      _globalData2.default.saved.deviceMac = deviceMac;
	      (0, _writeByHandleDeferAndFill2.default)(arr, deviceMac);
	      layer.closeAll('tips');
	      return false;
	    });
	  }
	  (0, _tips2.default)(layer, htmlString, $dom, dos, form);
	  form.render();
	}
	exports.default = writeByHnadleTip;

/***/ },
/* 116 */
/*!*********************************************!*\
  !*** ./src/js/writeByHandleDeferAndFill.js ***!
  \*********************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _stringify = __webpack_require__(/*! babel-runtime/core-js/json/stringify */ 7);
	
	var _stringify2 = _interopRequireDefault(_stringify);
	
	var _api = __webpack_require__(/*! ./api */ 10);
	
	var _urlconfig = __webpack_require__(/*! ./urlconfig */ 54);
	
	var _urlconfig2 = _interopRequireDefault(_urlconfig);
	
	var _showmethod = __webpack_require__(/*! ./showmethod */ 47);
	
	var _showlog = __webpack_require__(/*! ./showlog */ 55);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function writeByHandleDeferAndFill(arr, deviceMac) {
		var _this = this;
	
		var handle = void 0,
		    writeValue = void 0,
		    interval = void 0,
		    type = void 0,
		    defer = void 0,
		    ajaxResult = void 0,
		    url = void 0,
		    temp = void 0;
		arr.forEach(function (item, index, arr) {
			defer = null;
			interval = null;
	
			temp = item.split(',');
			handle = temp[0].split(':')[0].trim();
			writeValue = temp[0].split(':')[1].trim();
			if (temp[1].indexOf('interval') !== -1) {
				interval = parseInt(temp[1].split(':')[1], 10);
				type = temp[2];
			} else {
				type = temp[1];
				defer = temp[2];
			}
			type = type && parseInt(type.trim(), 10);
			defer = defer && parseInt(defer.trim(), 10);
			url = _urlconfig2.default.writeByHandle.replace(/\*((deviceMac)|(handle)|(writeValue))\*/g, function (match, pos, originalText) {
				switch (match) {
					case '*deviceMac*':
						return deviceMac;
					case '*handle*':
						return handle;
					case '*writeValue*':
						return writeValue;
				}
			});
	
			function fn(url, type) {
				console.log('url', url);
				console.log(new Date());
				ajaxResult = _api.api.writeByHnadle(url, type ? null : {
					option: 'cmd'
				}).done(function (e) {
					(0, _showlog.showLog)($('#writeValueLog'), {
						message: deviceMac + ':' + (0, _stringify2.default)(e),
						class: 'success'
					});
				}).fail(function (e) {
					(0, _showlog.showLog)($('#writeValueLog'), {
						message: deviceMac + ':' + (0, _stringify2.default)(e, null, 2),
						class: 'fail'
					});
				}).always(function () {
					(0, _showmethod.showMethod)('writeByHandle');
				});
			}
	
			if (interval) {
				(function () {
					setInterval(fn.bind(this, url, type), interval);
				})();
			} else if (defer) {
				(function () {
					setTimeout(fn.bind(this, url, type), defer);
				})();
			} else {
				fn.call(_this, url, type);
			}
		});
	}
	
	exports.default = writeByHandleDeferAndFill;

/***/ },
/* 117 */
/*!************************!*\
  !*** ./src/js/i18n.js ***!
  \************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _globalData = __webpack_require__(/*! ./globalData */ 48);
	
	var _globalData2 = _interopRequireDefault(_globalData);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var i18n = function i18n(language) {
	
	    var cn = {
	        '_lang': 'cn',
	        'lang': '语言',
	        'title': 'Cassia 蓝牙调试工具',
	        'header': 'cassia 蓝牙调试工具',
	        'reboot': '重启',
	        'allApi': '总览API',
	        'scanDevice': '扫描设备',
	        'connDevice': '连接设备',
	        'connedDevice': '已连接设备',
	        'discoverServices': '发现设备服务',
	        'openNotify': '打开Hub通知',
	        'stateChange': '连接状态变化',
	        'writeCom': '写入指令',
	        'disCon': '断开连接',
	        'scanList': '扫描列表',
	        'startScan': '开始扫描',
	        'devcieAndService': '设备及服务列表',
	        'getList': '获取已连接设备',
	        'stateChangeNotify': '连接状态变化通知',
	        'notifyList': '通知列表',
	        'openHubNotify': '打开Hub通知',
	        'clearList': '清空此列表',
	        'apiSocket': 'API接口',
	        'scanResult': '扫描结果',
	        'disService': '发现服务',
	        'getMsg': '接收设备信息',
	        'deviceConStateChange': '设备连接转态变化',
	        'arguments': '参数',
	        'optional': '(选填)',
	        'required': '(必填)',
	        'description': '描述',
	        'hubNotifyStatus': 'Hub通知状态',
	        'method': '方法名',
	        'addMore': '加载更多'
	    },
	        en = {
	        '_lang': 'en',
	        'lang': 'Language',
	        'title': 'Cassia Blooth Dev Tools',
	        'header': 'Cassia Blooth Dev Tools',
	        'reboot': 'Reboot',
	        'allApi': 'API Info',
	        'scanDevice': 'Scan Device',
	        'connDevice': 'Connect Device',
	        'connedDevice': 'Connected Devices',
	        'discoverServices': 'Discover Device Services',
	        'openNotify': 'Open Hub Notify',
	        'stateChange': 'Connection State Changes',
	        'writeCom': 'Write Instruction',
	        'disCon': 'Disconnect',
	        'scanList': 'Scan List',
	        'startScan': 'Start Scan',
	        'devcieAndService': 'Device and Services List',
	        'getList': 'Connected Devices',
	        'stateChangeNotify': 'Connection State Changes Notify',
	        'notifyList': 'Notify List',
	        'openHubNotify': 'Open Hub Notify',
	        'clearList': 'Clear List',
	        'apiSocket': 'Api Interfaces',
	        'scanResult': 'Scan Results',
	        'disService': 'Discover Services',
	        'getMsg': 'Devices\'s Messages',
	        'deviceConStateChange': 'Devices Connection State Changes',
	        'arguments': 'Parameter',
	        'optional': '(optional)',
	        'required': '(Required)',
	        'description': 'Description',
	        'hubNotifyStatus': 'Hub Notify Status',
	        'method': 'Method',
	        'addMore': 'Add More'
	    },
	        lang = {},
	        i18n = function i18n(k) {
	        return lang[k] || null;
	    },
	        auto = function auto() {
	        var bl = (navigator.language || navigator.browserLanguage).toLowerCase();
	        bl.match('cn') ? lang = cn : lang = en;
	    };
	
	    if (!language) {
	        try {
	            var s = JSON.parse(localStorage.getItem('settings'));
	            if (!s.language || s.language === 0) {
	                auto();
	            } else {
	                s.language === 'cn' ? lang = cn : lang = en;
	            }
	        } catch (e) {
	            auto();
	        }
	        _globalData2.default.lang = lang._lang;
	    }
	
	    i18n.format = function (str) {
	        if (arguments.length === 1) return str;
	        var args = Array.prototype.slice.call(arguments, 1);
	        return String(str).replace(/\{(\d+)\}/g, function (m, i) {
	            return args[i];
	        });
	    };
	
	    i18n.render = function (language) {
	        console.error(language);
	        if (language === 'cn') {
	            lang = cn;
	            _globalData2.default.lang = 'cn';
	        } else if (language) {
	            lang = en;
	            _globalData2.default.lang = 'en';
	        }
	
	        console.warn(_globalData2.default.lang);
	
	        $('#lang option').removeAttr('checked');
	        $('#lang').val(_globalData2.default.lang);
	
	
	        setTimeout(function () {
	            var a = document.getElementsByTagName('*'),
	                t,
	                s;
	            for (var i in a) {
	                t = a[i];
	                if (t && t.getAttribute) {
	                    s = t.getAttribute('i18n');
	                    console.log('#######', t.getAttribute('i18n-loaded') !== _globalData2.default.lang);
	                    if (s && i18n(s) && t.getAttribute('i18n-loaded') !== _globalData2.default.lang) {
	                        t.innerHTML = i18n(s);
	                        t.setAttribute('i18n-loaded', _globalData2.default.lang);
	                    }
	                }
	            }
	        }, 15);
	    };
	    i18n.render(language);
	    document.body.removeEventListener('DOMNodeInserted', function () {
	        i18n.render();
	    }, false);
	    document.body.addEventListener('DOMNodeInserted', function () {
	        i18n.render();
	    }, false);
	};
	
	exports.default = i18n;

/***/ }
/******/ ]);
//# sourceMappingURL=index.js.map