
$(function(){
  var winWidth = $(window).width();
  var liWidth = (winWidth/7)-1;
  var winHeight = $(window).height();
  var docHeight = $(document).height();
  var layerHeight = winHeight - 85;
  $('.layer').css('height', layerHeight);
  $(".date li").each(function(){
      $(this).css('width', liWidth);
    });
  var nav = function(el, multiple) {
    this.el = el || {};
    this.multiple = multiple || false;
    var links = this.el.find('.link');
    links.on('click', {el: this.el, multiple: this.multiple}, this.dropdown)
  }
  
  nav.prototype.dropdown = function(e) {
    var $el = e.data.el;
      $this = $(this),
      $next = $this.next();
      
      $next.slideToggle(250,function(){
          if($(this).is(':hidden')){
            $('.wrap').css({'height': docHeight,'overflow': 'auto'});
            $(this).nextAll('.layer').hide();
          }else{
            $('.wrap').css({'height': winHeight,'overflow': 'hidden'});
            $(this).nextAll('.layer').show();
          }
      });
      $this.nextAll('.layer').show().parent().toggleClass('open');
      if (!e.data.multiple) {
        $el.find('.popup').not($next).slideUp().parent().removeClass('open');
        $el.find('.layer').not($this.nextAll()).hide();
      };
      $(".popup .first p").each(function(){
        if($(this).hasClass('current')){
            if($(this).index()>5){
                var height = $(this).index() * 46;
                $('.popup .first').scrollTop(height);
            }
        }
      });
  } 
  var nav = new nav($('#list_nav'), false);
   $('.layer').click(function() { 
    $(this).hide();
    $(this).prev('.popup').hide();
    $(this).parent().removeClass('open');
    $('.wrap').css({'height': docHeight,'overflow': 'auto'});
   });
});