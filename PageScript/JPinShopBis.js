$(function() {
    var orderType = $("#queryorder").val();
    $(".pagination").pagination(count, {
        items_per_page: size,
        current_page: page - 1,
        link_to: '/JPinShopissueBis?page=__id__' + "&key=" + $('#key').val() + "&status=" + status + "&orderType=" + orderType,
    });
    //selectMenu('#openWindows31');
});

var type = getUrlParam("orderType");
if (type == "0") { //淘宝
    selectMenu('#openWindows31');
} else if (type == "1") { //天猫
    selectMenu('#openWindows32');
} else if (type == "2") { //京东 
    selectMenu('#openWindows34');
}

function SetNoet(id, tp, note) {
    var r = $('#sk_note_' + id).val().trim();
    if (note != r) {
        $.post("/base/SetShopissueNote", {
            sId: id,
            type: tp,
            notes: r
        });
    }
}

function myConfirm(message, callback) {
    $('#linglamsg').remove();
    var html = '<div class="tchs" id="linglamsg">' +
        '<div style="position:relative;width:100%;height:100%">' +
        '<div id="msgbox" class="lila_index" style="position:absolute;top:50%;left:50%;">' +
        '<div class="ling">' +
        '<strong style="margin:0px" ><img style="height:35px;"  src="/Content/images/user_logoone.png" /></strong> ' +
        '<a onclick="$(\'#linglamsg\').remove()" style="cursor: pointer"><img src="http://www.meilipa.com/Content/images/xx.jpg" /></a>' +
        '</div>' +
        '<div class="ling_mian">' +
        '<div class="sy_cgt">' + message + '</div>' +
        '<a href="javascript:" class="qdingann qdingann_a" >确定</a>' +
        '<a href="javascript:" class="qdingann qdingann_b" style="background-color:#999;">取消</a>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>';
    $('body').append(html);
    $('#msgbox').css("margin-top", -$('#msgbox').height() / 2);
    $('#msgbox').css("margin-left", -$('#msgbox').width() / 2);
    $('.qdingann_a').bind('click', function() {
        if (callback != null)
            callback();
    });
    $('.qdingann_b').bind('click', function() {
        $('#linglamsg').remove();
    });

}

var payFlag = false;

// function pay(isYearVip, id, count, clinchprice, trypay, increment, message, auditfee, cashfee, evaluatefee) {
//     if (isYearVip == "0") {
//         myDialog({
//             msg: "请确认是否支付",
//             okText: "去支付",
//             ok: function() {
//                 window.open("./ApplyVipDL.html?"+"");
//             },
//         });
//         return false;
//     }
//     var remark = "共需支付：" + count + "份*下单价" + clinchprice + "元";
//     remark += "+优质试客任务奖励" + (trypay + cashfee + auditfee).toFixed(2) + "元+" + "增值服务费" + ((increment * count) + evaluatefee) + "元";
//     if (message > 0) {
//         remark += "+短信费" + message + "元";
//     }
//     remark += "=" + (count * (clinchprice + increment) + cashfee + message + trypay + auditfee + evaluatefee).toFixed(2) + "元" + "<br/>" + "确认支付？";
//     remark += '<br>密码：<input type="password" id="pay_pwd"/>';
//     remark += '<p id="pay-warn"></p>';
//     myConfirm(remark,
//         function() {
//             var pwd = $("#pay_pwd").val();
//             if (pwd.length < 6 || pwd.length > 18) {
//                 console.log(1)
//                 $("#pay-warn").fadeIn().html("密码位数应大于6位，小于18位");
//                 return false;
//             } else {
//                 $("#pay-warn").fadeOut();
//                 $('#linglamsg').remove();
//             }
//             if (window.payFlag) {
//                 return false;
//             }
//             window.payFlag = true;
//             $.post('/JPinShopissueBis/JPinPay', {
//                 id: id,
//                 pwd: pwd
//             }, function(d) {
//                 payFlag = false;
//                 if (d.Result) {
//                     location.href = location.href;
//                 } else if (d.Message.indexOf('余额不足') >= 0) {
//                     myDialog({
//                         msg: d.Message,
//                         okText: "充值",
//                         ok: function() {
//                             window.open("/Bis/Recharge");
//                         },
//                     });
//                 } else if (d.Message.indexOf('必须是会员才能发布活动') >= 0) {
//                     myDialog({
//                         msg: d.Message,
//                         okText: "开通会员",
//                         ok: function() {
//                             window.open("./ApplyVipDL.html");
//                         },
//                     });
//                 } else {
//                     myAlert(d.Message);
//                 }
//             });
//         },
//         function() {
//             payFlag = false;
//         }
//     );
// }

