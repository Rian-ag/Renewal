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