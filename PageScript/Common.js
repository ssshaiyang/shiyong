function setCookie(c_name, value, expiredays) {
    var exdate = new Date()
    exdate.setDate(exdate.getDate() + expiredays)
    document.cookie = c_name + "=" + escape(value) +
        ((expiredays == null) ? "" : "; expires=" + exdate.toGMTString()) + ";path=/"
}

// 账户明细
function getdetail(operation,date_type,filter){
    var url = "http://api.feizhugou.com/wallet/detail/"+operation+"?page=1&limit=10&date_type="+date_type+"&filter="+filter;
    var token = localStorage.getItem("token");
    $.ajax({
        url: url,
        type: "GET",
        dataType: "json",
        async: true,
        headers: {
            'Accept': 'aplication/json',
            'Authorization': '' + token
        },
        success: function(e) {
            if (e.code == 1000) {
                var payformdata =e.data.data;
                console.log(payformdata)
                for(var i =0;i<payformdata.length;i++){
                    var checkstatus =payformdata[i].status;
                    var checktext ="";
                        if(checkstatus==1){
                            checktext="已打款"
                        }else if(checkstatus==2){
                            checktext="已拒绝"
                         }else{
                            checktext="待审核"
                         }
                         var toAlipayAccount=""
                         if(payformdata[i].toAlipayAccount!=null){
                            toAlipayAccount=payformdata[i].toAlipayAccount;
                         }
                        $('#payform').append('<tr><td><em style="margin-left: 120px">'+toAlipayAccount+'</em></td><td width="120" height="38"><em style="margin-left: 70px">'+payformdata[i].createTime+'</em></td><td width="288" height="38"><em style="margin-left: 210px">'+payformdata[i].from+'</em></td><td width="60" height="38"><em style="margin-left: 26px">'+payformdata[i].amount+'</em></td><td width="45" height="38"><em style="margin-left: 26px">'+checktext+'</em></td></tr>')
                    }
                }
            }
    })
} 

function reTaskApply(){
    var token = localStorage.getItem("token");

    var url = "http://api.feizhugou.com/pay/repurchaseActivity";
    var searchURL = window.location.search;
            searchURL = searchURL.substring(1, searchURL.length);
            console.log(searchURL);
            var orderid = searchURL.split("&")[0].split("=")[1];
    money = $("#paymoney_id").text()
    $.ajax({
        url: url,
        type: "POST",
        dataType: "json",
        async: true,
        data: {
          aid:orderid,
          money:money
        },
        headers: {
            'Accept': 'aplication/json',
            'Authorization': '' + token
        },
        success: function(e) {
            if (e.code == 1000) {
                location.href = './ReBisiness.html?ptype=1&atype=5'
            }
            else{
                myAlert(e.msg)
            }
        }
    })
}

           
//获取余额
function getbalance(){
    var url = "http://api.feizhugou.com/wallet/info";
    var token = localStorage.getItem("token");
    console.log("执行了getbalance")
    $.ajax({
        url: url,
        type: "GET",
        dataType: "json",
        async: true,
        headers: {
            'Accept': 'aplication/json',
            'Authorization': '' + token
        },
        success: function(e) {
            if (e.code == 1000) {

                $('#bis_balance').text(e.data.balance)
                $('.user_balance').text(e.data.balance)
            }else{
                myConfirm(e.msg)
            }
        }

        
    })
} 
// 收支信息
function getmoneyData(operation,date_type,filter){
    console.log(2)
    var url = "http://api.feizhugou.com/wallet/getMoneys"
    var token = localStorage.getItem("token");
    $.ajax({
        url: url,
        type: "GET",
        dataType: "json",
        async: true,
        headers: {
            'Accept': 'aplication/json',
            'Authorization': '' + token
        },
        success: function(e) {
           $('#getMoneysData').append(' 收入：<span>'+e.data.income+'</span>元 | 支出：<strong>'+e.data.expenditure+'</strong>元 | 可用余额：<span>'+e.data.balance+'</span> 元')
        }
    })
} 
function getVipRankIndex() {
    var url = "http://api.feizhugou.com/users/getVipRank";
    var token = localStorage.getItem("token");
    $.ajax({
        url: url,
        type: "GET",
        dataType: "json",
        async: true,
        headers: {
            'Accept': 'aplication/json',
            'Authorization': '' + token
        },
        success: function(e) {
            if (e.code == 1000) {
                $("#bis_vip_rank").text(e.data.rank)
                if(e.data.rank!="普通商家"){
                    $("#bis_vip_rank_cue").text("您已经成为VIP")
                    localStorage.setItem("isVip",'True')
                }else{
                    localStorage.setItem("isVip",'False')
                }
            }if (e.code == 1002) {
                myAlert(e.msg,function(){
                    logout()
                })
                
            }
        }
    })
}
function getPayCode() {
    var url = "http://api.feizhugou.com/users/getAccountSecurity";
    var token = localStorage.getItem("token");
    $.ajax({
        url: url,
        type: "GET",
        dataType: "json",
        async: true,
        headers: {
            'Accept': 'aplication/json',
            'Authorization': '' + token
        },
        success: function(e) {
            if (e.code == 1000) {
                console.log(e)
                if(e.data){
                    localStorage.setItem("txnum",e.data.alipayAccount.length)
                }
                
            }
        }
    })
}

function getVipRank2() {
    var url = "http://api.feizhugou.com/users/getVipRank";
    var token = localStorage.getItem("token");
    console.log(token)
    $.ajax({
        url: url,
        type: "GET",
        dataType: "json",
        async: true,
        headers: {
            'Accept': 'aplication/json',
            'Authorization': '' + token
        },
        success: function(e) {
            if (e.code == 1000) {

                if (e.data.rank !== '普通商家') {
                    alert('您已经是VIP了！请返回首页 :)');
                    location.href = "./index.html"
                }
            }
        }
    })
}

