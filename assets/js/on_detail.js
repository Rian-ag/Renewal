$(function(){
      let swiperInstance;

      function isMobile() {
        return window.innerWidth <= 768 || window.location.hostname.includes('m.');
      }

      function resetSlideStyle() {
        $('.on_detail_swiper .swiper-slide').removeAttr('style');
      }

      function initSwiper() {
        if (swiperInstance) swiperInstance.destroy(true, true);
        resetSlideStyle();

        swiperInstance = new Swiper('.on_detail.swiper-container', {
          direction: isMobile() ? 'horizontal' : 'vertical',
          slidesPerView: isMobile() ? 3 : 3.5,
          spaceBetween: 8,
          grabCursor: true,
          simulateTouch: true,
        });
      }

      // Swiper 적용
      $(window).on('load resize', initSwiper);

      // ScrollTrigger
      gsap.registerPlugin(ScrollTrigger);

      // 배경 패럴렉스 효과
if (!isMobile()) {
  // .detail_visual pin (fixed처럼 고정됨)
  ScrollTrigger.create({
    trigger: ".detail_visual",
    start: "top top",
    end: "+=930", // 고정 길이
    pin: true,
    pinSpacing: false, // ✅ 공간 없이 겹치게!
  });

  // 배경 이미지 parallax
  gsap.to(".parallax-bg", {
    y: -200,
    ease: "none",
    scrollTrigger: {
      trigger: ".detail_visual",
      start: "top top",
      end: "+=930",
      scrub: true
    }
  });

  // 텍스트도 패럴렉스
  gsap.to(".detail_visual .cont_inner", {
    y: -100,
    ease: "none",
    scrollTrigger: {
      trigger: ".detail_visual",
      start: "top top",
      end: "+=930",
      scrub: true
    }
  });
}


      // 시계 텍스트 업데이트
      const updateTime = () => {
        const now = new Date();
        const time = now.toLocaleTimeString('ko-KR', { hour12: false });
        $('dt div strong').text(time);
      };
      updateTime();
      setInterval(updateTime, 1000);

      // 시각적 강조 애니메이션
      $('.detail_visual em').each(function (index) {
        setTimeout(() => {
          $(this).addClass('active');
        }, 200 + (index * 400));
      });

      $('.detail_visual li span').each(function (index) {
        setTimeout(() => {
          $(this).addClass('active');
        }, 500 + (index * 400));
      });

})//fn