function myAlert(message, callback) {
    $('#linglamsg').remove();
    var html = '<div class="tchs linglamsg" id="linglamsg">' +
        '<div style="position:relative;width:100%;height:100%">' +
        '<div id="msgbox" class="lila_index" style="position:absolute;top:50%;left:50%;">' +
        '<div class="ling">' +
        '<strong style="margin:0px" ><img style="height:35px;"  src="/Content/images/user_logoone.png" /></strong> ' +
        '<a style="cursor: pointer">' +
        '<img src="http://www.meilipa.com/Content/images/xx.jpg" /></a>' +
        '</div>' +
        '<div class="ling_mian">' +
        '<div class="sy_cgt">' + message + '</div>' +
        '<a href="javascript:" class="qdingann" id="myAlertClose">确定</a>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>';
    $('body').append(html);
    $('#msgbox').css("margin-top", -$('#msgbox').height() / 2);
    $('#msgbox').css("margin-left", -$('#msgbox').width() / 2);
    $('#myAlertClose').bind('click', function() {
        if (callback != null) {
            callback();
        }
        $(this).parents('.linglamsg').remove();
    });
    $('.ling a').bind('click', function() {
        $('#linglamsg').remove();
    })
}
var editflag = false;
var inputFlag = false;

function editnum(id, num, take, skid) {
    var mrnum = 0;
    var mrtake = 0;
    $.post("/JPinShopissueBis/GetMrCalendar", {
        shopid: skid
    }, function(re) {
        if (re.Result) {
            mrnum = re.Message;
            mrtake = re.Data;
            myAlert("<div class='tc-em'><em style='width:120px;'>明日发放份数：</em>" +
                "<input style='vertical-align:middle; height:30px;width:100px;text-indent:1em;' id='input-jp-num' type='text' value='" + mrnum + "'/>  " +
                "<p>当前剩余：<em style='color:#ff464e' id='input-num-all'>" + num + "</em></div></p>" +
                "<div class='tc-em' style='margin-top:10px;'><em style='width:120px;'>明日转化率：</em>" +
                "<input style='vertical-align:middle;  height:30px;width:100px;text-indent:1em;' id='input-jp-take' type='text' value='" + mrtake + "'/> " +
                "<p>% 当前：<em style='color:#ff464e' id='input-num-all'>" + take + "</em></p></div>",
                function() {
                    var daycount = $("#input-jp-num").val();
                    var daytake = $("#input-jp-take").val();
                    var num = $("#input-num-all").html();
                    if (/^[1-9]\d*$/.test(daycount) && (daytake - 0) >= 0 && (daytake - 0) <= 100) {
                        if ((daycount - 0) > (num - 0)) {
                            myAlert("只能输入大于0的正整数，不能大于剩余份数");
                            return false;
                        }
                        if (inputFlag) {
                            return false;
                        }
                        inputFlag = true;
                        $.post("/JPinShopissueBis/EditCount", {
                            shopid: id,
                            daycount: daycount,
                            daytake: daytake
                        }, function(d) {
                            if (d.Result) {
                                location.href = location.href;
                            } else {
                                myAlert(d.Message);
                            }
                            window.inputFlag = false;

                        });
                    } else {
                        myAlert("份数只能输入大于0的正整数，不能大于剩余份数；转化率必须不能为负数且不能大于100%");
                    }
                });
        }
    })
}

var groupFlag = false;

