$(function(){
  var height = $(document).height();
  var width = $(document).width();
  $(".layer").css({
    width: width,
    height: height
  });
  $('.btn_share').click(function() {
      $('.layer').show();
    });
    $('.layer').click(function() {
      $('.layer').hide();
    });
});