 function getsellerList(page, limit, ptype, atype, filter) { //获取获取商家活动列表
     var token = localStorage.getItem("token");
     var _page = page;
     var _limit = limit;
     var _filter = filter;
     var _atype = atype;
     var _ptype = ptype;
     console.log("执行了getsellerList");
     showLoading();
     $.ajax({
         url: 'http://api.feizhugou.com/activity/sellerList/get',
         type: "GET",
         dataType: "json",
         async: true,
         headers: {
             'Accept': 'aplication/json',
             'Authorization': '' + token
         },
         data: {
             page: _page,
             limit: _limit,
             filter: _filter,
             atype: _atype,
             platformType: _ptype
         },

         success: function(e) {
             if (e.code == 1000) {
                hideLoading();
                 console.log(e.data.msg[0]);
                 for (var i = 0; i < e.data.msg.length; i++) {
                     var data = e.data.msg[i];
                     var status = data.status;
                     switch (status) { //活动状态 0-待支付 1-待审核 2-进行中 3-已结束 4-已驳回 5-已结束
                         case 0:
                             statusname = "待支付";
                             break;
                         case 1:
                             statusname = "待审核";
                             break;
                         case 2:
                             statusname = "进行中";
                             break;
                         case 3:
                             statusname = "已结束";
                             break;
                         case 4:
                             statusname = "已驳回";
                             break;
                         case 5:
                             statusname = "已结束";
                             break;
                     };
                     if (status == 0) {
                         var btnhtml = '<div class="wae_cer" style="width:200px;margin-left:750px;">' +
                             '<a onclick="getVipRank(' + data.id + ')"  class="dv_psdb">' +
                             ' 支付' +
                             '  </a>' +
                             '<a href="./AddOrEdit.html?id=' + data.id + '" target="_blank" class="try-mg-add1">' +
                             ' 编辑活动' +
                             '  </a>' +
                             '<a class="try-mg-add" onclick="delact(' + data.id + ')" href="javascript:void(0)">' +
                             '  删除' +
                             '  </a>'
                     } else {
                         var btnhtml =
                             '<div class="f-fr opt-c">' +
                             '<ul class="f-cb">' +
                             '<li class="f-fl vbar">' +
                             '<a class="count" href="javascript:void(0);" style="cursor:default">' +
                             '<p class="num">' + data.unanswered + '</p>' +
                             '<p class="o-tag">未接单</p>' +
                             '</a>' +
                             '</li>' +
                             '<li class="f-fl vbar">' +
                             '<a class="count" href="javascript:void(0)" target="_blank">' +
                             '<p class="num">' + data.pendingDelivery + '</p>' +
                             '<p class="o-tag">待发货</p>' +
                             '</a>' +
                             '</li>' +
                             '<li class="f-fl vbar">' +
                             '<a class="count" href="javascript:void(0)" style="cursor:default">' +
                             '<p class="num">' + data.toBeEvaluated + '</p>' +
                             '<p class="o-tag">待评价</p>' +
                             '</a>' +
                             '</li>' +
                             '<li class="f-fl vbar">' +
                             '<a class="count" href="javascript:void(0);" style="cursor:default">' +
                             '<p class="num">' + data.toBeConfirmed + '</p>' +
                             '<p class="o-tag">待确认</p>' +
                             '</a>' +
                             '</li>' +
                             '<li class="f-fl vbar">' +
                             '<a class="count" href="javascript:void(0);" style="cursor:default">' +
                             '<p class="num">' + data.refunds + '</p>' +
                             '<p class="o-tag">待返款</p>' +
                             '</a>' +
                             '</li>' +
                             '<li class="f-fl">' +
                             '<a class="count" href="javascript:void(0); " style="cursor:default">' +
                             '<p class="num">' + data.finished + '</p>' +
                             '<p class="o-tag">已完成</p>' +
                             '</a>' +
                             '</li>' +
                             '</ul>' +
                             '</div>'

                     };


                     var bislisthtml = '<div class="order">' +
                         '<div class="ot f-cb">' +
                         '<div class="f-fl">' +
                         '<img class="plat-logo" src="./Content/images/taobao.png" alt="logo"/> <span class="shopname" title="">' + data.shopName + '</span>' +
                         '</div>' +
                         '<div class="f-fr">' +
                         '<ul class="f-cb ">' +
                         '<li class="f-fl prompt">' +
                         '<span style="color:#D9B300">手机淘宝</span>' +
                         '</li>' +
                         '<li class="f-fl vgb"></li>' +
                         '<li class="f-fl prompt">总单数：' + data.totalOrderNum + '</li>' +
                         '<li class="f-fl vgb"></li>' +
                         '<li class="f-fl prompt">创建时间：' + data.createTime + '</li>' +
                         '<li class="f-fl vgb"></li>' +
                         '<li class="f-fl">' +
                         '<a class="xq" href="./Order.html?getsellerList=' + data.id + '" target="_blank">[查看详情]</a>' +
                         '<a class="cf" href="./AddOrEdit.html">[重新发布]</a>' +
                         '</li>' +
                         '<li class="f-fl status p-r">' +
                         '<span class="taking">' + statusname + '</span>' +
                         '</li>' +
                         '</ul>' +
                         '</div>' +
                         '</div>' +
                         '<div class="ob f-cb">' +
                         '<div class="f-fl g-info p-r">' +
                         '<div class="f-cb">' +
                         '<a href="' + data.imgUrl + '" target="_blank"><img class="goods f-fl" src="' + data.imgUrl + '" alt="商品主图"></a>' +
                         '<div class="f-fl ">' +
                         '<div class="g-desc lim-w" title="">' +
                         '<span style="color:#FF4500">' + data.title +
                         '</span> ' +
                         '</div>' +
                         '<div class="r-time">' + data.begin + '</div>' +
                         '</div>' +
                         '</div>' +
                         '</div>' +
                         btnhtml + //支付或未支付
                         '</div>' +
                         '</div>';
                     $(".right_contant").after(bislisthtml);

                 }
                 if (e.data.totalActivityNum < 1) {
                    $(".right_contant").after('<div>暂时没有任何活动</div>')
                    console.log("totalActivityNum")
                 }
             }
         }
     })
 };


