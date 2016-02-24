/**
 * Created by charles on 16/2/17.
 */
$(document).ready(function(){

    //是否从APP打开
    var fromApp = window.location.search.indexOf('from=agent') >= 0;
    if(fromApp) {
        Native.configShare({
            title: title,
            desc: desc,
            link: link,
            imgUrl: imgUrl
        });
    } else {
        $('.share').hide();
        $('.wrap').height(1802);
    }

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
    $('.main').one('touchstart', function(){
        $('.wrap').removeClass('init');
        $('#p1').removeClass('infinite');
        $('.myInfo').fadeOut();
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
            var t1 = 400, t2 = 2500;
            if(index == count - 1) {
                t1 = 1800;
            }
            if(index == count - 2) {
                t2 = 3500;
            }
            setTimeout(function(){
                $target.addClass('active play');
                setTimeout(function(){
                    $text.fadeIn(750);
                }, 1000);
                if($target.offset().top > $(document).height() / 2) {
                    var main = $('.main');
                    main.animate({scrollTop: main[0].scrollTop + $target.offset().top - $pre.offset().top + 'px'}, t1, function(){
                        if(index == count - 1) {
                            $('.ad-text').addClass('active');
                            $('.share').addClass('active');
                        }
                    });
                }
            }, 1000);

            setTimeout(function () {
                next(index + 1);
            }, t2);
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