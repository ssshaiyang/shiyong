function startRotate(angle, callback) {
    // 底座旋转
    $("#disk").rotate({
        duration: 12000, //转动时间 
        angle: 0,
        animateTo: 3600, //转动角度 
        // easing: $.easing.easeOutSine, 
    });
    // 指针旋转
    $("#z1").rotate({
        duration: 14000, //转动时间 
        angle: 0,
        animateTo: 3600, //转动角度 
        // easing: $.easing.easeOutSine, 

    });
    // 转盘旋转
    $("#disk2").rotate({
        duration: 15000, //转动时间
        angle: 0,
        animateTo: -3600 - angle, //转动角度
        // easing: $.easing.easeOutSine,
        callback: function () {
            if (callback != null) {
                callback();
            }
        }
    });
}

var isLottery;
function lottery() {
    checkLogin(function () {
        if (isLottery) {
            return;
        }
        isLottery = true;
        $.post('/Lottery/GetReward', function (d) {
            if (d.Result) {
                $("#leftGold").text(d.Data.Item1);
                $("#leftRewardCount").text(d.Data.Item2);
                var angle = 0;
                switch (d.Data.Item3) {
                    case 0://0.01元现金
                        angle = 129; break;
                    case 1://0.02元现金
                        angle = 13; break;
                    case 2://0.05元现金
                        angle = 67; break;
                    case 3://0.1元现金
                        angle = 347; break;
                    case 5://5元现金
                        angle = 97; break;
                    case 6://10元现金
                        angle = 297; break;
                    case 7://30元现金
                        angle = 163; break;
                    case 8://50元现金
                        angle = 36; break;
                    case 9://60金币
                        angle = 198; break;
                    case 10://100金币
                        angle = 324; break;
                    case 12://1次免提现手续费
                        angle = 233; break;
                    case 13://再接再厉
                        angle = 257; break;
                    default:
                }
                startRotate(angle, function () {
                    if (d.Data.Item3 == 13) {
                        myDialog({
                            msg: "不要难过，去邀请您的小伙伴，每邀请5个人最少可以获得90元的现金奖励哦，我只偷偷的告诉你哦，快去抓你的小伙伴来参加活动！",
                            cancelText: "去邀请好友",
                            cancel: function () { window.open('index.html'); },
                        });
                    } else {                      
                        myAlert(d.Message);
                    }
                    isLottery = false;
                });

            } else {
                if ($("#leftGold").text() < 50) {
                    myDialog({
                        msg: "您的金币不足，成为VIP即送368金币哦！",
                        cancelText: "成为VIP",
                        cancel: function () { window.open('http://www.meilipa.com/VIP/UserVip'); },
                    });
                } else {
                    myDialog({
                        msg: "您的抽奖机会已用完，成为VIP一天可抽奖20次哦！",
                        cancelText: "成为VIP",
                        cancel: function () { window.open('http://www.meilipa.com/VIP/UserVip'); },
                    });
                }
                //myAlert(d.Message);
                isLottery = false;
            }
        });
    });
}