$(function () {
    let swiper = null;
    let fullpageInstance = null;

    function isMobile() {
        return $(window).width() <= 768 || window.location.hostname.indexOf('m.') !== -1;
    }

    function initSwiper() {
        swiper = new Swiper('.on_list_swiper .swiper-container', {
            slidesPerView: 1,
            spaceBetween: 0,
            keyboard: { enabled: true },
            pagination: {
                el: '.on_list_swiper .swiper-pagination',
                type: 'fraction',
            },
        });
        swiper.update(); // 슬라이드 높이 계산 보정
    }

    function destroySwiper() {
        if (swiper) {
            swiper.destroy(true, true);
            swiper = null;
        }
    }

    function initFullpage() {
        fullpageInstance = $('#section_wrap').simpleFullpage({
            duration: 800,
            easing: 'ease',
            parallax: true,
            keyboard: true,
            touch: true,
            navigation: false,
        });
    }

    function destroyFullpage() {
        if (fullpageInstance) {
            fullpageInstance.destroy();
            fullpageInstance = null;
        }
    }

    function handleLayout() {
        if (isMobile()) {
            destroyFullpage();
            if (!swiper) initSwiper();
        } else {
            destroySwiper();
            if (!fullpageInstance) initFullpage();
        }
    }

    handleLayout();
    $(window).on('resize', handleLayout);
});
