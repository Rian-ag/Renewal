$(function(){

    function isMobileCondition() {
        const isMobileWidth = window.innerWidth <= 768;
        const hasMobileDomain = window.location.hostname.includes('m.');
        return isMobileWidth || hasMobileDomain;
    }

    const swiper = new Swiper('.on_detail_swiper .on_detail.swiper-container', {
      direction: isMobileCondition() ? 'horizontal' : 'vertical',
      slidesPerView: isMobileCondition() ? 4 : 3.5,
      spaceBetween: 8,
      mousewheel: true,
    });

    /* gsap */
    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.create({
        trigger: ".detail_visual",
        start: "top top",
        end: "+=930", // 고정 영역 높이만큼W
        pin: true,     // pin 고정
        pinSpacing: false, // 고정 후 공간 안 생기게
        markers: false // 디버그용 (원할 경우 true로)
    });

    $('.detail_visual em').each(function (index) {
        const delay = 200 + (index * 400);
            setTimeout(() => {
                $(this).addClass('active');
        }, delay);
    });

    $('.detail_visual li span').each(function (index) {
        const delay = 500 + (index * 400);
            setTimeout(() => {
                $(this).addClass('active');
        }, delay);
    });



})//fn