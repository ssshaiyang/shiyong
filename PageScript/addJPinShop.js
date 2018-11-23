var adviceAllNum = 0;
$(function() {
    initValidform(); //初始化验证form
    initajaxForm(); //初始化提交验证form，例form提交失败会执行某个函数
    //iniValueIcon("#rated_addkw");
    //iniValueIcon("#access-keyword");
    addValueIcon(); //设置评价关键词
    bindWordIcon(); //添加关键词初始化

    priini(); //增值费价格
    //初始化需要份数
    
    iniAllNum(); //初始化总份数
    var type = getUrlParam("type");
    if (type == "1") {
        selectMenu('#openWindows35');
    } else if (type == "2") {
        selectMenu('#openWindows36');
    } else {}

    //初始化类型
    $(".jp-watch dt").removeClass("act");
    $(".jp-watch").find("dt[data-type=" + skType + "]").addClass("act");
    if (skType == 4) {
        $("#GroupPrize").css("display", "block");
    } else {
        $("#GroupPrize").css("display", "none");
    }
    $(".jp-watch dd").removeClass("act").eq($(".jp-watch dt.act").index()).addClass("act");
    if ($(".jp-watch dt.act").index() == "2") {
        $(".kt").fadeIn();
    } else {
        $(".kt").fadeOut();
    }
    var numArr = [49, 42, 28, 21, 35, 28, 21, 14, 35, 28, 21, 14, 21, 14];

    //初始化Vip份数
    if (isVip == "True") {
        for (var i = 0; i < numArr.length; i++) {
            $(".alt-num").eq(i).html(numArr[i]);
        }
    } else {
        $("#renqunbq input").attr("disabled", "disabled");
        $("#renqunbq input").removeAttr("datatype");
    }
    advise(true); //初始化建议份数
    if (!JPinNumArr) {
        if ($("#begindate").val() == $("#enddate").val()) {
            var date2 = new Date($("#begindate").val());
            date2.setDate(date2.getDate() + 6);
            var time2 = date2.getFullYear() + "-" + (date2.getMonth() + 1) + "-" + date2.getDate();
            $("#enddate").val(time2);
        }
    }

    //评价
    $("#sk_addkw_count").on("change", function() {
        if (($(this).val() - 0) > 0) {
            $(this).siblings(".add-value").fadeIn();
        } else {
            $(this).siblings(".add-value").fadeOut();
        }
    });
    //晒图
    $("#sk_keywords_count").on("change", function() {
        if (($(this).val() - 0) > 0) {
            $(this).siblings(".add-value").fadeIn();
        } else {
            $(this).siblings(".add-value").fadeOut();
        }
    });


    //初始化京东
    if ($("input[name='ptlei']:checked").val() == 1) {
        $(".jp-watch").addClass("jd").find("dt").eq(0).click();
        $("#ptText1").html('<span>*</span>京东价：');
        $("#ptText2").text('京东搜索展示价');
        $("#ptText3").text('咚咚聊天：');
        $("#ptText6").text('咚咚聊天');
        $("#ptText5").hide();
        $("#ptText4").fadeOut();
        $(".ptText7").text('宝贝链接');
        $("#ptText8").hide();
        $(".jp-watch dt").eq(0).html('快速提升销评/排名<i class="iconfont icon-gou"></i>');
        $(".jp-watch dt").eq(1).hide();
        $(".jp-watch dt").eq(3).hide();
        $(".jp-watch dt").eq(4).hide();
        $("#ptText9").hide();
        $(".ptText10").text("1、咚咚聊天，2、指定评价，3.、晒图评价，、4、追评评价+晒图，、5、多天追评；");
        $(".ptText11").text("白条");
    }

    //修改平台类型，京东淘宝，
    $("input[name='ptlei']").on("change", function() {
        if ($(this).val() == 1) {
            $(".jp-watch dt").eq(0).html('快速提升销评/排名<i class="iconfont icon-gou"></i>');
            $(".jp-watch dt").eq(1).hide();
            $(".jp-watch dt").eq(3).hide();
            $(".jp-watch dt").eq(4).hide();
            $(".jp-watch").addClass("jd").find("dt").eq(0).click();
            $("#ptText1").html('<span>*</span>京东价：');
            $("#ptText2").text('京东搜索展示价');
            $("#ptText3").text('咚咚聊天：');
            $("#ptText6").text('咚咚聊天');
            $("#ptText5").hide();
            $("#ptText4").fadeOut();
            $(".ptText7").text('宝贝链接');

            $(".ptText11").text("白条");
            $("#ptText8").hide();
            $("#ptText9").hide();
            $(".ptText10").text("1、咚咚聊天，2、指定评价，3、晒图评价，4、追评评价+晒图，5、多天追评；");
            var html = ' <option value="">请选择</option>'
            var sortArr = ["综合排序", "新品优先", "评论数从高到低", "销量", "价格从高到低", "价格从低到高"];
            for (var i = 0; i < sortArr.length; i++) {
                html += ' <option value="' + sortArr[i] + '">' + sortArr[i] + '</option>'
            }
            $('select[name="app_sort_claim"]').html(html);
        } else {
            $(".jp-watch dt").eq(0).html('快速提升销评/排名<i class="iconfont icon-gou"></i>');
            $(".jp-watch dt").eq(1).hide();
            $(".jp-watch dt").eq(3).hide();
            $(".jp-watch dt").eq(4).hide();
            $(".jp-watch").addClass("jd").find("dt").eq(0).click();
            $("#ptText1").html('<span>*</span>京东价：');
            $("#ptText2").text('京东搜索展示价');
            $("#ptText3").text('咚咚聊天：');
            $("#ptText6").text('咚咚聊天');
            $("#ptText5").hide();
            $("#ptText4").fadeOut();
            $(".ptText7").text('宝贝链接');

            $(".ptText11").text("白条");
            $("#ptText8").hide();
            $("#ptText9").hide();
            $(".ptText10").text("1、咚咚聊天，2、指定评价，3、晒图评价，4、追评评价+晒图，5、多天追评；");
            var html = ' <option value="">请选择</option>'
            var sortArr = ["综合排序", "新品优先", "评论数从高到低", "销量", "价格从高到低", "价格从低到高"];
            for (var i = 0; i < sortArr.length; i++) {
                html += ' <option value="' + sortArr[i] + '">' + sortArr[i] + '</option>'
            }
            $('select[name="app_sort_claim"]').html(html);
            // $(".jp-watch").removeClass("jd")
            // $(".jp-watch dt").eq(0).html('爆款打造/维护<i class="iconfont icon-gou"></i>');
            // $(".jp-watch dt").eq(1).show();
            // $(".jp-watch dt").eq(3).show();
            // $(".jp-watch dt").eq(4).show();
            // $("#ptText1").html('<span>*</span>一口价：');
            // $("#ptText2").text('淘宝搜索展示价 ');
            // $("#ptText3").text('旺旺聊天：');
            // $("#ptText6").text('旺旺聊天：');
            // $("#ptText4").fadeOut();
            // $("#ptText5").show();
            // $(".ptText7").html("淘口令");
            // $(".ptText11").text("白条");
            // $("#ptText8").show();
            // $("#ptText9").show();
            // $(".ptText10").text("1、手淘问大家，2、旺旺聊天，3、指定评价，4、晒图评价，5、追评评价+晒图，6、多天追评；");
            // var html = ' <option value="">请选择</option>';
            // var sortArr = ["综合", "销量", "人气", "信用", "价格"];
            // for (var i = 0; i < sortArr.length; i++) {
            //     html += ' <option value="' + sortArr[i] + '">' + sortArr[i] + '</option>';
            // }
            // $('select[name="app_sort_claim"]').html(html);
        }
        $.post('/JPinShopissueBis/GetShopByType', {
            shopType: $(this).val()
        }, function(data) {
            var html = '<option value="">请选择</option>';
            for (var i = 0; i < data.Data.length; i++) {
                html += '<option value="' + data.Data[i].sk_shop_name + '">' + data.Data[i].sk_shop_name + '</option>';
            }
            $("#sk_shop_name").html(html);
            if (data.Data.length <= 0) {
                myAlert("没有绑定店铺，立即绑定", function() {
                    window.open('/Bis/BoundShopBis');
                });
            }
        });
    });



    //提交验证



    //编辑情况下每日份数
    if ((JPinNumArr.split(",")).length > 0) {
        timeChange(true);
    }
    //类型切换
    $(".jp-watch dt").on("click", function() {
        $("#sk_type").val($(this).attr("data-type"));
        if ($(this).attr("data-type") == 4) {
            $("#GroupPrize").css("display", "block");
            if (sk_act_priority == 1) {
                $("#sk_zutuan0").attr("checked", "true");
            } else if (sk_act_priority == 2) {
                $("#sk_zutuan1").attr("checked", "true");
            } else {
                $("#sk_zutuan0").attr("checked", "true");
            }
        } else {
            $("#GroupPrize").css("display", "none");
            $("#sk_zutuan0").removeAttr("checked");
            $("#sk_zutuan1").removeAttr("checked");
        }
        if ($(this).index() == "2") {
            $(".kt").fadeIn();
        } else {
            $(".kt").fadeOut();
        }
        $(this).addClass("act").siblings().removeClass("act");
        $(".jp-watch dd").removeClass("act").eq(parseInt($(this).index())).addClass("act");

        if (($("#sk_clinch_price").val() - 0) > 0) {
            $("#sk_clinch_price").trigger("change");
            timeChange();
        }

    });


    //上传图片
    var linkImgFlag = false; //图片

    //
    if (GetQueryString("id") || GetQueryString("fromid")) {
        $("#slide").slideDown(600);
        if (linkImgFlag) {
            return false;
        }
        linkImgFlag = true;
        $('#qrcodeTable').qrcode({
            render: "canvas",
            text: $("#sk-link").val(),
            width: "160", //二维码的宽度
            height: "160", //二维码的高度
            background: "#ffffff", //二维码的后景色
            foreground: "#000000", //二维码的前景色
        });
    }

    //提示语
    $(".alt2").on("click", function() {
        layer.tips($(this).data("text"), ".alt2", {
            tips: [3, '#78BA32'],
            time: 7000
        });
    });
    //提示语
    $(".alt1").on("click", function() {
        layer.tips($(this).data("text"), ".alt1", {
            tips: [3, '#78BA32'],
            time: 7000
        });
    });

    //追加晒图
    $("#sk_is_addappraise").on("click", function() {
        if ($(this).is(":checked")) {
            $("#add-con").slideDown();
        } else {
            $("#add-con").slideUp();
        }
    });

    ////追评关键词
    //$("#sk_keywords_count,#sk_rated_addkw_count").on("keyup", function () {
    //    if (($(this).val() - 0) > 0) {
    //        $(this).siblings(".add-value").fadeIn();
    //    } else {
    //        $(this).siblings(".add-value").fadeOut();
    //    }
    //});

    //券类型切换
    $('input[name="sk_VoucHer_Type"]').change(function() {
        if ($(this).val() == "1") {
            $("#quanUrl").hide();
        } else {
            $("#quanUrl").show();
        }
    });



    $('input[type="checkbox"]').change(function() {
        $(this).val($(this).attr("checked") ? true : false);
    });
    ////评价关键词出现
    $("#sk_is_rated").on("change", function() {
        var falg = $(this).is(':checked');
        if (falg) {
            $(".add-value").fadeIn(600);
        } else {
            $(".add-value").fadeOut(600);
        }
    });

    //淘气值
    $(".people-tq").on("click", function() {

        if ($(".people-tq:checked").length > 2) {
            myAlert("淘气值最多选择两个");
            return false;
        }
    });

    $(".slide-btn,.onepage-btn").on("click", function () {
        var falgBtn = $(this).hasClass("onepage-btn");//判断是下一步的按钮

        if (falgBtn) {
            var flag = checkForm($(".onepage"), false);
        } else {
            var flag = checkForm($(this).parent(), true);
            console.log("parenthidden")
        }

        if ($(this).hasClass("slide-link")) {//加载图片
         
        }

        if (falgBtn && flag) {//下一步按钮并验证成功显示下一页
            $(".onepage").hide();
            $(".twopage").show();
        } 
    })

    $(".open-slide").on("click", function () {
        $(this).parents(".slide-item").removeClass("slide-hide");
    })


    //职业
    $(".zt-job").on("click", function() {
        var jobnum = $(".zt-job:checked").length;
        if (jobnum > 3) {
            myAlert("最多只能勾选3个职业");
            return false;
        }
    });

    //无需旺旺聊天
    $("#sk_no_appraise_chart").on("click", function() {
        if ($(this).is(":checked")) {
            $("#sk_print_count").attr("readonly", "readonly");
        } else {
            $("#sk_print_count").removeAttr("readonly");
        }
    });


    // //性别比例初始化
    // if ($("#sk_sex3").val().split(",").length > 0 && (!$("#sk_sex3").is(':checked'))) {
    //     $("#sex-con").css("display", "inline-block");
    // } else {
    //     $("#sex-con").css("display", "none");
    // }
    //性别比例出现
    $("#sk_sex3,#sk_sex4").on("click", function() {
        var falg = $("#sk_sex3").is(':checked');
        if (falg) {
            $("#sex-con").css("display", "none");
        } else {
            $("#sex-con").css("display", "inline-block");
        }
    });
    if (isVip == "True") {
        //价格焦点丢失事件
        $("#sk_clinch_price").on("blur", function() {
            advise();
        });

    }

    //价格改变

    $("input[name='sk_lottery_mode']").on("change", function() {
        timeChange();
    });
    $("input[name='sk_clinch_price']").on("change", function() {
        var price = $(this).val() - 0;
        if (100 <= price) {
            $(".sevice-price").html(0);
            if ($(".jp-watch dt.act").index() != 2) {
                $("#sk_lottery_mode-con").fadeIn(); //开奖方式
            }
        } else {
            $("#sk_lottery_mode-con").fadeOut();; //开奖方式
            var arr = $(".sevice-price");
            for (var i = 0; i < arr.length; i++) {
                arr.eq(i).html(arr.eq(i).data("num"));
            }
        }
        if ($(".jp-watch dt.act").index() == 2) {
            $("#sk_lottery_mode-con").fadeOut(); //开奖方式
        }
        var quanPrice = $("#sk_voucher_price").val() - 0;
        $("#AllPrice").text(price + quanPrice);

        if (300 <= price) {
            $(".sevice-ask").html(0);
        } else {
            $(".sevice-ask").html(2);
        }
        advise();
    });

    //托管
    $("#tuoguan").on("click", function() {
        if ($(this).is(":checked")) {
            $("#app-key .mb10 input").attr("disabled", "disabled").removeAttr("datatype");
            $("#app-key .mb10 select").attr("disabled", "disabled").removeAttr("datatype");
            $("#tgInfo").html("飞猪试用将推送符合您宝贝的精准关键词！");
        } else {
            $("#tgInfo").html("飞猪试用精准关键词托管可以让您的排名提升更显著哦！");
            $("#app-key .mb10 input").removeAttr("disabled").attr("datatype", "*");;
            $("#app-key .mb10 select").removeAttr("disabled").attr("datatype", "*");;
        }
    });

    $("#sk_isvoucher").on("click", function() {

        if ($(this).is(":checked")) {
            $("#quanInfo").fadeIn();
        } else {
            $("#quanInfo").fadeOut();
        }
    });

    $("#sk_voucher_price").on("blur", function() {
        var price = $("input[name='sk_clinch_price']").val() - 0;
        var quanPrice = $(this).val() - 0;
        $("#AllPrice").text(price + quanPrice);
    });


    var doubleImg = false;
    $("#slide-btn").on("click", function() { //获取宝贝详情
        var ptype = $("input[name='ptlei']:checked").val();
        console.log(ptype)
        var url = $("#sk-link").val();
        if (!url) {
            myAlert("请填写链接地址");
            return false;
        }
        //判断连接是否匹配
        console.log($("input[name='ptlei']:checked").val())
        console.log($("#sk-link").val())
        if ($("input[name='ptlei']:checked").val() == 2) {
            console.log("数据222")
            if (url.indexOf("jd.com") < 0) {
                myAlert("平台类型和商品链接不匹配");
                return false;
            }
        } else {
            console.log("数据")
            if (url.indexOf("taobao.com") < 0 && url.indexOf("tmall.com") < 0) {
                myAlert("平台类型和商品链接不匹配");
                return false;
            }
        }
        if (url.indexOf("#detail") > 0)
            url = url.split('#d')[0];
        if (url.indexOf("item.taobao.com") < 0 && url.indexOf("detail.tmall.com") < 0 && url.indexOf("item.jd.com") < 0 && url.indexOf("detail.tmall.hk") < 0 && url.indexOf("traveldetail.fliggy.com") < 0 && url.indexOf("traveldetail.taobao.com") < 0) {
            myAlert("宝贝地址填写有误");
            return false;
        }
        var ctype = url.indexOf("item.taobao.com") >= 0 ? 0 : url.indexOf("detail.tmall.com") >= 0 ? 1 : url.indexOf("detail.tmall.hk") >= 0 ? 1 : url.indexOf("traveldetail.fliggy.com") >= 0 ? 4 : url.indexOf("traveldetail.taobao.com") >= 0 ? 4 : 2;
       
        var ptype = $("input[name='ptlei']:checked").val();
        console.log(ptype)

        // $.post('http://api.feizhugou.com/activity/getAliImgs', {
        //         url: url,
        //         ctype: ctype
        //     }, function(d) {
        //         if (d.Result) {
        //             doubleImg = false;
        //             var strjson = eval('(' + d.Message + ')');
        //             var arr = strjson.ThumImg.split("|");
        //             var pic_log = '';
        //             for (var i = 0; i < 4; i++) {
        //                 $("#img-con img").eq(i).attr("src", arr[i]);
        //                 pic_log += arr[i] + (i == 3 ? "" : "|");
        //             }
        //             $("#sk_logo_pic").val(pic_log);
        //             $("#tbshopname").val(strjson.Title);
        //             get_data = false;
        //         }
        //     }
        // }
        var token = localStorage.getItem("token");
        $.ajax({
        url: "http://api.feizhugou.com/activity/getAliImgs",
        type: "POST",
        dataType: "json",
        async: true,
        data: {
            goodAddress: url,
            platformType: ptype
        },
        headers: {
            'Accept': 'aplication/json',
            'Authorization': '' + token
        },
        success: function(e) {
            console.log(e)
            if (e.code == 1000) {
                 doubleImg = false;
                    // var strjson = eval('(' + e.data + ')');
                    // console.log(strjson)
                    arr = e.data
                    console.log(arr)
                    for (var i = 0; i < 4; i++) {
                        $("#img-con img").eq(i).attr("src", "https:"+arr[i]);
                        //pic_log += arr[i] + (i == 3 ? "" : "|");
                    }
                    // $("#sk_logo_pic").val(pic_log);
                    // $("#tbshopname").val(strjson.Title);
                    // get_data = false;
            } else {
                myAlert(e.msg)
            }

        },
        error: function(data) {

        }
    })


        $("#slide").slideDown(600);
        $("#slide-btn i").addClass("icon-open-bottom").removeClass("icon-open");
        if (linkImgFlag) {
            return false;
        }
        linkImgFlag = true;
        console.log($("#sk-link").val());
        // $('#qrcodeTable').qrcode({
        //     render: "canvas",
        //     text: $("#sk-link").val(),
        //     width: "160", //二维码的宽度
        //     height: "160", //二维码的高度
        //     background: "#ffffff", //二维码的后景色
        //     foreground: "#000000", //二维码的前景色
        // });
        // } else {
        //     myAlert(d.Message);
        // }
        ;
        if ($("#queryType").val() != "1" && $("#queryType").val() != "2") {
            $.post('/JPinShopissueBis/GetTKL', {
                url: url
            }, function(d) {
                if (d.Result) {
                    $("input[name='sk_taokouling']").val(d.Message);
                }
                if (url.indexOf("traveldetail.fliggy.com") >= 0) {
                    $("input[name='sk_taokouling']").val("0");
                    $("#txt_taokoulingBz").val("0");
                }
            });
        }

        //        }
        //    }
        //});



    });
    //主图位置
    $("#img-con  img").on("click", function() {
        if ($(this).hasClass("act")) {
            return false;
        }
        $(this).addClass("act").siblings().removeClass("act");
        var arrPic = "";
        arrPic = $(this).attr("src") + "|";
        for (var i = 0; i < 4; i++) {
            if (!$("#img-con img").eq(i).hasClass("act")) {
                arrPic += $("#img-con img").eq(i).attr("src") + (i == 3 ? "" : "|");
            }
        }
        $("#sk_logo_pic").val(arrPic);
    });

    function bindWordIcon() { //
        $(".key-word-icon").off("click");
        $(".key-word-icon").on("click", function() {
            var flag = $(this).hasClass("icon-remove");
            if (flag) {
                $(this).parents(".item-con").remove();
            } else {
                if (vipType == '-1') {
                    if ($(this).parents(".key-word").find(".item-con").length >= 7) {
                        alert("关键词最多只能有5个");
                        return false;
                    }
                }
                if (vipType == '0') {
                    if ($(this).parents(".key-word").find(".item-con").length >= 7) {
                        alert("关键词最多只能有5个");
                        return false;
                    }
                } else if (vipType == '2') {
                    if ($(this).parents(".key-word").find(".item-con").length >= 10) {
                        alert("关键词最多只能有8个");
                        return false;
                    }
                } else {
                    if ($(this).parents(".key-word").find(".item-con").length >= 12) {
                        alert("关键词最多只能有10个");
                        return false;
                    }
                }
                var html = $(this).parents(".item-con").html();
                html = html.replace("icon-add", "icon-remove");
                html = '<div class="item-con mb10">' + html + '</div>';
                $("#key-list").append(html);
                var index = $("#key-list").find("input.w150") - 2;
                $("#key-list").find("input.w150").eq(index).val("");
                bindWordIcon();
            }
        });
    }

    //增值费
    function priini() {
        var price = $("input[name='sk_clinch_price']").val() - 0;
        if (100 <= price) {
            $(".sevice-price").html(0);
        } else {
            var arr = $(".sevice-price");
            for (var i = 0; i < arr.length; i++) {
                arr.eq(i).html(arr.eq(i).data("num"));
            }
        }
        if (300 <= price) {
            $(".sevice-ask").html(0);
        } else {
            $(".sevice-ask").html(2);
        }
    }

    //初始化评价关键词
    function iniValueIcon(node2) {
        if ($(node2).val().length > 0) {
            $(node2).siblings(".add-value").fadeIn(600);
        } else {
            $(node2).siblings(".add-value").fadeOut(600);
        }
        var accessValue = $(node2).val();
        if (accessValue.length) {
            accessValue = accessValue.indexOf("♑") > 0 ? accessValue.split("♑") : accessValue.split(",");
        }
        for (var i = 0; i < accessValue.length; i++) {
            if (i != 0) {
                var html = '<div class="add-value"><input type="text" datatype="*" class="w150" value=' + accessValue[i] + ' maxlength="10" placeholder="设置评价关键词" /> <span class="iconfont icon-remove"></span></div>';
                $(node2).parents(".item-con").append(html);
            } else {
                $(node2).siblings(".add-value").eq(0).children("input").eq(0).val(accessValue[0]);
            }
        }
    }

    //添加关键词
    function addValueIcon() {
        $(".add-value .iconfont").off("click");
        $(".add-value .iconfont").on("click", function() {
            if ($(this).hasClass("icon-add")) {
                if ($(this).parents(".item-con").children(".add-value").length >= 5) {
                    alert("设置评价关键词最多不能超过5个");
                    return false;
                }
                var html = '<div class="add-value ">' + $(this).parent().html().replace("icon-add", "icon-remove") + "</div>";
                $(this).parents(".item-con").append(html);
                addValueIcon();
            } else {
                $(this).parent().remove();
            }
        });
    }

    $(".setValue").on("click", function() {
        $("#tuoguan").removeAttr("checked");
        SetValueIcon();
    });

    //爆款复制关键词
    function SetValueIcon() {
        var ptArr = $("input[name='ptlei']:checked").val() == "0" ? ["综合", "销量", "人气", "信用", "价格"] : ["综合排序", "新品优先", "评论数从高到低", "销量", "价格从高到低", "价格从高到低"];
        console.log(ptArr)
        var keyArr = paramObj.sk_app_search_keys.split(",");
        var sortArr = paramObj.sk_app_sort_claim.split(",");
        for (var i = 0; i < keyArr.length; i++) {
            var html = "";
            html += '<div class="item-con mb10"><span class="label"><span>*</span>搜索关键词：</span>';
            html += ' <input type="text" name="app_search_keys" class="w150" datatype="*" placeholder="精确词相对权重较高"> ';
            html += '<span class="label ml30"> <span>*</span>排序方式：</span> <select name="app_sort_claim" datatype="*" nullmsg="请选择！">';
            html += '<option value="">请选择</option>';
            for (var j = 0; j < ptArr.length; j++) {
                if (ptArr[j] == sortArr[i]) {
                    console.log(i)
                }
                html += '<option value="' + ptArr[j] + '">' + ptArr[j] + '</option>';
            }
            html += ' </select> <i class="iconfont ' + (i == 0 ? "icon-add" : "icon-remove") + ' key-word-icon"></i></div>';
            if (i == 0) {
                console.log(1);
                $("#key-list").html(html);
            } else {
                $("#key-list").append(html);
            }
            $("#key-list input").eq(i).val(keyArr[i]);
            $("#key-list select").eq(i).val(sortArr[i]);
        }


        $(".key-word-icon").off("click");
        $(".key-word-icon").on("click", function() {
            var flag = $(this).hasClass("icon-remove");
            if (flag) {
                $(this).parents(".item-con").remove();
            } else {
                if (vipType == '-1') {
                    if ($(this).parents(".key-word").find(".item-con").length >= 7) {
                        alert("关键词最多只能有5个");
                        return false;
                    }
                }
                if (vipType == '0') {
                    if ($(this).parents(".key-word").find(".item-con").length >= 7) {
                        alert("关键词最多只能有5个");
                        return false;
                    }
                } else if (vipType == '2') {
                    if ($(this).parents(".key-word").find(".item-con").length >= 10) {
                        alert("关键词最多只能有8个");
                        return false;
                    }
                } else {
                    if ($(this).parents(".key-word").find(".item-con").length >= 12) {
                        alert("关键词最多只能有10个");
                        return false;
                    }
                }
                var html = $(this).parents(".item-con").html();
                html = html.replace("icon-add", "icon-remove");
                html = '<div class="item-con mb10">' + html + '</div>';
                $("#key-list").append(html);
                var index = $("#key-list").find("input.w150") - 2;
                $("#key-list").find("input.w150").eq(index).val("");
                bindWordIcon();
            }
        });
    }

})

