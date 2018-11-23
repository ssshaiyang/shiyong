function getReOrderDatail() {
	var token = localStorage.getItem("token");

	var searchURL = window.location.search;
	searchURL = searchURL.substring(1, searchURL.length);
	console.log(searchURL);
	var orderid = searchURL.split("&")[0].split("=")[1];
	// var uid = searchURL.split("&")[1].split("=")[1];
	// console.log(uid);
	// console.log("执行了getdatail");

	var url = "http://api.feizhugou.com/order/getRepurchaseOrder/detail/" + orderid
	$.ajax({
		url: url,
		type: "GET",
		dataType: "json",
		async: true,
		data: {
			// uid: uid
		},
		headers: {
			'Accept': 'aplication/json',
			'Authorization': '' + token
		},
		success: function(e) {
			console.log(e);
			if (e.code == 1000) {
				var data = e.data.orderStep;
				var search_result = data.search_result;
				var goods_one = data.goods_one;
				var goods_two = data.goods_two;
				var shop_pic_one = data.shop_pic_one;
				var shop_pic_two = data.shop_pic_two;
				var goods_header = data.goods_header;
				var goods_footer = data.goods_footer;
				var chat = data.chat;
				var payment = data.payment;

				var logistics = data.logistics;
				var comment = data.comment;

				var finishimg = '<img class="ok" src="./Content/images/gouxuan.png">';
				var nofinishimg = '<img class="ok" src="./Content/images/nogou.png">';
				var noneedimg = './Content/images/noneed.jpg'
				var data = e.data.orderStep;
				console.log(data)
				 data.second_time = '已完成' ;
				 data.courier_time = '已完成' ;
				 data.third_time = '已完成' ;
				 data.return_time ='已完成' ;
				if (data.name == 1) {
					data.second_time = '未完成' + nofinishimg;
					data.third_time = '未完成' + nofinishimg;
					data.courierNumber = '无';
					data.courier_time = '未完成' + nofinishimg;
					data.third_treasurePic = noneedimg;
					data.third_commentPic = noneedimg;
					data.return_time = '未完成' + nofinishimg;
					data.return_money = '未返款';
					data.second_orderNumber = "尚未提交";
				};
				if (data.name == 2) {
					data.second_time = data.second_time + finishimg;
					data.third_time = '未完成' + nofinishimg;
					data.courierNumber = '无';
					data.courier_time = '未完成' + nofinishimg;
					data.third_treasurePic = noneedimg;
					data.third_commentPic = noneedimg;
					data.return_time = '未完成' + nofinishimg;
					data.return_money = '未返款';
					//data.second_orderNumber = ;
				};
				if (data.name == 3) {
					data.second_time = data.second_time + finishimg;
					data.third_time = '未完成' + nofinishimg;
					data.courierNumber = data.courierNumber;
					data.courier_time = data.courier_time + finishimg;
					data.third_treasurePic = noneedimg;
					data.third_commentPic = noneedimg;
					data.return_time = '未完成' + nofinishimg;
					data.return_money = '未返款';
					//data.second_orderNumber = "还没有提交";
				};
				if (data.name == 4) {
					data.second_time = data.second_time + finishimg;
					data.third_time = data.third_time + finishimg;
					data.courierNumber = data.courierNumber;
					data.courier_time = data.courier_time + finishimg;
					data.third_treasurePic = data.third_treasurePic;
					data.third_commentPic = data.third_commentPic;
					data.return_time = '未完成' + nofinishimg;
					data.return_money = '未返款';
				};
				if (data.name == 5) {
					data.second_time = data.second_time + finishimg;
					data.third_time = data.third_time + finishimg;
					data.courierNumber = data.courierNumber;
					data.courier_time = data.courier_time + finishimg;
					data.third_treasurePic = data.third_treasurePic;
					data.third_commentPic = data.third_commentPic;
					data.return_time = data.return_time + finishimg;
					
				};
				if (data.name == 6) {
					data.second_time = data.second_time + finishimg;
					data.third_time = data.third_time + finishimg;
					data.courierNumber = data.courierNumber;
					data.courier_time = data.courier_time + finishimg;
					data.third_treasurePic = data.third_treasurePic;
					data.third_commentPic = data.third_commentPic;
					data.return_time = data.return_time + finishimg;
					
				};
				if (data.name == 7) {
					data.second_time = data.second_time + finishimg;
					data.third_time = data.third_time + finishimg;
					data.courierNumber = data.courierNumber;
					data.courier_time = data.courier_time + finishimg;
					data.third_treasurePic = data.third_treasurePic;
					data.third_commentPic = data.third_commentPic;
					data.return_time = data.return_time + finishimg;
					console.log("data.name == 7")
					
				};
				if (data.name == 8) {
					data.second_time = data.second_time + finishimg;
					data.third_time = data.third_time + finishimg;
					data.courierNumber = data.courierNumber;
					data.courier_time = data.courier_time + finishimg;
					data.third_treasurePic = data.third_treasurePic;
					data.third_commentPic = data.third_commentPic;
					data.return_time = data.return_time + finishimg;
					console.log("data.name == 7")
					
				};
				var treasureCollect ="./Content/images/noupload.png"
				var shopCollect ="./Content/images/noupload.png"
				var orderPic ="./Content/images/noupload.png"
				if(data.type>=2){
					treasureCollect=data.second_treasureCollect
					shopCollect =data.second_shopCollect
					orderPic=data.second_orderPic;
				}
				var html =

					'<tr>' +
					'<td class="bdd-b bdl pl-35">货比三家</td>' +
					'<td class="bdd-b">用户</td>' +
					'<td class="bdd-b">' + data.second_time + '</td>' +
					'<td class="bdd-b bdr ">' +
					'<a class="fancybox-effects-d" data-fancybox-group="gallery" href="' + search_result + '"><img class="pro_img "  src="'+search_result+'" width="62" height="62"></a>' +
					'<a class="fancybox-effects-d" data-fancybox-group="gallery" href="' + goods_one + '"><img class="pro_img "  src="'+goods_one+'" width="62" height="62"></a>' +
					'<a class="fancybox-effects-d" data-fancybox-group="gallery" href="' + goods_two + '"><img class="pro_img "  src="'+goods_two+'" width="62" height="62"></a>' +
					'</td>' +
					'</tr>' +
					'<tr>' +
					'<td class="bdd-b bdl pl-35">浏览店铺及目标商品</td>' +
					'<td class="bdd-b">用户</td>' +
					'<td class="bdd-b">' + data.second_time + '</td>' +
					'<td class="bdd-b bdr">' +
					'<a class="fancybox-effects-d" data-fancybox-group="gallery" href="' + shop_pic_one + '"><img class="pro_img "  src="'+shop_pic_one+'" width="62" height="62"></a>' +
					'<a class="fancybox-effects-d" data-fancybox-group="gallery" href="' + shop_pic_two + '"><img class="pro_img "  src="'+shop_pic_two+'" width="62" height="62"></a>' +
					'<a class="fancybox-effects-d" data-fancybox-group="gallery" href="' + goods_header + '"><img class="pro_img "  src="'+goods_header+'" width="62" height="62"></a>' +
					'<a class="fancybox-effects-d" data-fancybox-group="gallery" href="' + goods_footer + '"><img class="pro_img "  src="'+goods_footer+'" width="62" height="62"></a>' +
					'</td>' +
					'</tr>' +
					'<tr>' +
					'<td class="bdd-b bdl pl-35">聊天下单和支付</td>' +
					'<td class="bdd-b">用户</td>' +
					'<td class="bdd-b">' + data.second_time + '</td>' +
					'<td class="bdd-b bdr ">' +
					'<a class="fancybox-effects-d" data-fancybox-group="gallery" href="./Content/images/noneed.jpg"><img class="pro_img "  src="'+chat+'" width="62" height="62"></a>' +
					'<a class="fancybox-effects-d" data-fancybox-group="gallery" href="./Content/images/noneed.jpg"><img class="pro_img "  src="'+chat+'" width="62" height="62"></a>' +
					'<br>' +

					'</td>' +
					'</tr>' +
					'<tr>' +
					'<td class="bdd-b bdl pl-35">商家确认买手已经购买	</td>' +
					'<td class="bdd-b">用户</td>' +
					'<td class="bdd-b">' + data.second_time + '</td>' +
					'<td class="bdd-b bdr ">' +
					'<a class="fancybox-effects-d" data-fancybox-group="gallery" target="_blank" href="' + data.second_orderPic + '"><img class="pro_img " alt="./Content/images/noupload.png"   src="' + orderPic + '" width="62" height="62"></a>' +
					'<br>' +
					'<div>订单编号：'+ data.second_orderNumber +'</div>'+
					'</td>' +
					'</tr>' +
					'<tr>' +
					'<td class="bdd-b bdl pl-35">商家发货</td>' +
					'<td class="bdd-b">商家</td>' +
					'<td class="bdd-b"> ' + data.courier_time + '</td>' +
					'<td class="bdd-b bdr ">快递单号：' + data.courierNumber +
					'</td>' +
					'</tr>' +
					'<tr>' +
					'<td class="bdd-b bdl pl-35">收货并好评</td>' +
					'<td class="bdd-b">用户</td>' +
					'<td class="bdd-b">' + data.third_time + '</td>' +
					'<td class="bdd-b bdr ">' +
					'<p style="margin-bottom: 10px;">' +
					'普通好评' +
					'<a class="hurryevaluate" href="javascript: void(0)" data-id="59908491"></a>' +
					'</p>' +
					'<a class="fancybox-effects-d" data-fancybox-group="gallery" href="' + logistics + '"><img class="pro_img "  src="' + logistics + '" width="62" height="62"></a>' +
					'<a class="fancybox-effects-d" data-fancybox-group="gallery" href="' + comment + '"><img class="pro_img "  src="' + comment + '" width="62" height="62"></a>' +
					'</td>' +
					'</tr>' +
					'<tr>' +
					'<td class="bdb bdl pl-35"><p>确认无误发放佣金</p><p class="striking">(无操作2小时自动确认)</p></td>' +
					'<td class="bdb">平台</td>' +
					'<td class="bdb">' + data.return_time + '</td>' +
					'</tr>'+
					'<tr>' +
					'<td class="bdb bdl pl-35"><p>添加追加评论</p></td>' +
					'<td class="bdb">平台</td>' +
					'<td class="bdb">' + data.return_time + '</td>' +
					'</tr>'+
					'<tr>' +
					'<td class="bdb bdl pl-35"><p>确认无误发放追加评论佣金</p><p class="striking">(无操作2小时自动确认)</p></td>' +
					'<td class="bdb">平台</td>' +
					'<td class="bdb">' + data.return_time + '</td>' +
					'</tr>';
				$("#detail-list").append(html)


			} else {
				$("#detail-list").append(e.msg)
			}
		}
	})
}