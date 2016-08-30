var MSG_OK = 0;
var MSG_ERR = -1;
var MSG_REDIRECT = -2;
	
jQuery(function($){
		
	//ajax提交
	$('.ajax-form').on('submit', function() {
		var url = $('.ajax-form').attr('action') + "?_t=" + Math.random();
		$('.alert').addClass('hide');
		$('button[type="submit"]').attr('disabled', true);
		if ($('#editor')) {
			$("input[name='editor_content']").val($('#editor').html());
		}
		$.post(url, $(".ajax-form").serialize(), function (out) {
			if (out.status == MSG_OK) { // 成功
				if (out.redirect != "") {
					window.location.href = out.redirect;
				} else {
					window.location.reload();
				}
			} else if (out.status == MSG_REDIRECT) {
				window.location.href = out.redirect;
			} else if (out.status == MSG_ERR) {
				if ($('.alert')) {
					$('.alert').removeClass('hide');
					$('.alert').html(out.msg);
				} else {
					alert(out.msg);
				}
				$('button[type="submit"]').removeAttr('disabled');
			}
		});
		return false;
	});
	
    $.datepicker.regional['zh-CN'] = {
        closeText: '关闭',
        prevText: '<上月',
        nextText: '下月>',
        currentText: '今天',
        monthNames: ['一�?,'二月','三月','四月','五月','六月',
            '七月','八月','九月','十月','十一�?,'十二�?],
        monthNamesShort: ['一','�?,'�?,'�?,'�?,'�?,
            '�?,'�?,'�?,'�?,'十一','十二'],
        dayNames: ['星期�?,'星期一','星期�?,'星期�?,'星期�?,'星期�?,'星期�?],
        dayNamesShort: ['周日','周一','周二','周三','周四','周五','周六'],
        dayNamesMin: ['�?,'一','�?,'�?,'�?,'�?,'�?],
        weekHeader: '�?,
        dateFormat: 'yy-mm-dd',
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: true,
        yearSuffix: '�?};
    $.datepicker.setDefaults($.datepicker.regional['zh-CN']);


    /** 日历控件 **/
    $( "#start_date, #end_date" ).datepicker({
        showOtherMonths: true,
        selectOtherMonths: false,
        dateFormat: 'yy-mm-dd',
        changeYear:true,
        changeMonth:true
    });

    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    })

    /*$('.delete').click(function () {
        return confirm('确定要删除这条记录吗�?);
    });*/
    $.widget("ui.dialog", $.extend({}, $.ui.dialog.prototype, {
        _title: function(title) {
            var $title = this.options.title || '&nbsp;'
            if( ("title_html" in this.options) && this.options.title_html == true )
                title.html($title);
            else title.text($title);
        }
    }));
    $( ".delete_confirm" ).on('click', function(e) {
        var del_url = $(this).attr('href');
        e.preventDefault();
        $( "#dialog-confirm" ).removeClass('hide').dialog({
            resizable: false,
            width: '320',
            modal: true,
            title: "<div class='widget-header'><h4 class='smaller'><i class='ace-icon fa fa-exclamation-triangle red'></i> 删除确认</h4></div>",
            title_html: true,
            buttons: [
                {
                    html: "<i class='ace-icon fa fa-trash-o bigger-110'></i>&nbsp; 确认",
                    "class" : "btn btn-danger btn-sm",
                    click: function() {
                        $( this).dialog('close');
                        window.location.href = del_url;
                    }
                }
                ,
                {
                    html: "<i class='ace-icon fa fa-times bigger-110'></i>&nbsp; 取消",
                    "class" : "btn btn-sm",
                    click: function() {
                        $( this ).dialog( "close" );
                    }
                }
            ]
        });
    });


});
 /** 左侧导航 **/
 jQuery.cookie = function (key, value, options) {

    // key and value given, set cookie...
    if (arguments.length > 1 && (value === null || typeof value !== "object")) {
        options = jQuery.extend({}, options);

        if (value === null) {
            options.expires = -1;
        }

        if (typeof options.expires === 'number') {
            var days = options.expires, t = options.expires = new Date();
            t.setDate(t.getDate() + days);
        }

        return (document.cookie = [
            encodeURIComponent(key), '=',
            options.raw ? String(value) : encodeURIComponent(String(value)),
            options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
            options.path ? '; path=' + options.path : '',
            options.domain ? '; domain=' + options.domain : '',
            options.secure ? '; secure' : ''
        ].join(''));
    }

    // key and possibly options given, get cookie...
    options = value || {};
    var result, decode = options.raw ? function (s) { return s; } : decodeURIComponent;
    return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? decode(result[1]) : null;
};



function leftmenu(event){
  //var tlen = $(".submenu").length;
   //alert(tlen);
   $(".open").click(function(){      
      $(this).children(".submenu").show().parent().siblings().children(".submenu").hide();
    });
   $(".submenu>li a").click(function(){
    var inx = $(this).closest(".open").index();
    $.cookie("leftclick",inx);
    //alert(inx);
   });
    if(event){
     var ssa = $.cookie("leftclick",0);
    }else{
     var ssa =  $.cookie("leftclick");
    } 
    $(".submenu").eq(ssa).slideDown().siblings().hide();
}
 $(function(){
   leftmenu();
 });