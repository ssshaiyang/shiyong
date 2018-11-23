function getByteLen(val) {   
	var len = 0;   
	for (var i = 0; i < val.length; i++) {   
	if (val[i].match(/[^\x00-\xff]/ig) != null) //全角   
	len += 2;   
	else   
	len += 1;   
	}   
	return len;   
} 

function checkgoodslink(link, plat) {//商品链接地址检测
	switch (plat) {
		case 1: //淘宝平台
			return /^(http|https):\/\/.*\.(taobao|tmall|alitrip|fliggy)\..+\//.test(link)
				|| /^(http|https):\/\/detail\.yao/.test(link)
		case 2: //美丽说
			return /^(http|https):\/\/.*\.meilishuo\..*\//.test(link);
		case 3: //京东
			return /^(http|https):\/\/.*\.jd\..*\//.test(link);
		case 4: //蘑菇街
			return /^(http|https):\/\/.*\.mogujie\..*\//.test(link);
		default: 
			return true;
	}
}

function getplatname(plat) {//获取平台名称
	var task_type = $('#task_type').val();
	switch (plat) {
		case 1: if (task_type==6) {return '天猫';} else {return '淘宝';}
		case 2: return '美丽说';
		case 3: return '京东';
		case 4: return '蘑菇街';
	}
}
function changeState(e){
	var isaddgoodcom = $('#isaddgoodcom').is(':checked');
	var isaddwordcom = $('#isaddwordcom').is(':checked');
	var isaddimgcom = $('#isaddimgcom').is(':checked');
	if (isaddgoodcom) {
		$('#isaddgoodcomcontent').css('display','block');
	}else{
		$('#isaddgoodcomcontent').css('display','none');
	}
	if (isaddwordcom) {
		$('#isaddwordcomContent').css('display','block');
	}else{
		$('#isaddwordcomContent').css('display','none');
	}
	if (isaddimgcom) {
		$('#isaddimgcomContent').css('display','block');
	}else{
		$('#isaddimgcomContent').css('display','none');
	}
}
function settimerelease(){//垫付多搜索关键词定时设置
	var re = /^\d+$/ ;  
	var count = 0;
	var isaddgoodcom = $('#isaddgoodcom').is(':checked');
	var isaddwordcom = $('#isaddwordcom').is(':checked');
	var isaddimgcom = $('#isaddimgcom').is(':checked');
	check2_stepthree();
	if (isaddgoodcom) {
		console.log(123)
		$('.com-type-ipt-arr .type-ipt-wrap').each(function(index, el) {
			var num = $('#com_sk_num_'+(index+1)).val();
			count += ~~num;
		});
	}
	if (isaddwordcom) {
		$('.kw-type-ipt-arr .type-ipt-sk').each(function(index, el) {
			var num = $('#kw_sk_num_'+(index+1)).val();
			count += ~~num;
		});
	}
	if (isaddimgcom) {
		$('.pic-type-ipt-arr .type-ipt-wrap').each(function(index, el) {
			var num = $('#pic_sk_num_'+(index+1)).val();
			count += ~~num;
		});
	}
	var taskinterval = $('#taskinterval').is(':checked');
	if(!taskinterval){
		$("#taskinterval_info").html("");
		$.prompt("只有任务发布设置复选框勾选后设置才会生效");
		return;
	}
	var startdate = $("#startdate").val();
	var starthour = $("#starthour").val();
	var endhour = $("#endhour").val();
	if(startdate == ""){
		return;
	}
	if(starthour == ""){
		return;
	}
	if(endhour == ""){
		return;
	}
	if(!re.test(starthour) || parseInt(starthour) < 0){
		$("#taskinterval_info").html("");
		$.prompt("任务发布设置 - 放单开始时间，只能设置0-23的正整数");
		$("#starthour").focus();
		return false;
	}
	if(!re.test(endhour) || parseInt(endhour) > 24){
		$("#taskinterval_info").html("");
		$.prompt("任务发布设置 - 放单结束时间，只能设置0-24的正整数");
		$("#endhour").focus();
		return false;
	}
	if(parseInt(endhour)-parseInt(starthour) <= 0){
		$("#taskinterval_info").html("");
		$.prompt("任务发布设置 - 放单时间点不能设置相同值");
		return false;
	}
	var intestatistics = $("#intestatistics").val(); 
	if (intestatistics != "" && !re.test(intestatistics)){
		$("#intestatistics").val("");
		$("#taskinterval_info").html("");
		$("#intestatistics").focus();
		$.prompt("任务发布设置 - 定时发布数只能填写正整数");
		return;
	}
	if (!re.test(intestatistics)){
		$("#intestatistics").val("");
		return false;
	}
	if(count == 0){
		$("#intestatistics").val("");
		$("#taskinterval_info").html("");
		$("#tasknum_one").focus();
		$.prompt("选择任务类型和单数");
		return false;
	}
	if(parseInt(intestatistics) > count){
		$("#intestatistics").val("");
		$("#taskinterval_info").html("");
		$.prompt("任务发布设置-当天总共发布数不能大于任务总单数："+count+"单");
		return false;
	}
	var interval_time = (parseInt(endhour)-parseInt(starthour))*60 / parseInt(intestatistics);
	var interval_num = 1;
	if(interval_time < 2){
		interval_time = 1;
		interval_num = 2;
	}
	interval_time =  parseInt(interval_time);
	$("#times").val(interval_time);
	var msg = '<span class="striking">'+startdate+'号开始，每天'+starthour+'点到'+endhour+'点之间，</span><span style="color: #ed6f09;">每'+interval_time+'分钟放出'+interval_num+'单</span>';
	$("#taskinterval_info").html(msg);
}


function setfbflowtime(){//浏览多搜索关键词定时设置
	if (!check2_flow_step_three()) {
		return false;
	}
	var re = /^\d+$/;
	var count = 0;
	$('.flow-type-ipt-arr .type-ipt-wrap').each(function(index, el){
		var flownum = $('#com_flow_num_'+(index+1)).val().trim();
		count += ~~flownum;
	});
	var taskinterval = $('#taskinterval').is(':checked');
	if(!taskinterval){
		$("#taskinterval_info").html("");
		$.prompt("只有任务发布设置复选框勾选后设置才会生效");
		return;
	}
	var startdate = $("#startdate").val();
	var starthour = $("#starthour").val();
	var endhour = $("#endhour").val();
	var intestatistics = $("#intestatistics").val();
	if(startdate == ""){
		return;
	}
	if(starthour == ""){
		return;
	}
	if(endhour == ""){
		return;
	}
	if(!re.test(starthour) || parseInt(starthour) < 0){
		$("#taskinterval_info").html("");
		$.prompt("任务发布设置 - 放单开始时间，只能设置0-23的正整数");
		$("#starthour").focus();
		return false;
	}
	if(!re.test(endhour) || parseInt(endhour) > 24){
		$("#taskinterval_info").html("");
		$.prompt("任务发布设置 - 放单结束时间，只能设置0-24的正整数");
		$("#endhour").focus();
		return false;
	}
	if(parseInt(endhour)-parseInt(starthour) <= 0){
		$("#taskinterval_info").html("");
		$.prompt("任务发布设置 - 放单时间点不能设置相同值");
		return false;
	}
	if (intestatistics != "" && !re.test(intestatistics)){
		$("#intestatistics").val("");
		$("#taskinterval_info").html("");
		$.prompt("任务发布设置-总共发布数只能填写正整数");
		return;
	}
	if (!re.test(intestatistics)){
		$("#intestatistics").val("");
		return;
	}
	if(parseInt(intestatistics) > count){
		$("#intestatistics").val("");
		$("#taskinterval_info").html("");
		$.prompt("任务发布设置-当天总共发布数不能大于任务总单数："+count+"单");
		return;
	}
	var interval_time = (parseInt(endhour)-parseInt(starthour))*60 / parseInt(intestatistics);
	var interval_num = 1;
	if (interval_time < 2) {
		interval_time = 1;
		interval_num = 2;
	}
	interval_time =  parseInt(interval_time);
	$("#times").val(interval_time);
	var msg = '<span class="striking">'+startdate+'号开始，每天'+starthour+'点到'+endhour+'点之间，</span><span style="color: #ed6f09;">每'+interval_time+'分钟放出'+interval_num+'单</span>';
	$("#taskinterval_info").html(msg);
}