function getVipRank(aid) {
    var url = "http://api.feizhugou.com/users/getVipRank";
    var token = localStorage.getItem("token");
    console.log(aid)
    $.ajax({
        url: url,
        type: "GET",
        dataType: "json",
        async: false,
        headers: {
            'Accept': 'aplication/json',
            'Authorization': '' + token
        },

        success: function(e) {
            if (e.code == 1000) {
                if (e.data.rank !== "普通商家") {
                    location.href = "./ReTaskApply.html?aid=" + aid

                } else {
                    myConfirm("只有VIP才能发布活动哦！是否去成为VIP？", function() {
                        if (window.pause) {
                            return false;
                        }
                        window.pause = true;
                        location.href = "./ApplyVip.html"
                    })
                }
            }else{
                myAlert(e.msg,function(){
                    location.reload()
                })
            }

        }

    })
}

function becomeVip(aid) {
    var url = "http://api.feizhugou.com/users/getVipRank";
    var token = localStorage.getItem("token");

    $.ajax({
        url: url,
        type: "GET",
        dataType: "json",
        async: false,
        headers: {
            'Accept': 'aplication/json',
            'Authorization': '' + token
        },

        success: function(e) {
            if (e.code == 1000) {
                if (e.data.rank == "普通商家") {
                    location.href = "./ApplyVip.html"
                  
                } else {
                    myConfirm("您已经是VIP了，如需升级请联系客服", function() {
                        if (window.pause) {
                            return false;
                        }
                        window.pause = true;
                        location.href = location.href
                    })
                }
            }else{
                myAlert(e.msg,function(){
                    if (e.msg == 1002) {
                        logout()
                    }
                })
            }

        }

    })
}



function getactivityNum() {
    console.log("执行了getactivityNum")
    var token = localStorage.getItem("token");
    var url = "http://api.feizhugou.com/activity/get/activityNum"
    // var url = "http://api.feizhugou.com/activity/get/activityNum"
    $.ajax({
        url: url,
        type: "GET",
        dataType: "json",
        async: true,
        headers: {
            'Accept': 'aplication/json',
            'Authorization': '' + token
        },
        success: function(e) {
            if (e.code == 1000) {
                $("#toBePaid").text(e.data.toBePaid);
                $("#ing").text(e.data.ing);
                $("#finished").text(e.data.finished);
            } else {
                $("#toBePaid").text("0");
                $("#ing").text("0");
                $("#finished").text("0");
            }

        }
    })
}

