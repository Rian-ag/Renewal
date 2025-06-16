$(document).ready(function () {
    /* s:sitemap */
    const $btnHam = $('header .btn_ham');
    const $siteMap = $('header .site_map');
    const $h1_img = $('header h1 img').attr('src');
    let isAnimating = false; // 클릭 잠금 변수

    $btnHam.on('click', function () {
        if (isAnimating) return; // 애니메이션 중이면 클릭 무시
        isAnimating = true;

        if ($btnHam.parent().hasClass('close')) {

            for(let i=0; i<$siteMap.find('li').length; i++){
                setTimeout(function(){
                    $siteMap.find('li').eq(i).removeClass('active');

                    if((i+1) === $siteMap.find('li').length){
                        // 메뉴 닫기
                        $siteMap.removeClass('active').addClass('close');
                        $btnHam.parent().removeClass('close');

                        $('header h1 img').attr('src',$('header h1 img').attr('src').replace('_black.png','.png'));
                    }
                }, (i*300));
            }

            // 애니메이션 종료 대기
            $siteMap.one('animationend webkitAnimationEnd oAnimationEnd', function () {
                $siteMap.removeClass('close');
                isAnimating = false;
            });
        } else {
            // 메뉴 열기
            $siteMap.addClass('active');

            $siteMap.one('animationend webkitAnimationEnd oAnimationEnd', function () {
                isAnimating = false;

                $btnHam.parent().addClass('close');
                $('header h1 img').attr('src',($h1_img.split('.')[0]+'_black.png'));
                // console.log(h1_img_black);

                for(let i=0; i<$siteMap.find('li').length; i++){
                    setTimeout(function(){
                        $siteMap.find('li').eq(i).addClass('active');
                    }, (i*300));
                }
            });
        }
    });
    /* e:sitemap */
});

/* s:hidden menu : go admin */
$(document).on('keydown', function (e) {
    if (e.shiftKey && e.keyCode === 65) {
        if(!$('header').find('#hidden_menu').length){
            $('header').prepend(`<div id="hidden_menu"><a href="/rianag/admin/">
                <strong>[Ticket]</strong>어드민으로 이동하시겠습니까?</a>
                <button>close</button>
            </div>`);
            setTimeout(function(){
                $('#hidden_menu').addClass('active');
            },500);
        }
    }
});

$(function(){
    $('header').delegate('button', 'click', function(){
        $('header').find('#hidden_menu').removeClass('active');
        $('#hidden_menu').one('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function(){
            $('#hidden_menu').remove();
        });
    });
});
/* e:hidden menu : go admin */

/* accordion */
function toggle_slide(_trigger, _wrap) {
    var _target = $(_trigger),
        _openObj = _target.siblings();

    _target.closest(_wrap).hasClass('single') ? // 하나만 오픈
        (
            _target.parent().hasClass('active') ?
            (
                _openObj.stop().slideUp(),
                _target.parent().removeClass('active')
            ) : (
                _target.parent().addClass('active'),
                _target.parent().siblings().removeClass('active'),
                _target.closest(_wrap).find('.'+_openObj.attr('class')).stop().slideUp(),
                _openObj.stop().slideDown()
            )
        ) : ( // 각각 제어
            _target.parent().hasClass('active') ?
            (
                _openObj.stop().slideUp(),
                _target.parent().removeClass('active')
            ) : (
                _target.parent().addClass('active'),
                _openObj.stop().slideDown()
            )
        )
}

/* custom cursor */
function custom_cursor($cursor, $area, isHovering){
    var $cursor = $($cursor),   //cursor 선택자
        $area = $($area),       //cursor 영역
        isHovering = false;

    $area.on('mousemove', function (e) {
        if (isHovering) {
        $cursor.css({
            left: e.clientX + 'px',
            top: e.clientY + 'px'
        });
        }
    });

    $area.on('mouseenter', function () {
        isHovering = true;
        $cursor.css('opacity', 1);
        $(this).addClass('hide-cursor');
    });

    $area.on('mouseleave', function () {
        isHovering = false;
        $cursor.css('opacity', 0);
        $(this).removeClass('hide-cursor');
    });    
}
