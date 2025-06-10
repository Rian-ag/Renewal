 gsap.registerPlugin(ScrollTrigger)

$(document).ready(function () {
    /* 스와이퍼 */
    var option_sec03 = {
        slidesPerView: 4.5,
        spaceBetween:10,
        keyboard: {
            enabled: true,
        },
    };
    var swiper = new Swiper('.about_swiper .visual.swiper-container', option_sec03);

    /* gsap path 이벤트 */
    // const paths = document.querySelectorAll('path');

    // paths.forEach((path, i) => {
    //     const length = path.getTotalLength();
    //     path.style.stroke = "white";
    //     path.style.strokeWidth = "2";
    //     path.style.fill = "none";

    //     gsap.set(path, {
    //         strokeDasharray: length,
    //         strokeDashoffset: length
    //     });

    //     gsap.to(path, {
    //         strokeDashoffset: 0,
    //         duration: 2,
    //         delay: i * 0.3,
    //         ease: "power2.out",
    //         onComplete: () => {
    //         gsap.to(path, {
    //             fill: "white",
    //             duration: 0.5,
    //             ease: "power1.inOut"
    //         });
    //         }
    //     });
    // });
      const allPaths = document.querySelectorAll('svg path');
      let master = gsap.timeline({ defaults: { ease: "power1.inOut" } });

      allPaths.forEach((path, i) => {
          const length = path.getTotalLength();
          gsap.set(path, {
              strokeDasharray: length,
              strokeDashoffset: length,
              fill: 'rgba(255, 255, 255, 0)'
          });

          const tl = gsap.timeline();

          // 붓글씨처럼 stroke와 fill이 동시에 나타나는 효과
          tl.to(path, {
              strokeDashoffset: 0,
              fill: 'rgba(255, 255, 255, 1)',
              duration: 1.4,
              ease: "power2.inOut"
          });

          master.add(tl);
      });


    /* gsap 이벤트 */
    gsap.timeline({
        scrollTrigger:{
            trigger:'.about_vision h2',
            start:'top 90%',
            end:'50% 100%',
            toggleActions: 'play none none none',
            // markers:true,
        }
    })
    .to('.about_vision h2 p:nth-child(1)',{y:'0px', duration:1, ease:'none', opacity:1},0.2)
    .to('.about_vision h2 p:nth-child(2)',{y:'0px', duration:1, ease:'none', opacity:1},0.4)
    .to('.about_vision h2 p:nth-child(3)',{y:'0px', duration:1, ease:'none', opacity:1},0.6)

    gsap.timeline({
        scrollTrigger:{
            trigger:'.about_vision .one',
            start:'top 90%',
            end:'50% 100%',
            toggleActions: 'play none none none',
            // markers:true,
        }
    })
    .to('.about_vision .one dd',{x:'0px', duration:1, ease:'none', opacity:1},0.2)

    gsap.timeline({
        scrollTrigger:{
            trigger:'.about_vision .two',
            start:'top 90%',
            end:'90% 100%',
            toggleActions: 'play none none none',
            // markers:true,
        }
    })
    .to('.about_vision .two dd dl:nth-child(1)',{duration:1, ease:'none', opacity:1},0.2)
    .to('.about_vision .two dd dl:nth-child(2)',{duration:1, ease:'none', opacity:1},0.4)
    .to('.about_vision .two dd dl:nth-child(3)',{duration:1, ease:'none', opacity:1},1)
    .to('.about_vision .two dd dl:nth-child(4)',{duration:1, ease:'none', opacity:1},1.2)


    gsap.timeline({
        scrollTrigger:{
            trigger:'.wrap > img',
            start:'top 90%',
            end:'50% 100%',
            toggleActions: 'play none none none',
            // markers:true,
        }
    })
    .to('.wrap > img',{y:'0px', duration:1, ease:'none', opacity:1},0.2)

/* count evetn */
  const $targets = $('.about_swiper .swiper-slide strong');
  const values = [8, 2, 1, 1, 1, 3]; // 각 strong 요소의 목표값

  $targets.each(function (index, element) {
    const $el = $(element);
    const endValue = values[index];

    // 초기값
    $el.text('0');

    ScrollTrigger.create({
      trigger: '.about_awards',
      start: '50% 80%',
      once: true,
      onEnter: () => {
        gsap.to({ val: 0 }, {
          val: endValue,
          duration: 0.5 + endValue * 0.2, // 값이 클수록 duration을 늘림
          ease: 'power1.out',
          snap: 'val', // 자연스러운 정수 변화
          onUpdate: function () {
            $el.text(this.targets()[0].val);
          }
        });
      }
    });
  });

  const $cursor = $('.about_swiper .custom-cursor');
  const $area = $('.about_swiper');
  let isHovering = false;

  $(document).on('mousemove', function (e) {
    if (isHovering) {
      $cursor.css({
        left: e.clientX + 'px',
        top: e.clientY + 'px'
      });
    }
  });

  $area.on('mouseenter', function () {
    isHovering = true;
    $cursor.css('opacity', 1);
    $(this).addClass('hide-cursor');
  });

  $area.on('mouseleave', function () {
    isHovering = false;
    $cursor.css('opacity', 0);
    $(this).removeClass('hide-cursor');
  });

    // let triggered = false;

    // ScrollTrigger.create({
    //     trigger: ".about_partners",
    //     start: "top 80%",
    //     once: true, // 스크롤 한 번만 작동
    //     onEnter: function () {
    //         if (triggered) return;
    //         triggered = true;

    //         $(".about_partners ul li").each(function (index) {
    //             gsap.fromTo($(this), 
    //                 { opacity: 0, y: 50 }, 
    //                 {
    //                     opacity: 1,
    //                     y: 0,
    //                     duration: 0.6,
    //                     ease: "bounce.out",
    //                     delay: index * 0.1
    //                 }
    //             );
    //         });
    //     }
    // });

    // let triggered = false;

    // ScrollTrigger.create({
    //     trigger: ".about_partners",
    //     start: "top 80%",
    //     once: true,
    //     onEnter: function () {
    //         if (triggered) return;
    //         triggered = true;

    //         $(".about_partners ul li").each(function (index) {
    //             gsap.fromTo($(this),
    //                 { opacity: 0, y: 0 },
    //                 {
    //                     opacity: 1,
    //                     keyframes: [
    //                         { y: 0, opacity: 0, offset: 0 },
    //                         { y: -20, opacity: 1, offset: 0.2 },  // 튕김 상단
    //                         { y: 10, offset: 0.4 },               // 아래로 반동
    //                         { y: -6, offset: 0.6 },               // 작은 튕김
    //                         { y: 3, offset: 0.8 },                // 마지막 미세 반동
    //                         { y: 0, offset: 1 }                   // 정착
    //                     ],
    //                     duration: 0.8,
    //                     delay: index * 0.5,
    //                     ease: "power1.out"
    //                 }
    //             );
    //         });
    //     }
    // });

        let animated = false;

    $(window).on('scroll', function () {
        if (animated) return;

        let triggerPos = $('.about_partners').offset().top;
        let scrollPos = $(window).scrollTop() + $(window).height() * 0.6; // 70% = 30% 진입

        if (scrollPos > triggerPos) {
            animated = true;

            $('.about_partners ul li').each(function (index) {
                let that = $(this);
                setTimeout(function () {
                    that.addClass('animate');
                }, index * 150); // 0.1초 간격으로 순차 실행
            });
        }
    });



    const $scroll = $('.about_visual .custom-cursor');
    const $target = $('.about_visual');
    let isHover = false;

  $(document).on('mousemove', function (e) {
    if (isHover) {
      $scroll.css({
        left: e.clientX + 'px',
        top: e.clientY + 'px'
      });
    }
  });

  $target.on('mouseenter', function () {
    isHover = true;
    $scroll.css('opacity', 1);
    $(this).addClass('hide-cursor');
  });

  $target.on('mouseleave', function () {
    isHover = false;
    $scroll.css('opacity', 0);
    $(this).removeClass('hide-cursor');
  });



});

