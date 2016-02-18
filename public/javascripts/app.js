/**
 * Created by charles on 16/2/17.
 */
$(document).ready(function(){
    $('.scene-audio').click(function(){
        if($(this).is('.play')) {
            $('#scene_audio')[0].pause();
        } else {
            $('#scene_audio')[0].play();
        }
        $(this).toggleClass('play');
    });

    $('.share').click(function(){
        if(checkIsWeiXin()) {
            $('#popup').show();
        } else {
            Native.openShareDialog();
        }
    });
    $('#popup').click(function(){
        $(this).hide();
    });

    $('#p1').addClass('play');
    $('.wrap').one('click', function(){
        $(this).removeClass('init');
        $('#p1').removeClass('infinite');
        $('.finger,.myInfo').remove();
        $('#scene_audio')[0].play();
        $('.scene-audio').toggleClass('play');
        setTimeout(function () {
            next(1);
        }, 1000);
    });

    var count = $('.point').length;
    function next(index) {
        if (index <= count - 1) {
            var $pre = $($('.point')[index - 1]),
                $target = $($('.point')[index]),
                $text = $($target.data('info')),
                $line = $($target.data('line'));

            $line.addClass('active');
            setTimeout(function(){
                $target.addClass('active play');
                $text.addClass('active');
                if($target.offset().top > $(document).height() / 2) {
                    var main = $('.main');
                    var t = 400;
                    if(index == count - 1) {
                        t = 800;
                    }
                    main.animate({scrollTop: main[0].scrollTop + $target.offset().top - $pre.offset().top + 'px'}, t, function(){
                        if(index == count - 1) {
                            $('.rocket-wrap').addClass('active');
                            $('.ad-text').addClass('active');
                            $('.share').addClass('active')
                        }
                    });
                }
            }, 1000);

            setTimeout(function () {
                index++;
                next(index);
            }, 2500);
        } else {
            $('.main').css('overflow', 'auto');
        }
    }
});
//检查是否微信浏览器
function checkIsWeiXin() {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
    } else {
        return false;
    }
}