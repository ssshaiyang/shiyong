$(function () {
    $('#sk_draw_money').bind('input propertychange', function () {
        moneyChange();
    });
    $('#sk_draw_money_s').bind('input propertychange', function () {
        shopmoneyChange();
    });
    
    $("#checkGold").on("click", function () {
        if (isVip != "True") {
            myAlert("只有VIP才能使用金币抵扣手续费哦!", function () {
               window.open("//www.meilipa.com/VIP/UserVip");
            });
            $("#myAlertClose").html("成为VIP");
            return false;
        }
        if ($(this).is(":checked")) {
            $(this).val(1);
            var Allmoney = ($("#realDraw").text() - 0) + ($("#goldprice").text() - 0);
        } else {
            $(this).val(0);
            var Allmoney = ($("#realDraw").text() - 0) - ($("#goldprice").text() - 0);
        }

        $("#realDraw").text(Allmoney.toFixed(2));
    });
});

function moneyChange(type_flag) {
    
    var drawAmount = parseFloat($('#sk_draw_money').val());
    $("#freefee").hide();
    $("#free").hide();
    $("#showUser").html(drawAmount);
    var fee = 0;
    fee = parseFloat(drawAmount * 0.05).toFixed(2);
    if (fee < 1) {
        fee = 1;
    }
    $("#checkGold").removeAttr("checked");
    $("#checkGold").val(0);
        try {
            goldnum = goldnum || 0;
        } catch (e) {
            goldnum = 0;
        }
        var feeGold = fee * 100;
        if (feeGold >= 5000)
            feeGold = 5000;
        if (feeGold > goldnum) {
        $("#canUseGold").html(goldnum);
        $("#goldprice").html(parseFloat(goldnum / 200).toFixed(2));
    } else {
            $("#canUseGold").html(Math.round(feeGold));
        $("#goldprice").html(parseFloat(feeGold / 200).toFixed(2));
    }
    $('#poundage').html(fee);
    $('#realDraw').html(parseFloat(drawAmount - fee).toFixed(2));
}


function shopmoneyChange(type_flag) {
    var drawAmount = parseFloat($('#sk_draw_money_s').val());
    $("#freefee").hide();
    $("#free").hide();
    $("#mian").hide();
    $("#showUser").html(drawAmount);
    var fee = 0;

    fee = parseFloat(drawAmount * 0.005).toFixed(2);
    if (fee < 1) {
        fee = 1;
    }
    if (fee >= 25) {
        fee = 25;
    }
   
    $('#poundage').html(fee);
    $('#realDraw').html(parseFloat(drawAmount - fee).toFixed(2));

}