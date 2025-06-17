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
      if (!isMobile()) {
        ScrollTrigger.create({
          trigger: ".detail_visual",
          start: "top top",
          end: "+=930",
          pin: true,
          pinSpacing: false,
        });
      }

      // 텍스트 애니메이션
      $('section .cont_inner > ul > li').each(function (i, el) {
        const spans = $(el).find('p span');
        gsap.fromTo(spans,
          { y: 200, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.4,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "50% 70%",
              end: "100% 90%",
              toggleActions: "play none none none",
            }
          }
        );
      });

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