function getsec(str) {
    var str1 = str.substring(1, str.length) * 1;
    var str2 = str.substring(0, 1);
    if (str2 == "s") {
        return str1 * 1000;
    } else if (str2 == "h") {
        return str1 * 60 * 60 * 1000;
    } else if (str2 == "d") {
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

function getorder() {
    var token = localStorage.getItem("token");

    var searchURL = window.location.search;
    searchURL = searchURL.substring(1, searchURL.length);

    var orderid = searchURL.split("&")[0].split("=")[1];
    console.log(orderid);

    console.log("执行了getorder");

    var url = "http://api.feizhugou.com/activity/orderList/get/" + orderid
    $.ajax({
        url: url,
        type: "GET",
        dataType: "json",
        async: true,
        data: {
            page: 1,
            limit: 15
        },
        headers: {
            'Accept': 'aplication/json',
            'Authorization': '' + token
        },
        success: function(e) {
            if (e.code == 1000) {
                console.log(e);
                for (var i = 0; i < e.data.info.length; i++) {
                    switch (e.data.info[i].status) {
                        case 0:
                            var status = '待中奖';
                            break;
                        case 1:
                            var status = '中奖了';
                            break;
                        case 2:
                            var status = '待发货 ';
                            break;
                        case 3:
                            var status = '待提交报告';
                            break;
                        case 4:
                            var status = '待确认';
                            break;
                        case 5:
                            var status = '待返款';
                            break;
                        case 6:
                            var status = '已返款';
                            break;
                        case 7:
                            var status = '未中奖';
                            break;
                        case 8:
                            var status = '未接单';
                            break;

                    };
                    if (e.data.info[i].status == 2) {
                        var deliverGoodshtml = '<input class="f-fl courierNumber' + i + '" style="width:90px" placeholder="请填写快递单号"></input>' + '<a class="orderlistbtn" href="###" onclick="deliverGoods(' + e.data.info[i].id + ',' + e.data.info[i].uid + ',' + i + ')"> 提交</a>';
                    } else if (e.data.info[i].status == 4) {
                        var deliverGoodshtml = '<a class="orderlistbtn" href="###" style="border:1px solid #ff464e!important" onclick="agreeReturn(' + e.data.info[i].id + ',' + e.data.info[i].uid + ',' + 1 + ')"> 确认</a>'
                        var deliverGoodshtml = deliverGoodshtml + '<a class="orderlistbtn" style="color:#ff464e;background-color:white;border:1px solid #ff464e!important" href="###" onclick="agreeReturn(' + e.data.info[i].id + ',' + e.data.info[i].uid + ',' + 2 + ')"> 取消</a>'
                    } else {
                        var deliverGoodshtml = ''
                        console.log("deliverGoodshtml")
                    }
                    var html = ' <ul class="f-cb orderct">' +
                        '<li class="f-fl time">' + e.data.info[i].createTime + '</li>' +
                        '<li class="f-fl xwcid">' + e.data.info[i].uid + '</li>' +
                        '<li class="f-fl wwname lim-w"><span title="">' + e.data.info[i].taobao + '</span></li>' +

                        '<li class="f-fl ordertype f-pr">' + e.data.info[i].order_number +
                        '</li>' +
                        '<li class="f-fl orderstatus orderstatus' + i + '">' + status +
                        '<br>' +
                        '<span style="color: #EAC100;" title="快递单号">' +
                        '</li>' + deliverGoodshtml +
                        '<li class="f-fl apply"></li> <li class="f-fr">' +
                        '<a class="orderdetail" href="./Orderdetail.html?orderid=' + e.data.info[i].id + '&uid=' + e.data.info[i].uid + '" title="点击查看">订单详情</a>' +
                        '</li>' +
                        '</ul>';

                    $(".orderlist").append(html);
                }
            }
        }
    })

}

// function getReOrder() {
//     var token = localStorage.getItem("token");

//     var searchURL = window.location.search;
//     searchURL = searchURL.substring(1, searchURL.length);

//     var orderid = searchURL.split("&")[0].split("=")[1];
//     console.log(orderid);

//     console.log("执行了getReOrder");

//     var url = "http:///192.168.1.216/shiyong_backend/activity/getRepurchaseInfo/" 
//     $.ajax({
//         url: url,
//         type: "GET",
//         dataType: "json",
//         async: true,
//         data: {
//             // page: 1,
//             // limit: 15
//         },
//         headers: {
//             'Accept': 'aplication/json',
//             'Authorization': '' + token
//         },
//         success: function(e) {
//             if (e.code == 1000) {
//                 console.log(e);
//                 for (var i = 0; i < e.data.info.length; i++) {
//                     switch (e.data.info[i].status) {
//                         case 0:
//                             var status = '待中奖';
//                             break;
//                         case 1:
//                             var status = '中奖了';
//                             break;
//                         case 2:
//                             var status = '待发货 ';
//                             break;
//                         case 3:
//                             var status = '待提交报告';
//                             break;
//                         case 4:
//                             var status = '待确认';
//                             break;
//                         case 5:
//                             var status = '待返款';
//                             break;
//                         case 6:
//                             var status = '已返款';
//                             break;
//                         case 7:
//                             var status = '未中奖';
//                             break;
//                         case 8:
//                             var status = '未接单';
//                             break;

//                     };
//                     if (e.data.info[i].status == 2) {
//                         var deliverGoodshtml = '<input class="f-fl courierNumber' + i + '" style="width:90px" placeholder="请填写快递单号"></input>' + '<a class="orderlistbtn" href="###" onclick="deliverGoods(' + e.data.info[i].id + ',' + e.data.info[i].uid + ',' + i + ')"> 提交</a>';
//                     } else if (e.data.info[i].status == 4) {
//                         var deliverGoodshtml = '<a class="orderlistbtn" href="###" style="border:1px solid #ff464e!important" onclick="agreeReturn(' + e.data.info[i].id + ',' + e.data.info[i].uid + ',' + 1 + ')"> 确认</a>'
//                         var deliverGoodshtml = deliverGoodshtml + '<a class="orderlistbtn" style="color:#ff464e;background-color:white;border:1px solid #ff464e!important" href="###" onclick="agreeReturn(' + e.data.info[i].id + ',' + e.data.info[i].uid + ',' + 2 + ')"> 取消</a>'
//                     } else {
//                         var deliverGoodshtml = ''
//                         console.log("deliverGoodshtml")
//                     }
//                     var html = ' <ul class="f-cb orderct">' +
//                         '<li class="f-fl time">' + e.data.info[i].createTime + '</li>' +
//                         '<li class="f-fl xwcid">' + e.data.info[i].uid + '</li>' +
//                         '<li class="f-fl wwname lim-w"><span title="">' + e.data.info[i].taobao + '</span></li>' +

//                         '<li class="f-fl ordertype f-pr">' + e.data.info[i].order_number +
//                         '</li>' +
//                         '<li class="f-fl orderstatus orderstatus' + i + '">' + status +
//                         '<br>' +
//                         '<span style="color: #EAC100;" title="快递单号">' +
//                         '</li>' + deliverGoodshtml +
//                         '<li class="f-fl apply"></li> <li class="f-fr">' +
//                         '<a class="orderdetail" href="./Orderdetail.html?orderid=' + e.data.info[i].id + '&uid=' + e.data.info[i].uid + '" title="点击查看">订单详情</a>' +
//                         '</li>' +
//                         '</ul>';

//                     $(".orderlist").append(html);
//                 }
//             }
//         }
//     })

// }

function agreeReturn(oid, uid, type) {
    var token = localStorage.getItem("token"); {
        var url = "http://api.feizhugou.com/order/agreeReturn";
        // var type = parseS(type);
        $.ajax({
            url: url,
            type: "POST",
            dataType: "json",
            async: true,
            data: {
                oid: oid,
                uid: uid,
                type: type
            },
            headers: {
                'Accept': 'aplication/json',
                'Authorization': '' + token
            },
            success(e) {
                if (e.code == 1000) {
                    location.reload();
                }
            }
        })
    }
}

function getApplyMoney(){
    var token = localStorage.getItem("token");
     var searchURL = window.location.search;
            searchURL = searchURL.substring(1, searchURL.length);
            console.log(searchURL);
            var orderid = searchURL.split("&")[0].split("=")[1];   
    var url = "http://api.feizhugou.com/activity/getPayInfo/" + orderid;
    $.ajax({
        url: url,
        type: "GET",
        dataType: "json",
        async: true,
        data: {
          
        },
        headers: {
            'Accept': 'aplication/json',
            'Authorization': '' + token
        },
        success: function(e) {
            if (e.code == 1000) {
                console.log(e)
                $("#paymoney_id").text(e.data.info.totalPay);
                $("#reUserBalance").text(e.data.balance);
            }
        }
    })
}

function deliverGoods(oid, uid, i) { //发货    
    var token = localStorage.getItem("token");
    var courierNumber = $(".courierNumber" + i).val();
    console.log(courierNumber)
    var url = "http://api.feizhugou.com/order/deliverGoods"
    $.ajax({
        url: url,
        type: "POST",
        dataType: "json",
        async: true,
        data: {
            oid: oid,
            uid: uid,
            courierNumber: courierNumber
        },
        headers: {
            'Accept': 'aplication/json',
            'Authorization': '' + token
        },
        success: function(e) {
            if (e.code == 1000) {
                // myConfirm('提交成功！', function {
                //     console.log("aaa")
                // })
                // return status = '待提交报告';
                // $(".courierNumber" + i).css("readonly", true);
                // $(".orderstatus" + i).text('待提交报告');
                // $(".orderstatus" + i).val('待提交报告');

                // console.log('待提交报告');
                // console.log(".orderstatus" + i);
                location.reload();
            } else {
                alert(e.msg)
            }
        }
    })

}

function toVip(){
    var isFirst = localStorage.getItem("isFirst");
    if(isFirst == 0){
        myAlert("您还不是VIP，是否了解一下VIP",function() {
            location.href = "./ApplyVip.html";
        });
    }
}

function loginSubmit(type, returnurl) {
    var username, password, submitbtn, error;
    if ($('.tchs').length > 0 && $('.tchs').is(':visible')) {
        username = $('.tchs #username');
        password = $('.tchs #password');
        submitbtn = $('.tchs #submitbtn');
        error = $('.tchs #error');
    } else {
        username = $('#username');
        password = $('#password');
        submitbtn = $('#submitbtn');
        error = $('#error');
    }
    if (username.val() == '') {
        error.text('请输入账号');
        error.show();
        username.focus();
    } else if (password.val() == '') {
        error.text('请输入密码');
        error.show();
        password.focus();
    } else {
        error.hide();
        submitbtn.val('登录中...');
        submitbtn.attr("disabled", "disabled");


        $.post('http://api.feizhugou.com/users/login', {
            username: username.val(),
            password: password.val(),
            type: type,
            returnurl: returnurl
        }, function(d) {
            if (d.code == '1000') {
                location.href = "./index.html";
                localStorage.setItem("token", d.data.token);
                localStorage.setItem("userid", d.data.uid);
                localStorage.setItem("isFirst", d.data.isFirst);
                localStorage.setItem("username", username[0].value);


                var token = d.data.token;
                var userid;
                console.log(token);
                setCookie('token', token, 365);
                console.log("cookie设置了");
                console.log(d);

                // console.log(d);
            } else if (d.userid != null) {
                // location.href = "http://www.meilipa.com/Login/BindAccount?userId=" + d.userid;
            } else {
                console.log("登录失败")
                error.text(d.msg);
                error.show();
                submitbtn.removeAttr('disabled');
                submitbtn.val('登录');
            }
        });
    }
}

function logout() {
    if (localStorage.getItem('token')) {
        localStorage.removeItem('token');
        localStorage.removeItem('isFirst');
        localStorage.removeItem('userid');
        localStorage.removeItem('username');
        checklogin();
    }
}

function checklogin() {
    if (localStorage.getItem('token')) {

    } else {
        location.href = "./login.html"
    }
    console.log("执行了checklogin")
}

function regsubmit() {
    $("#einfo_form").Validform({
        tiptype: 3,
        datatype: {
            "must": function(gets, obj, curform, regxp) {
                var chk = curform.find("#protocol");
                var checked = chk.attr("checked");
                return (checked == "checked");
            }
        }
    });
    regerror = $(".Validform_wrong").length;

    if (regerror < 1) {
        console.log(regerror)
        isSubmiting = false;
        beforeSubmit();
        var phone = $("#mobile-lk").val();
        var password = $("#bisRegister3").val();
        var code = $("#biscode").val();
        $.post('http://api.feizhugou.com/users/register', {
                type: 1,
                phone: phone,
                password: password,
                code: code,
            },
            function(data) {


                if (data.code == 1000) {
                    myAlert("注册成功", function() {
                        location.href = "./index.html";
                    });
                } else {
                    var src = $("#captcha_img").attr("src");
                    $("#captcha_img").attr("src", src + "?randstamp=" + new Date().getTime());
                    myAlert(data.msg);
                    isSubmiting = false;
                    $('#submit').val('提交');
                }

            })
    }
};

function beforeSubmit() {
    if (isSubmiting) {
        return false;
    }
    isSubmiting = true;
    $('#submit').val('注册中...');
    return true;
}

function getpaymoney() {
    var token = localStorage.getItem("token");
    var searchURL = window.location.search;
    searchURL = searchURL.substring(1, searchURL.length);

    var aid = searchURL.split("&")[0].split("=")[1];

    if (typeof(aid) == "undefined") {
        alert("无可支付的活动");
        location.href = "./JPinShopissueBis.html?ptype=1&atype=5"
    } else {
        var url = "http://api.feizhugou.com/activity/payMoney/" + aid
        $.ajax({
            url: url,
            type: "GET",
            // dataType: "json",
            // async: true,
            headers: {
                'Accept': 'aplication/json',
                'Authorization': '' + token
            },
            success: function(e) {
                if (e.code == 1000) {
                    $(".current-money").text(e.data.payMoney)
                } else {
                    alert(e.msg)
                }
            }
        })
    }
}

function becomevipsub() {
    var token = localStorage.getItem("token");
    var money = $(".current-money").text();
    if ($(".btn.act").text() == '专业年费VIP') {
        var type = 1
    } else if ($(".btn.act").text() == '标准年费VIP') {
        var type = 2
    } else if ($(".btn.act").text() == '入门年费VIP') {
        var type = 3
    };

    console.log(money)
    console.log(type)
    $.ajax({
        url: "http://api.feizhugou.com/pay/vip",
        type: "POST",
        dataType: "json",
        async: true,
        data: {
            type: type,
            money: money
        },
        headers: {
            'Accept': 'aplication/json',
            'Authorization': '' + token
        },
        success: function(e) {
            if (e.code == 1000) {
                myConfirm("支付成功！", function() {
                    location.href = './JPinShopissueBis.html?ptype=1&atype=5'
                })

            } else {
                alert(e.msg)
            }
        }
    })

}

function applyvipsub() {
    var token = localStorage.getItem("token");
    var searchURL = window.location.search;
    searchURL = searchURL.substring(1, searchURL.length);
    var type = $('input[name="payment"]:checked').val();  
    console.log(type)
    var aid = searchURL.split("&")[0].split("=")[1];
    console.log(aid)
    $.ajax({
        url: "http://api.feizhugou.com/pay/activity",
        type: "POST",
        dataType: "json",
        async: true,
        data: {
            aid: aid,
            type: type

        },
        headers: {
            'Accept': 'aplication/json',
            'Authorization': '' + token
        },
        success: function(e) {
            if (e.code == 1000) {
                location.href = './JPinShopissueBis.html?ptype=1&atype=5'
            } else {
                alert(e.msg)
            }
        }
    })

}

function getBisdata() {
    var token = localStorage.getItem("token");
    var username = localStorage.getItem("username");
    $(".top-nickname").text(username);
    // $.ajaxSetup({
    //     headers: {
    //         'HTTP_AUTHORIZATION': token
    //     }
    // });
    console.log("执行了getBisdata")

};


//绑定店铺
function getshop() {
    var token = localStorage.getItem("token");
    console.log("执行了getshop ")
    $.ajax({
        url: "http://api.feizhugou.com/shops",
        type: "GET",
        dataType: "json",
        async: true,
        data: $('#item_form').serialize(),
        headers: {
            'Accept': 'aplication/json',
            'Authorization': '' + token
        },
        success: function(e) {
            console.log(e)
            if (e.code == 1000 & e.data.shopName !== 'undefine') {
                for (var i = 0; i < e.data.length; i++)
                    $("#shoptable").append('<tr style="border-bottom: 1px solid #eff1f0">' +
                        '<td style="text-align: center">' +
                        '<p style="width: 100.5px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; word-break: break-all">天猫/淘宝</p>' +
                        '</td>' +
                        '<td style="padding: 10px 0;text-align: center">' +
                        '<p style="width: 126.5px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; word-break: break-all">' + e.data[i].shopName + '</p>' +
                        '</td>' +
                        '<td style="text-align: center">' +
                        '<p style="width: 151px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; word-break: break-all">' + e.data[i].talkNum + '</p>' +
                        '</td>' +
                        '<td style="text-align: center">' +
                        '<p style="width: 226.5px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; word-break: break-all">' + e.data[i].shopUrl + '</p>' +
                        ' </td>' +
                        ' <td style="text-align: center">' +
                        ' <p style="width: 151px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; word-break: break-all">' + e.data[i].createTime + '</p>' +
                        ' </td>' +
                        '</tr>')
                // $("#shoptable").append(html);
                // $("#buyshop").css('display', '');//购买店铺按钮
                console.log("append");
                $("#boundedNum").text(e.data.length);
                $("#addshop").css('display', '');

            } else {
                $("#addshop").css('display', '');
            }

        },
        error: function(data) {

        }
    })
}

function uploadPic() {
    // 上传设置  
    var options = {
        // 规定把请求发送到那个URL  
        url: "http://api.feizhugou.com/upload",
        // 请求方式  
        type: "post",
        // 服务器响应的数据类型  
        dataType: "json",
        // 请求成功时执行的回调函数  
        success: function(data, status, xhr) {
            // 图片显示地址  
            $("#allUrl").attr("src", data.path);
        }
    };

    $("#jvForm").ajaxSubmit(options);
}

function getshopname() {
    var token = localStorage.getItem("token");
    console.log("执行了getshopname ")
    $.ajax({
        url: "http://api.feizhugou.com/shops",
        type: "GET",
        dataType: "json",
        async: true,
        data: $('#item_form').serialize(),
        headers: {
            'Accept': 'aplication/json',
            'Authorization': '' + token
        },
        success: function(e) {
            if (typeof(e.data[0].shopName) !== 'undefined') {
                for (var i = 0; i < e.data.length; i++) {   
                    $("#sk_shop_name").append("<option value='" + e.data[i].shopName + "'>" + e.data[i].shopName + "</option>");
                }
                
            }

        }
    })
}

function getReShop(){
    var token = localStorage.getItem("token");
    console.log("执行了getshopname ")
    $.ajax({
        url:"http://api.feizhugou.com/shops",
        type: "GET",
        dataType: "json",
        async: true,
        data: $('#item_form').serialize(),
        headers: {
            'Accept': 'aplication/json',
            'Authorization': '' + token
        },
         success: function(e) {
            var shopslength =1;
            if (typeof(e.data[0].shopName) !== 'undefined') {
                console.log(123)
                myShops = e.data;
                shopTB = [];
                shopJD = [];
                console.log(myShops)   
                e.data.map(item => {if (item.platformType == 1) {shopTB.push(item)}
                                else if (item.platformType == 2){shopJD.push(item)}
            })

            }else{
                shopslength=0
            }

        }
    })
}

function getShop(){
    if (1) {
        console.log($('input[name="sk_tag_level"):checked').val());
    }
}

function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }

    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
    // + " " + date.getHours() + seperator2 + date.getMinutes()
    // + seperator2 + date.getSeconds();
    // return currentdate;\


    var date2 = new Date(date);
    date2.setDate(date.getDate() + 7);
    // var currentdate2 = date2.getFullYear() + "-" + (date2.getMonth() + 1) + "-" + date2.getDate();
    var month2 = date2.getMonth() + 1;
    var strDate2 = date2.getDate();
    if (month2 >= 1 && month2 <= 9) {
        month2 = "0" + month2;
    }
    if (strDate2 >= 0 && strDate2 <= 9) {
        strDate2 = "0" + strDate2;
    }

    var currentdate2 = date2.getFullYear() + seperator1 + month2 + seperator1 + strDate2;
    $("#begindate").val(currentdate);
    $("#enddate").val(currentdate2)

}



