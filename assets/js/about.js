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

    /* gsap  */
        // .about_visual을 pin 하고 이후 콘텐츠가 올라오는 구조
    ScrollTrigger.create({
        trigger: ".wrap", // 전체 감싸는 요소
        start: "top top",
        end: "+=400%", // 필요에 따라 조정
        pin: ".about_visual",
        pinSpacing: false,
        scrub: false
    });

    const moVision = document.querySelector('.mo_vision');
    if (moVision) {
      gsap.fromTo(moVision,
        {
          opacity: 0,
          transform: 'translate3d(0, 100px, 0)'
        },
        {
          scrollTrigger: {
            trigger: moVision,
            start: 'top 80%',
            toggleActions: 'play none none none',
            // markers: true
          },
          opacity: 1,
          transform: 'translate3d(0, 0, 0)',
          duration: 1.2,
          ease: 'power2.out'
        }
      );
    }

    gsap.timeline({
        scrollTrigger:{
            trigger:'.about_vision .one',
            start:'top 90%',
            end:'50% 100%',
            toggleActions: 'play none none none',
            // markers:true,
        }
    })
    .to('.about_vision .one dd strong',{y:'0px', duration:1, ease:'none', opacity:1},0.2)

    gsap.timeline({
        scrollTrigger:{
            trigger:'.about_vision .two',
            start:'20% 90%',
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
            trigger:'.wrap > p > img',
            start:'top 90%',
            end:'50% 100%',
            toggleActions: 'play none none none',
            // markers:true,
        }
    })
  gsap.timeline({
    scrollTrigger: {
      trigger: '.wrap > p > img',
      start: 'top 90%',
      end: 'bottom 60%', // 애니메이션 범위 조정 가능
      toggleActions: 'play none none none',
      // markers: true,
    }
})
.to('.wrap > p > img', {clipPath: 'inset(0% 0%)', y: 0,opacity: 1,duration: 1, ease: 'power2.out'}, 0.2);

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
      start: 'top 85%', // 모바일 대응 start 위치 조정
      once: true,
      onEnter: () => {
        gsap.to({ val: 0 }, {
          val: endValue,
          duration: 0.5 + endValue * 0.2,
          ease: 'power1.out',
          snap: 'val',
          onUpdate: function () {
            $el.text(this.targets()[0].val);
          }
        });
      }
    });
  });

let animated = false;

function runPartnerAnimation() {
    if (animated) return;

    const $section = $('.about_partners');
    const sectionTop = $section.offset().top;
    const scrollBottom = $(window).scrollTop() + $(window).height() * 0.7;

    // 영역 진입 시 실행
    if (scrollBottom > sectionTop) {
        animated = true;

        // 모바일 or PC 리스트 중 현재 보이는 것만 animate
        const $visibleList = $('.about_partners .pc_list:visible li, .about_partners .mo_list:visible li');

        $visibleList.each(function (i) {
            const that = $(this);
            setTimeout(() => {
                that.addClass('animate');
            }, i * 150); // 순차적 실행
        });
    }
}

// scroll과 resize에 바인딩
$(window).on('scroll resize orientationchange', runPartnerAnimation);

// 페이지 로딩 직후도 확인 (모바일 주소창 숨김 전 대응)
$(document).ready(runPartnerAnimation);

  /* about_partners hover 이벤트 */
    $('.about_partners li img').each(function () {
    const $img = $(this);
    const originalSrc = $img.attr('src');
    let onSrc;

    // PC용 이미지 처리
    const pcMatch = originalSrc.match(/(Frame\s?\d+)(\.png)/);
    if (pcMatch) {
      const baseName = pcMatch[1];
      const extension = pcMatch[2];
      onSrc = originalSrc.replace(baseName + extension, baseName + ' on' + extension);
    }

    // 모바일용 이미지 처리
    const moMatch = originalSrc.match(/\/(\d+)(\.png)/);
    if (!onSrc && moMatch) {
      const number = moMatch[1];
      const extension = moMatch[2];
      onSrc = originalSrc.replace(number + extension, number + ' on' + extension);
    }

    // 이벤트 등록
    if (onSrc) {
      // PC: hover
      $img.on('mouseenter', function () {
        $(this).stop().fadeOut(150, function () {
          $(this).attr('src', onSrc).fadeIn(150);
        });
      });

      $img.on('mouseleave', function () {
        $(this).stop().fadeOut(150, function () {
          $(this).attr('src', originalSrc).fadeIn(150);
        });
      });

      // Mobile: touchstart / touchend 대응
      $img.on('touchstart', function () {
        $(this).attr('src', onSrc);
      });

      $img.on('touchend touchcancel', function () {
        $(this).attr('src', originalSrc);
      });
    }
  });

  setTimeout(() => {
    ScrollTrigger.refresh(); // 레이아웃/사이즈 변경 이후 재계산
  }, 300);

});

