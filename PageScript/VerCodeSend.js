//设置cookie			
function setCookie(name, value, time) {
    var strsec = getsec(time);
    var exp = new Date();
    exp.setTime(exp.getTime() + strsec * 1);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}


function getsec(str) {
    var str1 = str.substring(1, str.length) * 1;
    var str2 = str.substring(0, 1);
    if (str2 == "s") {
        return str1 * 1000;
    }
    else if (str2 == "h") {
        return str1 * 60 * 60 * 1000;
    }
    else if (str2 == "d") {
        return str1 * 24 * 60 * 60 * 1000;
    }
}

//读取cookie			
function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

    if (arr = document.cookie.match(reg))

        return (arr[2]);
    else
        return null;
}


//发送邮件地址验证
$(document).ready(function () {
    $("#sendmail").click(function () {
        if (!$(".Validform_checktip").hasClass('Validform_right')) {
            $('#to_address').focus();
            return;
        }
        var toaddress = $("#to_address").val();
        $.post("/security/sendmail", { address: toaddress }, function (data, status, ref) {
            if (status == "success") {
                if (data.success) {
                    $("#divsendmail").hide();
                    $("#divshowmail").show();
                    $("#divmailmsg").show();
                    $("#seconds").html("60");
                    var r = setInterval(function () {
                        var _second = parseInt($("#seconds").html()) - 1;
                        $("#seconds").html(_second);
                        if (_second <= 0) {
                            clearInterval(r);
                            $("#divsendmail").show();
                            $("#divmailmsg").hide();
                            $("#divshowmail").hide();
                        }
                    }, 1000);
                } else {
                    myAlert(data.message);
                }
            } else {
            }
        });
    });

    //身份验证
    $("#telSubmit").click(function () {
        var keys = $("#keys").val();
         // var keys2 = $("#to_add").val();
        if (keys == ""||keys2=="") {
            myAlert('手机验证码不能为空!');
            return;
        }
        var code = $('#code').val();//手机号码
        var keys2 = $("#to_add").val();
        if(keys2!=""){
            if(keys2==undefined){

            }else{
                code=keys2
            }
        }
        $.post("http://api.feizhugou.com/checkCode", { code: keys, phone: code }, function (data) {
            if (data.code==1000) {
                if(keys2==undefined){
                    window.location.href = './telbind.html';
                }else{
                    window.location.href = './telsuccess.html';
                }
            } else {
                myAlert(data.meg);
                return;
            }
        });

    });




    //淘宝号
    $("#PayBtnSubmit").click(function () {
        if ($(".nat_ttv").hasClass('Validform_error')) {
            $(".Validform_error").first().focus();
            return;
        }
        var staut = true;
        var arrayTB = "";
        $("[name='sk_taobao']").each(function () {
            var taobao = $(this).val();
            if (taobao == "") {
                staut = false;
                $(this).focus();
                //myAlert("淘宝账号不能为空！");
                return;
            } else {
                arrayTB += "≌✿" + taobao;
            }
        });
        if (staut) {
            $.post('/CommonBase/ModifyTaobaoSubmit', { taobao: arrayTB,shopType:0 }, function (data) {
                myAlert(data.Message, function() {
                    if (data.Result) {
                        location.href = "/security/taobaosuccess";
                    }
                });
            });
        }

    });

    //京东号
    $("#PayBtnSubmitjd").click(function () {
        if ($(".nat_ttv").hasClass('Validform_error')) {
            $(".Validform_error").first().focus();
            return;
        }
        var staut = true;
        var arrayTB = "";
        $("[name='sk_taobao']").each(function () {
            var taobao = $(this).val();
            if (taobao == "") {
                staut = false;
                $(this).focus();
                //myAlert("淘宝账号不能为空！");
                return;
            } else {
                arrayTB += "≌✿" + taobao;
            }
        });
        if (staut) {
            $.post('/CommonBase/ModifyTaobaoSubmit', { taobao: arrayTB,shopType:2 }, function (data) {
                myAlert(data.Message, function () {
                    if (data.Result) {
                        location.href = "/security/taobaosuccess";
                    }
                });
            });
        }

    });
    $("#addTB").click(function () {
        var div = ' <div class="mer_pc1" style="line-height: 36px;margin-top: 20px;margin-left: 0px;">' +
            '<div class="clearfix">' +
            '<span class="nat_px1" style="color: #666;font-size: 14px;height: 36px;line-height: 36px;width: 250px;">' +(plat==1?"京东":"淘宝")+ '帐号名：</span>' +
            '<input name="sk_taobao" type="text" class="nat_ttv" maxlength="30" datatype="*" ajaxurl="/CommonBase/' + (plat == 1 ? "CheckJingDongExist" : "CheckTaoBaoExist") + '" style="width: 290px;height: 36px;border: 1px solid #ddd;float: left;" nullmsg="请填写信息！"/>' +
            '<input type="button" onclick="delTb(this)" value="删除账号" class="tb-zh" />' +
            '<span class="Validform_checktip"></span>' +
            '</div>' +
            '</div>';
        $(".acct_pxa .mer_pc1:last").append(div);
    });
});


function telkeysubmit(pwdtype) {
    var keys = $("#captcha").val();
    var phone = $('#code').val()
    if (keys == "") {
        myAlert('手机验证码不能为空!');
        return;
    }
    console.log(pwdtype)
    $.post("http://api.feizhugou.com/checkCode", { phone: phone, code: keys }, function (data) {
        if (data.code ==1000) {
            window.top.location.href = "./SetNewPassword.html?pwdtype=" + pwdtype;
        } else {
            myAlert(data.msg);
            return;
        }
    });
}

function sendemail(type, pwdtype) {
    $("#divsendmail").hide();
    $("#divshowmail").show();
    $.post("/security/SendMailForModify", {type: type, pwdtype: pwdtype }, function (data, status, ref) {
        if (status == "success") {
            $("#sshowme").show();
            $("#seconds").html("60");
            var r = setInterval(function () {
                var _second = parseInt($("#seconds").html()) - 1;
                $("#seconds").html(_second);
                if (_second <= 0) {
                    clearInterval(r);
                    $("#divsendmail").show();
                    $("#divshowmail").hide();
                }
            }, 1000);
        } else {
        }
    });
}