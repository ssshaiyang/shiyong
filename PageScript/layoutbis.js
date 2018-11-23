$(function () {
    initLeftsidebar();
});

function initLeftsidebar() {
    /*$('.left_titi').click(function () {
        var id = $(this).attr('id');
        $('[parentid="' + id + '"]').toggle();
        if ($(this).find('.ft_up_down').attr('src').indexOf('down') >= 0) {
            $(this).find('.ft_up_down').attr('src', $(this).find('.ft_up_down').attr('src').replace('down', 'up'));
        } else {
            $(this).find('.ft_up_down').attr('src', $(this).find('.ft_up_down').attr('src').replace('up', 'down'));
        }
    });*/
    $('.left_titi').click(function () {
        var id = $(this).attr('id');
        $('[parentid="' + id + '"]').toggle();
        if ($(this).find('.ft_up_down').attr('class').indexOf('icon-Toboottom') >= 0) {
            $(this).find('.ft_up_down').attr('class', $(this).find('.ft_up_down').attr('class').replace('icon-Toboottom', 'icon-Toleft'));
        } else {
            $(this).find('.ft_up_down').attr('class', $(this).find('.ft_up_down').attr('class').replace('icon-Toleft', 'icon-Toboottom'));
        }
    });
}

function selectMenu(id) {
    $(id).addClass("sel_te");
    var parentid = $(id).parent().attr('parentid');
    $('[parentid="' + parentid + '"]').show();
    var domClass = $('#' + parentid + '.left_titi').find('.ft_up_down').attr('class');
    if (domClass) {
        $('#' + parentid + '.left_titi').find('.ft_up_down').attr('class', domClass.replace('icon-Toleft', 'icon-Toboottom'));
    }
    
}

function publish(url) {
    if (canPublish == 'True') {
        location.href = url;
    } else {
        myDialog({
            msg: '只有专业级年VIP和标准级年VIP才可以发布有奖竞猜哦！',
            cancelText: '成为VIP',
            cancel: function () { location.href = '/VIP/ApplyVip'; }
        });
    }
}


function shopissueVip(url) {
    if (canshopissue == 'True') {
        location.href = url;
    } else {
        myDialog({
            msg: '亲，非会员体验机会已使用，只有成为VIP才可以发布活动哦！',
            cancelText: '成为VIP',
            cancel: function () { location.href = '/VIP/ApplyVip'; }
        });
    }
}


function vipright(url) {
    if (isyearVip == 'True') {
        location.href = url;
    } else {
        myDialog({
            msg: '亲，只有年费会员才可以发布超划算哦！',
            cancelText: '成为VIP',
            cancel: function () { location.href = '/VIP/ApplyVip'; }
        });
    }
}

var id;

function setting(s) {
    if (s == 0) {
        $("#closebt").show();
    } else {
        s = parseInt(s) - 1;
        id = setTimeout("setting('" + s + "')", 1000);
    }
};