function showLoading(args) {
   // args = !args ? {} : args;
    //args.timestamp = new Date().getTime();
    //if (args.loadingId) {
        //var container = $(args.loadingId);
        if ($(".right_contant")) {
            $(".right_contant").css({
                "position": "relative"
            });
            $(".right_contant").append('<div class="loading" style="width:60px; height:24px; left:50%;top:50%;margin-left:150px;margin-top:-12px;"><img src="./Content/images/bis_loading.jpg"/></div>');
            console.log("showLoading")
        }
    //}
    return args;
}
function hideLoading(args) {
   
            $(".right_contant").find('.loading').remove();
        
}

var delflag = false;


 function delact(id) { //删除活动
     var token = localStorage.getItem("token");
     myConfirm("确认删除？", function() {
         if (window.delflag) {
             return false;
         }
         window.delflag = true;
         $.ajax({
             url: "http://api.feizhugou.com/activity/delete",
             type: "POST",
             dataType: "json",
             async: true,
             headers: {
                 'Accept': 'aplication/json',
                 'Authorization': '' + token
             },
             data: {
                 id: id
             },

             success: function(e) {
                 window.delflag = false;
                 location.href = location.href;
             }
         })
     });
 }

 function search() {
     window.location = "./JPinShopissueBis/?atypeid=" + "&filter=" + $('#key').val();
     // + "&status=" + status + "&orderType=" + orderType + "&sk_type=" + $("#sktype").val();
 }


 function getatype(atypeid) {
     var searchURL = window.location.search;
     console.log(searchURL)
     searchURL = searchURL.substring(1, searchURL.length);
     ptypeid = searchURL.split("&")[0].split("=")[1];
     console.log(ptypeid)
     var targetURL = window.location.search + "&atypeid=" + atypeid;
     console.log(targetURL);
     window.location = "./JPinShopissueBis.html?ptypeid=" + ptypeid + "&atype=" + atypeid
 }