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
        $.post('/CommonBase/LoginSubmit', {
            username: username.val(),
            password: password.val(),
            type: type,
            returnurl: returnurl
        }, function(d) {
            if (d.success) {
                location.href = d.jumpUrl;
            } else if (d.userid != null) {
                location.href = "http://www.meilipa.com/Login/BindAccount?userId=" + d.userid;
            } else {
                error.text(d.message);
                error.show();
                submitbtn.removeAttr('disabled');
                submitbtn.val('登录');
            }
        });
    }
}

function initUserRegist() {
    $("#regform").Validform({
        tiptype: 3,
    });
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