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
            $header.css({ 'z-index': '999' });
        } else {
            $header.css('z-index', '')
        }
    };

    $btnHam.on('click', function () {
        if (isAnimating) return;
        isAnimating = true;

        const isType2 = $header.hasClass('type2');
        const isType3 = $header.hasClass('type3');

        if ($btnHam.parent().hasClass('close')) {
            // 닫히는 애니메이션
            for (let i = 0; i < $siteMap.find('li').length; i++) {
                setTimeout(function () {
                    $siteMap.find('li').eq(i).removeClass('active');

                    if ((i + 1) === $siteMap.find('li').length) {
                        $siteMap.removeClass('active').addClass('close');
                        $btnHam.parent().removeClass('close');

                        // 📌 .type2: 로고 복원 / .type3: opacity 0
                        if (isType2) {
                            $('header h1 img').attr('src', '/assets/images/common/h1_logo_black.png');
                        } else {
                            $('header h1 img').attr('src', $h1_img.replace('_black.png', '.png'));
                        }

                        if (isType3) {
                            $('header h1 img').css('opacity', '0');
                        }

                        updateHeaderZIndex();
                    }
                }, i * 300);
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
            // 열리는 애니메이션
            $siteMap.addClass('active');
            updateHeaderZIndex();

            $siteMap.one('animationend webkitAnimationEnd oAnimationEnd', function () {
                isAnimating = false;

                $btnHam.parent().addClass('close');

                if (isType2) {
                    $('header h1 img').attr('src', '/assets/images/common/h1_logo_black.png');
                } else {
                    $('header h1 img').attr('src', ($h1_img.split('.')[0] + '_black.png'));
                }

                if (isType3) {
                    $('header h1 img').css('opacity', '1'); // ✅ 애니메이션 끝난 후 opacity 적용
                }

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
