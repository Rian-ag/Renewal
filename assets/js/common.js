$(document).ready(function () {
    /* s:sitemap */
    const $btnHam = $('header .btn_ham');
    const $siteMap = $('header .site_map');
    const $h1_img = $('header h1 img').attr('src');
    const $footer = $('#bottom');
    const $header = $('header');
    let isAnimating = false; // 클릭 잠금 변수

    // 📌 header z-index 조절 함수
    const updateHeaderZIndex = () => {
        if ($siteMap.hasClass('active')) {
            $header.css('z-index', '999');
        } else {
            $header.css('z-index', '');
        }
    };

    $btnHam.on('click', function () {
        if (isAnimating) return;
        isAnimating = true;

        if ($btnHam.parent().hasClass('close')) {
            for (let i = 0; i < $siteMap.find('li').length; i++) {
                setTimeout(function () {
                    $siteMap.find('li').eq(i).removeClass('active');

                    if ((i + 1) === $siteMap.find('li').length) {
                        $siteMap.removeClass('active').addClass('close');
                        $btnHam.parent().removeClass('close');
                        $('header h1 img').attr('src', $('header h1 img').attr('src').replace('_black.png', '.png'));

                        updateHeaderZIndex(); // 📌 z-index 복구
                    }
                }, (i * 300));
            }

            $siteMap.one('animationend webkitAnimationEnd oAnimationEnd', function () {
                $siteMap.removeClass('close');
                isAnimating = false;
            });

            setTimeout(function () {
                $siteMap.find('.bottom').removeClass('active');
                $siteMap.find('.bottom').children().removeClass('active');
            }, 1000);
        } else {
            $siteMap.addClass('active');
            updateHeaderZIndex(); // 📌 z-index 999 설정

            $siteMap.one('animationend webkitAnimationEnd oAnimationEnd', function () {
                isAnimating = false;

                $btnHam.parent().addClass('close');
                $('header h1 img').attr('src', ($h1_img.split('.')[0] + '_black.png'));

                for (let i = 0; i < $siteMap.find('li').length; i++) {
                    setTimeout(function () {
                        $siteMap.find('li').eq(i).addClass('active');

                        if ((i + 1) === $siteMap.find('li').length) {
                            const $bottomChildren = $siteMap.find('.bottom').children();
                            $bottomChildren.each(function (j) {
                                setTimeout(() => {
                                    $(this).addClass('active');
                                }, 300);
                            });
                        }
                    }, i * 300);
                }
            });
        }
    });
    /* e:sitemap */
});