// function initkeyword() {
//     $(".key-word-icon").off("click");
//     $(".key-word-icon").on("click", function() {
//         var flag = $(this).hasClass("icon-remove");
//         if (flag) {
//             $(this).parents(".item-con").remove();
//         } else {
//             if (vipType == '-1') {
//                 if ($(this).parents(".key-word").find(".item-con").length >= 7) {
//                     alert("关键词最多只能有5个");
//                     return false;
//                 }
//             }
//             if (vipType == '0') {
//                 if ($(this).parents(".key-word").find(".item-con").length >= 7) {
//                     alert("关键词最多只能有5个");
//                     return false;
//                 }
//             } else if (vipType == '2') {
//                 if ($(this).parents(".key-word").find(".item-con").length >= 10) {
//                     alert("关键词最多只能有8个");
//                     return false;
//                 }
//             } else {
//                 if ($(this).parents(".key-word").find(".item-con").length >= 12) {
//                     alert("关键词最多只能有10个");
//                     return false;
//                 }
//             }
//             var html = $(this).parents(".item-con").html();
//             html = html.replace("icon-add", "icon-remove");
//             html = '<div class="item-con mb10">' + html + '</div>';
//             $("#key-list").append(html);
//             var index = $("#key-list").find("input.w150") - 2;
//             $("#key-list").find("input.w150").eq(index).val("");
//             bindWordIcon();
//         }
//     })
// };

