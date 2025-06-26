$(function () {
  var swiper;

  function isMobileWidth() {
    return $(window).width() <= 768;
  }

  function isMobileDomain() {
    return window.location.hostname.indexOf('m.') !== -1;
  }

  // Swiper 초기화 (✅ Lazy Load 옵션 추가)
  function initSwiper() {
    swiper = new Swiper('.on_list_swiper .on_list.swiper-container', {
      slidesPerView: 1.2,
      spaceBetween: 30,
      keyboard: {
        enabled: true,
      },
      pagination: {
        el: '.on_list_swiper .swiper-pagination',
        type: 'fraction',
      },
      lazy: {
        loadPrevNext: true,
        loadOnTransitionStart: true,
      },
      watchSlidesProgress: true,
      watchSlidesVisibility: true,
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
      if (!swiper) initSwiper();
    } else {
      destroySwiper();
    }
  }

  // 최초 실행
  handleSwiper();

  // 화면 리사이즈 대응
  $(window).on('resize', function () {
    handleSwiper();
  });

function fadeInOnScroll(selector, options = {}, callback) {
  const {
    offset = 0.7,
    translateY = 100,
    duration = 600,
    stagger = 150,
    extraTargetSelector = null,
  } = options;

  const $elements = $(selector);
  let allAnimated = false;

  $elements.css({
    opacity: 0,
    transform: `translateY(${translateY}px)`
  });

  function checkAndAnimate() {
    if (allAnimated) return;

    let allDone = true;

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

          // 마지막 요소가 애니메이션 완료되면 콜백 호출
          if (i === $elements.length - 1) {
            setTimeout(() => {
              if (typeof callback === 'function') callback();
            }, duration);
          }
        }, i * stagger);
      } else {
        allDone = false;
      }
    });

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
        } else {
          allDone = false;
        }
      });
    }

    if (allDone) {
      allAnimated = true;
    }
  }

  $(window).on('scroll resize', checkAndAnimate);
  $(document).ready(checkAndAnimate);
  
}

fadeInOnScroll('.cont_inner > p > strong', {
  stagger: 100,
  duration: 1000
}, function () {
  $('.visual_cont div p span').each(function (i) {
    const $el = $(this);
    setTimeout(() => {
      $el.addClass('animated');
    }, i * 200); // 원하는 간격으로 조정
  });
});


});
