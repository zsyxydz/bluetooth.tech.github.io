function run(){
    var flag;
    api
        .use({
            server: 'http://api2.cassianetworks.com',
            hub: $('.hubIp').val() || 'CC:1B:E0:E0:22:60',
            developer: 'tester',
            key: '10b83f9a2e823c47'
        })
        .oauth2({
            success: function(){
            api
                // .on('scan', function(a){
          //        api.conn({
          //            node: $('.devMac').val(),
          //            type: 'public'
          //        })
          //       })
                .on('notify', function(hub, data){
                                // obj = JSON.parse(b.data)
                    var node = $('.devMac').val()
                    console.log(3333, data)


                    if (data == ':keep-alive') return;

                    var tem = JSON.parse(data).value
                    
                    if (tem.substring(0,4) == "2324") {
                        pro1_1 = tem.substring(8,10)
                        pro1_2 = tem.substring(10,12)
                        pro1 = parseInt("0x"+pro1_2+pro1_1,16)*0.001
                        pro2_1 = tem.substring(12,14)
                        pro2_2 = tem.substring(14,16)
                        pro2 = parseInt("0x"+pro2_2+pro2_1,16)*0.001
                        pro3_1 = tem.substring(16,18)
                        pro3_2 = tem.substring(18,20)
                        pro3 = parseInt("0x"+pro2_2+pro2_1,16)*0.001
                        pro4_1 = tem.substring(20,22)
                        pro4_2 = tem.substring(22,24)
                        pro4 = parseInt("0x"+pro2_2+pro2_1,16)*0.001
                        $(".Temperature").append([
                            pro1, pro2, pro3, pro4
                        ].join())


                            //flag = 'BatteryVoltage'
                            // .write({handle: 16, node: node, value: '24'})

                    }else if(tem.substring(0,4) == "2325") {
                            ppro1_1 = tem.substring(8,10)
                            ppro1_2 = tem.substring(10,12)
                            ppro1 = parseInt("0x"+ppro1_2+ppro1_1,16)*0.001
                            ppro2_1 = tem.substring(16,18)
                            ppro2_2 = tem.substring(18,20)
                            ppro2 = parseInt("0x"+ppro2_2+ppro2_1,16)*0.001
                            ppro3_1 = tem.substring(24,26)
                            ppro3_2 = tem.substring(26,28)
                            ppro3 = parseInt("0x"+ppro2_2+ppro2_1,16)*0.001
                            ppro4_1 = tem.substring(32,34)
                            ppro4_2 = tem.substring(34,36)
                            ppro4 = parseInt("0x"+ppro2_2+ppro2_1,16)*0.001
                            $(".BatteryVoltage").append([
                                ppro1, ppro2, ppro3, ppro4
                            ].join())


                                //flag = 'Microphone'
                    }else if(tem.substring(0,4) == "2321"){
                        MIC = parseInt("0x"+tem.substring(8,16),16)/100000000

                        $(".Microphone").append(MIC);

                                //flag = 'Accelerometer'
                    }else if(tem.substring(0,4) == "2323"){

                        A_X = parseInt("0x"+tem.substring(8,12),16)/65535
                        A_Y = parseInt("0x"+tem.substring(12,16),16)/65535
                        A_Z = parseInt("0x"+tem.substring(16,20),16)/65535

                        $(".Accelerometer").append("X:"+A_X+", Y:"+A_Y+", Z:"+A_Z);
                                    //flag = 'Magnetometer'
                    }else if(tem.substring(0,4) == "2322"){
                        M_X = parseInt("0x"+tem.substring(8,12),16)/100
                        M_Y = parseInt("0x"+tem.substring(12,16),16)/100
                        M_Z = parseInt("0x"+tem.substring(16,20),16)/100

                        $(".Magnetometer").append("X:"+M_X+", Y:"+M_Y+", Z:"+M_Z);
                    }else if(tem.substring(0,4) == "2601"){
                        //
                        //                      if (flag == "Temperature") {
                        //                          $(".Temperature").append("not used")
                        //                          api
                        //                              .write({handle: 16, node: node, value: '2129000000'})
                            //                          .write({handle: 16, node: node, value: '2200a004000000'})
                            //                          flag = "BatteryVoltage"
                        //                      }else if (flag == "Microphone") {
                        //                          $(".Microphone").append("not used")
                        //                          api
                        //      .write({handle: 16, node: node, value: '2119000000'})
                            //  .write({handle: 16, node: node, value: '22006004000000'})
                            //                          flag = "Accelerometer"
                        //
                        //                      }else if(flag == "Accelerometer") {
                        //                          $(".Accelerometer").append("not used")
                        //                          api
                        //          .write({handle: 16, node: node, value: '2111000000'})
                            //      .write({handle: 16, node: node, value: '22004004000000'})
                        //
                            //                          flag = "Magnetometer"
                        //
                        //                      }else if(flag == "BatteryVoltage") {
                        //                          $(".BatteryVoltage").append("not used")
                        //                          api
                        //      .write({handle: 16, node: node, value: '2109000000'})
                            //  .write({handle: 16, node: node, value: '22002004000000'})
                            //                          flag = "Microphone"
                        //
                        //                      }else if(flag == "Magnetometer") {
                        //                          $(".Magnetometer").append("not used")
                        //                      }
                        //
                        //
                        ////Invalid session
                        //
                        }else if(tem.substring(0,4) == "2613"){


                    }
                })
                .on('conn', function(hub, node, data){
                    if (node) {
                        api
                            .when()
                            .write({handle: 19, node: node, value: '0100'})
                            .write({handle: 16, node: node, value: '620000'})

                            .write({handle: 16, node: node, value: '2121008000'})
                            .write({handle: 16, node: node, value: '22008004000000'})
                            .write({handle: 16, node: node, value: '2129000000'})
                            .write({handle: 16, node: node, value: '2200a004000000'})
                            //
                            .write({handle: 16, node: node, value: '2109018000'})
                            .write({handle: 16, node: node, value: '22002004000000'})

                            .write({handle: 16, node: node, value: '2119018000'})
                            .write({handle: 16, node: node, value: '22006004000000'})
                            .write({handle: 16, node: node, value: '2111018000'})
                            .write({handle: 16, node: node, value: '22004004000000'})

                            .done();
                             //                    //





                            // .write({handle: 16, node: node, value: '24'})


                        flag = 'Temperature'

                    }
                })
                .conn({
                    node: $('.devMac').val(),
                    type: 'public'
                })


            }
        });
}



$(function() {

    $('.btn').on('click', run)

    function hash_change() {
        location.hash = $('.hubIp').val() + '|' + $('.devMac').val()
    }
    $('.hubIp, .devMac').on('change', hash_change).on('keydown', hash_change).on('blur', hash_change)

    var s = String(location.hash).replace('#', '').split('|')
    $('.hubIp').val(s[0])
    $('.devMac').val(s[1])
})




