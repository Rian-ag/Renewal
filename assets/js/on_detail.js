$(function(){

  let swiperInstance;

  function isMobileCondition () {
    return window.innerWidth <= 768 || window.location.hostname.includes('m.');
  }

  function resetSlideInlineStyle () {
    $('.on_detail_swiper .swiper-slide').each(function () {
      this.removeAttribute('style');           // Swiper 가 남긴 width, height 제거
    });
  }

  function initSwiper () {
    // 1) 기존 인스턴스 파괴
    if (swiperInstance) swiperInstance.destroy(true, true);

    // 2) 슬라이드 폭 초기화
    resetSlideInlineStyle();

    // 3) 새 인스턴스 생성
    const mobile = isMobileCondition();
    swiperInstance = new Swiper('.on_detail_swiper .on_detail.swiper-container', {
      direction      : mobile ? 'horizontal' : 'vertical',
      slidesPerView  : mobile ? 3 : 3.5,      // ← 모바일에서 3장만 보이게
      spaceBetween   : 8,
      grabCursor     : true,
      simulateTouch  : true,
      touchRatio     : 1,
    });
  }

  // 최초 & 리사이즈
  $(window).on('load resize', initSwiper);
    /* gsap */
    gsap.registerPlugin(ScrollTrigger);

    if(!isMobileCondition()){
     ScrollTrigger.create({
      trigger: ".detail_visual",
      start: "top top",
      end: "+=930",
      pin: true,
      pinSpacing: false,
      markers: false
        });
    } else {
        // ✅ 모바일일 경우 아무 것도 하지 않음
        console.log("모바일 환경이므로 ScrollTrigger를 적용하지 않음");
    }

    $('section .cont_inner > ul > li').each(function (i, el) {
      const spans = $(el).find('p span');

      gsap.fromTo(spans,
        {
          y: 200,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "50% 70%",
            end: '100% 90%',
            toggleActions: "play none none none",
            // markers: true,
          }
        }
      );
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