//计算运营计划份数
function advise(param1, param2) {
    var price = $("#sk_clinch_price").val() - 0;
    if ($(".jp-watch dt.act").index() == "3" && price < 100) {
        myAlert("您的活动类型是高客单，价格填写应大于100");
        return false;
    }
    var actCat = $(".jp-watch dt.act").index();
    if (actCat < 3) {
        var numArr = $(".jp-watch dd:eq(" + actCat + ") .alt-num");
        if (0 < price && price < 50) {
            adviceAllNum = numArr.eq(0).html();
        }
        if (50 <= price && price < 100) {
            adviceAllNum = numArr.eq(1).html();
        }
        if (100 <= price && price < 300) {
            adviceAllNum = numArr.eq(2).html();
        }
        if (price >= 300) {
            adviceAllNum = numArr.eq(3).html();
        }
    }
    if (actCat == 3) {
        var numArr = $(".jp-watch dd:eq(" + actCat + ") .alt-num");
        if (100 <= price && price < 300) {
            adviceAllNum = numArr.eq(0).html();
        } else {
            adviceAllNum = numArr.eq(1).html();
        }
    }
    if (actCat == 4) {
        adviceAllNum = 1000;
    }
    if (isVip != "True") {
        adviceAllNum = 1;
    }
    if (param1) {
        return false;
    }
    if (param2) {
        var jpdayStr1 = [];
        for (var j = 0; j < $(".Date .day-num").length; j++) {
            var indexDay = $(".Date .day-num1").eq(j).val() - 0;
            jpdayStr1.push(indexDay);
        }
        timeChange(false, jpdayStr1);
        return false;

    }
    timeChange();
}

