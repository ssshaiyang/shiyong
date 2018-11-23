$(function() {

    $("#tab-shop span").on("click", function() {
        $(this).addClass("act").siblings().removeClass("act");
        $("#tab-shop-con .shangjia_ggleft").eq($(this).index()).show().siblings().hide();
    })

    $('.right_centrv.save dl dd a').not('.save-for-me').hover(function() {
        $(this).css('color', '#fff').find('.red').css('color', '#fff');
    }, function() {
        $(this).css('color', '#666').find('.red').css('color', '#e84c3d');
    });
    initAutoPlay();
    $('.bis_bg_user_pic').mouseenter(function() {
        $('#touming').show();
    });
    $('.bis_bg_user_pic').mouseleave(function() {
        $('#touming').hide();
    });
    var selectHtml = '<div class="selectIMG"><h3>点击图片选择头像 <i class="iconfont icon-close1"></i></h3>';
    for (var i = 1; i < 17; i++) {
        selectHtml += '<li><img src="/Content/images/icon/' + i + '.png" alt="加载失败" /></li>';
    }
    selectHtml += '<ul></ul></div>';
    $("body").append(selectHtml);
    $("#touming").on("click", function() {
        $(".selectIMG").slideDown();
    });
    $(".selectIMG .icon-close1").on("click", function() {
        $(".selectIMG").slideUp();
    });
    $(".selectIMG li img").on("click", function() {
        var IMGurl = $(this).attr("src");
        $.post('/Bis/SaveLogo', {
            logo: IMGurl
        }, function(d) {
            if (d.Result) {
                $('#imgPic').attr("src", IMGurl);
            } else {
                myAlert("上传头像失败");
            }
            $(".selectIMG").slideUp();
        });
    });
});

function initAutoPlay() {
    var aLi = $('.autoPlay li');
    aLi.hide();
    if (aLi.length > 0)
        aLi.eq(0).show();
    var timer = null;
    var iNow = 0;

    function autoPlay() {
        timer = setInterval(function() {
            iNow++;
            if (iNow >= aLi.length) {
                iNow = 0;
            }
            aLi.hide();
            aLi.eq(iNow).show();
        }, 3000);
    }
    autoPlay();
    aLi.hover(function() {
        clearInterval(timer);
    }, autoPlay);
}

function reload() {
    window.location = window.location;
}