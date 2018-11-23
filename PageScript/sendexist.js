//通用发送验证码方法
var _ctr, _send;
function bindCaptcha(ctr) {
    _ctr = ctr;
    console.log(ctr)
    _send = function () {
        afterVerification()
    };
    $(ctr).bind("click", function () { _send(); });
}

// function showverdialog() {
//     var html = '<div class="tchs" id="verification">' +
//                     '<div class="lila_index" style="top: 200px">' +
//                          '<div class="ling">' +
//                             '<strong>' + '<img src="//www.meilipa.com/Content/images/lila.jpg" />' + '</strong>' +
//                             '<a>' + '<img src="//www.meilipa.com/Content/images/xx.jpg" onclick="$(\'#verification\').remove();" />' + '</a>' +
//                          '</div>' +
//                          '<div class="ling_mian">' +
//                             '<div class="clearfix" style="margin-top: 20px; margin-bottom: 20px;">' +
//                                 '<div style="width: 180px; height: 27px; float: left; line-height: 27px; text-align: right;">图形验证码：</div>' +
//                                 '<img id="captcha_img"  style="height:27px;float:left" />' +
//                             '</div>' +
//                             '<div class="clearfix">' +
//                                 '<div style="width: 180px; height: 27px; float: left; line-height: 27px; text-align: right;">请输入图形验证码：</div>' +
//                                 '<input id="code" type="text" style="width:146px;height:27px;float:left" />' +
//                             '</div>' +
//                             '<a href="javascript:" onclick="afterVerification()" class="qdingann">确定</a>' +
//                         '</div>' +
//                     '</div>' +
//             '</div>';
//     $('body').append(html);
//     $("#captcha_img").attr("src", '/CommonBase/GetCaptchaImg?' + Math.random());
// }

function afterVerification() {
    var code = $('#code').val();
    // console.log(code)
    // if (code == "") {
    //     alert("请输入图形验证码");
    //     return;
    // }
    // $('#verification').remove();
    // $(_ctr).unbind("click");
    $.post("http://api.feizhugou.com/code", { phone: code,source:0 }, function (data) {
        if (data.code!=1000) {
            alert(data.msg);
            $(_ctr).bind("click", function () { _send(); });
        } else {
            var i = 120;
            var timer = setInterval(function () {
                i--;
                if (i == 0) {
                    //$("#sendbtn").css("color", "#333");
                    $(_ctr).text("重新发送");
                    $(_ctr).bind("click", function () { _send(); });
                    clearInterval(timer);
                } else {
                    //$("#sendbtn").css("color", "#999");
                    $(_ctr).text(i + "秒后重新获取验证码");
                }
            }, 1000);
        }
    });
}