;
$(function(){
    //验证手机
    function val_phone(){
        var value_phone=$.trim($(".phone").val());
        var regPhone=/^1\d{10}$/;
        if(!regPhone.test(value_phone)){
            alert('请输入正确的手机号码！');
            return false;
        }
        return true;
    }
    //验证码
    function val_code(){
        var value_code=$.trim($(".vail_code").val());
        if(value_code==''){
            alert('请输入验证码！');
            return false;
        }
        return true;
    }
    //检验表单
    function checkForm(){
        var phone=val_phone();
        var code=val_code();
        if(phone && code){
            return true;
        }else{
            return false;
        }
    }
    //获取验证码
    $(".get_vaid").click(function() {
        var phone=val_phone();
        if(phone){
            $('.get_vaid').attr('disabled', 'disabled');
            $.ajax({
                url: "/user/sms",
                type: "POST",
                data: {
                    mobile: $('.phone').val()
                },
                dataType: "json",
                success: function(data){
                    if(data.code == 200){
                        time = 60;
                        var timer=setInterval(function(){
                            time--;
                            if(time<=0){
                                clearInterval(timer);
                                $('.get_vaid').text('获取验证码');
                                $('.get_vaid').removeAttr('disabled');
                            }else{
                                $('.get_vaid').text(time+' 秒后重新获取');
                                $('.get_vaid').attr('disabled', 'disabled');
                            }
                        },1000);
                    }else{
                        alert(data.msg);
                        $('.get_vaid').removeAttr('disabled');
                    }
                }
            });
        }else{
            $('.get_vaid').removeAttr('disabled');
            return false;
        }
    });
    //提交表单
    $('.submit_btn').click(function(){
        var ckf = checkForm();
        if(ckf){
            $.ajax({
                url: '/user/mobile',
                type: "POST",
                data: {
                    mobile:$('.phone').val(),
                    captcha:$('.vail_code').val(),
                    bind:$('.num_bind').val()
                },
                dataType: "json",
                success: function(data){
                    if(data.code == '200'){
                        if(data.data.is_bind == '1'){
                            $('.num_bind').val(data.data.bind);
                            $('.phone, .vail_code, .get_vaid').attr('disabled', 'disabled');
                            alert('此手机号已注册，\n您可以继续绑定原有账号。');
                            $('.ran_user').show();
                            $('.submit_btn').html('点击绑定原有账号');
                        }else if($('.regeit .skip').length == 1){
                            var getSkipUrl = $('.skip a').attr('href');
                            window.location.href = getSkipUrl;
                        }else{
                            window.location.href = "/user/index";
                        }
                    }else if(data.code == '-302'){
                        alert('授权过期,系统将引导您重新授权');
                        var url = window.location.pathname + window.location.search;
                            url = url.replace(/\?/g, "@|@");
                            url = url.replace(/\&/g, "@@");
                        window.location.href = "/auth/login?refer="+url;
                    }else{
                        $('.phone, .vail_code, .get_vaid').removeAttr('disabled');
                        alert(data.msg);
                    }
                }
            });
        }else{
            return false;
        }
    });
})