function adviseNum() {
    var price = $("#sk_clinch_price").val() - 0;
    var typeArrPrcie = 0;
    if (0 < price && price < 50) {
        typeArrPrcie = 12;
    }
    if (50 <= price && price < 100) {
        typeArrPrcie = 8;
    }
    if (100 <= price && price < 300) {
        typeArrPrcie = 6;
    }
    if (300 <= price) {
        typeArrPrcie = 0;
    }
    return typeArrPrcie;
}



function iniAllNum() {
    var day_count = $("#sk_day_count").val(); //初始化总分数
    var activity_days = $("#sk_activity_days").val();
    $("em.all-count").html(day_count * activity_days);
}


//初始化ajaxform验证
function initajaxForm() {
    $("#form").ajaxForm({
        success: function(data) {
            doubleAjax = false;
            volidMoney = false;
            myAlert(data.Message, function() {
                if (data.Result) {
                    $(".submit").addClass("gray");
                    var url = $("#sk-link").val();
                    if (url.indexOf("taobao.com") >= 0 || url.indexOf("fliggy.com") >= 0) {
                        location.href = '/JPinShopissueBis?orderType=0';
                        return false;
                    }
                    if (url.indexOf("detail.tmall") >= 0) {
                        location.href = '/JPinShopissueBis?orderType=1';
                        return false;
                    }
                    if (url.indexOf("jd.com") >= 0) {
                        location.href = '/JPinShopissueBis?orderType=2';
                        return false;
                    }
                    location.href = '/JPinShopissueBis?orderType=0';
                }
            });
            $("#msgbox .ling a").hide();
        }
    });
}

