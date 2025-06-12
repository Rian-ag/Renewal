$(document).ready(function () {
    /* s:sitemap */
    const $btnHam = $('header .btn_ham');
    const $siteMap = $('header .site_map');
    let isAnimating = false; // 클릭 잠금 변수

    $btnHam.on('click', function () {
        if (isAnimating) return; // 애니메이션 중이면 클릭 무시
        isAnimating = true;

        if ($btnHam.hasClass('close')) {

            for(let i=0; i<$siteMap.find('li').length; i++){
                setTimeout(function(){
                    $siteMap.find('li').eq(i).removeClass('active');

                    if((i+1) === $siteMap.find('li').length){
                        // 메뉴 닫기
                        $siteMap.removeClass('active').addClass('close');
                        $btnHam.removeClass('close');
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

                $btnHam.addClass('close');

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

/* 텍스트 줄바꿈 노출 인터렉션 */
function splitTextByLine(text, $container) {

    $container.empty();

    // container의 스타일을 복사한 tempContainer 생성
    const $tempContainer = $container
        .clone()
        .css({
            overflow:'hidden',
            height: 0
        })
        .addClass('tempContainer')
        .prependTo($container.parent());

    let currentTop = null;
    let currentLine = '';

    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const $span = $(`<span>${char}</span>`);
        $tempContainer.append($span);

        const top = $span.position().top;

        $span.attr('data-top',top);

        console.log('a : ', i, `"${char}"`, ' / top:', top); // ← 줄바꿈 추적용

        if (currentTop === null) {
            currentTop = top;
        }

        if (top === currentTop) {
            currentLine += char;
        } else {
            $container.append(`<div>${currentLine}</div>`);
            currentLine = char;
            currentTop = top;
        }
    }

    // 마지막 줄 추가
    if (currentLine !== '') {
        $container.append(`<div>${currentLine}</div>`);
    }

    $tempContainer.remove();
}