function getCode() {
    var code;
    $.get('http://api.feizhugou.com/shops/getCode',
        function(d) {
            if (d.code = 1000) {
                var code = d.data.code;
                console.log(code)
                $(".code").val(code);
            }
        });

}



function initUserRegist() {
    // $("#regform").Validform({
    //     tiptype: 3,
    // });
    var isSubmiting = false;
    $("#regform").ajaxForm({
        beforeSubmit: function() {
            if (isSubmiting) {
                return false;
            }
            isSubmiting = true;
            $('#regsubmitbtn').html('注册中...');
            return true;
        },
        success: function(data) {
            if (!data.Result) {
                myAlert(data.Message);
                isSubmiting = false;
                $('#regsubmitbtn').html('提交');
            } else {
                location = location;
            }
        }
    });
}



function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg); //匹配目标参数
    if (r != null) return unescape(r[2]);
    return null; //返回参数值
}

function alertTxMsg() {
    myDialog({
        msg: "会员可免费发布活动还有多关键词和防IP功能哦！",
        okText: "开通会员",
        ok: function() {
            window.open("/VIP/ApplyVip");
        },
        cancelText: "暂不开通"
    });
}

function changeVip() {
    myDialog({
        msg: "亲，只有钻石年费VIP和铂金年费VIP<br/>才可以使用此功能哦!",
        okText: "开通会员",
        ok: function() {
            window.open("/VIP/ApplyVip");
        },
        cancelText: "取消"
    });
}