function check2_stepone(plat) {//发布多关键词垫付任务填写信息，步骤1验证
	try {
		var goodsname   = $("#goodsname").val(); 
		var goodslink   = $("#goodslink").val();
		var goodslink1  = $("#goodslink_1").val();
		var goodslink2  = $("#goodslink_2").val(); 
		var itemprice   = $("#itemprice").val(); 
		var itemnum     = $("#itemnum").val(); 
		var itemprice1  = $("#itemprice_1").val(); 
		var itemnum1    = $("#itemnum_1").val(); 
		var itemprice2  = $("#itemprice_2").val(); 
		var itemnum2    = $("#itemnum_2").val(); 
		var searchprice = $("#searchprice").val(); 
		var pic 		=  $("#pic").val();
		var pic1 		=  $("#pic_1").val();  
		var pic2 		=  $("#pic_2").val();
		var backmoneymode = $('#backmoneymode').val();
		var postsign = $('input:radio[name="postsign"]:checked').val();
		var is_add_sku = ~~ $('#is_add_sku:checked').val();
		var priceformat = /^[0-9]+.?[0-9]*$/;
		var numformat = /^[1-9][0-9]*$/;
		if (goodsname == "") {
			$("#goodsname").addClass("error");
			$("#goodsname").focus();
			$("#goodsname_error").html("请填写 商品名称");
			$("#goodsname_error").show();
			return false;
		}
		goodsname = goodsname.trim();
		if (goodsname.length > 80) {
			$("#goodsname").addClass("error");
			$("#goodsname").focus();
			$("#goodsname_error").html("商品名称最多填写80个汉字");
			$("#goodsname_error").show();
			return false;
		}
		if (/^(http|https):\/\//.test(goodsname)) {
			$("#goodsname").addClass("error");
			$("#goodsname").focus();
			$("#goodsname_error").html("商品名称不可填写链接地址");
			$("#goodsname_error").show();
			return false;
		}
		$("#goodsname").removeClass("error");
		$("#goodsname_error").hide();
		if (goodslink == '') {
			$("#goodslink").addClass("error");
			$("#goodslink").focus();
			$("#goodslink_error").html("请填写 商品连接");
			$("#goodslink_error").show();
			return false;
		}
		if (!checkgoodslink(goodslink, plat)) {
			$("#goodslink").addClass("error");
			$("#goodslink").focus();
			$("#goodslink_error").html("请输入正确的" + getplatname(plat) + "商品连接");
			$("#goodslink_error").show();
			return false;
		}
		$("#goodslink").removeClass("error");
		$("#goodslink_error").hide();
		if (pic == "" || pic.indexOf("default_upic.png") > 0) {
			$.prompt("商品主图未上传");
			$("#pic_error").html("商品主图未上传！");
			$("#pic_error").show();
			return false;
		}
		$("#pic_error").hide();
		if (itemprice == "" || !priceformat.test(itemprice)) {
			$("#itemprice").addClass("error"); 
			$("#itemprice").focus();
			$("#itemprice_error").html("单品实际成交价格只能填写数字");
			$("#itemprice_error").show();
			return false;
		}
		$("#itemprice").removeClass("error");
		$("#itemprice_error").hide();
		if (itemnum == "" || !numformat.test(itemnum)) {
			$("#itemnum").addClass("error");
			$("#itemnum").focus();
			$("#itemnum_error").html("每单拍数量只能填写正整数");
			$("#itemnum_error").show();
			return false;
		}	
		$("#itemnum").removeClass("error");
		$("#itemnum_error").hide();
		if (searchprice == "" || !priceformat.test(searchprice)) {
			$("#searchprice").addClass("error");
			$("#searchprice").focus();
			$("#searchprice_error").html("搜索页面展示价格只能填写数字");
			$("#searchprice_error").show();
			return false;
		}
		$("#searchprice").removeClass("error");
		$("#searchprice_error").hide();
		if (!!goodslink1) {//附加商品一数据验证
			if (!checkgoodslink(goodslink1, plat)) {
				$("#goodslink_1").addClass("error");
				$("#goodslink_1").focus();
				$("#goodslink_1_error").html("请输入正确的" + getplatname(plat) + "子商品连接");
				$("#goodslink_1_error").show();
				return false;
			}
			$("#goodslink_1").removeClass("error");
			$("#goodslink_1_error").hide();
			if (pic1=="" || typeof(pic1) == "undefined" ) {
				$.prompt("附加商品一主图未上传");
				$("#showpic").focus();
				$("#pic_1_error").html("附加商品一主图未上传！");
				$("#pic_1_error").show();
				return false;
			}
			$("#pic_1_error").hide();
			if (itemprice1 == "" || !priceformat.test(itemprice1)) {
				$("#itemprice_1").addClass("error");
				$("#itemprice_1").focus();
				$("#itemprice_1_error").html("附加商品一实际成交价格只能填写数字");
				$("#itemprice_1_error").show();
				return false;
			}
			$("#itemprice_1").removeClass("error");
			$("#itemprice_1_error").hide();
			if (itemnum1 == "" || !numformat.test(itemnum1)){
				$("#itemnum_1").addClass("error");
				$("#itemnum_1").focus();
				$("#itemnum_1_error").html("附加商品一每单拍数量只能填写正整数");
				$("#itemnum_1_error").show();
				return false;
			}	
			$("#itemnum_1").removeClass("error");
			$("#itemnum_1_error").hide();
		}
		if (!!goodslink2) {//附加商品二数据验证
			if (!checkgoodslink(goodslink2, plat)) { 
				$("#goodslink_2").addClass("error");
				$("#goodslink_2").focus();
				$("#goodslink_2_error").html("请输入正确的" + getplatname(plat) + "子商品连接");
				$("#goodslink_2_error").show();
				return false;
			}
			$("#goodslink_2").removeClass("error");
			$("#goodslink_2_error").hide();
			if(pic2 =="" || typeof(pic2) == "undefined" ){
				$.prompt("附加商品二主图未上传");
				$("#showpic").focus();
				$("#pic_2_error").html("附加商品二主图未上传！");
				$("#pic_2_error").show();
				return false;
			}
			$("#pic_2_error").hide();
			if (itemprice2 == "" || !priceformat.test(itemprice2)){
				$("#itemprice_2").addClass("error");
				$("#itemprice_2").focus();
				$("#itemprice_2_error").html("附加商品二实际成交价格只能填写数字");
				$("#itemprice_2_error").show();
				return false;
			}
			$("#itemprice_2").removeClass("error");
			$("#itemprice_2_error").hide();
			if (itemnum2 == "" || !numformat.test(itemnum2)){
				$("#itemnum_2").addClass("error");
				$("#itemnum_2").focus();
				$("#itemnum_2_error").html("附加商品二每单拍数量只能填写正整数");
				$("#itemnum_2_error").show();
				return false;
			}	
			$("#itemnum_2").removeClass("error");
			$("#itemnum_2_error").hide();
		}
		if (typeof(postsign) == "undefined" && backmoneymode==1) {
			$.prompt("请设置商品收取运费的方式");
			$("#postsign_error").html("请设置商品收取运费的方式");
			$("#postsign_error").show();
			return false;
		}
		$("#postsign_error").hide();
		var result = true;
		if (is_add_sku == 1) {//京东垫付任务添加sku
			$('.step-1 .sku-lst .sku-item').each(function(idx, el){
				var attrname = $(this).find('.attr_name').val();
				var attrvalue= $(this).find('.attr_value').val();
				if (!attrname) {
					$.prompt('请输入属性名称');
					$(this).find('.attr_name').focus();
					result = false;
					return false;
				}
				if (attrname.length > 80) {
					$.prompt('属性名称最多输入80字符');
					$(this).find('.attr_name').focus();
					result = false;
					return false;
				}
				if (!attrvalue) {
					$.prompt('请输入属性值');
					$(this).find('.attr_value').focus();
					result = false;
					return false;
				}
				if (attrvalue.length > 180) {
					$.prompt('属性名称最多输入180字符');
					$(this).find('.attr_value').focus();
					result = false;
					return false;
				}
			});
		}
		return result;
	} catch(e) {
		console.log(e);
		$.prompt('步骤一验证出错');
		return false;
	}
}
  
