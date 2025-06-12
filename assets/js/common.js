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