function HasTxianNum(url, backurl) {
    var txnum =localStorage.getItem("txnum")
    if (txnum.length > 0) {
        location.href = url;
    } else {
        myDialog({
            msg: '您还未绑定提现账号，绑定后才能提现哦^_^',
            okText: "去绑定",
            ok: function() {
                window.open(backurl);
            },
        });
    }
}

function TestchangeVip() {
    myDialog({
        msg: "只有钻石年费VIP和铂金年费VIP<br/>才可以使用此功能哦！",
        okText: "开通会员",
        ok: function() {
            window.open("/VIP/ApplyVip");
        },
        cancelText: "取消"
    });
}


function alertRaMsg(i) {
    $(i).attr("checked", false);
    $("#noc2").attr("checked", true);
    myDialog({
        msg: "只有钻石年费才可以使用此功能哦！", //铂金年费和
        okText: "开通会员",
        ok: function() {
            location.href = '/VIP/ApplyVip';
        }
    });
}

function alertcbMsg(i) {
    $(i).attr("checked", false);
    var message = "只有年费VIP才可以使用此功能哦！";
    if ($(i).attr("title") == "防IP地址重复") {
        message = "只有钻石年费VIP和铂金年费VIP<br/>才可以使用此功能哦！";
    }
    myDialog({
        msg: message,
        okText: "开通会员",
        ok: function() {
            location.href = '/VIP/ApplyVip';
        }
    });
}

function alertRZMsg(i) {
    $(i).attr("checked", false);
    myDialog({
        msg: "只有年费才可以使用此功能哦！",
        okText: "开通会员",
        ok: function() {
            location.href = '/VIP/ApplyVip';
        }
    });
}

function initGoToTop() {
    $(window).scroll(function() {
        if ($(window).scrollTop() > 100 && $('.floattips').length == 0) {
            $("#back-to-top").fadeIn(500);
        } else {
            $("#back-to-top").fadeOut(500);
        }
    });
    //当点击跳转链接后，回到页面顶部位置
    $("#back-to-top").click(function() {
        $('body, html').animate({
            scrollTop: 0
        }, 200);
        return false;
    });
}

String.prototype.trim = function() {
    return this.replace(/(^\s*)|(\s*$)/g, "");
};

function addbalcklist(userid) {
    if (confirm("如虚假单号、恶意退款用户可加入黑名单。加入黑名单后，该用户将不能申请您发布的活动")) {
        $.post('/BlackList/Add', {
            userId: userid
        }, function(d) {
            myAlert(d.Message);
        });
    }
}

function initCheckAll() {
    if ($("#chkall").length > 0) {
        $("#chkall").click(function() {
            if (this.checked) {
                $("input[name='id']").each(function() {
                    if (!this.disabled) {
                        this.checked = true;
                    };
                });
            } else {
                $("input[name='id']").each(function() {
                    if (!this.disabled) {
                        this.checked = false;
                    };
                });
            }
        });
    }
    if ($("#ll_group").length > 0) {
        $("#ll_group").hover(function() {
            $("#ll_group").attr("src", "../../Content/images/group.png");
        }, function() {
            $("#ll_group").attr("src", "../../Content/images/group_.png");
        });
    }
}