function check2_steptwo(plat) {//发布多关键词垫付任务填写信息，步骤2验证
	try {
		var sortmsg = $(".addedkeyword .sortmsg:checked").val();
		var position = $("#position").val(); 
		var minprice = $("#minprice").val(); 
		var maxprice = $("#maxprice").val();   
		var message_1= $("#message_1").val(); 
		var priceformat = /^[0-9]+.?[0-9]*$/;
		var numformat = /^(([1-9][0-9]*)|0)$/;
		if (!sortmsg) {
			$.prompt('商品搜索排序方式未选择!');
			$('#sortmsg_error').show();
			if (location.href.indexOf('#anchor-sortmsg') == -1) {
				location.href = location.href + '#anchor-sortmsg';
			} else {
				location.href = location.href;
			}
			return false;
		}
		$('#sortmsg_error').hide();
		if (position == "" || (plat==1 && !numformat.test(position))) {
			$("#position").addClass("error");
			$("#position").focus();
			if (plat==1 || plat==2) {
				$("#position_error").html("现有付款人数只能填写数字");
			} else {
				$("#position_error").html("请按提示填写排序描述");
			}
			$("#position_error").show();
			return false;
		}
		$("#position").removeClass("error");
		$("#position_error").hide();
		if (!!minprice) {
			if (!priceformat.test(minprice)) {
				$("#minprice").focus();
				$.prompt("价格区间只能填写数字");
				return false;
			}
		}
		if (!!maxprice) {
			if(!priceformat.test(maxprice)){
				$("#maxprice").focus();
				$.prompt("价格区间只能填写数字");
				return false;
			}
		}
		if (message_1.length > 100) {
			$("#message_1").focus();
			$.prompt("订单留言最多输入100个中文");
			return false;
		}
		return true;
	} catch(e) {
		$.prompt('步骤二验证出错');
		return false;
	}
}

function check2_stepthree(plat) {//发布多关键词垫付任务填写信息，步骤3验证
	
	var isaddgoodcom = $('#isaddgoodcom').is(':checked');
	var isaddwordcom = $('#isaddwordcom').is(':checked');
	var isaddimgcom = $('#isaddimgcom').is(':checked');
	if (!isaddgoodcom && !isaddwordcom && !isaddimgcom) {
		$("#release_type_unseled").html('请至少选择一种选择任务类型').show();
		$.prompt("第三步，请至少选择一种选择任务类型");
		return false;
	}
	$("#release_type_unseled").hide();

	var priceformat = /^[0-9]+.?[0-9]*$/;
	var numformat = /^[1-9][0-9]*$/;
	try {
		if (isaddgoodcom) {//普通好评任务添加数据验证
			if (!_checkcomgoodtask()) {
				return false;
			}
		}
	} catch(e) {
		$.prompt('普通好评任务数据验证出错');
		return false;
	} 
	try {
		if (isaddwordcom) {
			if (!_checkkwgoodtask()) {//关键词好评任务验证
				return false;
			}
		}
	} catch(e) {
		$.prompt('文字好评任务数据验证出错');
		return false;
	}
	try {
		if (isaddimgcom) {
			if (!_checkpicgoodstask()) {//图片好评任务验证
				return false;
			}
		}
	} catch(e) {
		$.prompt('图文好评任务数据验证出错');
		return false;
	}

	return true;

	function _checkcomgoodtask() {//普通好评任务添加数据验证
		var $comiptpanel = $('.com-type-ipt-arr .type-ipt-wrap');
		var result = true;
		$comiptpanel.each(function(index, el) {
			var numformat = /^[1-9][0-9]*$/;	
			var com_sk = $('#com_sk_' + (index+1)).val();
			var com_sk_num = $('#com_sk_num_' + (index+1)).val();
			var com_flow_num = $('#com_flow_num_' + (index+1)).val();
			var com_favflow_1 = $('#com_favflow_1_' + (index+1)).is(':checked');
			var com_favflow_3 = $('#com_favflow_3_' + (index+1)).is(':checked');
			var com_favflow_2 = $('#com_favflow_2_' + (index+1)).is(':checked');
			var com_favflow_num = $('#com_favflow_num_' + (index+1)).val();
			if (com_sk=='') {
				result = false;
				$.prompt('普通好评任务，搜索关键词' + (index+1) + '未填写');
				$('#com_sk_' + (index+1)).focus();
				return false;
			}
			if (com_sk.length>40) {
				result = false;
				$.prompt('普通好评任务，搜索关键词' + (index+1) + '最多填写40个字');
				$('#com_sk_' + (index+1)).focus();
				return false;
			}
			if (!numformat.test(com_sk_num)) {
				result = false;
				$.prompt('普通好评任务，垫付单数只能填写整数');
				$('#com_sk_num_' + (index+1)).focus();
				return false;
			}
			if (!!com_flow_num && !numformat.test(com_flow_num)) {
				result = false;
				$.prompt('普通好评任务，普通浏览数只能填写整数');
				$('#com_flow_num_' + (index+1)).focus();
				return false;
			}
			if (!!com_favflow_num) {
				if (!numformat.test(com_favflow_num)) {
					result = false;
					$.prompt('普通好评任务，收藏加购数只能填写整数');
					$('#com_favflow_num_' + (index+1)).focus();
					return false;
				}
				if (com_flow_num=='') {
					result = false;
					$.prompt('普通好评任务，收藏加购数有填写，普通浏览数未填写');
					$('#com_flow_num_' + (index+1)).focus();
					return false;
				}
				if (~~com_favflow_num > ~~com_flow_num) {
					result = false;
					$.prompt('普通好评任务，收藏加购数大于普通浏览数');
					$('#com_favflow_num_' + (index+1)).focus();
					return false;
				}
				if (!com_favflow_1 && !com_favflow_2 && !com_favflow_3) {
					result = false;
					$.prompt('设置了收藏加购数，但并未选择具体的收藏加购类型');
					$('#com_favflow_num_' + (index+1)).focus();
					return false;
				}
			}
		});
		return result;
	}

	function _checkkwgoodtask() {//文字好评任务添加数据验证
		var $kwiptpanel = $('.kw-type-ipt-arr .type-ipt-sk');
		var result = true;
		$kwiptpanel.each(function(index, el) {
			var numformat = /^[1-9][0-9]*$/;	
			var kw_sk = $('#kw_sk_' + (index+1)).val();
			var kw_sk_num = $('#kw_sk_num_' + (index+1)).val();
			var kw_flow_num = $('#kw_flow_num_' + (index+1)).val();
			var kw_favflow_1 = $('#kw_favflow_1_' + (index+1)).is(':checked');
			var kw_favflow_3 = $('#kw_favflow_3_' + (index+1)).is(':checked');
			var kw_favflow_2 = $('#kw_favflow_2_' + (index+1)).is(':checked');
			var kw_favflow_num = $('#kw_favflow_num_' + (index+1)).val();
			if (kw_sk=='') {
				result = false;
				$.prompt('文字好评任务，搜索关键词' + (index+1) + '未填写');
				$('#kw_sk_' + (index+1)).focus();
				return false;
			}
			if (kw_sk.length>40) {
				result = false;
				$.prompt('文字好评任务，搜索关键词' + (index+1) + '最多填写40个字');
				$('#kw_sk_' + (index+1)).focus();
				return false;
			}
			if (!numformat.test(kw_sk_num)) {
				result = false;
				$.prompt('文字好评任务，垫付单数只能填写整数');
				$('#kw_sk_num_' + (index+1)).focus();
				return false;
			}
			if (!!kw_flow_num && !numformat.test(kw_flow_num)) {
				result = false;
				$.prompt('文字好评任务，普通浏览数只能填写整数');
				$('#kw_flow_num_' + (index+1)).focus();
				return false;
			}
			if (!!kw_favflow_num) {
				if (!numformat.test(kw_favflow_num)) {
					result = false;
					$.prompt('文字好评任务，收藏加购数只能填写整数');
					$('#kw_favflow_num_' + (index+1)).focus();
					return false;
				}
				if (kw_flow_num=='') {
					result = false;
					$.prompt('文字好评任务，收藏加购数有设置，普通浏览数未填写');
					$('#kw_flow_num_' + (index+1)).focus();
					return false;
				}
				if (~~kw_favflow_num > ~~kw_flow_num) {
					result = false;
					$.prompt('文字好评任务，收藏加购数应该小于等于普通浏览数');
					$('#kw_favflow_num_' + (index+1)).focus();
					return false;
				}
				if (!kw_favflow_1 && !kw_favflow_2 && !kw_favflow_3) {
					result = false;
					$.prompt('设置了收藏加购数，但并未选择具体的收藏加购类型');
					$('#kw_favflow_num_' + (index+1)).focus();
					return false;
				}
			}
		});
		$('#wrap-kwtype-opt .wz_keyword_ct').each(function(index, el){
			var ct = $(el).val();
			if (!ct) {
				result = false;
				$(el).focus();
				$.prompt('第' + (index + 1) + '单评价文字未填写');
				return false;
			}
			if (ct.length > 999) {
				result = false;
				$(el).focus();
				$.prompt('第' + (index + 1) + '单文字评价字数最多999字');
				return false;
			}
		});
		return result;
	}

	function _checkpicgoodstask() {//图片好评任务添加数据验证
		var $piciptpanel = $('.pic-type-ipt-arr .type-ipt-wrap');
		var result = true;
		var ordernum = 0;
		$piciptpanel.each(function(index, el) {
			var numformat = /^[1-9][0-9]*$/;
			var pic_sk = $('#pic_sk_' + (index+1)).val();
			var pic_sk_num = $('#pic_sk_num_' + (index+1)).val();
			var pic_flow_num = $('#pic_flow_num_' + (index+1)).val();
			var pic_favflow_1 = $('#pic_favflow_1_' + (index+1)).is(':checked');
			var pic_favflow_2 = $('#pic_favflow_2_' + (index+1)).is(':checked');
			var pic_favflow_3 = $('#pic_favflow_3_' + (index+1)).is(':checked');
			var pic_favflow_num = $('#pic_favflow_num_' + (index+1)).val();
			
			if (pic_sk=='') {
				result = false;
				$.prompt('图文好评任务，搜索关键词' + (index+1) + '未填写');
				$('#pic_sk_' + (index+1)).focus();
				return false;
			}
			if (pic_sk.length>40) {
				result = false;
				$.prompt('图文好评任务，搜索关键词' + (index+1) + '最多填写40个字');
				$('#pic_sk_' + (index+1)).focus();
				return false;
			}
			if (!numformat.test(pic_sk_num)) {
				result = false;
				$.prompt('图文好评任务，垫付单数只能填写正整数');
				$('#pic_sk_num_' + (index+1)).focus();
				return false;
			}
			ordernum += ~~pic_sk_num;
			if (!!pic_flow_num && !numformat.test(pic_flow_num)) {
				result = false;
				$.prompt('图文好评任务，普通浏览数只能填写整数');
				$('#pic_flow_num_' + (index+1)).focus();
				return false;
			}
			if (!!pic_favflow_num) {
				if (!numformat.test(pic_favflow_num)) {
					result = false;
					$.prompt('图文好评任务，收藏加购数只能填写整数');
					$('#pic_favflow_num_' + (index+1)).focus();
					return false;
				}
				if (pic_flow_num=='') {
					result = false;
					$.prompt('图文好评任务，收藏加购数有填写，普通好评数未填写');
					$('#pic_flow_num_' + (index+1)).focus();
					return false;
				}
				if (~~pic_favflow_num > ~~pic_flow_num) {
					result = false;
					$.prompt('图文好评任务，收藏加购数必须小于等于普通好评数');
					$('#pic_favflow_num_' + (index+1)).focus();
					return false;
				}
				if (!pic_favflow_1 && !pic_favflow_2 && !pic_favflow_3) {
					result = false;
					$.prompt('图文好评任务，收藏加购数有填写，但并未选择具体的收藏加购类型');
					$('#pic_favflow_num_' + (index+1)).focus();
					return false;
				}
			}
		});
		var i=1, pic_rule='', picup=true, pic_cw;
		if (result) {
			for (i=1; i<=ordernum; i++) {
				pic_rule = $('#pic_rule_'+i).val();
				if (!pic_rule) {
					$.prompt('图文好评任务，第'+i+'单的规格未填写');
					$('#pic_rule_'+i).focus();
					return false;
				}
				picup = !!($('#pic_' + (i+10) + '_1').val()) || !!($('#pic_' + (i+10) + '_2').val()) || !!($('#pic_' + (i+10) + '_3').val());
				if (!picup) {
					$.prompt('图文好评任务，第' + i + '单的图片未上传');
					return false;
				}
				pic_cw = $('#pic_cw_' + i).val();
				if (!!pic_cw) {
					if (pic_cw.length>199) {
						$.prompt('图文好评任务，第' + i + '单的评价文字最多200字');
						$('#pic_cw_' + i).focus();
						return false;
					}
				}
			}
		}
		return result;
	}
}