function checkForm(node,param2) {//第二个参数用来判断是否是第一页全局折起来
    var checkFlag = true;
    var nodeArr1 = node.find("select[datatype]");
    var nodeArr2 = node.find("input[datatype]");
    for (var i = 0; i < nodeArr1.length; i++) {
        if (!valid.check(false, nodeArr1.eq(i))) {
            checkFlag = false;
        }
    }
    for (var i = 0; i < nodeArr2.length; i++) {
        if (!valid.check(false,nodeArr2.eq(i))) {
            checkFlag = false;
        }
    }
    if (checkFlag) {
        if (param2) {
            node.addClass("slide-hide");
        } else {
            //这里是点击下一步的操作，暂无操作
            var allRate = ($(".search-rate").eq(0).val() - 0) + ($(".search-rate").eq(1).val() - 0) + ($(".search-rate").eq(2).val() - 0);
            if (allRate != 100) {
                myAlert("搜索占比相加必须等于100");
                return false;
            }
            $(".slide5").addClass("slide-hide");
            window.scrollTo(0,0);
        }
       
    } else {
        node.removeClass("slide-hide");
        node.find(".Validform_error:first").focus();
    }
    return checkFlag;
}

function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

var valid = {};
//初始化form验证
var doubleAjax = false;
var volidMoney = false; //该变量主要是验证，用户点击弹出的金钱数确认框
function initValidform() {
    valid = $("#form").Validform({
        //tiptype: 3,
        ignoreHidden: true,
        showAllError: true,
        beforeSubmit: function(data) { //在提交前，验证所有数据，并且弹出一个框让用户确认金钱保存

            var type = $("input[name='sk_activity_type']:checked").eq(0).val();

            var price = $("input[name='sk_clinch_price']").eq(0).val();

            if ($("#data-warn").is(":visible")) {
                myAlert($("#data-warn").html());
                return false;
            }
            var Allnum = 0;
            for (var j = 0; j < $(".Date .day-num").length; j++) {
                var indexPrice = $(".Date .day-num").eq(j).val() - 0;
                if (indexPrice <= 0) {
                    myAlert("每日发放份数不能小于0");
                    return false;
                }
                Allnum += indexPrice;
            }

            if (paramObj) {
                var copyNum = parseInt(paramObj.activityCount) < adviceAllNum ? adviceAllNum : paramObj.tryoutCount;
                if (Allnum < copyNum) {
                    myConfirm("复制爆款活动最少需发布" + copyNum + "份活动！", function() {
                        window.scrollTo(0, 1400);
                    }, function() {
                        location.href = "/JPinShopissueBis/AddOrEdit?type=0";

                    });
                    $("#msgbox .qdingann_a").text("去修改");
                    $("#msgbox .qdingann_b").text("放弃复制爆款");
                    return false;
                }
            }
            $("#sk_tryout_count").val(Allnum);
            var min_num = adviseNum();
            if (Allnum < min_num && isVip == "True" && (!paramObj)) {
                myAlert("发放总份数不能小于" + min_num);
                return false;
            }

            for (var k = 0; k < $(".addPrice").length; k++) {
                if (($(".addPrice").eq(k).val() - 0) > Allnum) {
                    myAlert("增值服务填写份数不能大于发放份数");
                    return false;
                }
            }

            var jiaNum = 0;
            for (var k = 0; k < $(".addprice2").length; k++) {
                jiaNum += ($(".addprice2").eq(k).val() - 0);
            }
            if (Allnum < jiaNum) {
                myAlert("无需评语+晒图不能错过发放份数");
                return false;
            }
            var appendNum = 0;
            for (var k = 0; k < $("#add-con .appendnum").length; k++) {
                appendNum += ($("#add-con .appendnum").eq(k).val() - 0);
            }

            if (Allnum < appendNum) {
                myAlert("追加份数的和不能大于发放份数");
                return false;
            }

            var keyAppArr1 = $(".add-value  input");
            for (var i = 0; i < keyAppArr1.length; i++) {
                if (keyAppArr1.eq(i).val().indexOf(",") >= 0) {
                    myAlert("评价关键词不能出现逗号，");
                    return false;
                }
            }


            var keyAppArr = $("#app-key input[name='app_search_keys']");
            for (var i = 0; i < keyAppArr.length; i++) {
                if (keyAppArr.eq(i).val().indexOf(",") >= 0) {
                    myAlert("关键词不能出现逗号，");
                    return false;
                }
            }

            var watchIndex = $(".jp-watch dt.act").index();
            if (watchIndex == 2) {
                for (var j = 0; j < $(".Date .day-num").length; j++) {
                    var indexDay = $(".Date .day-num1").eq(j).val() - 0;
                    if (2 > indexDay || 50 < indexDay) {
                        myAlert("组团开奖，日转化率不能小于2%，不能大于50%");
                        return false;
                    }
                }
            }


            if ((($(".word-num").val() - 0) + ($(".pic-num").val() - 0)) > appendNum) {
                myAlert("追评晒图份数不能大于总公交车份数");
                return false;
            }

            if (type == 0 && (20 > price || 50 < price)) {
                myAlert("低客单的价格区间是20-50，不包含50，请检查价格是否有误");
                return false;
            }

            if (type == 1 && (50 >= price || 100 < price)) {
                myAlert("中客单的价格区间是50-100，包含50，请检查价格是否有误");
                return false;
            }
            if (type == 3 && price <= 100) {
                myAlert("高客单客单的价格区间是大于等于100，请检查价格是否有误");
                return false;
            }
            if ($(".jp-watch dt.act").index() == "3" && price < 100) {
                myAlert("您的活动类型是高客单，价格填写应大于100");
                return false;
            }

            var jobNum = $(".zt-job:checked").length;
            if (jobNum > 3) {
                myAlert("买家职业不能超过3个");
                return false;
            }

            if (($("#sk_age0").val() - 0) >= ($("#sk_age1").val() - 0) && isVip == "True") {
                myAlert("买家年龄第一个不能大于等于第二个");
                return false;
            }

            if (isVip == "True" && $(".jp-watch dt.act").index() != "3") {
                var typeArrPrcie = adviseNum();
                if (typeArrPrcie > $("#sk_tryout_count").val()) {
                    myAlert("本活动最低份数不得低于" + typeArrPrcie + "份");
                    return false;
                }
            } else {
                adviceAllNum = 0;
            }


            var url = $("#sk-link").val();
            //判断连接是否匹配
            if ($("input[name='ptlei']:checked").val() == "0") {
                if (url.indexOf("jd.com") >= 0) {
                    myAlert("平台类型和商品链接不匹配");
                    return false;
                }
            } else {
                if (url.indexOf("jd.com") < 0) {
                    myAlert("平台类型和商品链接不匹配");
                    return false;
                }
            }

            var allRate = ($(".search-rate").eq(0).val() - 0) + ($(".search-rate").eq(1).val() - 0) + ($(".search-rate").eq(2).val() - 0);
            if (allRate != 100) {
                myAlert("搜索占比相加必须等于100");
                return false;
            }
            if ($(".search-rate").eq(0).val() == 0 && ($(".search-rate").eq(1).val() == 0 || $(".search-rate").eq(2).val() == 0)) {
                myAlert("手淘搜索和其他两项不可同时为0");
                return false;
            }

            if ($("#sk_sex4").is(":checked")) {
                if ((($("#sk_sexstr1").val() - 0) + ($("#sk_sexstr2").val() - 0)) != 100) {
                    myAlert("男女比例相加必须为100");
                    return false;
                }
            }

            for (var j = 0; j < $(".Date .day-num").length; j++) {
                var indexPrice = parseInt($(".Date .day-num").eq(j).val());
                if (indexPrice <= 0 || isNaN(indexPrice)) {
                    layer.msg("每日发放份数不能小于0");
                    return false;
                }
            }

            $("#sk_find_percent").val($(".search-rate").eq(0).val() + "," + $(".search-rate").eq(1).val() + "," + $(".search-rate").eq(2).val());

            var keyArr1 = $("#word2 .add-value input");
            for (var j = 0; j < keyArr1.length; j++) {
                if (keyArr1.eq(j).val().trim().length > 100) {
                    myAlert("追评论关键词长度不能超过50个字！" + keyArr1.eq(j).val().trim().length);
                    return false;
                }
            }

            var Allnum = 0;
            var watchIndex = $(".jp-watch dt.act").index();
            for (var j = 0; j < $(".Date .day-num").length; j++) {
                var indexPrice = $(".Date .day-num").eq(j).val() - 0;
                Allnum += indexPrice;
            }
            if (Allnum < (adviceAllNum - 0) && isVip == "True") {

                myConfirm("修改运营推荐份数，会直接影响店铺手淘精准标签权重、人气权重、UV总量、周期付购率权重、回购+回访率权重，爆款词手淘排名权重等多项权重数据", function() {
                    if (doubleAjax) {
                        return false;
                    }
                    doubleAjax = false;
                    volidMoney = true;
                    advise(false, true);
                    $("#form").submit();
                }, function() {
                    if (doubleAjax) {
                        return false;
                    }
                    doubleAjax = true;
                    volidMoney = true;
                    $("#form").submit();
                });
                $(".qdingann_a").html("采纳");
                $(".qdingann_b").html("不采纳");

                if (!volidMoney) {
                    setData();
                    return false;
                }
            } else {
                setData();
                if (doubleAjax) {
                    return false;
                }
                doubleAjax = true;
            }
        }
    });
}

