var swiper = new Swiper('.swiper-container', {
    slidesPerView: 'auto',
    paginationClickable: true,
    spaceBetween: 12,
});

function showTips(){
  var scrollHeight = $(window).scrollTop();
  var windowsHeight = ($(window).height()/2)-45;
  var tipsHeight = scrollHeight + windowsHeight;
  var tipsWidth = ($(window).width() - $('.confirm_box').width())/2;
  $('.confirm_box').css({top:tipsHeight,left:tipsWidth});
  $('.confirm_box, .layer').show();
  return false;
};
function showCancel(){
  var scrollHeight = $(window).scrollTop();
  var windowsHeight = $(window).height;
  var tipsHeight = scrollHeight + windowsHeight;
  var tipsWidth = $(window).width;
  $('.cancel_box').css({height:windowsHeight,width:tipsWidth});
  var imgWidth = ($(window).width() - 225)/2
  $('.cancel_box .cancel_img').css('left', imgWidth);
  $('.cancel_box, .layer').show();
  return false;
};
$(function(){
  var layerHeight = $(document).height();
  $('.layer').css('height', layerHeight);
  var slideHeight = 66; 
  var defHeight = $('.detail_txt').height();
  if(defHeight > slideHeight){
    $('.view_all').show();
    $('.detail_txt').css('height' , slideHeight + 'px');
    $('.detail_txt').click(function(){
      var curHeight = $('.detail_txt').height();
      if(curHeight == slideHeight){
        $('.detail_txt').animate({
          height: defHeight
        }, "normal");
        $('.view_all i').removeClass('down').addClass('up')
      }else{
        $('.detail_txt').animate({
          height: slideHeight
        }, "normal");
        $('.view_all i').removeClass('up').addClass('down');
      }
      return false;
    });   
  }
  var showTips = function (){}
  $(".comment_list ul li").each(function(){
    var $this = $(this);
    var $commentbox = $this.children(".user_comment");
    var $more = $commentbox.children(".view_more");
    var $arrow = $more.children("i");

    var commentHeight = 66; 
    var allHeight = $commentbox.height();
    if(allHeight > commentHeight){
      $more.show();
      $commentbox.css('height' , commentHeight + 'px');
      $commentbox.click(function(){
        var curHeight = $commentbox.height();
        if(curHeight == commentHeight){
          $commentbox.animate({
            height: allHeight
          }, "normal");
          $arrow.removeClass('down').addClass('up')
        }else{
          $commentbox.animate({
            height: commentHeight
          }, "normal");
          $arrow.removeClass('up').addClass('down');
        }
        return false;
      });   
    }
  });
  
  $('.btn_close, .layer, .cancel_box').click(function() { 
    $(".confirm_box, .layer, .cancel_box").hide(); 
  });
})