function getReOrderDetail(){
	var token = localStorage.getItem("token");
	$.ajax({
        url:' http://api.feizhugou.com/activity/getRepurchaseInfo',
        type: "GET",
        dataType: "json",
       // header:{'Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8'};
       // async: true,
       beforeSend: function(xhr){xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');},//这里设置header
        data: {
            // page: 1,
            // limit: 15
        },
        headers: {
            'Accept': 'aplication/json',
            'Authorization': '' + token
        },
        success: function(e) {
            if (e.code == 1000) {
               	var data = e.data;
               	$("#showPrice").text(data.goods[0].showPrice);
               	$("#goodsPrice").text(data.goods[0].goodsPrice);
               	$("#beatNum").text(data.goods[0].beatNum);
               	$("#goodsUrl").text(data.goods[0].goodsUrl);
               	if (data.taskType == 1) {
               		var taskType = "手机淘宝任务"
               	};
               	$("#taskType").text(taskType);
               	if (data.isPost == 1 ) {
               		var isPost = '包邮'
               	};
               	if (data.isPost == 2 ) {3
               		var isPost = '不包邮'
               	};
               	$("#isPost").text();
               	$("#shopName").text(data.shopName);
               	console.log(data.goods.imgUrl)
               	$("#imgHeadUrl").attr("src", data.goods[0].imgUrl);
               	$("#remark").text(data.remark)
               	// $("#activityType").text();
               	// $("#activityType").text();
               	// $("#activityType").text();
               	// $("#activityType").text();
               	// $("#activityType").text();
               	// $("#activityType").text();
               	// $("#activityType").text();


                
            }
        }
    })
}