function check2_new(plat, backmoneymode) {
	
	if (!check2_stepone(plat)) {//步骤1验证
		return false;
	}
	if (!check2_steptwo(plat)) {//步骤2验证
		return false;
	}
	if (!check2_stepthree(plat)) {//步骤3验证
		return false;
	}
	try {
		//如果有选择定时设置
		var taskinterval = $('#taskinterval').is(':checked');
		var intestatistics = $("#intestatistics").val();
		var addmoney = $("#addmoney").val();
		var remark = $("#remark").val();
		var priceformat = /^[0-9]+.?[0-9]*$/;
		var numformat = /^[1-9][0-9]*$/;
		var re = /^\d+$/;  
		if (taskinterval) {
			var startdate = $("#startdate").val();
			var starthour = $("#starthour").val();
			var endhour   = $("#endhour").val();
		
			if (startdate == "") {
				$.prompt("请填写任务发布设置 - 开始日期");
				return false;
			}
			if (starthour == "") {
				$.prompt("请填写任务发布设置 - 放单开始时间");
				$("#starthour").focus();
				return false;
			}
			if (!re.test(starthour)) {
				$.prompt("任务发布设置 - 放单开始时间，输入格式错误");
				$("#starthour").focus();
				return false;
			}
			if (parseInt(starthour) < 0) {
				$.prompt("任务发布设置 - 放单开始时间，不能小于1点");
				$("#starthour").focus();
				return false;
			}
			if (endhour == "") { 
				$.prompt("请填写任务发布设置 - 放单结束时间");
				$("#endhour").focus();
				return false;
			}
			if (!re.test(endhour)) {
				$.prompt("任务发布设置 - 放单结束时间，输入格式错误");
				$("#endhour").focus();
				return false;
			}
			if (parseInt(endhour)>24) {
				$.prompt("任务发布设置 - 放单结束时间，不能大于24点");
				$("#endhour").focus();
				return false;
			}
			if (parseInt(starthour) >= parseInt(endhour)) {
				$.prompt("任务发布设置 - 放单开始、结束时间不对");
				$("#endhour").focus();
				return false;
			}
			if (!re.test(intestatistics)){
				$.prompt("任务发布设置-总共发布数只能填写正整数");
				return false;
			}
		}
		if (addmoney == "") {
			addmoney = 0;
		} 
		if (!priceformat.test(addmoney)) {
			$.prompt("加赏佣金只能填写数字");
			$("#addmoney").focus();
			return false;
		}
		if (parseFloat(addmoney) < 1 && parseFloat(addmoney) > 0) {
			$.prompt("加赏任务佣金必须大于1元");
			$("#addmoney").focus();
			return false;
		}
		if (parseFloat(addmoney)%0.5 > 0) {
			$.prompt("加赏任务佣金必须是0.5的倍数");
			$("#addmoney").focus();
			return false;
		}
		if (remark.length > 200) {
			$.prompt("备注最多输入200个中文");
			$("#remark").focus();
			return false;
		}
		$.showMask();
		var $dialog = $('#ipt_release_info_new');
		var mainpicsrc  = $('#showpic').attr('src');
		var goodsname   = $("#goodsname").val(); 
		var itemprice   = $("#itemprice").val(); 
		var searchprice = $("#searchprice").val(); 
		var position    = $("#position").val();
		var shopname 	= $("#shopname").val();
		var sortmsg		= $('input:radio[name="sortmsg"]:checked').val();
		$dialog.find('.goodspic').attr('src', mainpicsrc);
		$dialog.find('.goodsname').text(goodsname);
		$dialog.find('.searchpric').text(searchprice);
		$dialog.find('.goodspric').text(itemprice);
		$dialog.find('.shopname').text(shopname);
		if (plat==3 || plat==4) {
			$dialog.find('.buynun').text(sortmsg + '，' + position);
		} else {
			$dialog.find('.buynun').text(sortmsg + '，约' + position + '人收货');
		}
		$dialog.trigger('open');
		return false;
	} catch(e) {
		$.prompt('数据验证出错，请刷新页面重试');
		return false;
	}
}

$(function(){//多关键词垫付任务核对确认
	var $dialog = $('#ipt_release_info_new');
	$dialog.find('.btn-sure').on('click', function(){
		$dialog.hide();
		$.showBuffer();
 		var para = $('#form1').serialize();
    	$.ajax({
    	    url: "/task_save_releasetask_two_new.php",
    	    type: "POST",
    	    dataType: "json",
    	    data: para,
    	    error: function (XMLHttpRequest, textStatus, errorThrown) {
    	    	$.prompt('请退出重新登录'); 
    	    	$.hideMask();
				$.hideBuffer();
    	    },
    	    success: function (data, textStatus) {
    	    	if(data.status == 0){
    	    		document.location.href="/task_addpay.php?oid="+data.oid;
    	    	}else{
    	    		$.prompt(data.msg);
    	    		$.hideMask();
					$.hideBuffer();
					$dialog.hide();
    	    	}
    	    }
    	});
 		return false;
	});
});