//把搜索关键词里面的值整合一下
function setData() {
    var index = $("#img-con img.act").index();
    var currentImg = $("#currentImg").val();
    if ((index - 0) == (currentImg - 0)) {
        $("#currentImg").val(0);
    }
    if ((index - 0) > (currentImg - 0)) {
        currentImg++;
        $("#currentImg").val(currentImg);
    }

    var keyAppArr = $("#app-key input[name='app_search_keys']");
    var appKey = "";
    var appClaim = "";
    //var appPosition = "";


    for (var i = 0; i < keyAppArr.length; i++) {
        var key_B = (i == 0 ? "" : ",");
        appKey += key_B + $("#app-key input[name='app_search_keys']").eq(i).val();
        appClaim += key_B + $("#app-key select[name='app_sort_claim']").eq(i).val();
        //appPosition += key_B + $("#app-key input[name='app_position']").eq(2 * i).val() + "-" + $("#app-key input[name='app_position']").eq(2 * i + 1).val();
    }



    $("#app-key #sk_app_search_keys").val(appKey);
    $("#app-key #sk_app_sort_claim").val(appClaim);
    //$("#app-key #sk_app_position").val(appPosition);

    var keyArr = $("#word1 .add-value input");
    var access_keyword = "";
    for (var j = 0; j < keyArr.length; j++) {
        if (keyArr.eq(j).val()) {
            access_keyword += (j == 0 ? "" : "♑") + keyArr.eq(j).val();
        }
    }
    $("#access-keyword").val(access_keyword);

    var keyArr1 = $("#word2 .add-value input");
    var access_keyword1 = "";
    for (var j = 0; j < keyArr1.length; j++) {
        if (keyArr1.eq(j).val()) {
            access_keyword1 += (j == 0 ? "" : "♑") + keyArr1.eq(j).val();
        }
    }
    $("#rated_addkw").val(access_keyword1);

    var jobArr = $(".zt-job");
    var jobstr = "";
    for (var j = 0; j < jobArr.length; j++) {
        if (jobArr.eq(j).is(":checked")) {
            jobstr += (j + 1) + ",";
        }
    }
    jobstr = jobstr.substring(0, jobstr.length - 1);

    var tqArr = $(".people-tq");
    var tqstr = "";
    for (var j = 0; j < tqArr.length; j++) {
        if (tqArr.eq(j).is(":checked")) {
            tqstr += (j + 1) + ",";
        }
    }
    tqstr = tqstr.substring(0, tqstr.length - 1);
    $("#sk_tag_popularity").val(tqstr);



    $("#sk_occupation").val(jobstr);

    $("#sk_age").val($("#sk_age0").val() + "," + $("#sk_age1").val());
    if ($("#sk_sex3").is(":checked")) {
        $("#sk_sex2").val("");
    } else {
        $("#sk_sex2").val($("#sk_sexstr1").val() + "," + $("#sk_sexstr2").val());
    }
    //份数
    var Allnum = 0;
    var jpdayStr = '';
    var jpdayStr1 = '';
    var watchIndex = $(".jp-watch dt.act").index();
    for (var j = 0; j < $(".Date .day-num").length; j++) {
        var indexPrice = $(".Date .day-num").eq(j).val() - 0;
        var indexDay = $(".Date .day-num1").eq(j).val() - 0;
        Allnum += indexPrice;
        jpdayStr += indexPrice + ",";
        jpdayStr1 += indexDay + ",";
    }

    $("#sk_tryout_count").val(Allnum);
    $("#sk_day_count_list").val(jpdayStr);
    $("#sk_take_rates_list").val(jpdayStr1);
}

