import {
	storage,
	readStorage
} from './localStorage'
const localStorageKey = 'cassiaSDKTool',
	handle = {
		set: function(t, n, v) {
			t[n] = v
			storage(localStorageKey, t)
			return true
		},
		get: function(t, n) {
			return t[n]
		}
	}

let firstFlag = true,
	globalDataInit = {
		deviceMac: '',
		hubMac: '',
		hubIp: '',
		chip: '0',
		commond: '',
		notifySSE: {
			status: 'closed',
			es: ''
		},
		stateSSE: {
			status: 'closed',
			es: ''
		}
	},
	globalData

if (firstFlag) {
	firstFlag = false
	globalDataInit = readStorage(localStorageKey, globalDataInit)
}

globalData = new Proxy(globalDataInit, handle)



export default globalData