function check2_flow_step_first(plat) {
	var regprice 	= /^(([1-9][0-9]*)|0).?[0-9]*$/;
	var goodsname   = $("#goodsname").val(); 
	var goodslink   = $("#goodslink").val(); 	
	var pic 		= $("#pic").val(); 
	var searchprice = $("#searchprice").val(); 
	if(goodsname == ""){
		$("#goodsname").addClass("error");
		$("#goodsname").focus();
		$("#goodsname_error").html("请填写 商品名称");
		$("#goodsname_error").show();
		return false;
	}
	goodsname = goodsname.trim();
	if (goodsname.length > 80) {
		$("#goodsname").addClass("error");
		$("#goodsname").focus();
		$("#goodsname_error").html("商品名称最多填写80个汉字");
		$("#goodsname_error").show();
		return false;
	}
	if (/^(http|https):\/\//.test(goodsname)) {
		$("#goodsname").addClass("error");
		$("#goodsname").focus();
		$("#goodsname_error").html("商品名称不可填写链接地址");
		$("#goodsname_error").show();
		return false;
	}
	$("#goodsname").removeClass("error");
	$("#goodsname_error").hide();
	if(goodslink == ""){
		$("#goodslink").addClass("error");
		$("#goodslink").focus();
		$("#goodslink_error").html("请填写商品链接");
		$("#goodslink_error").show();
		return false;
	}
	goodslink = goodslink.trim();
	if(!checkgoodslink(goodslink, plat)){
		$("#goodslink").addClass("error");
		$("#goodslink").focus();
		$("#goodslink_error").html("请输入合法的商品连接");
		$("#goodslink_error").show();
		return false;
	}
	$("#goodslink").removeClass("error");
	$("#goodslink_error").hide();
	if(pic == "" || pic.indexOf("default_upic.png") > 0){
		$.prompt("商品主图未上传");
		$("#pic_error").html("商品主图未上传！");
		$("#pic_error").show();
		return false;
	}
	$("#pic_error").hide();
	if (searchprice == "" || !regprice.test(searchprice)){
		$("#searchprice").addClass("error");
		$("#searchprice").focus();
		$("#searchprice_error").html("搜索页面展示价格只能填写数字");
		$("#searchprice_error").show();
		return false;
	}
	$("#searchprice").removeClass("error");
	$("#searchprice_error").hide();
	return true;
}

function check2_flow_step_second(plat) {
	var regprice 	= /^(([1-9][0-9]*)|0).?[0-9]*$/;
	var renum 		= /^(([1-9][0-9]*)|0)$/;
	var sortmsg 	= $('.addedkeyword .sortmsg:checked').val();
	var position 	= $("#position").val(); 
	var minprice    = $("#minprice").val(); 
	var maxprice    = $("#maxprice").val(); 
	if (!sortmsg) {
		$.prompt('商品搜索排序方式未选择');
		$('#sortmsg_error').show();
		if (location.href.indexOf('#anchor-sortmsg') == -1) {
			location.href = location.href + '#anchor-sortmsg';
		} else {
			location.href = location.href;
		}
		return false;
	}
	$('#sortmsg_error').hide();
	if (position == ""){
		$("#position").addClass("error");
		$("#position").focus();
		$("#position_error").html("排序位置信息未填写");
		$("#position_error").show();
		return false;
	}
	if (plat==1 && !renum.test(position)) {
		$("#position").addClass("error");
		$("#position").focus();
		$("#position_error").html("现有收货人数只能填写数字");
		$("#position_error").show();
		return false;
	}
	$("#position").removeClass("error");
	$("#position_error").hide();
	if (!!minprice && !regprice.test(minprice.trim())) {
		$("#minprice").addClass('error').focus();
	}
	$("#minprice").removeClass('error');
	if (!!maxprice && !regprice.test(maxprice.trim())) {
		$("#maxprice").addClass('error').focus();
	}
	$("#maxprice").removeClass('error');
	return true;
}

function check2_flow_step_three() {
	var $iptarres = $('.flow-type-ipt-arr .type-ipt-wrap');
	var len = $('#flowitemnum').val();
	var renum = /^(([1-9][0-9]*)|0)$/;
	var result = true;
	if (len != $iptarres.length) {
		$.prompt('关键词数设置异常，请刷新重试');
		return false;
	}
	$iptarres.each(function(index, el) {
		var sk 		= $('#flow_sk_'+(index+1)).val().trim();
		var flownum = $('#com_flow_num_'+(index+1)).val().trim();
		var favflow_1 = $('#fav_flow_1_' + (index+1)).is(':checked');
		var favflow_2 = $('#fav_flow_2_' + (index+1)).is(':checked');
		var favflow_3 = $('#fav_flow_3_' + (index+1)).is(':checked');
		var favflownum = $('#fav_flow_num_'+(index+1)).val().trim();
		if (!sk) {
			$.prompt('搜索关键词'+(index+1)+'不可为空');
			$('#flow_sk_'+(index+1)).addClass('error').focus();
			result = false;
			return false;
		} 
		if (sk.length>40) {
			$.prompt('搜索关键词'+(index+1)+'长度超过40字');
			$('#flow_sk_'+(index+1)).addClass('error').focus();
			result = false;
			return false;
		}
		$('#flow_sk_'+(index+1)).removeClass('error');
		if (!flownum) {
			$.prompt('搜索关键词'+(index+1)+'匹配浏览数未填写');
			$('#com_flow_num_'+(index+1)).addClass('error').focus();
			result = false;
			return false;
		}
		if (!renum.test(flownum)) {
			$.prompt('搜索关键词'+(index+1)+'匹配浏览数只能填写数字');
			$('#com_flow_num_'+(index+1)).addClass('error').focus();
			result = false;
			return false;
		}
		$('#com_flow_num_'+(index+1)).removeClass('error');
		if (favflow_1 || favflow_2 || favflow_3) {
			if (!favflownum) {
				$.prompt('搜索关键词'+(index+1)+'匹配收藏加购有勾选但未填写具体数量');
				$('#fav_flow_num_'+(index+1)).addClass('error').focus();
				result = false;
				return false;
			}
			if (!renum.test(favflownum)) {
				$.prompt('搜索关键词'+(index+1)+'收藏加购数只能填写数字');
				$('#fav_flow_num_'+(index+1)).addClass('error').focus();
				result = false;
				return false;
			}
			if (~~favflownum>flownum) {
				$.prompt('搜索关键词'+(index+1)+'收藏加购数不可大于普通浏览数');
				$('#fav_flow_num_'+(index+1)).addClass('error').focus();
				result = false;
				return false;
			}
		} else {
			if (!!favflownum) {
				$.prompt('搜索关键词'+(index+1)+'收藏加购数有填写，但未选择具体类型');
				$('#fav_flow_num_'+(index+1)).addClass('error').focus();
				result = false;
				return false;
			}
		}
		$('#fav_flow_num_'+(index+1)).removeClass('error');
		return true;
	});		
	var taskinterval = $('#taskinterval').is(':checked');
	if (taskinterval) {
		var startdate = $("#startdate").val();
		var starthour = $("#starthour").val();
		var endhour   = $("#endhour").val();
		
		if(startdate == ""){
			$.prompt("请填写任务发布设置 - 开始日期");
			return false;
		}
		if(starthour == ""){
			$.prompt("请填写任务发布设置 - 放单开始时间");
			$("#starthour").focus();
			return false;
		}
		var re = /^\d+$/ ;  
		if(!re.test(starthour)){
			$.prompt("任务发布设置 - 放单开始时间，输入格式错误");
			$("#starthour").focus();
			return false;
		}
		if(parseInt(starthour) < 0){
			$.prompt("任务发布设置 - 放单开始时间，不能小于1点");
			$("#starthour").focus();
			return false;
		}
		if (~~starthour > 23) {
			$.prompt("任务发布设置 - 放单开始时间，不能大于23点");
			$("#starthour").focus();
			return false;
		}
		if(endhour == ""){
			$.prompt("请填写任务发布设置 - 放单结束时间");
			$("#endhour").focus();
			return false;
		}
		if(!re.test(endhour)){
			$.prompt("任务发布设置 - 放单结束时间，输入格式错误");
			$("#endhour").focus();
			return false;
		}
		if(parseInt(endhour)>24){
			$.prompt("任务发布设置 - 放单结束时间，不能大于24点");
			$("#endhour").focus();
			return false;
		}
		if(parseInt(starthour) >= parseInt(endhour)){
			$.prompt("任务发布设置 - 放单开始、结束时间不对");
			$("#endhour").focus();
			return false;
		}
	}
	return result;	
}