function timeChange(param1, param2) { //第一个参数是否编辑，第二参数组团
    var time1 = $("#begindate").val().replace(/-/g, "/");
    var time2 = $("#enddate").val().replace(/-/g, "/");
    if (!time1) {
        $("#all-num").text(0);
        return false;

    }
    begdata = time1;
    console.log(time1 + time2)
    var timeAll = ((new Date(time2) - new Date(time1)) / 1000 / 60 / 60 / 24).toFixed(0);

    timeAll = (timeAll - 0) + 1;
    $("#Date-num").text(timeAll);
    $(".Date td").html("");
    if (timeAll > 15) {
        $("#data-warn").fadeIn().html("活动天数不能大于15天");
        $(".Date table").removeClass("gray");
        $("#all-num").text(0);
        return false;
    } else {
        $(".Date table").addClass("gray");
        $("#data-warn").fadeOut();
    }
    var price = $("#sk_clinch_price").val() - 0;
    if (price < 0) {
        return false;
    }
    var timeZ = new Date(time1).getDay();
    var Data1Num = new Date(time1) - 0;
    timeZ = (timeZ == 7 ? 0 : timeZ);
    if (price < 100) {
        var planNum = 1;
    } else if (price >= 300) {
        var planNum = 3;
    } else {
        var planNum = 2;
    }
    if ($("#sk_lottery_mode1").is(":checked")) {
        var planNum = 1;
    }

    if ($(".jp-watch dt.act").index() == 2) {
        var planNum = 0;
    }

    if (timeAll <= planNum) {
        $("#data-warn").fadeIn().html("活动时间不能小于预热时间");
    }
    var copyDay = 7;
    if (paramObj) {
        copyDay = (parseInt(paramObj.activityDay) + planNum);
        if ($(".lst.act").data("type") == "4") {
            copyDay += 1;
        }
        if (timeAll > copyDay && timeAll > 7) {
            layer.msg("该爆款复制活动天数不能大于" + (copyDay < 7 ? 7 : copyDay) + "天");
            $("#all-num").text(0);
            return false;
        }
    };


    var daynum = Math.ceil(adviceAllNum / (timeAll - planNum));


    console.log(JPinNumArr);
    var showNumArr = JPinNumArr;
    var showDayArr = JPinDayArr;
    var watchIndex = $(".jp-watch dt.act").index();
    for (var i = 0; i < timeAll; i++) {

        var html = '<div class="date-con"><h3>' + new Date(Data1Num + (i) * 60 * 60 * 1000 * 24).getDate() + '</h3>';
        if (i < planNum) {
            html += '<i class="iconfont icon-going"></i><h2>活动预热</h2></div >';
        } else {
            // console.log(showNumArr)
            daynum = param1 ? showNumArr[i - planNum] : daynum;
            if (showNumArr.length == 1) {
                daynum = 1;
                daynum1 = 1;
            }
            if (paramObj) {
                daynum = parseInt(paramObj.activityCount) < adviceAllNum ? Math.ceil(adviceAllNum / (timeAll - planNum)) : Math.ceil(parseInt(paramObj.tryoutCount) / (timeAll - planNum));
            }
            if (paramObj && (!getUrlParam("fromid"))) {
                daynum = showNumArr[i - planNum];
            }
            var daynum1 = param1 ? showDayArr[i - planNum] : 0;
            if (param2) {
                daynum1 = param2 ? param2[i - planNum] : 0;
            } else {
                if (watchIndex == 2 && !param1) {
                    daynum1 = 50;
                }
            }
            // console.log(daynum1);
            // console.log(typeof(daynum));
            if (typeof(daynum) == 'undefined') {
                daynum = 1;
                daynum1 = 0;


            }
            if (typeof(daynum1) == 'undefined') {
                daynum1 = 0;


            }
            // daynum = 1;
            // console.log(daynum)
            html += '<p><label>发放份数：</label><input type="text" name="name" class="day-num" value="' + daynum + '" onkeyup="this.value=this.value.replace(/\\D/g,\'\');countAll();" onafterpaste="this.value=this.value.replace(/\\D/g,\'\')"></p>';
            html += '<p><label>日转化率：</label><input type="text" name="name" class="day-num1" value="' + (daynum1 - 0).toFixed(0) + '" onkeyup="this.value=this.value.replace(/\\D/g,\'\')" onafterpaste="this.value=this.value.replace(/\\D/g,\'\')" maxlength="2"><span>%</span></p></div >';
        }
        $(".Date tbody td").eq(timeZ + i).html(html);
    }
    countAll();
}