function login() {
    if (window.location.host == "www.nouqu.com") {
        var from = getUrlParam("fromothersite");
        if (from != null) {
            location.href = 'http://www.meilipa.com/login?fromothersite=' + from;
        } else {
            location.href = 'http://www.meilipa.com/login';
        }
        return;
    }
    $('#logindialog').show();
}



function qqLogin() {
    var url = 'http://www.meilipa.com/qqlogin?returnurl=' + window.location;
    if (window.location.host == "www.nouqu.com") {
        var from = getUrlParam("fromothersite");
        if (from != null) {
            location.href = url + '&fromothersite=' + from;
        } else {
            location.href = url;
        }
        return;
    }
    window.open(url, '', 'scrollbars=yes,top=100,left=500,resizable=no,status=no,toolbar=no,menubar=no,location=no,width=450,height=600');
}

function WxLogin() {
    var url = '/Login/WeiXinLogin?returnurl=' + window.location;
    //if (window.location.host == "www.linb2c.com") {
    //    var from = getUrlParam("fromothersite");
    //    if (from != null) {
    //        location.href = url + '&fromothersite=' + from;
    //    } else {
    //        location.href = url;
    //    }
    //    return;
    //}
    window.open(url, '', 'scrollbars=yes,top=100,left=500,resizable=no,status=no,toolbar=no,menubar=no,location=no,width=450,height=600');
}

function signin() {
    checkLogin(function() {
        if ($('#signbtn').text().indexOf("签到领金币") >= 0) {
            $.post('/CommonBase/SignIn', function(data) {
                $('#signbtn').text('签到成功');
                $('.qiandao').addClass('qiandaog');
                $('.qian_s').text('明日再来');
                $('.qian_t:first').addClass("signd");
                $('.qian_v span').text($('.qian_t').eq(1).find('span').text().replace("+", ""));
                $(".qian_t").eq(0).addClass("signd");
            });
        }
    });
}

function checkLogin(callback) {
    if (userId == 0) {
        login();
    } else {
        callback();
    }
}

function checkAllLogin(callback) {
    if (userOrBisId == 0) {
        location.href = '/login';
    } else {
        callback();
    }
}

//两行显示，第一行自动换行，第二行显示不下用省略号
function initTwoLines() {
    $(".two-lines").each(function() {
        var $this = $(this);
        var _width = $this.css("width"),
            width = parseInt(_width.substring(0, _width.length - 2)); //显示框的长度
        var _text = $this.text();
        var tot = 0.0,
            str = _text,
            add = $this.css("font-size"),
            num = parseInt(add.substring(0, add.length - 2)); //字或字母的长度
        var _char;
        num += $this.css("font-weight") == "bold" ? 1 : 0;
        for (var i = 0; i < _text.length; ++i) {
            _char = _text.charCodeAt(i);
            if (_char >= 0 && _char <= 128) tot += num / 2;
            else tot += num;
            console.log("tot: " + tot);
            if (tot >= width) {
                str = _text.substring(0, i) + "<br />" + _text.substring(i);
                break;
            }
        }
        $this.html("<nobr>" + str + "</nobr>");
        console.log("width: " + width);
    });
}

//关键词验证
function KeywordsValidation(str) {
    var tag = false;
    var arr = ["试客联盟", "一块邮", "亿众天下", "天客联盟", "美晒网", "试客之家", "试客部落", "试用联盟", "试客之家", "搜道", "亏猫", "美女时钟", "汇折网", "折点看", "平台", "销量", "累积", "流量", "平.台", "流.量", "效.果", "流-量", "效-果", "流.量", "报名", "联", "差距", "降权", "流0量", "（一，块，邮）"];
    var strArr = ["yikuaiyou", "yizhongtianxia", "shikezj", "shiyonglianmeng", "shikezhijia", "ab", "skzj", "dsr", "uv", "mfmdx"];
    if (str.trim() != "如：在线等，通过后立即下单") {
        for (var i = 0; i < arr.length; i++) {
            if (str.indexOf(arr[i]) != -1) {
                tag = true;
                break;
            }
        }
        if (tag == false) {
            var s = str.toLowerCase();
            for (var j = 0; j < arr.length; j++) {
                if (s.indexOf(strArr[j]) != -1) {
                    tag = true;
                    break;
                }
            }
        }
    }
    if (tag) {
        var content = '<span style="color: #666">亲，禁止提交试用网站相关词汇</span><br />' +
            '<span style="color: #fd5340">介绍一名商家到飞猪试用奖励50元哦</span><br />' +
            '<span style="color: #666">获取奖励联系QQ：800009450</span>';
        myDialog({
            msg: content
        });
    }
    return tag;
}

function myAlipay() {
    var txt = $('#PayPriceSum').html();
    window.open("/myalipay/?money=" + txt + "&type=1");
}

function OpenWindow(url, height, width, closed) {
    $.fancybox.open({
        modal: true,
        autoSize: false,
        height: height,
        width: width,
        type: 'iframe',
        closeBtn: false,
        href: url,
        iframe: {
            scrolling: 'no'
        },
        padding: 0,
        minHeight: 0,
        beforeClose: closed
    });
}

function CloseWindow() {
    window.parent.$.fancybox.close();
}

function clearNoNumFloat(obj) {
    obj.value = obj.value.replace(/[^\d.]/g, ""); //清除“数字”和“.”以外的字符 
    obj.value = obj.value.replace(/^\./g, ""); //验证第一个字符是数字而不是. 
    obj.value = obj.value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的.   
    obj.value = obj.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
}

function IsIntNum(obj) {
    var val = obj.value;
    var one = val.substr(0, 1);
    obj.value = one != '-' ? (parseInt(val) || '0') : one + (parseInt(val.substr(1, val.length)) || '0');
}