function check2_flow_new(plat) {//多关键词浏览任务参数核对
	try {
		if (!check2_flow_step_first(plat)) {
			return false;
		}
	} catch(e) {
		$.prompt('第一步商品信息验证出错');
		return false;
	}
	try {
		if (!check2_flow_step_second(plat)) {
			return false;
		}
	} catch(e) {
		$.prompt('第二步商品信息验证出错');
		return false;
	}
	try {
		if (!check2_flow_step_three()) {
			return false;
		}
	} catch(e) {
		$.prompt('第三步商品信息验证出错');
		return false;
	}
	var addmoney = $("#addmoney").val();
	var regprice = /^(([1-9][0-9]*)|0).?[0-9]*$/;
	if (addmoney == "") { addmoney = 0; } 
	if (!regprice.test(addmoney)) {
		$.prompt("加赏佣金只能填写数字");
		$("#addmoney").focus();
		return false;
	}
	if (parseFloat(addmoney) < 1 && parseFloat(addmoney) > 0) {
		$.prompt("加赏任务佣金必须大于1元");
		$("#addmoney").focus();
		return false;
	}
	if (parseFloat(addmoney) % 0.5 > 0) {
		$.prompt("加赏任务佣金必须是0.5的倍数");
		$("#addmoney").focus();
		return false;
	}
	$.showMask();
	var $dialog = $('#ipt_release_info_new_flow');
	var mainpicsrc  = $('#showpic').attr('src');
	var goodsname   = $("#goodsname").val(); 
	var searchprice = $("#searchprice").val(); 
	var position    = $("#position").val();
	var shopname 	= $("#shopname").val();
	var sortmsg		= $('input:radio[name="sortmsg"]:checked').val();
	$dialog.find('.goodspic').attr('src', mainpicsrc);
	$dialog.find('.goodsname').text(goodsname);
	$dialog.find('.searchpric').text(searchprice);
	$dialog.find('.shopname').text(shopname);
	if (plat==3 || plat==4) {
		$dialog.find('.buynun').text(sortmsg + '，' + position);
	} else {
		$dialog.find('.buynun').text(sortmsg + '，约' + position + '人收货');
	}
	$dialog.trigger('open');
 	return false;
}

$(function(){
	(function(){
		var $dialog = $('#ipt_release_info_new_flow');
		$dialog.find('.btn-sure').on('click', function(){//多关键词浏览任务发布确认
			$dialog.hide();
			$.showBuffer();
		 	var para = $('#form1').serialize();
		 	$.ajax({
		 		url: "/task_save_rt_two_flow_new.php",
		 		type: "POST",
		 		dataType: "json",
		 		data: para,
		 		error: function (XMLHttpRequest, textStatus, errorThrown) {
		 		    $.prompt('请退出重新登录'); 
		 		    $.hideMask();
		 			$.hideBuffer();
		 		},
		 		success: function (data, textStatus) {
		 		    if(data.status == 0){
		    	    	document.location.href="/task_addpay.php?oid="+data.oid;
		    	    }else{
		    	    	$.prompt(data.msg);
		    	    	$.hideMask();
						$.hideBuffer();
		    	    }
		 		}
		 	});
		});
	}());
});


function check2_flash(plat, backmoneymode) {
	var goodsname   = $("#goodsname").val(); 
	var goodslink   = $("#goodslink").val();
	var itemprice   = $("#itemprice").val(); 
	var searchprice = $("#searchprice").val(); 
	var itemnum     = $("#itemnum").val(); 
	var remark      = $("#remark").val();
	var spectype = $("input[name='spectype']:checked").val();
	var tasknum_one = $("#tasknum_one").val(); 
	var addmoney = $("#addmoney").val();
	var pic =  $("#pic").val(); 
	var renum = /^[0-9]+.?[0-9]*$/;
	if(goodsname == ""){
		$("#goodsname").addClass("error");
		$("#goodsname").focus();
		$("#goodsname_error").html("请填写商品名称");
		$("#goodsname_error").show();
		return false;
	}
	if(goodsname > 80){
		$("#goodsname").addClass("error");
		$("#goodsname").focus();
		$("#goodsname_error").html("商品名称最多填写80个汉字");
		$("#goodsname_error").show();
		return false;
	}
	goodsname = goodsname.trim();
	if (/^(http|https):\/\//.test(goodsname)) {
		$("#goodsname").addClass("error");
		$("#goodsname").focus();
		$("#goodsname_error").html("商品名称不可填写链接地址");
		$("#goodsname_error").show();
		return false;
	}
	$("#goodsname").removeClass("error");
	$("#goodsname_error").hide();
	if(goodslink == ""){
		$("#goodslink").addClass("error");
		$("#goodslink").focus();
		$("#goodslink_error").html("请填写 商品链接");
		$("#goodslink_error").show();
		return false;
	}
	goodslink = goodslink.trim();
	if (!/^(http|https):\/\//.test(goodslink)) {
		$("#goodslink").addClass("error");
		$("#goodslink").focus();
		$("#goodslink_error").html("请填写正确的商品链接");
		$("#goodslink_error").show();
		return false;
	}
	$("#goodslink").removeClass("error");
	$("#goodslink_error").hide();
	if(pic == "" || pic.indexOf("default_upic.png") > 0){
		$.prompt("商品主图未上传");
		$("#pic_error").html("商品主图未上传！");
		$("#pic_error").show();
		return false;
	}
	$("#pic_error").hide();
	if (itemprice == "" || !renum.test(itemprice)){
		$("#itemprice").addClass("error");
		$("#itemprice").focus();
		$("#itemprice_error").html("单品实际成交价格只能填写数字");
		$("#itemprice_error").show();
		return false;
	}
	$("#itemprice").removeClass("error");
	$("#itemprice_error").hide();
	if (itemnum == "" || !renum.test(itemnum)){
		$("#itemnum").addClass("error");
		$("#itemnum").focus();
		$("#itemnum_error").html("每单拍数量只能填写数字");
		$("#itemnum_error").show();
		return false;
	}	
	$("#itemnum").removeClass("error");
	$("#itemnum_error").hide();
	if (searchprice == "" || !renum.test(searchprice)){
		$("#searchprice").addClass("error");
		$("#searchprice").focus();
		$("#searchprice_error").html("搜索页面展示价格只能填写数字");
		$("#searchprice_error").show();
		return false;
	}
	$("#searchprice").removeClass("error");
	$("#searchprice_error").hide();
	if(parseInt(itemnum) < 1){
		$.prompt("每单拍数量必须大于0");
		$("#itemnum").focus();
		return false;
	}
	if(!!remark && getByteLen(remark) > 400 ){
		$.prompt("特别任务备注说明，最多只能填写200个汉字");
		return false;
	}
	if(spectype == null){
		$.prompt("请选择特别任务类型");
		return false;
	}
	if(tasknum_one == ""){
		$.prompt("请填写任务单数");
		$("#tasknum_one").focus();
		return false;
	}
	if(isNaN(tasknum_one)){
		$.prompt("任务单数输入错误");
		$("#tasknum_one").focus();
		return false;
	}
	if(parseInt(tasknum_one) < 1){
		$.prompt("特别任务单数要大于等于1");
		$("#tasknum_one").focus();
		return false;
	}
	if(isNaN(addmoney)){
		$.prompt("加赏任务佣金输入错误");
		return false;
	}
	if(parseFloat(addmoney) < 1 && parseFloat(addmoney) > 0){
		$.prompt("加赏任务佣金必须大于1元");
		return false;
	}
	if(parseFloat(addmoney)%0.5 > 0){
		$.prompt("加赏任务佣金必须是0.5的倍数");
		return false;
	}
	$.showMask();
	var $checkdialog = $('#check_release_info_flash');
	$checkdialog.find('.goodspic').attr('src', pic);
	$checkdialog.find('.goodsname').text(goodsname);
	$checkdialog.find('.searchpric').text(searchprice);
	$checkdialog.find('.goodspric').text(itemprice);
	$checkdialog.find('.shopname').text($('#shopname').val());
	$checkdialog.find('.tasknum').text(tasknum_one);
	$checkdialog.trigger('open');
	return false;
}

