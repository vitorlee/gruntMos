function showTips(){
    var tipsHeight = ($(window).height()/2)-45;
    var tipsWidth = ($(window).width() - $('.confirm_box').width())/2;
    $('.confirm_box').css({top:tipsHeight,left:tipsWidth});
    $('.confirm_box, .layer').show();
  }
$(function(){
  var layerHeight = $(document).height();
  $('.layer').css('height', layerHeight);
  $(".order_type a").click(function(){
    $(".order_type a").eq($(this).index()).addClass("on").siblings().removeClass('on');
  });
  //触发弹层
  
  $('.btn_close, .layer').click(function() { 
    $(".confirm_box, .layer").hide(); 
  });
})

