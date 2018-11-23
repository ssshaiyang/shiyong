(function($){
	Function.prototype.bind = function () {
        var _args = arguments,
            _object = arguments[0],
            _function = this;
        return function () {
            // not use slice for chrome 10 beta and Array.apply for android
            var _argc = [].slice.call(_args, 1);
            [].push.apply(_argc, arguments);
            return _function.apply(_object || window, _argc);
        };
    }
    var page = {
    	init: function(){
            this.initPlat();
    		this.initSeePrompt();
    		this.initAddAdditionalGoods();
            this.initTypeRelease();
    		this.initTaskType();
            this.initComTypeAddSK();
            this.initKwTypeAddSK();
            this.initPicTypeAddSK();
            this.initSetBuyerAttr();
            this.initFlowTypeAddSK();
            this.initAddJdSKU();
    	},
        initPlat: function(){
            this.plat = $('#plat').val();
        },
    	initSeePrompt: function(){//提示
    		var timer = [];
    		$('.main .promptips').each(function(index, val){
    			$(val).on('mouseenter', function(e){
    				var $ppbox = $(this).parents('.spct-wrap').eq(0).find('.pop-prompt-box');
    				clearTimeout(timer[index]);
    				$ppbox.show();
    			});
    			$(val).on('mouseleave', function(e){
    				var $ppbox = $(this).parents('.spct-wrap').eq(0).find('.pop-prompt-box');
    				timer[index] = setTimeout(function(){
    					$ppbox.hide();
    				}, 800);
    			});
    		});
    		$('.main .pop-prompt-box').each(function(index, val){
    			$(val).on('mouseenter', function(e){
    				clearTimeout(timer[index]);
    			});
    			$(val).on('mouseleave', function(e){
    				$(this).hide();
    			})
    		});
    	},
    	initAddAdditionalGoods: function() {
    		$('#addattgoods').on('click', function(e) {//添加附加商品
    			var num = $('.step-1 .attached').length;
    			if(num==3){
                    $.prompt('最多增加两个附加商品');
    				return false;
    			}
    			var lennum = $('.attached').length;

    			$($('.step-1 .attached')[num-1]).after($(''
    			+	'<div class="attached">'
    			+		'<div class="spct-wrap">'
    			+			'<div class="wrap-slink p-r"><span class="must-input"></span><span class="title">商品链接：</span><input class="ipt slink" id="goodslink_'+lennum+'" name="goodslink_'+lennum+'" type="text"><span class="striking del-attachgoods del" title="删除附加商品">删 除</span></div>'
    			+			'<div class="error-tips" id="goodslink_'+lennum+'_error">商品链接未填写！</div>'
    			+			'<div class="wrap-upic f-cb">'
    			+				'<div class="f-fl"><span class="must-input" style="*top: 0px;"></span><span class="title" >商品主图：</span></div>'
    			+				'<div class="f-fl f-pr">'
    			+					'<div class="f-cb">'
				+						'<input type="hidden" name="pic_'+lennum+'" id="pic_'+lennum+'" value="" />'
				+						'<img class="f-fl pic" id="showpic_'+lennum+'" src="Content/images/default_upic.png"  width="143" height="143" >'
				+						'<div id="delete-' + lennum + '" style="position:absolute;top:-4px;left:132px;display:none;">'
				+						'<a href="javascript:void(0)" onclick="deletepic(' + lennum + ')"><img src="./Content/images/error_tag.png"></a>'
				+						'</div>'
    			+						'<ul class="f-fl uprompt">'
    			+							'<li class="hint">上传“淘宝商品主图”，确保与搜索页面展示的图片一致。</li>'
    			+							'<li class="f-cb">'
    			+								'<div class="btn-upfile f-fl">'
    			+									'<div class="new-contentarea">'
				+										'<a href="javascript:void(0)" class="upload-img"><label></label></a>'
				+										'<input type="file" class="mainpic" onchange="return FileUpload_onselect(this,'+lennum+')" />'
    			+									'</div>'
    			+								'</div>'
    			+								'<div class="f-fl" style="padding-top: 7px;padding-left: 12px;">选择图片文件</div>'
    			+							'</li>'
    			+						'</ul>'
    			+					'</div>'
    			+				'</div>'
    			+			'</div>'
    			+			'<div class="error-tips"  id="pic_'+lennum+'_error">商品主图未上传！</div>'
    			+			'<ul>'
    			+				'<li><span class="must-input"></span><span class="title">单品售价：</span><input class="single-price ipt f-tar"  id="itemprice_'+lennum+'" name="itemprice_'+lennum+'" onblur="myblur('+lennum+')"> 元<img class="error-tag" src="./Content/images/error_tag.png"><span class="hint">　买手拍下时的付款价格，如不同等级买号看到商品价格不同，取最大值</span></li>'
    			+			'</ul>'
    			+			'<div class="error-tips" id="itemprice_'+lennum+'_error">单品售价未填写！</div>'
    			+			'<ul>'
    			+				'<li><span class="must-input"></span><span class="title">每单拍：</span><input class="ipt f-tar"  id="itemnum_'+lennum+'"  name="itemnum_'+lennum+'"  onblur="myblur('+lennum+')"> 件<span ><img class="error-tag" src="./Content/images/error_tag.png">　每单总金额 <span style="color: #fa0101;" id="mdpmoney_'+lennum+'">0.00</span> 元</span><span class="hint">　【不含运费】</span></li>'
    			+			'</ul>'
    			+			'<div class="error-tips" id="itemnum_'+lennum+'_error">每单拍几件未填写！</div>'
    			+		'</div>'
    			+		'<div class="h-bar"></div>'
    			+	'</div>'
    			+''));
    		});

			$('.step-1').delegate('.del-attachgoods', 'click', function(e){//删除附加商品
				$(this).parents('.attached').remove();
			});
    	},
    	initTypeRelease: function(){// 初始化放单类型选择
            $('.step-3').delegate('.type-check', 'change', function(event) {
                if ($(this).is(':checked')) {
                    $(this).parents('.type-select').eq(0).find('.type-ipt-panel').show();
                } else {
                    $(this).parents('.type-select').eq(0).find('.type-ipt-panel').hide();
                }
                return false;
            });
        },
        initFlowTypeAddSK: function(){//初始化浏览任务增加搜索关键词
            $('#com-add-flow-sk').on('click', function(event) {
                var $comipts = $('.flow-type-ipt-arr .type-ipt-wrap');//浏览任务已添加搜索关键词
                var len = $comipts.length;
                var comflowprice = $('#commonflowprice').val();
                var favflowprice = $('#favflowprice').val();
                if (!comflowprice) comflowprice = 0.5;
                if (!favflowprice) favflowprice = 0.5;
                if (len>=5) {
                    $.prompt('浏览任务一次最多添加5个搜索关键词');
                    return false;
                }
                $(this).parents('.type-ipt-panel').find('.flow-type-ipt-arr').append($(''
                    + '<div class="type-ipt-wrap">'
                    + '    <p class="sk-num f-pr"><span class="must-input"></span>搜索关键词'+ (len+1) +' <input class="ipt search-keyword" name="flow_sk_' + (len+1) + '" id="flow_sk_' + (len+1) +'" type="text" />　 <a class="delsk striking" href="javascript: void(0)">删 除</a></p>'
                    + '    <p class="flow-num spct-wrap">'
                    + '        添加浏览：<input class="ipt f-tar flow-num-ipt" name="com_flow_num_' + (len+1) + '" id="com_flow_num_' + (len+1) + '" type="text" maxlength="5" /> 个 (<span class="flow-price">+' + comflowprice + ' 元/个</span>)　'
                    + '        其中 <input type="checkbox" name="fav_flow_1_' + (len+1) + '" id="fav_flow_1_' + (len+1) + '" value="1" /> 收藏商品 '
                    + '             <input type="checkbox" name="fav_flow_3_' + (len+1) + '" id="fav_flow_3_' + (len+1) + '" value="1" /> 收藏店铺 '
                    + '             <input type="checkbox" name="fav_flow_2_' + (len+1) + '" id="fav_flow_2_' + (len+1) + '" value="1" /> 加购物车　'
                    + '             设置 <input class="ipt f-tar fav-flow-num-ipt" name="fav_flow_num_' + (len+1) + '" id="fav_flow_num_' + (len+1) + '" maxlength="5" /> 个 (<span class="flow-price">+' + favflowprice + ' 元/个</span>)'
                    + '    </p>'
                    + '</div>'
                ));
                $('#flowitemnum').val(~~($('#flowitemnum').val())+1);
                return false;
            });
            $('.flow-type-ipt-arr').delegate('.delsk', 'click', function(event) {//浏览任务删除增加的搜索关键词
                var $comipts = $('.flow-type-ipt-arr .type-ipt-wrap');//浏览任务已添加搜索关键词
                $($comipts[$comipts.length-1]).remove();
                $('#flowitemnum').val(~~($('#flowitemnum').val())-1);
                return false;
            });
        },
        initComTypeAddSK: function() {//初始化普通好评任务增加搜索关键词
            var plat = this.plat;
            console.log(plat)
            $('#com-add-sk').on('click', function(event) {
                var $comipts = $('.com-type-ipt-arr .type-ipt-wrap');//普通好评任务已添加搜索关键词
                var len = $comipts.length;
                var comflowprice = $('#commonflowprice').val();
                var favflowprice = $('#favflowprice').val();
                if (!comflowprice) comflowprice = 0.5;
                if (!favflowprice) favflowprice = 0.5;
                if (len>=5) {
                    $.prompt('普通好评任务最多添加5个搜索关键词');
                    return false;
                }
                if (plat == 1) {//淘宝平台多搜索关键词添加
                    $(this).parents('.type-ipt-panel').find('.com-type-ipt-arr').append($(''
                        + '<div class="type-ipt-wrap">'
                        + '    <p class="sk-num f-pr"><span class="must-input"></span>搜索关键词'+ (len+1) +' <input class="ipt search-keyword" name="com_sk_' + (len+1) + '" id="com_sk_' + (len+1) +'" type="text" />　　添加垫付 <input class="ipt f-tar" name="com_sk_num_' + (len+1) + '" id="com_sk_num_' + (len+1) +'" type="text" /> 单 <a class="delsk striking" href="javascript: void(0)">删 除</a></p>'
                        + '    <div class="flow-num spct-wrap">'
                        + '        添加浏览：<input class="ipt f-tar flow-num-ipt" name="com_flow_num_' + (len+1) + '" id="com_flow_num_' + (len+1) + '" type="text" maxlength="5" /> 个 (<span class="flow-price">+' + comflowprice + ' 元/个</span>)　'
                        + '        其中 <input type="checkbox" name="com_favflow_1_' + (len+1) + '" id="com_favflow_1_' + (len+1) + '" value="1" /> 收藏商品 '
                        + '             <input type="checkbox" name="com_favflow_3_' + (len+1) + '" id="com_favflow_3_' + (len+1) + '" value="1" /> 收藏店铺 '
                        + '             <input type="checkbox" name="com_favflow_2_' + (len+1) + '" id="com_favflow_2_' + (len+1) + '" value="1" /> 加购物车　'
                        + '             设置 <input class="ipt f-tar fav-flow-num-ipt" name="com_favflow_num_' + (len+1) + '" id="com_favflow_num_' + (len+1) + '" maxlength="5" /> 个 (<span class="flow-price">+' + favflowprice + ' 元/个</span>)'
                        + '    </div>'
                        + '</div>'
                    ));
                } else {
                    $(this).parents('.type-ipt-panel').find('.com-type-ipt-arr').append($(''
                        + '<div class="type-ipt-wrap">'
                        + '    <p class="sk-num f-pr"><span class="must-input"></span>搜索关键词'+ (len+1) +' <input class="ipt search-keyword" name="com_sk_' + (len+1) + '" id="com_sk_' + (len+1) +'" type="text" />　　添加垫付 <input class="ipt f-tar" name="com_sk_num_' + (len+1) + '" id="com_sk_num_' + (len+1) +'" type="text" /> 单 <a class="delsk striking" href="javascript: void(0)">删 除</a></p>'
                        + '    <div class="flow-num spct-wrap">'
                        + '        添加浏览：<input class="ipt f-tar flow-num-ipt" name="com_flow_num_' + (len+1) + '" id="com_flow_num_' + (len+1) + '" type="text" maxlength="5" /> 个 (<span class="flow-price">+' + comflowprice + ' 元/个</span>)　'
                        + '        其中 <input type="checkbox" name="com_favflow_1_' + (len+1) + '" id="com_favflow_1_' + (len+1) + '" value="1" /> 收藏商品 '
                        + '             <input type="checkbox" name="com_favflow_3_' + (len+1) + '" id="com_favflow_3_' + (len+1) + '" value="1" /> 收藏店铺 '
                        + '             <input type="checkbox" name="com_favflow_2_' + (len+1) + '" id="com_favflow_2_' + (len+1) + '" value="1" /> 加购物车　'
                        + '             设置 <input class="ipt f-tar fav-flow-num-ipt" name="com_favflow_num_' + (len+1) + '" id="com_favflow_num_' + (len+1) + '" maxlength="5" /> 个 (<span class="flow-price">+' + favflowprice + ' 元/个</span>)'
                        + '    </div>'
                        + '</div>'
                    ));
                }
                $('#comgooditemnum').val(~~($('#comgooditemnum').val())+1);
                return false;
            });
            $('.com-type-ipt-arr').delegate('.delsk', 'click', function(event) {//普通好评删除增加的搜索关键词
                var $comipts = $('.com-type-ipt-arr .type-ipt-wrap');//普通好评任务已填加搜索关键词
                $($comipts[$comipts.length-1]).remove();
                $('#comgooditemnum').val(~~($('#comgooditemnum').val())-1);
                return false;
            });
        },   
        initKwTypeAddSK: function(){//初始化关键词好评任务增加搜索关键词
            var plat = this.plat;
            var kwnumobj = {kw_sk_num_1:1}//保存原先的搜索关键词对应的放单数
            function _calkwordernownum(){//计算文字好评已选总单数
                var num = 0;
                $('.kw-type-ipt-arr .type-ipt-sk').each(function(index, el) {
                    num += ~~$(el).find('.kw-num').val();
                });
                return num;
            }
            $('#kw-add-sk').on('click', function(event) {
                var $kwipts = $('.kw-type-ipt-arr .type-ipt-sk');//关键词好评任务已添加搜索关键词
                var len = $kwipts.length;
                var comflowprice = $('#commonflowprice').val();
                var favflowprice = $('#favflowprice').val();
                if (!comflowprice) comflowprice = 0.5;
                if (!favflowprice) favflowprice = 0.5;
                if (len>=5) {
                    $.prompt('文字好评任务最多添加5个搜索关键词');
                    return false;
                }
                var num = _calkwordernownum();
                if (num>=5) {
                    $.prompt('文字好评任务每次最多发5单，您文字好评任务总单数已满5单');
                    return false;
                }
                if (plat == 1) {//淘宝平台多搜索关键词添加
                    $(this).parents('.type-ipt-panel').find('.kw-type-ipt-arr').append($(''
                        + '<div class="type-ipt-wrap type-ipt-sk">'
                        + '    <p class="sk-num f-pr"><span class="must-input"></span>搜索关键词' + (len+1) + ' <input class="ipt search-keyword" name="kw_sk_' + (len+1) + '" id="kw_sk_' + (len+1) + '" type="text" />　　添加垫付 <select class="kw-num" name="kw_sk_num_' + (len+1) + '" id="kw_sk_num_' + (len+1) +  '"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option></select> 单 <a class="delsk striking" href="javascript: void(0)">删 除</a></p>'
                        + '    <div class="flow-num spct-wrap">'
                        + '        添加浏览：<input class="ipt f-tar flow-num-ipt" name="kw_flow_num_' + (len+1) + '" id="kw_flow_num_' + (len+1) + '" type="text" maxlength="5" /> 个 (<span class="flow-price">+' + comflowprice + ' 元/个</span>)　'
                        + '        其中 <input type="checkbox" name="kw_favflow_1_' + (len+1) + '" id="kw_favflow_1_' + (len+1) + '" /> 收藏商品 '
                        + '             <input type="checkbox" name="kw_favflow_3_' + (len+1) + '" id="kw_favflow_3_' + (len+1) + '" /> 收藏店铺 '
                        + '             <input type="checkbox" name="kw_favflow_2_' + (len+1) + '" id="kw_favflow_2_' + (len+1) + '" /> 加购物车　'
                        + '             设置 <input class="ipt f-tar fav-flow-num-ipt" name="kw_favflow_num_' + (len+1) + '" id="kw_favflow_num_' + (len+1) + '" /> 个 (<span class="flow-price">+' + favflowprice + ' 元/个</span>)'
                        + '    </div>'
                        + '</div>'
                    ));
                } else {
                    $(this).parents('.type-ipt-panel').find('.kw-type-ipt-arr').append($(''
                        + '<div class="type-ipt-wrap type-ipt-sk">'
                        + '    <p class="sk-num f-pr"><span class="must-input"></span>搜索关键词' + (len+1) + ' <input class="ipt search-keyword" name="kw_sk_' + (len+1) + '" id="kw_sk_' + (len+1) + '" type="text" />　　添加垫付 <select class="kw-num" name="kw_sk_num_' + (len+1) + '" id="kw_sk_num_' + (len+1) +  '"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option></select> 单 <a class="delsk striking" href="javascript: void(0)">删 除</a></p>'
                        + '    <div class="flow-num spct-wrap">'
                        + '        添加浏览：<input class="ipt f-tar flow-num-ipt" name="kw_flow_num_' + (len+1) + '" id="kw_flow_num_' + (len+1) + '" type="text" maxlength="5" /> 个 (<span class="flow-price">+' + comflowprice + ' 元/个</span>)　'
                        + '        其中 <input type="checkbox" name="kw_favflow_1_' + (len+1) + '" id="kw_favflow_1_' + (len+1) + '" /> 收藏商品 '
                        + '             <input type="checkbox" name="kw_favflow_3_' + (len+1) + '" id="kw_favflow_3_' + (len+1) + '" /> 收藏店铺 '
                        + '             <input type="checkbox" name="kw_favflow_2_' + (len+1) + '" id="kw_favflow_2_' + (len+1) + '" /> 加购物车　'
                        + '             设置 <input class="ipt f-tar fav-flow-num-ipt" name="kw_favflow_num_' + (len+1) + '" id="kw_favflow_num_' + (len+1) + '" /> 个 (<span class="flow-price">+' + favflowprice + ' 元/个</span>)'
                        + '    </div>'
                        + '</div>'
                    ));
                }
                $('#wrap-kwtype-opt').trigger('e_change_select_num', _calkwordernownum());
                $('#kwgooditemnum').val(~~($('#kwgooditemnum').val())+1);
                kwnumobj['kw_sk_num_' + (len + 1)] = 1;
                return false;
            });
            $('.kw-type-ipt-arr').delegate('.kw-num', 'change', function(event){
                var val = kwnumobj[$(this).attr('id')];
                if (_calkwordernownum()>5) {
                    $(this).val(val);
                    $.prompt('文字好评任务每次最多可发5单，您已添加' + _calkwordernownum() + '单');
                    return false;
                }
                kwnumobj[$(this).attr('id')] = $(this).val();
                $('#wrap-kwtype-opt').trigger('e_change_select_num', _calkwordernownum());
                return false;
            });
            $('.kw-type-ipt-arr').delegate('.delsk', 'click', function(event) {
               var $kwipts = $('.kw-type-ipt-arr .type-ipt-sk');//关键词好评任务已添加搜索关键词
                $($kwipts[$kwipts.length-1]).remove();
                $('#wrap-kwtype-opt').trigger('e_change_select_num', _calkwordernownum());
                $('#kwgooditemnum').val(~~($('#kwgooditemnum').val())-1);
                return false;
            });
            $('#wrap-kwtype-opt').bind('e_change_select_num', function(event, nownum){//文字好评任务单数修改时触发
                if (nownum > 5) return false;
                var i = 0;
                var $kwctwraparr = $('.com-kw-ct-ipt-wrap');
                var existnum = $kwctwraparr.length;
                if (nownum > existnum) {//增加文字评价输入块
                    for (i=0; i<(nownum-existnum); i++) {
                        $('#wrap-kwtype-opt').append($(''
                            +'<div class="com-kw-ct-ipt-wrap">'
                            +    '<div><img src="/images/pic_type_up_' + (existnum + 1 + i) + '.png" alt=""> <span class="ipt-tt">设置第' + (existnum + 1 + i) + '单的文字</span></div>'
                            +    '<div>'
                            +        '<textarea class="wz_keyword_ct" name="wz_keyword_ct_' + (existnum + 1 + i) + '" id="wz_keyword_ct_' + (existnum + 1 + i) + '" cols="95" rows="5" placeholder="可填写完整的评价内容，最多999字"></textarea>'
                            +    '</div>'
                            +'</div>'
                        ));
                    }
                } else {
                    for(i=0; i<(existnum-nownum); i++){//减少文字评价输入块
                        $($kwctwraparr[existnum-1-i]).remove();
                    }
                }
            });
        },
        initPicTypeAddSK: function(){//初始化图片好评任务增加搜索关键词
            var plat = this.plat;
            $('#pic-add-sk').on('click', function(event) {//添加搜索关键词
                var $picipts = $('.pic-type-ipt-arr .type-ipt-wrap');//图文好评任务已添加搜索关键词
                var len = $picipts.length;
                var comflowprice = $('#commonflowprice').val();
                var favflowprice = $('#favflowprice').val();
                if (!comflowprice) comflowprice = 0.5;
                if (!favflowprice) favflowprice = 0.5;
                if (len>=5) {
                    $.prompt('图片好评任务最多添加5个搜索关键词');
                    return false;
                }
                var num = calpicordernownum();
                if (num>=5) {
                    $.prompt('图片好评任务每次最多发5单，您图片好评任务总单数已满5单');
                    return false;
                }
                if (plat == 1) {//淘宝平台多搜索关键词添加
                    $(this).parents('.type-ipt-panel').find('.pic-type-ipt-arr').append($(''
                        + '<div class="type-ipt-wrap"> '
                        + '    <p class="sk-num f-pr">'
                        + '        <span class="must-input"></span>搜索关键词' + (len+1) + ' <input class="ipt search-keyword" name="pic_sk_' + (len+1) + '" id="pic_sk_' + (len+1) + '" type="text" />　　'
                        + '        添加垫付 '
                        + '        <select class="pic-num" name="pic_sk_num_' + (len+1) + '" id="pic_sk_num_' + (len+1) + '">'
                        + '            <option value="1">1</option>'
                        + '            <option value="2">2</option>'
                        + '            <option value="3">3</option>'
                        + '            <option value="4">4</option>'
                        + '            <option value="5">5</option>'
                        + '        </select> '
                        + '        单 <a class="delsk striking" href="javascript: void(0)">删 除</a>'
                        + '    </p>'
                        + '    <div class="flow-num spct-wrap">'
                        + '        添加浏览：<input class="ipt f-tar flow-num-ipt" name="pic_flow_num_' + (len+1) + '" id="pic_flow_num_' + (len+1) + '" type="text" /> 个 (<span class="flow-price">+' + comflowprice + ' 元/个</span>)　'
                        + '        其中 <input type="checkbox" name="pic_favflow_1_' + (len+1) + '" id="pic_favflow_1_' + (len+1) + '" value="1" /> 收藏商品 '
                        + '             <input type="checkbox" name="pic_favflow_3_' + (len+1) + '" id="pic_favflow_3_' + (len+1) + '" value="1" /> 收藏店铺 '
                        + '             <input type="checkbox" name="pic_favflow_2_' + (len+1) + '" id="pic_favflow_2_' + (len+1) + '" value="1" /> 加购物车　'
                        + '             设置 <input class="ipt f-tar fav-flow-num-ipt" name="pic_favflow_num_' + (len+1) + '" id="pic_favflow_num_' + (len+1) + '"  /> 个 (<span class="flow-price">+' + favflowprice + ' 元/个</span>)'
                        + '    </div>'
                        + '</div>'
                    ));
                } else {
                    $(this).parents('.type-ipt-panel').find('.pic-type-ipt-arr').append($(''
                        + '<div class="type-ipt-wrap"> '
                        + '    <p class="sk-num f-pr">'
                        + '        <span class="must-input"></span>搜索关键词' + (len+1) + ' <input class="ipt search-keyword" name="pic_sk_' + (len+1) + '" id="pic_sk_' + (len+1) + '" type="text" />　　'
                        + '        添加垫付 '
                        + '        <select class="pic-num" name="pic_sk_num_' + (len+1) + '" id="pic_sk_num_' + (len+1) + '">'
                        + '            <option value="1">1</option>'
                        + '            <option value="2">2</option>'
                        + '            <option value="3">3</option>'
                        + '            <option value="4">4</option>'
                        + '            <option value="5">5</option>'
                        + '        </select> '
                        + '        单 <a class="delsk striking" href="javascript: void(0)">删 除</a>'
                        + '    </p>'
                        + '    <div class="flow-num spct-wrap">'
                        + '        添加浏览：<input class="ipt f-tar flow-num-ipt" name="pic_flow_num_' + (len+1) + '" id="pic_flow_num_' + (len+1) + '" type="text" /> 个 (<span class="flow-price">+' + comflowprice + ' 元/个</span>)　'
                        + '        其中 <input type="checkbox" name="pic_favflow_1_' + (len+1) + '" id="pic_favflow_1_' + (len+1) + '" value="1" /> 收藏商品 '
                        + '             <input type="checkbox" name="pic_favflow_3_' + (len+1) + '" id="pic_favflow_3_' + (len+1) + '" value="1" /> 收藏店铺 '
                        + '             <input type="checkbox" name="pic_favflow_2_' + (len+1) + '" id="pic_favflow_2_' + (len+1) + '" value="1" /> 加购物车　'
                        + '             设置 <input class="ipt f-tar fav-flow-num-ipt" name="pic_favflow_num_' + (len+1) + '" id="pic_favflow_num_' + (len+1) + '"  /> 个 (<span class="flow-price">+' + favflowprice + ' 元/个</span>)'
                        + '    </div>'
                        + '</div>'
                    ));
                }
                $('#wrap-pictype-opt').trigger('change.wj', calpicordernownum());
                picnumobj['pic_sk_num_'+(len+1)] = 1;
                $('#picgooditemnum').val(~~($('#picgooditemnum').val())+1);
                return false;
            });

            var picnumobj = {pic_sk_num_1:1}//保存原先的搜索关键词对应的放单数

            $('.pic-type-ipt-arr').delegate('.delsk', 'click', function(event) {//删除搜索关键词
                var $picipts = $('.pic-type-ipt-arr .type-ipt-wrap');//图文好评任务已添加搜索关键词
                $($picipts[$picipts.length-1]).remove();
                $('#wrap-pictype-opt').trigger('change.wj', calpicordernownum());
                $('#picgooditemnum').val(~~($('#picgooditemnum').val())-1);
                return false;
            });
            
            $('.pic-type-ipt-arr').delegate('.pic-num', 'change', function(event) {//每个搜索关键词发单数修改
                var val = picnumobj[$(this).attr('id')];
                if (calpicordernownum()>5) {
                    $(this).val(val);
                    $.prompt('图片好评任务每次最多可发5单，您已添加' + calpicordernownum() + '单');
                    return false;
                }
                picnumobj[$(this).attr('id')] = $(this).val();
                $('#wrap-pictype-opt').trigger('change.wj', calpicordernownum());
                return false;
            });

            function calpicordernownum() {//计算图片好评已选择单数
                var num = 0;
                $('.pic-type-ipt-arr .type-ipt-wrap').each(function(index, el) {
                    num += ~~$(el).find('.pic-num').val();
                });
                return num;
            }

            $('#wrap-pictype-opt').bind('change.wj', function(event, nownum){//图片好评任务单数更改时触发
                if (nownum>5) return false;
                var i = 0;
                var $picpanel = $('#wrap-pictype-opt .pic-type-panel');
                var existnum = $picpanel.length;
                if (nownum > existnum) {
                    for(i=0; i<(nownum-existnum); i++) {
                        $('#wrap-pictype-opt').append($(''
                            + '<div class="pic-type-panel">'
                            + '    <div class="pic-type-pp f-pr"><img class="pic-up-tip" src="/images/pic_type_up_' + (existnum+i+1) + '.png" />设置第' + (existnum+i+1) + '单的图片</div>'
                            + '    <div class="pic-type-rule"><span class="must-input"></span>上传照片中商品的规格：<input class="ipt pic-rule" name="pic_rule_' +  (existnum+i+1) + '" id="pic_rule_' +  (existnum+i+1) + '" type="text" placeholder="如颜色，尺码" /> <span class="prompt">规格设置一定要与图片上商品规格保持一致</span></div>'
                            + '    <div class="pic-type-upic f-cb">'
                            + '        <div class="f-fl"><span class="must-input" style="*top: 0px;"></span><span class="sub-title"> 选择图片：</span></div>'
                            + '        <div class="f-fl f-pr">'
                            + '            <div class="f-cb img-wrap">'
                            + '                <img class="f-fl tphp " id="showpic_' +  (existnum+i+11) + '_1" src="Content/images/default_upic.png" width="143px" height="143px">'
                            + '                <input type="hidden" name="pic_' +  (existnum+i+11) + '_1" id="pic_' +  (existnum+i+11) + '_1" value="" />'
                            + '                <div id="delete-' +  (existnum+i+11) + '-1" style="position:absolute;left:132px;display:none;">'
                            + '                    <a href="javascript:void(0)" onclick="deletepic(' +  (existnum+i+11) + ', 1)"><img src="./Content/images/error_tag.png"></a>'
                            + '                </div>'
                            + '                <img class="f-fl tphp " id="showpic_' +  (existnum+i+11) + '_2" src="Content/images/default_upic.png" width="143px" height="143px">'
                            + '                <input type="hidden" name="pic_' +  (existnum+i+11) + '_2" id="pic_' +  (existnum+i+11) + '_2" value="" />'
                            + '                <div id="delete-' +  (existnum+i+11) + '-2" style="position:absolute;left:292px;display:none;">'
                            + '                    <a href="javascript:void(0)" onclick="deletepic(' +  (existnum+i+11) + ', 2)"><img src="./Content/images/error_tag.png"></a>'
                            + '                </div>'
                            + '                <img class="f-fl tphp " id="showpic_' +  (existnum+i+11) + '_3" src="Content/images/default_upic.png" width="143px" height="143px">'
                            + '                <input type="hidden" name="pic_' +  (existnum+i+11) + '_3" id="pic_' +  (existnum+i+11) + '_3" value="" />'
                            + '                <div id="delete-' +  (existnum+i+11) + '-3" style="position:absolute;left:452px;display:none;">'
                            + '                    <a href="javascript:void(0)" onclick="deletepic(' +  (existnum+i+11) + ', 3)"><img src="./Content/images/error_tag.png"></a>'
                            + '                </div>'
                            + '            </div>'
                            + '            <div class="f-cb wrap-upbtn">'
                            + '                <div class="btn-upfile f-fl">'
                            + '                    <div class="new-contentarea">'
                            + '                        <a href="javascript:void(0)" class="upload-img"><label for="upload-file"></label></a>'
                            + '                        <input type="file" class="upic_' +  (existnum+i+11) + '" onchange="return FileUpload_onselect(this, ' +  (existnum+i+11) + ')" />'
                            + '                    </div>'
                            + '                </div>'
                            + '                <div class="hint f-fl">最多可添加3张图片，每组照片拍摄的角度，背景不能一样 </div>'
                            + '            </div>'
                            + '        </div>'
                            + '    </div>'
                            + '    <div class="pic-type-cw f-cb">'
                            + '        <p class="f-fl">评价要求：</p>'
                            + '        <div class="f-fl">'
                            + '            <textarea class="textarea pic-cw" name="pic_cw_' + (existnum+i+1) + '" id="pic_cw_' + (existnum+i+1) + '" placeholder="商家可自定义填写评价的文字要求"></textarea>'
                            + '        </div>'
                            + '    </div>'
                            + '</div>'
                        ));
                    }
                } else {
                    for(i=0; i<(existnum-nownum); i++){
                        $($picpanel[existnum-1-i]).remove();
                    }
                }
            });    
        },
    	initTaskType: function(){
    		var $seltype = $('.step-3 .select-task-type .seltype');
    		var $tasktype= $('.step-3 .task-type');
    		var $pictype = $('.step-3 .picturetype-wrap');

    		$seltype.each(function(index, val){//选择任务类型
    			$(val).on('click', function(e){
    				if($(val).is(':checked')){
    					$($tasktype[index]).show();
    				}else{
    					$($tasktype[index]).hide();
    				} 
    			});
    		});
    		$('#tasknum_three').on('change', function(e){//添加图片好评
    			var i = 0;
    			var num = $(this).val();
    			var existnum = $pictype.find('.upic-wrap').length;
    			if(num>existnum){
    				for(i=0; i<(num-existnum); i++){
    					$pictype.append($(''
    					+	'<div class="upic-wrap">'
    					+		'<h4 class="upictitle">上传第' + (existnum+i+1) + '单的图片</h4>'
    					+		'<ul>'
    					+			'<li>'
    					+				'<span class="must-input"></span>'
    					+				'<span class="sub-title" >上传照片中商品的规格：</span>'
    					+				'<input class="ipt color-rule" type="text"  name="spec1_'+(existnum+i+11)+'" id="spec1_'+(existnum+i+11)+'" placeholder="如颜色，尺码">'
    					+				'<span class="hint" >　规格设置一定要与图片上商品规格保持一致</span>'
    					+			'</li>'
    					+		'</ul>'
    					+		'<div class="f-cb">'
    					+			'<div class="f-fl"><span class="must-input" style="*top: 0px;"></span><span class="sub-title"> 选择图片：</span></div>'
    					+			'<div class="f-fl f-pr">'
    					+				'<div class="f-cb img-wrap">'
    					+					'<img class="f-fl tphp " id="showpic_'+(existnum+i+11)+'_1" src="Content/images/default_upic.png" width="143px" height="143px">'
    					+					'<input type="hidden" name="pic_'+(existnum+i+11)+'_1" id="pic_'+(existnum+i+11)+'_1" value="" />'
    					+					'<div id="delete-'+(existnum+i+11)+'-1" style="position:absolute;top:-4px;left:132px;display:none;"><a href="javascript:void(0)" onclick="deletepic('+(existnum+i+11)+', 1)"><img src="./Content/images/error_tag.png"></a></div>'
    					+					'<img class="f-fl tphp " id="showpic_'+(existnum+i+11)+'_2" src="Content/images/default_upic.png" width="143px" height="143px">'
    					+					'<input type="hidden" name="pic_'+(existnum+i+11)+'_2" id="pic_'+(existnum+i+11)+'_2" value="" />'
    					+					'<div id="delete-'+(existnum+i+11)+'-2" style="position:absolute;top:-4px;left:292px;display:none;"><a href="javascript:void(0)" onclick="deletepic('+(existnum+i+11)+', 2)"><img src="./Content/images/error_tag.png"></a></div>'
    					+					'<img class="f-fl tphp " id="showpic_'+(existnum+i+11)+'_3" src="Content/images/default_upic.png" width="143px" height="143px">'
    					+					'<input type="hidden" name="pic_'+(existnum+i+11)+'_3" id="pic_'+(existnum+i+11)+'_3" value="" />'
    					+					'<div id="delete-'+(existnum+i+11)+'-3" style="position:absolute;top:-4px;left:452px;display:none;"><a href="javascript:void(0)" onclick="deletepic('+(existnum+i+11)+', 3)"><img src="./Content/images/error_tag.png"></a></div>'
    					+				'</div>'
    					+				'<div class="f-cb wrap-upbtn">'
    					+					'<div class="btn-upfile f-fl">'
    					+						'<div class="new-contentarea">'
    					+							'<a href="javascript:void(0)" class="upload-img"><label for="upload-file"></label></a>'
    					+							'<input type="file" class="upic_11" name="upic_11" id="upic_11" onchange="return FileUpload_onselect(this,'+(existnum+i+11)+')" />'
    					+						'</div>'
    					+					'</div>'
    					+					'<div class="hint f-fl">最多可添加3张图片，每组照片拍摄的角度，背景不能一样 </div>'
    					+				'</div>'
    					+			'</div>'
    					+		'</div>'
    					+		'<div class="error-tips" id="tasknum_three_error_'+(existnum+i+11)+'">图片未上传！</div>'
    					+		'<div class="f-cb tw-msg">'
						+			'<div class="f-fl"><span class="select-input" style="*top: 0px;"></span><span class="sub-title"> 评价文字：</span></div>'
						+			'<div class="f-fl f-pr">'
						+				'<textarea id="message_tw_'+(existnum+i+11)+'" name="message_tw_'+(existnum+i+11)+'"  maxlength="200" placeholder="如有文字评价要求，在此填写" style="border: 1px solid #ececed;width: 500px;height: 40px;padding: 14px;"></textarea>'
						+			'</div>'
						+		'</div>'
    					+	'</div>'
    					+''));
    				}
    			}else{
    				for(i=0; i<(existnum-num); i++){
    					$($pictype.find('.upic-wrap')[existnum-1-i]).remove();
    				}
    			}
    		});
    	},
        initSetBuyerAttr: function(){//是否设置买手属性
            $('#issetbuyerattr').on('click', function(){
                if ($(this).is(':checked')) {
                    $(this).parent().next('.wrap-all-limit').show();
                } else {
                    $(this).parent().next('.wrap-all-limit').hide();
                    $('.limit-user .limchoice').removeAttr('checked');
                    $('.limit-user .limit-ipt input[type="radio"], .limit-user .limit-ipt input[type="checkbox"]').removeAttr('checked');
                    $showarea.text('');
                    $('#limitareas').val('');
                }
            });
            $('.limit-user .limchoice').on('click', function(){
                var $firadio = $(this).parents('.limit-user').find('input[type="radio"]');
                if ($(this).is(':checked')) {
                    $(this).parents('.limit-user').find('.limit-ipt').show();
                    if ($firadio.length > 0) {
                        $($firadio[0]).attr('checked', 'checked');
                    }
                } else {
                    $(this).parents('.limit-user').find('.limit-ipt').hide();
                    if ($firadio.length > 0) {
                        $firadio.removeAttr('checked');
                    }
                }
            });
            $('.limit-area .limchoice').on('click', function(){
                if (!$(this).is(':checked')) {
                     $showarea.text('');
                    $('#limitareas').val('');
                    $('.limit-area input[type="checkbox"]').removeAttr('checked');
                }
            });
            var $showarea = $('.seled-lim-area .showarea');
            $('.sel-area-panel').delegate('.area', 'click', function(event) {
                var areas = $showarea.text();
                if ($(this).is(':checked')) {
                    if ($(this).hasClass('section')) {
                        $(this).parents('.lst').find('.area').filter(function(index) {
                            return !$(this).hasClass('section') && !$(this).is(':checked');
                        }).each(function(index, el) {
                            if (areas.length != 0) {
                                areas += '、' + $(this).val();
                            } else {
                                areas += $(this).val();
                            }
                            $(this).attr('checked', 'checked');
                        });
                    } else {
                        if (areas.length != 0) {
                            areas += '、' + $(this).val();
                        } else {
                            areas += $(this).val();
                        }
                        $(this).attr('checked', 'checked');
                    }
                } else {
                    if ($(this).hasClass('section')) {
                        $(this).parents('.lst').find('.area').filter(function(index) {
                            return !$(this).hasClass('section') && $(this).is(':checked');
                        }).each(function(index, el) {
                            if (areas.indexOf($(this).val()) == 0) {
                                if (areas === $(this).val()) {
                                    areas = '';
                                } else {
                                    areas = areas.replace($(this).val()+'、', '');
                                }
                            } else {
                                areas = areas.replace('、' + $(this).val(), '');
                            }
                            $(this).removeAttr('checked'); 
                        });
                    } else {
                        if (areas.indexOf($(this).val()) == 0) {
                            if (areas === $(this).val()) {
                                areas = '';
                            } else {
                                areas = areas.replace($(this).val()+'、', '');
                            }
                        } else {
                            areas = areas.replace('、' + $(this).val(), '');
                        }
                        $(this).removeAttr('checked'); 
                    }
                }
                $showarea.text(areas);
                $('#limitareas').val(areas);
            });
            $('.wrap-all-tbcategory').delegate('.tbcategory', 'change', function(e){
                var $hasseled = $('.wrap-all-tbcategory .tbcategory:checked');
                var oldselval = $('#limittbcategory').val();
                if ($(this).is(':checked')) {//add
                    if ($hasseled.length > 3) {
                        $.prompt('类目最多选择3个');
                        $(this).removeAttr('checked');
                        return false;
                    }
                    if (!oldselval) {
                        oldsel = $(this).val();
                    } else {
                        oldsel = oldsel + ','+ $(this).val();
                    }
                    $('#limittbcategory').val(oldsel);
                } else {//del
                    if (oldselval.indexOf($(this).val()) == 0) {
                        if (oldselval === $(this).val()) {
                            oldselval = '';
                        } else {
                            oldselval = oldselval.replace($(this).val()+',', '');
                        }
                    } else {
                        oldselval = oldselval.replace(','+$(this).val(), '');
                    }
                    $('#limittbcategory').val(oldselval);
                }
            });
        },
        initAddJdSKU: function(){//京东任务添加sku
            $('#addjdsku').on('click', function(e){
                var $skulst = $('.step-1 .sku-lst');
                var existnum = $('#jd_sku_num').val();
                existnum = ~~ existnum;
                if (!($('#is_add_sku').is(':checked'))) {
                    $.prompt('请先勾选 京东sku属性设置');
                    return false;
                }
                if (existnum >= 9) {
                    $.prompt('sku项最多添加9个');
                    return false;
                }
                $skulst.append($('<li class="sku-item">'
                    + '<label class="title">属性' + (existnum+1) + '</label> '
                    + '<input class="ipt attr_name" name="attr_name_' + (existnum+1) + '" type="text" placeholder=""> '
                    + '<input class="ipt attr_value" name="attr_value_' + (existnum+1) + '" type="text">'
                    + '<a class="delitem" href="javascript: void(0)">删除</a>'
                    + '</li>'));
                $('#jd_sku_num').val(existnum+1);
            });
            $('.step-1 .sku-lst').delegate('.delitem', 'click', function(e){
                var $skulst = $('.step-1 .sku-lst');
                var existnum = $('#jd_sku_num').val();
                $($skulst.find('.sku-item')[existnum-1]).remove();
                $('#jd_sku_num').val(existnum-1);
            });
            $('.step-1 .sku-lst').delegate('.attr_name, .attr_value', 'blur', function(e){
                var value = $(this).val();
                if (!!value && !($('#is_add_sku').is(':checked'))) {
                    $.prompt('京东sku属性设置必须勾选后才能生效');
                    $(this).focus();
                }
            });
        }
    };
    page.init();
})(jQuery);