//iframe自适应高度
function ifr_auto_height(ifm) {
    ifm.style.height = ifm.contentWindow.document.documentElement.scrollHeight + 'px';
}

function SetCwinHeight(frameid) {
    var iframeid = document.getElementById(frameid); //iframe id 
    if (document.getElementById) {
        if (iframeid && !window.opera) {
            if (iframeid.contentDocument && iframeid.contentDocument.body.offsetHeight) {
                iframeid.style.height = iframeid.contentDocument.body.offsetHeight + 20 + 'px';
            } else if (iframeid.Document && iframeid.Document.body.scrollHeight) {
                iframeid.style.height = iframeid.Document.body.scrollHeight + 20 + 'px';
            }
        }
    }
}

function LedFuDai() {
    $('#popup').hide();
    $.post("/CommonBase/LedFuDai", function(data) {
        if (data.Result)
            myDialog({
                msg: '恭喜获得2元福袋',
                okText: '去看看',
                ok: function() {
                    window.open('http://www.meilipa.com/userindex');
                }
            });
    });
}

function myDialog(options) {
    $('#linglamsg').remove();
    var defaults = {
        msg: "",
        okText: "确定",
        cancelText: null,
        ok: function() {
            $('#linglamsg').remove();
        },
        cancel: function() {
            $('#linglamsg').remove();
        },
        close: function() {
            $('#linglamsg').remove();
        }
    };
    options = $.extend(defaults, options);
    var btn = options.cancelText == null ? '<a id="okbtn" href="javascript:" class="qdingann" >' + options.okText + '</a>' : '<a href="javascript:" id="okbtn" class="qdingann qdingann_a" >' + options.okText + '</a>' +
        '<a href="javascript:" id="cancelbtn" class="qdingann qdingann_b">' + options.cancelText + '</a>';
    var html = '<div class="tchs" id="linglamsg">' +
        '<div style="position:relative;width:100%;height:100%">' +
        '<div id="msgbox" class="lila_index" style="position:absolute;top:50%;left:50%;">' +
        '<div class="ling">' +
        '<strong style="margin:0px" ><img style="height:35px;"  src="/Content/images/user_logoone.png" /></strong> ' +
        '<a style="cursor: pointer"><img src="http://www.meilipa.com/Content/images/xx.jpg" /></a>' +
        '</div>' +
        '<div class="ling_mian">' +
        '<div class="sy_cgt">' + options.msg + '</div>' +
        btn +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>';
    $('body').append(html);
    $('#msgbox').css("margin-top", -$('#msgbox').height() / 2);
    $('#msgbox').css("margin-left", -$('#msgbox').width() / 2);
    $('.ling a').bind('click', function() {
        options.close();
    });
    $('#okbtn').bind('click', function() {
        options.ok();
        options.close();
    });
    $('#cancelbtn').bind('click', function() {
        options.cancel();
        options.close();
    });
    if (options.cancelText == "取消") {
        $("#cancelbtn").css("background-color", "#999");
    }
}

function myAlert(message, callback) {
    $('#linglamsg').remove();
    var html = '<div class="tchs" id="linglamsg">' +
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
        $('#linglamsg').remove();
    });
    $('.ling a').bind('click', function() {
        $('#linglamsg').remove();
    });
}

function myConfirm(message, callback, callback2) {
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
        $('#linglamsg').remove();
    });
    $('.qdingann_b').bind('click', function() {
        if (callback2 != null)
            callback2();
        $('#linglamsg').remove();
    });

}

function myPrompt(callback) {
    $('#linglamsg').remove();
    var html = '<div class="tchs" id="linglamsg">' +
        '<div style="position:relative;width:100%;height:100%">' +
        '<div id="msgbox" class="lila_index" style="position:absolute;top:50%;left:50%;">' +
        '<div class="ling">' +
        '<strong style="margin:0px" ><img style="height:35px;"  src="/Content/images/user_logoone.png" /></strong> ' +
        '<a style="cursor: pointer" onclick="$(\'#linglamsg\').remove()"><img src="http://www.meilipa.com/Content/images/xx.jpg" /></a>' +
        '</div>' +
        '<div class="ling_mian">' +
        '<div class="sy_cgt">' +
        '<textarea style="width:300px;height:150px"></textarea>' +
        '</div>' +
        '<a href="javascript:" class="qdingann qdingann_a" >确定</a>' +
        '<a href="javascript:" onclick="$(\'#linglamsg\').remove()" class="qdingann qdingann_b" style="background-color:#999;">取消</a>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>';
    $('body').append(html);
    $('#msgbox').css("margin-top", -$('#msgbox').height() / 2);
    $('#msgbox').css("margin-left", -$('#msgbox').width() / 2);
    $('.qdingann_a').bind('click', function() {
        var text = $('.ling_mian .sy_cgt textarea').val();
        if (text == '') {
            alert('请输入内容');
            return;
        }
        callback(text);
        $('#linglamsg').remove();
    });
}

function clickNumber(id) {
    $.post("/CommonBase/AddAdvClickCount", {
        id: id
    });
}

function keyLogin(evt) {
    evt = window.event || evt;
    if (evt.keyCode == 13) //回车键的键值为13
        loginSubmit(1, location.href); //调用登录按钮的登录事件
}

function keySearch(evt) {
    evt = window.event || evt;
    if (evt.keyCode == 13) //回车键的键值为13
        searchGoods(); //调用登录按钮的登录事件
}

function searchGoods() {
    var goodsName = $("#searchText").val();
    if (goodsName != "") {
        window.open("http://jing.meilipa.com?ck=" + goodsName);
    } else {
        window.open("http://jing.meilipa.com");
    }
}

function keyPress() {
    var keyCode = event.keyCode;
    if ((keyCode >= 48 && keyCode <= 57)) {
        event.returnValue = true;
    } else {
        event.returnValue = false;
    }
}