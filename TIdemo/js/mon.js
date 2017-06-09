//红外温度传感器
function sensorTmp007Convert(tmpData){
	let SCALE_LSB = 0.03125 ;
	let rawAmbTemp = parseInt(tmpData.slice(2,4) + tmpData.slice(0,2),16);
	let rawObjTemp = parseInt(tmpData.slice(6,8) + tmpData.slice(4,6),16);
	let anmtemp = (rawAmbTemp >> 2) * SCALE_LSB;
	let objtemp = (rawObjTemp >> 2) * SCALE_LSB;
	return anmtemp;
}
//湿度传感器
function sensorHdc1000Convert (hdcData){
	let rawTemp = parseInt(hdcData.slice(2,4) + hdcData.slice(0,2),16);
	let rawHum = parseInt(hdcData.slice(6,8) + hdcData.slice(4,6),16);
	 //  - 计算温度[°C] 
	let temp = rawTemp / 65536 * 165 - 40 ;
	//  - 计算相对湿度[％RH] 
	let hum = rawHum / 65536 * 100;
	return hum;
}
//气压传感器
function calcBmp280(bmpData){
	let rawTemp = parseInt(bmpData.slice(4,6)+bmpData.slice(2,4)+bmpData.slice(0,2),16);
	let rawPa = parseInt(bmpData.slice(10,12)+bmpData.slice(8,10)+bmpData.slice(6,8),16);

	let temp = rawTemp / 100;
	let pa = rawPa / 100;
	return pa;
}
//光学传感器
function SensorOpt3001_convert(optData){
	let e,m;
	m = optData & 0x0FFF ; 
	e = (optData & 0x0FFF) >> 12;
	/** e在4位存储在16位无符号=>它可以存储2 <<（e  -  1）与e <16 */ 
	e = ( e == 0 ) ? 1 : 2 << ( e - 1 );
	return m * (0.01 * e);
}