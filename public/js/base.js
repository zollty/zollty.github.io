$(document).ready(function() {

  /* 控制左侧 aside 的动作 */
  $("#nav_btn").on('click', nav_click);
  
  /* Control pjaxlink */
  $(document).pjax('.pjaxlink', '#pjax', { fragment: "#pjax", timeout: 5000 });
  $(document).on("pjax:start", function() {
	if($("#base-wrapper").width() < 992 && $('#nav_btn i').hasClass('fa-angle-right')) {
	  nav_click();
	}
  });
  $(document).on("pjax:end", function() {
    $('.aside3').scrollTop(0);
    contentEffects();
  });
  
  $('body').on('click', '.show-commend', function(){
    var ds_loaded = false;
    window.disqus_shortname = $('.show-commend').attr('name');
    $.ajax({
      type: "GET",
      url: "http://" + disqus_shortname + ".disqus.com/embed.js",
      dataType: "script",
      cache: true
    });
  });
  
  $('.sidebar-a').on('click', function() {
    $(this).addClass('sa-active').siblings().removeClass('sa-active');
  });
  
  contentEffects();
});

/* 控制导航按钮动作 */
function nav_click() {
  if( $('#nav_btn i').hasClass('fa-angle-right') ) {
    /* 显示左侧aside */
    $('.aside')
      .addClass('visible-md visible-lg')
      .removeClass('hidden-md hidden-lg')
    /* 调整右侧内容 */
    $('.aside3')
      .removeClass('col-md-12 col-lg-12')
      .addClass('col-md-8 col-lg-8');
    /* 调整文字内容格式 */
    $('.aside3-content')
      .removeClass('col-md-10 col-lg-10 col-md-offset-1 col-lg-offset-1')
      .addClass('col-md-12');
    /* 变化按钮 */
    $('#nav_btn i')
      .removeClass('fa-angle-right')
      .addClass('fa-angle-left');
  } else {
    /* 隐藏左侧aside */
    $('.aside')
      .removeClass('visible-md visible-lg')
      .addClass('hidden-md hidden-lg');
    /* 右侧内容最大化 */
    $('.aside3')
      .removeClass('col-md-8 col-lg-8')
      .addClass('col-md-12 col-lg-12');
    /* 修改文字排版 */
    $('.aside3-content')
      .removeClass('col-md-12')
      .addClass('col-md-10 col-lg-10 col-md-offset-1 col-lg-offset-1');
    /* 变化按钮图标 */
    $('#nav_btn i').removeClass('fa-angle-left').addClass('fa-angle-right');  
  }
}

function addDuoShuo(){
	if(document.getElementById('duosjs')) {
		window.DUOSHUO.init();
		return;
	}
	var ds = document.createElement('script');
	ds.type = 'text/javascript';ds.async = true;
	ds.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') + '//static.duoshuo.com/embed.js';
	ds.charset = 'UTF-8';
	ds.id = 'duosjs';
	(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(ds);
}

function catalogBtnControl(){
  if( $('#catalog').css('display')=='none' ) {
	$('#catalog').css('display', 'block');
	$('#catalog_btn i').removeClass('fa-angle-down').addClass('fa-angle-up');
	//alert(document.getElementById("catalog").offsetHeight);
  } else {
	$('#catalog').css('display', 'none');
	$('#catalog_btn i').removeClass('fa-angle-up').addClass('fa-angle-down');
  }
}

function createCatalog() {
  $("#content > h2,#content > h3,#content > h4,#content > h5,#content > h6").each(function(i) {
	var current = $(this);
	current.attr("id", "title" + i);
	tag = current.prop('tagName').substr(-1);
	$("#nav").append("<div style='margin-left:"+15*(tag-1)+"px'><a id='link" + i + "' href='#title" +i + "'>" + current.html() + "</a></div>");
  });
  
  if( $("#nav").html()!="" ) {
	$('#catalog_btn').css('display', 'block');
	$("#catalog_btn").on('click', catalogBtnControl);
  } else {
	$('#catalog_btn').css('display', 'none');
  }
}

function contentEffects(){
  // remove the asidebar
  $('.row-offcanvas').removeClass('active');
  // if have catalog create it
  if($("#catalog").length > 0){
    createCatalog();
  }
  
  $("pre").addClass("prettyprint");
  prettyPrint();
	
  $('#content img').addClass('img-thumbnail').parent('p').addClass('center');
  
  addDuoShuo();
}