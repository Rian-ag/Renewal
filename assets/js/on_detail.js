$(function () {
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

  $(window).on('load resize', initSwiper);

  gsap.registerPlugin(ScrollTrigger);

  // ✅ 페이지 진입 시 scale 애니메이션 + 이후 pin
if (!isMobile()) {
  const viewHeight = window.innerHeight;

  // 초기 스케일 설정
  gsap.set(".detail_visual > img", {
    scale: 1.5,
    transformOrigin: "center center"
  });

  // 이미지 스케일 애니메이션
  gsap.to(".detail_visual > img", {
    scale: 1,
    duration: 4,
    ease: "power3.out",
    onComplete: function () {
      // ScrollTrigger pin 처리 (부모 .detail_visual 기준으로 고정)
      ScrollTrigger.create({
        trigger: ".detail_visual",
        start: "top top",
        end: `+=${viewHeight}`,
        pin: true,
        pinSpacing: false
      });

      // 배경 Parallax (parallax-bg가 있을 경우)
      gsap.to(".parallax-bg", {
        y: -200,
        ease: "none",
        scrollTrigger: {
          trigger: ".detail_visual",
          start: "top top",
          end: `+=${viewHeight}`,
          scrub: true
        }
      });

      // 텍스트 Parallax
      gsap.to(".detail_visual .cont_inner", {
        y: -100,
        ease: "none",
        scrollTrigger: {
          trigger: ".detail_visual",
          start: "top top",
          end: `+=${viewHeight}`,
          scrub: true
        }
      });
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

  // 1.6초 후 전체 애니메이션 시작
  setTimeout(() => {
    $('.detail_visual li span').each(function (index) {
      // index마다 순차적으로 active 부여 (0.8초 간격)
      setTimeout(() => {
        $(this).addClass('active');
      }, index * 800); 
    });
  }, 1600);
});