function check2_flash_flow(plat, backmoneymode) {
	var goodsname   = $("#goodsname").val().trim(); 
	var goodslink   = $("#goodslink").val().trim();
	var searchprice = $("#searchprice").val(); 
	var itemnum     = $("#itemnum").val(); 
	var remark      = $("#remark").val();
	var pic =  $("#pic").val(); 
	var spectype = $("input[name='spectype']:checked").val();
	var tasknum_one = $("#tasknum_one").val(); 
	var addmoney = $("#addmoney").val();
	var renum = /^[0-9]+.?[0-9]*$/;
	if (goodsname == "") {
		$("#goodsname").addClass("error");
		$("#goodsname").focus();
		$("#goodsname_error").html("请填写 商品名称");
		$("#goodsname_error").show();
		return false;
	}
	if (goodsname.length > 80) {
		$("#goodsname").addClass("error");
		$("#goodsname").focus();
		$("#goodsname_error").html("商品名称最多填写80个汉字");
		$("#goodsname_error").show();
		return false;
	}
	if (/^(http|https):\/\//.test(goodsname)) {
		$("#goodsname").addClass("error");
		$("#goodsname").focus();
		$("#goodsname_error").html("商品名称不可填写链接地址");
		$("#goodsname_error").show();
		return false;
	}
	$("#goodsname").removeClass("error");
	$("#goodsname_error").hide();
	if (goodslink == "") {
		$("#goodslink").addClass("error");
		$("#goodslink").focus();
		$("#goodslink_error").html("请填写 商品链接");
		$("#goodslink_error").show();
		return false;
	}
	if (!/^(http|https):\/\//.test(goodslink)) {
		$("#goodslink").addClass("error");
		$("#goodslink").focus();
		$("#goodslink_error").html("请填写合法的 商品链接");
		$("#goodslink_error").show();
		return false;
	}
	$("#goodslink").removeClass("error");
	$("#goodslink_error").hide();
	if(pic == "" || pic.indexOf("default_upic.png") > 0){
		$.prompt("商品主图未上传");
		$("#pic_error").html("商品主图未上传！");
		$("#pic_error").show();
		return false;
	}
	$("#pic_error").hide();
	if (searchprice == "" || !renum.test(searchprice)){
		$("#searchprice").addClass("error");
		$("#searchprice").focus();
		$("#searchprice_error").html("搜索页面展示价格只能填写数字");
		$("#searchprice_error").show();
		return false;
	}
	$("#searchprice").removeClass("error");
	$("#searchprice_error").hide();
	if(!!remark && getByteLen(remark) > 400 ){
		$.prompt("特别任务备注说明，最多只能填写200个汉字");
		return false;
	}
	if(spectype == null){
		$.prompt("请选择特别任务类型");
		return false;
	}
	if(tasknum_one == ""){
		$.prompt("请填写任务单数");
		$("#tasknum_one").focus();
		return false;
	}
	if(isNaN(tasknum_one)){
		$.prompt("任务单数输入错误");
		$("#tasknum_one").focus();
		return false;
	}
	if(parseInt(tasknum_one) < 1){
		$.prompt("特别任务单数要大于等于1");
		$("#tasknum_one").focus();
		return false;
	}
	if(isNaN(addmoney)){
		$.prompt("加赏任务佣金输入错误");
		return false;
	}
	if(parseFloat(addmoney) < 1 && parseFloat(addmoney) > 0){
		$.prompt("加赏任务佣金必须大于1元");
		return false;
	}
	if(parseFloat(addmoney)%0.5 > 0){
		$.prompt("加赏任务佣金必须是0.5的倍数");
		return false;
	}
	$.showMask();
	var $checkdialog = $('#check_release_info_flash_flow');
	$checkdialog.find('.goodspic').attr('src', pic);
	$checkdialog.find('.goodsname').text(goodsname);
	$checkdialog.find('.searchpric').text(searchprice);
	$checkdialog.find('.shopname').text($('#shopname').val());
	$checkdialog.find('.tasknum').text(tasknum_one);
	$checkdialog.trigger('open');
	return false;
}

$(function(){
	(function(){
		var $dialog = $('#check_release_info_flash');
		$dialog.find('.btn-sure').on('click', function(e){//特别垫付任务确认提交
			$dialog.hide();
			$.showBuffer();
 			var para = $('#form1').serialize();
    		$.ajax({
    	    	url: "/task_save_releasetask_two_flash.php",
    	    	type: "POST",
    	    	dataType: "json",
    	    	data: para,
    	    	error: function (XMLHttpRequest, textStatus, errorThrown) {
    	    	   	$.prompt('请退出重新登录'); 
    	    	   	$.hideMask();
    				$.hideBuffer();
    	    	},
    	    	success: function (data, textStatus) {
    	    	   	if(data.status == 0){
    	    		    document.location.href="/task_addpay.php?oid="+data.oid;
    	    	    }else{
    	    	    	$.prompt(data.msg);
    	    	    	$.hideMask();
    					$.hideBuffer();
    	    	    }
    	    	}
    		});
 			return false;
		});
	}());
	(function(){
		var $dialog = $('#check_release_info_flash_flow');
		$dialog.find('.btn-sure').on('click', function(e){//特别浏览任务确认提交
			$dialog.hide();
			$.showBuffer();
			var para = $('#form1').serialize();
			$.ajax({
			    url: "/task_save_releasetask_two_flash_flow.php",
			    type: "POST",
			    dataType: "json",
			    data: para,
			    error: function (XMLHttpRequest, textStatus, errorThrown) {
			    	$.prompt('请退出重新登录'); 
			    	$.hideMask();
					$.hideBuffer();
			    },
			    success: function (data, textStatus) {
			       	if (data.status == 0) {
			        	document.location.href="/task_addpay.php?oid="+data.oid;
			        } else {
			        	$.prompt(data.msg);
			        	$.hideMask();
						$.hideBuffer();
			        }
			    }
			});
		});
	}());
});


