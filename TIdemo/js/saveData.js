   $("input").on('keyup',function(){
    //alert($(this).val())
    mystorage.set($(this).attr('id'),$(this).val());
    console.log($(this).attr('id'),$(this).val());
    })

    function loadData(){
        $("#acaddress").val(mystorage.get("acaddress") || "");
        $("#username").val(mystorage.get("username") || "");
        $("#password").val(mystorage.get("password") || "");
        $("#apmac").val(mystorage.get("apmac") || "");
        $("#node").val(mystorage.get("node") || "");
    }
    loadData()