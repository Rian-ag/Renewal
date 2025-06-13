  $(function () {
    var swiper;

    // 모바일 조건 1: 화면 너비 768px 이하
    function isMobileWidth() {
      return $(window).width() <= 768;
    }

    // 모바일 조건 2: URL에 m. 도메인 포함
    function isMobileDomain() {
      return window.location.hostname.indexOf('m.') !== -1;
    }

    // Swiper 초기화
    function initSwiper() {
      swiper = new Swiper('.on_list_swiper .on_list.swiper-container', {
        slidesPerView: 1.2,
        spaceBetween: 30,
        keyboard: {
          enabled: true,
        },
        pagination: {
          el: '.on_list_swiper .swiper-pagination',
          clickable: true,
        }
      });
      console.log('Swiper initialized');
    }

    // Swiper 제거
    function destroySwiper() {
      if (swiper && typeof swiper.destroy === 'function') {
        swiper.destroy(true, true);
        swiper = null;
        console.log('Swiper destroyed');
      }
    }

    // 조건에 따라 Swiper 생성/제거
    function handleSwiper() {
      if (isMobileWidth() || isMobileDomain()) {
        if (!swiper) initSwiper(); // 조건에 맞으면 초기화
      } else {
        destroySwiper(); // 아니면 제거
      }
    }

    // 최초 실행
    handleSwiper();

    // 화면 리사이즈 대응
    $(window).on('resize', function () {
      handleSwiper();
    });


    /* 텍스트애니메이션 function화 */
    function fadeInOnScroll(selector, options = {}) {
        const {
            offset = 0.7, // 화면의 하단 70% 지점에서 트리거
            translateY = 100,
            duration = 600,
            stagger = 150,
            extraTargetSelector = null, // 추가 타겟 (ex. '.about_awards dd > p')
        } = options;

        const $elements = $(selector);

        $elements.css({
            opacity: 0,
            transform: `translateY(${translateY}px)`
        });

        function checkAndAnimate() {
            $elements.each(function (i) {
            const $el = $(this);
            if ($el.hasClass('animated')) return;

            const triggerOffset = $(window).scrollTop() + $(window).height() * offset;
            if ($el.offset().top < triggerOffset) {
                setTimeout(() => {
                $el.css({
                    opacity: 1,
                    transform: 'translateY(0)',
                    transition: `all ${duration}ms ease-out`
                }).addClass('animated');
                }, i * stagger);
            }
            });

            // 추가 대상이 있다면 함께 애니메이션 적용
            if (extraTargetSelector) {
            $(extraTargetSelector).each(function (j) {
                const $extra = $(this);
                if ($extra.hasClass('animated')) return;

                const triggerOffset = $(window).scrollTop() + $(window).height() * offset;
                if ($extra.offset().top < triggerOffset) {
                setTimeout(() => {
                    $extra.css({
                    opacity: 1,
                    transform: 'translateY(0)',
                    transition: `all ${duration}ms ease-out`
                    }).addClass('animated');
                }, j * (stagger / 2));
                }
            });
            }
        }

        $(window).on('scroll resize', checkAndAnimate);
        $(document).ready(checkAndAnimate);
    }

    fadeInOnScroll('.cont_inner > p > strong', {
        stagger: 100,
        duration: 1000 // 각 요소의 애니메이션 지속 시간
    });


gsap.registerPlugin(ScrollTrigger);

// 1. 텍스트 분해
const $text = $('.visual_cont > div > p');
const originalText = $text.text().trim();
const splitText = originalText.split('').map(char => {
  const safeChar = char === ' ' ? '&nbsp;' : char;
  return `<span style="display:inline-block;">${safeChar}</span>`;
}).join('');
$text.html(splitText);
$text.css('opacity', 1); // 부모 p를 보이게 처리

// 2. 1초 지연 후 애니메이션 실행
setTimeout(function () {
  const chars = $('.visual_cont > div > p span');

  gsap.fromTo(chars,
    {
      y: -100,
      opacity: 0,
      rotation: -20,
    },
    {
      y: 0,
      opacity: 1,
      rotation: 0,
      ease: "bounce.out",
      duration: 1.2,
      stagger: 0.05,
    }
  );
}, 1500); // 1초 후 실행

});