$(function(){
  // $(".order_list").hide();
  // $(".cat a:first").addClass( "current" ).show();
  // $(".order_list:first").show();
  // $(".cat a").click(function(){
  //   $(".cat a").removeClass("current"); 
  //   $(this).addClass("current");
  //   $(".order_list").hide();
  //   var activeTab = $(this).attr("href");
  //   $(activeTab).fadeIn();
  //   return false;
  // });
  $(".cat a").click(function(){
    $(".cat a").eq($(this).index()).addClass("current").siblings().removeClass('current');
    $(".order_list").eq($(".cat a").index(this)).addClass("on").siblings().removeClass('on'); 
  });
})