function check2_rebuy(plat){
	var goodsname   = $("#goodsname").val(); 
	var goodslink   = $("#goodslink").val();
	var itemprice   = $("#itemprice").val(); 
	var itemnum     = $("#itemnum").val(); 
	var searchprice = $("#searchprice").val(); 
	var pic 		=  $("#pic").val();
	var limit_backdays     = $("#limit_backdays").val(); 
	var backmoneymode = $('#backmoneymode').val();
	var postsign = $('input:radio[name="postsign"]:checked').val();
	var renum = /^[0-9]+.?[0-9]*$/;
	if(goodsname == ""){
		$("#goodsname").addClass("error");
		$("#goodsname").focus();
		$("#goodsname_error").html("请填写 商品名称");
		$("#goodsname_error").show();
		return false;
	}
	if(getByteLen(goodsname) > 160){
		$("#goodsname").addClass("error");
		$("#goodsname").focus();
		$("#goodsname_error").html("商品名称最多填写80个汉字");
		$("#goodsname_error").show();
		return false;
	}
	goodsname = goodsname.trim();
	if (/^(http|https):\/\//.test(goodsname)) {
		$("#goodsname").addClass("error");
		$("#goodsname").focus();
		$("#goodsname_error").html("商品名称不可填写链接地址");
		$("#goodsname_error").show();
		return false;
	}
	$("#goodsname").removeClass("error");
	$("#goodsname_error").hide();
	if(goodslink == ""){
		$("#goodslink").addClass("error");
		$("#goodslink").focus();
		$("#goodslink_error").html("请填写 商品链接");
		$("#goodslink_error").show();
		return false;
	}
	if(!checkgoodslink(goodslink, plat)){
		$("#goodslink").addClass("error");
		$("#goodslink").focus();
		$("#goodslink_error").html("请输入合法的商品连接");
		$("#goodslink_error").show();
		return false;
	}
	$("#goodslink").removeClass("error");
	$("#goodslink_error").hide();
	if(pic == "" || pic.indexOf("default_upic.png") > 0){
		$.prompt("商品主图未上传");
		$("#pic_error").html("商品主图未上传！");
		$("#pic_error").show();
		return false;
	}
	$("#pic_error").hide();
	if (itemprice == "" || !renum.test(itemprice)){
		$("#itemprice").addClass("error");
		$("#itemprice").focus();
		$("#itemprice_error").html("单品实际成交价格只能填写数字");
		$("#itemprice_error").show();
		return false;
	}
	$("#itemprice").removeClass("error");
	$("#itemprice_error").hide();
	if (itemnum == "" || !renum.test(itemnum)){
		$("#itemnum").addClass("error");
		$("#itemnum").focus();
		$("#itemnum_error").html("每单拍数量只能填写数字");
		$("#itemnum_error").show();
		return false;
	}	
	$("#itemnum").removeClass("error");
	$("#itemnum_error").hide();
	if (searchprice == "" || !renum.test(searchprice)){
		$("#searchprice").addClass("error");
		$("#searchprice").focus();
		$("#searchprice_error").html("搜索页面展示价格只能填写数字");
		$("#searchprice_error").show();
		return false;
	}
	$("#searchprice").removeClass("error");
	$("#searchprice_error").hide();
	
	if (!limit_backdays || !renum.test(limit_backdays)){
		$("#limit_backdays").addClass("error");
		$("#limit_backdays").focus();
		$("#limit_backdays_error").html("回购时间设置只能填写数字");
		$("#limit_backdays_error").show();
		return false;
	}	
	if(parseInt(limit_backdays) < 15 || parseInt(limit_backdays) > 60){
		$("#limit_backdays").addClass("error");
		$("#limit_backdays").focus();
		$("#limit_backdays_error").html("回购时间设置只能填写15到60的正整数");
		$("#limit_backdays_error").show();
		return false;
	}
	$("#limit_backdays").removeClass("error");
	$("#limit_backdays_error").hide();
	if (typeof(postsign) == "undefined" && backmoneymode==1) {
		$.prompt("请设置商品收取运费的方式");
		$("#postsign_error").html("请设置商品收取运费的方式");
		$("#postsign_error").show();
		return false;
	}
	$("#postsign_error").hide();
	
	var message_1   = $("#message_1").val(); 
	if(getByteLen(message_1) > 500){
		$("#message_1").focus();
		$.prompt("订单留言最多输入500个中文");
		return false;
	}
	var count = 0;
	var isaddgoodcom = $('#isaddgoodcom').is(':checked');
	var isaddwordcom = $('#isaddwordcom').is(':checked');
	var isaddimgcom = $('#isaddimgcom').is(':checked');
	var tasknum_one = $("#pt_count").val();
	var tasknum_two = $("#wz_count").val();
	var tasknum_three = $("#tw_count").val();
	if (!isaddgoodcom && !isaddwordcom && !isaddimgcom) {
		$("#pt_count").focus();
		$.prompt("请至少选择一种选择任务类型");
		return false;
	}
	if (!tasknum_one) {
		tasknum_one = 0;
	}
	if (isaddgoodcom) { 
		if (!renum.test(tasknum_one) || parseInt(tasknum_one) < 1) {
			$.prompt("普通好评任务数只能填写正整数");
			$("#pt_count").focus();
			$("#pt_count").addClass("error");
			return false;
		}
		$("#pt_count").removeClass("error");
		count = count + parseInt(tasknum_one);
	}
	if (isaddwordcom) {
		var check_wz_content_res = false; 
		$('#wrap-kwtype-opt .wz_keyword_ct').each(function(index, val){
			var content = $(val).val();
			if (!content) {
				$.prompt("指定文字好评任务第" + (index + 1) + '单，好评内容未填写');
				$(val).focus();
				check_wz_content_res = true;
				return false;
			}
			if (content.length > 800) {
				$.prompt("指定文字好评任务第" + (index + 1) + '单，好评内容最多800字');
				$(val).focus();
				check_wz_content_res = true;
				return false;
			}
		});
		if (check_wz_content_res) return false;
		count = count + parseInt(tasknum_two);
	}
	if (isaddimgcom) {
		var check_tw_content_res = false;
		$('#wrap-pictype-opt .pic-type-panel').each(function(index, val){
			var rule = $(val).find('.pic-rule').val();
			var pic_url_1 = $('#pic_' + (index + 11) + '_1').val();
			var pic_url_2 = $('#pic_' + (index + 11) + '_2').val();
			var pic_url_3 = $('#pic_' + (index + 11) + '_3').val();
			if (!rule) {
				check_tw_content_res = true;
				$.prompt('指定图文好评任务第' + (index + 1) + '单，商品规格未填写');
				$(val).find('.pic-rule').addClass('error').focus();
				return false;
			}
			if (rule.length > 200) {
				check_tw_content_res = true;
				$.prompt('指定图文好评任务第' + (index + 1) + '单，商品规格内容最多填写200字');
				$(val).find('.pic-rule').addClass('error').focus();
				return false;
			}
			$(val).find('.pic-rule').removeClass('error');
			if (!pic_url_1 && !pic_url_2 && !pic_url_3) {
				check_tw_content_res = true;
				$.prompt('指定图文好评任务第' + (index + 1) + '单，请上传至少1张图片');
				return false;
			}
		});
		if (check_tw_content_res) false;
		count = count + parseInt(tasknum_three);
	}
	if (count < 1) {
		$.prompt("请至少选择一种选择任务类型");
		$("#pt_count").focus();
		return false;
	}
	//如果有选择定时设置
	var taskinterval = $('#taskinterval').is(':checked');
	if(taskinterval){
		var startdate = $("#startdate").val();
		var starthour = $("#starthour").val();
		var endhour = $("#endhour").val();
		var intestatistics = $("#intestatistics").val(); 
		var re = /^\d+$/;
		if(startdate == ""){
			$.prompt("请填写任务发布设置 - 开始日期");
			return false;
		}
		if(starthour == ""){
			$.prompt("请填写任务发布设置 - 放单开始时间");
			$("#starthour").focus();
			return false;
		}
		if(!re.test(starthour)){
			$.prompt("任务发布设置 - 放单开始时间，输入格式错误");
			$("#starthour").focus();
			return false;
		}
		if(parseInt(starthour) < 0){
			$.prompt("任务发布设置 - 放单开始时间，不能小于1点");
			$("#starthour").focus();
			return false;
		}
		if(endhour == ""){
			$.prompt("请填写任务发布设置 - 放单结束时间");
			$("#endhour").focus();
			return false;
		}
		if(!re.test(endhour)){
			$.prompt("任务发布设置 - 放单结束时间，输入格式错误");
			$("#endhour").focus();
			return false;
		}
		if(parseInt(endhour)>24){
			$.prompt("任务发布设置 - 放单结束时间，不能大于24点");
			$("#endhour").focus();
			return false;
		}
		if(parseInt(starthour) >= parseInt(endhour)){
			$.prompt("任务发布设置 - 放单开始、结束时间不对");
			$("#endhour").focus();
			return false;
		}
		if (!re.test(intestatistics)){
			$.prompt("任务发布设置-总共发布数只能填写正整数");
			return false;
		}
		if(parseInt(intestatistics) > count){
			$("#intestatistics").val("");
			$("#taskinterval_info").html("");
			$.prompt("任务发布设置-当天总共发布数不能大于任务总单数："+count+"单");
			return false;
		}
	}
	var addmoney = $("#addmoney").val();
	if(addmoney == ""){addmoney = 0;} 
	if (!renum.test(addmoney)) {
		$.prompt("加赏佣金只能填写数字");
		$("#addmoney").focus();
		return false;
	}
	if(parseFloat(addmoney) < 1 && parseFloat(addmoney) > 0){
		$.prompt("加赏任务佣金必须大于1元");
		return false;
	}
	if(parseFloat(addmoney)%0.5 > 0){
		$.prompt("加赏任务佣金必须是0.5的倍数");
		return false;
	}
	var remark = $("#remark").val();
	if(getByteLen(remark) > 400 ){
		$.prompt("指定关键词好评任务，关键字最多只能填写200个汉字");
		return false;
	}
	$.showMask();
	var $dialog = $('#ipt_release_info_new');
	$dialog.find('.goodspic').attr('src', pic);
	$dialog.find('.goodsname').text(goodsname);
	$dialog.find('.searchpric').text(searchprice);
	$dialog.find('.goodspric').text(itemprice);
	$dialog.find('.shopname').text($("#shopname").val());
	$dialog.trigger('open');
	return false;
}

$(function(){
	var $dialog = $('#ipt_release_info_new');
	$dialog.find('.btn-rebuy').on('click', function(){
		$dialog.hide();
		$.showBuffer();
 		var para = $('#form1').serialize();
    	$.ajax({
    	    url: "/task_save_releasetask_two_rebuy.php",
    	    type: "POST",
    	    dataType: "json",
    	    data: para,
    	    error: function (XMLHttpRequest, textStatus, errorThrown) {
    	    	$.prompt('请退出重新登录'); 
    	    	$.hideMask();
				$.hideBuffer();
    	    },
    	    success: function (data, textStatus) {
    	    	if(data.status == 0){
    	    		document.location.href="/task_addpay.php?oid="+data.oid;
    	    	}else{
    	    		$.prompt(data.msg);
    	    		$.hideMask();
					$.hideBuffer();
					$dialog.hide();
    	    	}
    	    }
    	});
 		return false;
	});
});