function countAll() {
    var Allnum = 0;
    for (var j = 0; j < $(".Date .day-num").length; j++) {
        var indexPrice = $(".Date .day-num").eq(j).val() - 0;
        if (indexPrice <= 0) {
            layer.msg("每日发放份数不能小于0");
            return false;
        }
        Allnum += indexPrice;
    }
    $("#all-num").text(Allnum);
}

function getavtdetails() {
    function bindWordIcon() { //
        $(".key-word-icon").off("click");
        $(".key-word-icon").on("click", function() {
            var flag = $(this).hasClass("icon-remove");
            if (flag) {
                $(this).parents(".item-con").remove();
            } else {
                if (vipType == '-1') {
                    if ($(this).parents(".key-word").find(".item-con").length >= 7) {
                        alert("关键词最多只能有5个");
                        return false;
                    }
                }
                if (vipType == '0') {
                    if ($(this).parents(".key-word").find(".item-con").length >= 7) {
                        alert("关键词最多只能有5个");
                        return false;
                    }
                } else if (vipType == '2') {
                    if ($(this).parents(".key-word").find(".item-con").length >= 10) {
                        alert("关键词最多只能有8个");
                        return false;
                    }
                } else {
                    if ($(this).parents(".key-word").find(".item-con").length >= 12) {
                        alert("关键词最多只能有10个");
                        return false;
                    }
                }
                var html = $(this).parents(".item-con").html();
                html = html.replace("icon-add", "icon-remove");
                html = '<div class="item-con mb10">' + html + '</div>';
                $("#key-list").append(html);
                var index = $("#key-list").find("input.w150") - 2;
                $("#key-list").find("input.w150").eq(index).val("");
                bindWordIcon();
            }
        });
    }
    var token = localStorage.getItem("token");
    console.log("执行了getavtdetails")
    var searchURL = window.location.search;
    searchURL = searchURL.substring(1, searchURL.length);
    console.log(searchURL);
    var actid = searchURL.split("&")[0].split("=")[1];
    if (typeof(actid) !== "undefined") {
        var url = "http://api.feizhugou.com/activity/edit/" + actid;
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
                    console.log(e);
                    var basicInfo = e.data.basicInfo;
                    var dateInfo = e.data.dateInfo;
                    var searchInfo = e.data.searchInfo;
                    var imgInfo = e.data.imgInfo;
                    console.log(e.data.basicInfo.buyerSex)
                    var arrTmpData = e.data.basicInfo.buyerSex.split(":");
                        if(arrTmpData.length>0&&arrTmpData[0]!=''){
                            $('#sk_sex4').attr("checked", true);
                            if(arrTmpData.length==2){
                                $('#sk_sexstr1').val(arrTmpData[0])
                                $('#sk_sexstr2').val(arrTmpData[1])
                            }else{
                                 $('#sk_sexstr1').val(arrTmpData[0])
                            }
                        }

                        var arrTmpData2 = e.data.basicInfo.buyerAge.split(":");
                        if(arrTmpData2.length>0&&arrTmpData2[0]!=''){
                            if(arrTmpData.length==2){
                                $('#sk_age0').val(arrTmpData2[0])
                                $('#sk_age1').val(arrTmpData2[1])
                            }else{
                                 $('#sk_age0').val(arrTmpData2[0])
                            }
                        }
                        var arrTmpData3 = e.data.basicInfo.buyerOccupation.split(",");
                        if(arrTmpData3.length>=2&&arrTmpData3[0]!=''){
                            for(var i=0;i<arrTmpData3.length-1;i++){
                                $("#buyerOccupation input:checkbox[name="+arrTmpData3[i]+"]").attr("checked", true)

                            }
                        }
                        var arrTmpData4 = e.data.basicInfo.buyerNaughtyValue.split(",");
                        if(arrTmpData4.length>=2&&arrTmpData4[0]!=''){
                            for(var i=0;i<arrTmpData4.length-1;i++){
                                console.log(i)
                                 console.log(arrTmpData4[i])
                                $("#buyerNaughtyValue input:checkbox[name="+arrTmpData4[i]+"]").attr("checked", true)

                            }
                        }
                        var arrTmpData5 =e.data.basicInfo.buyerConsumptionLevel;
                        console.log(arrTmpData5)
                        $("#buyerConsumptionLevel input:radio[value="+arrTmpData5+"]").attr("checked", true)

                    for (var i = 0; i < 4; i++) {
                        $("#img-con img").eq(i).attr("src",imgInfo[i].imgUrl);
                        //pic_log += arr[i] + (i == 3 ? "" : "|");
                        if (imgInfo[i].isHead == 1) {
                            $("#img-con img").addClass("act").siblings().removeClass("act");
                            $("#img-con img").eq(i).addClass("act")
                            console.log("执行了imgInfo")
                        }
                    }
                    
                    if (basicInfo.behavior == 1) {
                        $("#sk_no_appraise_chart").attr("checked", true);
                    };
                    if (basicInfo.behavior == 2) {
                        $("#sk_no_contact_chat").attr("checked", 'true');
                    };
                    if (basicInfo.behavior == 1 / 2) {
                        $("#sk_no_appraise_chart").attr("checked", 'true');
                        $("#sk_no_contact_chat").attr("checked", 'true');
                    };
                    if (basicInfo.behavior == 1) {
                        $("#sk_is_useCreditCard").attr("checked", true);
                    };
                    if (basicInfo.behavior == 2) {
                        $("#sk_is_useTokio").attr("checked", 'true');
                    };
                    if (basicInfo.behavior == 1 / 2) {
                        $("#sk_is_useCreditCard").attr("checked", 'true');
                        $("#sk_is_useTokio").attr("checked", 'true');
                    };
                    $('#specifications').val(basicInfo.specifications)
                    $('#returnVisit').val(basicInfo.returnVisit)
                    $('#viewTime').val(basicInfo.viewTime)
                    $('#deepView').val(basicInfo.deepView)
                    $('#productParameterRatio').val(basicInfo.productParameterRatio)
                    $('#sameProductTime').val(basicInfo.sameProductTime)
                    $('#viewComment').val(basicInfo.viewComment)
                    $("#platformType input:radio[name='ptlei'][value="+basicInfo.platformType+"]").attr('checked','true');
                    // $("input[name='ptlei'][0]:checked").val(basicInfo.platformType)
                    $("#sk_shop_name option:contains(" + basicInfo.shopName + ")").attr('selected', true);
                    $("#sk_activity_name").val(basicInfo.title); //活动标题
                    $("#sk-link").val(basicInfo.treasure_url); //宝贝链接
                    $("#sk_commodity_type option:contains(" + basicInfo.treasure_class + ")").attr('selected', true); //宝贝分类
                    $("#sk_clinch_price").val(basicInfo.treasure_price); //宝贝价格
                    $("#actqq").val(basicInfo.qq) //QQ号
                      // 'behavior':behavior , //用户行为 
                      // 'begin': $("#begindate").val(), //开始时间
                    $("#begindate").val(basicInfo.begin.slice(0,10));
                    $("#enddate").val(basicInfo.end_time.slice(0,10));
                    // 'data': JSON.stringify(dateInfo), //每日发放份数与转化率json格式数组，
                    //   //'keywords':,
                    //   'keywords':JSON.stringify(keywords),
                    //   'keyword_proportion': parseFloat($(".search-rate1").val())/100,
                    //  // 'keyword_sort':,
                    //  'keyword_sort':JSON.stringify(keyword_sort),
                    //   'keyword_price':parseFloat($("#sk_one_price").val()),
                    $("#sk_one_price").val(searchInfo.keyword_price);
                    $(".search-rate1").val(searchInfo.keyword_proportion * 100);
                    $(".search-rate2").val(searchInfo.newPassword_proportion * 100);
                    $("#newPassword").val(searchInfo.newPassword);
                    $(".keywords").eq(0).val(searchInfo.keywords[0]);
                    $(".keyword_sort:eq(0) option:contains(" + searchInfo.keyword_sort[0] + ")").attr('selected', true);
                    console.log(searchInfo.keywords[0]);

                    for (var i = 1; i < searchInfo.keywords.length; i++) {
                        var html = '<div class="item-con mb10">' +
                            '<span class="label"><span>*</span>搜索关键词：</span>' +
                            ' <input type="text" name="app_search_keys" class="w150 keywords" datatype=* placeholder="精确词相对权重较高" value="' +
                            searchInfo.keywords[i] +
                            '" > </input>' +
                            '<span class="label ml30"><span>*</span>排序方式：</span>' +
                            '<select style="margin-left:4px" name="app_sort_claim" class="keyword_sort" datatype=* nullmsg="请选择！">'+
                            '<option value="">请选择</option>' +
                            '<option value="综合" selected>综合</option>' +
                            '<option value="销量" >销量</option>' +
                            '<option value="人气" >人气</option>' +
                            '<option value="信用" >信用</option>' +
                            '<option value="价格" >价格</option>' +
                            '</select>' +
                            '<i style="margin-left:104.313px" class="iconfont icon-remove key-word-icon"></i>' +
                            '</div>';
                        $("#key-list").append(html);
                        var index = $("#key-list").find("input.w150") - 2;
                        $("#key-list").find("input.w150").eq(index).val("");
                        $(".keyword_sort:eq(" + i + ") option:contains(" + searchInfo.keyword_sort[i] + ")").attr('selected', true);
                        bindWordIcon();

                    };
                    JPinNumArr = [];
                    JPinDayArr = [];
                    for (var i = 0; i < dateInfo.length; i++) {
                        JPinDayArr.push(dateInfo[i].percent * 100)
                        JPinNumArr.push(dateInfo[i].copies);
                        console.log(i)
                    }
                    console.log(JPinDayArr)
                    timeChange(true)
                }else{
                    location.href="./index.html"
                }
            }
        })
    } else {
        getNowFormatDate();
    }
}