function changeGroup(shopId) {
    myAlert("<div class='tc-em'><em style='width:350px; font-size:13px; text-align:left;'>选择类型：（当申请人数不足时，按照以下选择方式开奖）</em></div>" +
        "<div class='tc-em' style='margin-top:10px;'>" +
        "<div style='text-align:left;margin-left:50px; font-size:13px; display:block;'><input type='radio' name='sk_act_priority' id='sk_zutuan0' value='1' checked /> 订单量优先（<text style='color:red;'>建议</text>）</div>" +
        "<p style='width:300px; font-size:13px; text-align:left; margin-left:55px;'><label for='sk_zutuan0' style='width:350px; font-size:13px; text-align:left;'>为保证当日的订单量，仅在申请人数不足的情况下，允许开奖;</label><br /></p></div>" +
        "<div class='tc-em' style='text-align:left;margin-left:50px; font-size:13px;'>" +
        "<input type='radio' name='sk_act_priority' id='sk_zutuan1' value='2' />转化率优先（<text style='color:#D08331;'>当前</text>）" +
        "<p style='width:300px; font-size:13px; text-align:left; margin-left:15px;'><label for='sk_zutuan1'  style='width:350px; font-size:13px; text-align:left;'>达到每日设置的进店流量后开奖，未达到时不开奖</label></p></div>",
        function() {
            if (groupFlag) {
                return false;
            }
            var priority = $("input[name='sk_act_priority']:checked").val();
            groupFlag = true;
            $.post("/JPinShopissueBis/ChangeGroup", {
                shopid: shopId,
                sk_act_priority: priority
            }, function(d) {
                if (d.Result) {
                    location.href = location.href;
                } else {
                    myAlert(d.Message);
                }
                window.groupFlag = false;
            });
        });
}

function edittake(id, num) {
    myAlert("<div>请输入转换率：<input style='vertical-align:middle; height:30px;width:120px;text-indent:1em;' id='input-jp-num' type='text'/>  当前剩余：<em style='color:#ff464e' id='input-num-all'>" + num + "</em></div>", function() {
        var daycount = $("#input-jp-num").val();
        var num = $("#input-num-all").html();
        if (/^[1-9]\d*$/.test(daycount)) {
            if ((daycount - 0) > (num - 0)) {
                myAlert("只能输入大于0的正整数，不能大于剩余份数");
                return false;
            }
            if (inputFlag) {
                return false;
            }
            inputFlag = true;
            $.post("/JPinShopissueBis/EditTake", {
                shopid: id,
                daycount: daycount
            }, function(d) {
                if (d.Result) {
                    location.href = location.href;
                } else {
                    myAlert(d.Message);
                }
                window.inputFlag = false;

            });
        } else {
            myAlert("只能输入大于0的正整数，不能大于剩余份数");
        }
    });
}

var delflag = false;

function del(id) {
    myConfirm("确认删除？", function() {
        if (window.delflag) {
            return false;
        }
        window.delflag = true;
        $.post("/JPinShopissueBis/DeleteShopissue", {
            id: id
        }, function() {
            window.delflag = false;
            location.href = location.href;
        });
    });
}

function search() {
    window.location = "/JPinShopissueBis/?page=1" + "&key=" + $('#key').val() + "&status=" + status + "&orderType=" + orderType + "&sk_type=" + $("#sktype").val();
}

function searchCat() {
    window.location = "/JPinShopissueBis/?page=1" + "&key=" + $('#key').val() + "&status=" + status + "&orderType=" + $("#ordertype").val() + "&sk_type=" + $("#sktype").val();
}

var pause = false;

function PauseActive(id) {
    myConfirm("确认暂停该活动？", function() {
        if (window.pause) {
            return false;
        }
        window.pause = true;
        $.post("/JPinShopissueBis/PauseShopissue", {
            id: id
        }, function() {
            window.pause = false;
            location.href = location.href;
        });
    });
}

var start = false;

function StartActive(id) {
    myConfirm("确认恢复该活动？", function() {
        if (window.start) {
            return false;
        }
        window.start = true;
        $.post("/JPinShopissueBis/StartShopissue", {
            id: id
        }, function() {
            window.start = false;
            location.href = location.href;
        });
    });
}