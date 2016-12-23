import {
	storage,
	readStorage
} from './localStorage'
const localStorageKey = 'cassiaSDKTool',
	handle = {
		set: function (t, n, v) {
			t[n] = v
			storage(localStorageKey, t)
			return true
		},
		get: function (t, n) {
			return t[n]
		}
	}

let firstFlag = true,
	globalDataInit = {
		saved: {
			deviceMac: '',
			hubMac: '',
			hubIp: '',
			chip: '0',
			commond: ''
		},
		neverSave: {
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
			}
		}
	},
	globalData

if (firstFlag) {
	firstFlag = false
	globalDataInit = readStorage(localStorageKey, globalDataInit.saved)
}

globalData = new Proxy(globalDataInit, handle)



export default globalData