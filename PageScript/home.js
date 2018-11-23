$(function () {
    initTryStyle();
   // initReportStyle();切换排行榜
    initMenu();
    initSuperSlide();
    initStartTime();
    initLinB2c();
    initGuid();
    var swiper = {};
    if ($("#swiperAD a").length > 1) {
        swiper.timmer = setInterval(function () {
            swiperAD();
        }, 4000);
    }
    //广告
    $("#swiperAD").on("mouseenter", function () {
        clearInterval(swiper.timmer);
    }).on("mouseleave", function () {
        swiper.timmer = setInterval(function () {
            swiperAD();
        }, 4000);
    });
});


//广告轮播
function swiperAD() {
    var num = $("#swiperAD a").length - 1;
    var index = $("#swiperAD a.act").index();
    if (num == index) {
        $("#swiperAD a").eq(num).fadeOut(618);
        $("#swiperAD a").eq(0).fadeIn(500);
        $("#swiperAD a").eq(num).removeClass("act");
        $("#swiperAD a").eq(0).addClass("act");
    } else {
        $("#swiperAD a").eq(index).fadeOut(618);
        $("#swiperAD a").eq(index - 0 + 1).fadeIn(500);
        $("#swiperAD a").eq(index).removeClass("act");
        $("#swiperAD a").eq((index - 0 + 1)).addClass("act");
    }
}

//点击进入新手第一步
function initGuid() {
    if ($('.tap-one').is(":visible")) {
        $(".tap-one").click(function () {
            $(".tap-three").show();
            $(".tap-one").hide();
            $("html,body").animate({ scrollTop: $(".specialSale").offset().top }, 300);
        });
       // $(".tap-two").click(function () {
         //   $(".tap-three").show();
           // $(".tap-two").hide();
            //$("html,body").animate({ scrollTop: $(".specialSale").offset().top }, 300);
        //});
        $(".tap-three").click(function () {
            $(".tchs").hide();
        });
        $(".baig").click(function () {
            $(".tchs").hide();
        });
    }
}

function initLinB2c() {
    if (window.location.host != "www.nouqu.com")
        return;
    var from = getUrlParam("fromothersite");
    from = from == null ? "" : from;
    $('a').each(function () {
        var link = $(this).attr('href');
        if (link != null) {
            if (link.indexOf('javascript')>=0) {
                link = "http://www.meilipa.com?fromothersite=" + from;

            } else {
                link = link.indexOf('?') >= 0 ? link + "&fromothersite=" + from : link + "?fromothersite=" + from;
            }
            $(this).attr('href', link);
            $(this).attr('target', '_self');
        }
    });
}

function initStartTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    var per = (h * 3600 + m * 60 + s) / (12 * 3600);
    var angle = per * 360;
    $("#llClockHours").css("-webkit-transform", "rotate(" + angle + "deg)");
}

function initSuperSlide() {
    jQuery(".SuperSlide").slide({
        mainCell: ".bd ul", autoPlay: true, interTime: 4000, mouseOverStop: true,
        startFun: function (i, c) {
            $(".SuperSlide li a").eq(i).css({ "transition": "transform 3s linear", "transform": "scaleX(1.1) scaleY(1.1)" });
        },
        endFun: function (i, c) {
            $(".SuperSlide li a").eq(i).css({ "transform": "scaleX(1) scaleY(1)" });
        }
    });

    $(".xgguod .pitem").on("mouseenter", function () {
        $(this).find(".apply-btn").addClass("apply-btn-hover");
    }).on("mouseleave", function () {
        $(this).find(".apply-btn").removeClass("apply-btn-hover");
    });
    initSuperSlide();
    function initSuperSlide() {
        jQuery(".picScroll-left").slide({ titCell: ".hd ul", mainCell: ".bd ul", autoPage: true, effect: "left", autoPlay: true, scroll: 6, vis: 6, interTime: 4000 });
    }
}

function initMenu() {
    var offset = $('.nav').offset();
    $(window).scroll(function () {
        var scrollTop = $(window).scrollTop();
        if (offset.top + 300 < scrollTop) {
            $('.nav').addClass('nav_fixed');
            $('.ntp-hot').hide();
        } else {
            $('.nav').removeClass('nav_fixed');
            $('.ntp-hot').show();
        }
    });
}

function setTryInterval() {
    tryInter = setInterval(function () {
        if ($('#recomtitle').hasClass('zxinsxi')) {
            $('#recomtitle').removeClass('zxinsxi');
            $('#newtitle').addClass('zxinsxi');
            $('#recom').hide();
            $('#new').show();
        } else {
            $('#recomtitle').addClass('zxinsxi');
            $('#newtitle').removeClass('zxinsxi');
            $('#recom').show();
            $('#new').hide();
        }
    }, 5000);
}

function setReportInterval() {
    reportInter = setInterval(function () {
        if ($('#reporttitle').hasClass('zxinsxi')) {
            $('#reporttitle').removeClass('zxinsxi');
            $('#commtitle').addClass('zxinsxi');
            $('#report').hide();
            $('#comm').show();
        } else {
            $('#reporttitle').addClass('zxinsxi');
            $('#commtitle').removeClass('zxinsxi');
            $('#report').show();
            $('#comm').hide();
        }
    }, 5000);
}

function initTryStyle() {
    setTryInterval();
    $('#recomtitle').mouseover(function () {
        $('#recomtitle').addClass('zxinsxi');
        $('#newtitle').removeClass('zxinsxi');
        $('#recom').show();
        $('#new').hide();
        clearInterval(tryInter);
    });
    $('#newtitle').mouseover(function () {
        $('#recomtitle').removeClass('zxinsxi');
        $('#newtitle').addClass('zxinsxi');
        $('#recom').hide();
        $('#new').show();
        clearInterval(tryInter);
    });
    $('.summary').mouseover(function () { clearInterval(tryInter); });
    $('.summary').mouseout(function () { setTryInterval(); });
}

function initReportStyle() {
    setReportInterval();
    $('#reporttitle').mouseover(function () {
        $('#reporttitle').addClass('zxinsxi');
        $('#commtitle').removeClass('zxinsxi');
        $('#report').show();
        $('#comm').hide();
        clearInterval(reportInter);
    });
    $('#commtitle').mouseover(function () {
        $('#reporttitle').removeClass('zxinsxi');
        $('#commtitle').addClass('zxinsxi');
        $('#report').hide();
        $('#comm').show();
        clearInterval(reportInter);
    });
    $('.right_nav').mouseover(function () { clearInterval(reportInter); });
    $('.right_nav').mouseout(function () { setReportInterval(); });
}
