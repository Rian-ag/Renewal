$(document).ready(function () {
 $('body').removeClass('fadeout').addClass('fadein');
  /* s:lazyload */
  lazyLoads();
  /* e:lazyload */
  

    /* header스크롤 */
    initHeaderScrollToggle();

    // ✅ Lenis 전체 공통 적용
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true,
        smoothTouch: false,
    });

    // 다른 페이이지에서 제어
    window.lenis = lenis;

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 예: 로고 클릭 시
    $('h1 img').on('click', function (e) {
        e.preventDefault(); // 새로고침 방지
        const targetUrl = '/'; // 이동할 URL

        $('body').removeClass('fadein').addClass('fadeout');

        setTimeout(function () {
            window.location.href = targetUrl;
        }, 500); // transition 시간과 동일하게
    });

    // 모든 a 태그 클릭 시 페이드 아웃 처리
    $('a[href]:not([href^="#"]):not([target="_blank"])').on('click', function (e) {
        const href = $(this).attr('href');

        // 자바스크립트 링크는 제외
        if (href === 'javascript:void(0);' || href.startsWith('javascript:')) return;

        e.preventDefault(); // 즉시 이동 막기
        $('body').removeClass('fadein').addClass('fadeout');

        setTimeout(function () {
            window.location.href = href;
        }, 500); // transition 시간과 동일
    });

    // ✅ 현재 페이지 메뉴 자동 강조 (일반화)
    const currentPath = window.location.pathname.replace(/\/$/, '');
    $('.site_map a').each(function () {
        const href = $(this).attr('href').replace(/\/$/, '');
        if (href === currentPath) {
            $(this).find('.dash').addClass('on current');
        }
    });

    // ✅ hover 시 .on 추가 / 마우스 벗어날 때 .current 아니면 제거
    $('.site_map li').hover(
        function () {
            $(this).find('.dash').addClass('on');
        },
        function () {
            const $dash = $(this).find('.dash');
            if (!$dash.hasClass('current')) {
                $dash.removeClass('on');
            }
        }
    );

    /* s:sitemap */
    $('header').each(function () {
        const $header = $(this);
        const $btnHam = $header.find('.btn_ham');
        const $siteMap = $header.find('.site_map');
        const $logo = $header.find('h1 img');
        const originalLogoSrc = $logo.attr('src');
        let isAnimating = false;

        const updateHeaderZIndex = () => {
            if ($siteMap.hasClass('active')) {
                $header.css({ zIndex: '999' });
            } else {
                $header.css('z-index', '');
            }
        };

        $btnHam.on('click', function () {
            if (isAnimating) return;
            isAnimating = true;

            const isType2 = $header.hasClass('type2');
            const isType3 = $header.hasClass('type3');
            const isWhite = $header.hasClass('white');

            if ($btnHam.parent().hasClass('close')) {
                // 닫힘 처리
                const $items = $siteMap.find('li');

                $items.each(function (i) {
                    setTimeout(() => {
                        $(this).removeClass('active');

                        if (i === $items.length - 1) {
                            $siteMap.removeClass('active').addClass('close');
                            $btnHam.parent().removeClass('close');

                            if (isType2 && isWhite) {
                                $logo.attr('src', originalLogoSrc);
                            } else if (isType2) {
                                $logo.attr('src', '/assets/images/common/h1_logo_black.png');
                            } else {
                                $logo.attr('src', originalLogoSrc.replace('_black.png', '.png'));
                            }

                            if (isType3) {
                                $logo.css('opacity', '0');
                            }

                            updateHeaderZIndex();
                        }
                    }, i * 300);
                });

                setTimeout(() => {
                    $siteMap.removeClass('close');
                    isAnimating = false;
                }, $items.length * 350);

                setTimeout(() => {
                    $siteMap.find('.bottom').removeClass('active').children().removeClass('active');
                }, 1000);
            } else {
                // 열림 처리
                $siteMap.addClass('active');
                updateHeaderZIndex();
                isAnimating = false;
                $btnHam.parent().addClass('close');

                if (isType2) {
                    $logo.attr('src', '/assets/images/common/h1_logo_black.png');
                } else {
                    $logo.attr('src', originalLogoSrc.split('.')[0] + '_black.png');
                }

                if (isType3) {
                    $logo.css('opacity', '1');
                }

                const $items = $siteMap.find('li');
                $items.each(function (i) {
                    setTimeout(() => {
                        $(this).addClass('active');

                        if (i === $items.length - 1) {
                            $siteMap
                                .find('.bottom')
                                .children()
                                .each(function (j) {
                                    setTimeout(() => {
                                        $(this).addClass('active');
                                    }, 300);
                                });
                        }
                    }, i * 300);
                });
            }
        });
    });
    /* e:sitemap */

    $('.top').on('click', function () {
        $('html, body').animate({ scrollTop: 0 }, 500); // 500은 애니메이션 시간(ms)
    });
});

/* s:lazyload */
function lazyLoads() {
    const lazyElements = document.querySelectorAll('.lazy');
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(
            (entries, obs) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const el = entry.target;
                        const original = el.getAttribute('data-src');
                        if (!original) return;

                        if (el.getAttribute('lazy-type') === 'bg') {
                            el.style.backgroundImage = `url('${original}')`;
                        } else if (el.tagName.toLowerCase() === 'img') {
                            el.src = original;
                        }

                        el.classList.remove('lazy');
                        obs.unobserve(el);
                    }
                });
            },
            { rootMargin: '0px 0px 200px 0px', threshold: 0.1 }
        );
        lazyElements.forEach((el) => observer.observe(el));
    } else {
        lazyElements.forEach((el) => {
            const original = el.getAttribute('data-src');
            if (!original) return;

            if (el.getAttribute('lazy-type') === 'bg') {
                el.style.backgroundImage = `url('${original}')`;
            } else if (el.tagName.toLowerCase() === 'img') {
                el.src = original;
            }

            el.classList.remove('lazy');
        });
    }
}

// function initHeaderScrollToggle() {
//   let lastScrollTop = 0;
//   const delta = 5;
//   const $Header = $('header');

//   $(window).on('scroll.headerToggle', function () {
//     if ($('.site_map.active').length > 0) return;

//     const st = $(this).scrollTop();
//     if (Math.abs(lastScrollTop - st) <= delta) return;

//     const isMobile = window.innerWidth <= 767;

//     if (st > lastScrollTop && st > 100) {
//       $Header.addClass('hide');
//       if (isMobile) {
//         $Header.removeClass('on');
//       }
//     } else {
//       $Header.removeClass('hide');
//       if (isMobile) {
//         $Header.addClass('on');

//         // ✅ 스크롤 맨 위이면 on 제거
//         if (st <= 5) {
//           $Header.removeClass('on');
//         }
//       }
//     }

//     lastScrollTop = st;
//     console.log('scrollTop:', st);
//   });
// }

function initHeaderScrollToggle() {
  let lastScrollTop = 0;
  const delta = 5;
  const $Headers = $('header');
  const $Logo = $Headers.find('h1 img');
  const originalSrc = $Logo.attr('src');
  const whitekSrc = originalSrc.replace('_black.png', '.png');  // 원래 로고 복귀용
  const blacSrc = originalSrc.replace('.png', '_black.png');    // black 로고 버전

  $(window).on('scroll.headerToggle', function () {
    if ($('.site_map.active').length > 0) return;

        const st = $(this).scrollTop();
        if (Math.abs(lastScrollTop - st) <= delta) return;

    const isMobile = window.innerWidth <= 767;

    // ✅ 공통: header hide 처리
    if (st > lastScrollTop && st > 100) {
      $Headers.addClass('hide');
      if (isMobile) $Headers.removeClass('on');
    } else {
      $Headers.removeClass('hide');
      if (isMobile) {
        $Headers.addClass('on');
        if (st <= 1) $Headers.removeClass('on');
      }
    }

    // ✅ scrollTop 5 이하일 때 초기화 (모든 기기 공통)
    if (st <= 5) {
      if (!isMobile) {
        $Headers.removeClass('wh bl');
        $Logo.attr('src', originalSrc);
      }
      lastScrollTop = st;
      return;
    }

    // ✅ 태블릿/PC만 섹션 스타일 처리
    if (!isMobile) {
      let matched = false;

      $('.dark-section, .light-section').each(function () {
        const $section = $(this);
        const top = $section.offset().top;
        const bottom = top + $section.outerHeight();

        if (st >= top && st < bottom) {
          matched = true;

          if ($section.hasClass('dark-section')) {
            $Headers.removeClass('bl').addClass('wh');
            $Logo.attr('src', whitekSrc);
          } else if ($section.hasClass('light-section')) {
            $Headers.removeClass('wh').addClass('bl');
            $Logo.attr('src', blacSrc);
          }
        }
      });

      // ✅ 섹션과 매칭되는 게 없으면 초기화 없이 그대로 유지
      if (!matched) {
        $Headers.removeClass('wh bl');
        $Logo.attr('src', originalSrc);
      }
    }

        lastScrollTop = st;
    });
}


/* e:lazyload */
function goBack() {
    const ref = document.referrer;
    if (ref && ref.startsWith(location.origin) && ref !== location.href) {
        location.href = ref;
    } else {
        location.href = '/';
    }
}

// ✅ 마우스 커서 효과 함수 (모바일 비활성 처리 포함)
function customCursorEffect($area = null, type = 'view') {
    const isMobile = window.innerWidth <= 767;
    const $cursorDot = $('.custom-cursor.dot-cursor');
    const $cursor = $(`.custom-cursor.${type}`);

    if (isMobile) {
        // ✅ 모바일이면 커서 숨기고 이벤트 해제
        $cursorDot.css('display', 'none');
        $cursor.css('display', 'none');
        $(document).off('mousemove.customCursor.' + type);
        if ($area) {
            $area.off('mouseenter.customCursor.' + type);
            $area.off('mouseleave.customCursor.' + type);
        }
        return;
    }

    // ✅ PC일 경우만 마우스 따라다니게
    $(document).on('mousemove.customCursor.' + type, function (e) {
        const x = e.clientX;
        const y = e.clientY;
        $cursorDot.css({ left: x, top: y });
        $cursor.css({ left: x, top: y });
    });

    // ✅ hover 효과 처리
    if ($area && $area.length > 0) {
        $area.on('mouseenter.customCursor.' + type, function () {
            $cursorDot.css('transform', 'translate(-50%, -50%) scale(0)');
            $cursor.css({
                transform: 'translate(-50%, -50%) scale(1)',
                opacity: 1,
            });
        });

        $area.on('mouseleave.customCursor.' + type, function () {
            $cursorDot.css('transform', 'translate(-50%, -50%) scale(1)');
            $cursor.css({
                transform: 'translate(-50%, -50%) scale(0.5)',
                opacity: 0,
            });
        });
    } else {
        // ❌ hover 대상 없으면 기본 크기만
        $cursor.css({
            transform: 'translate(-50%, -50%) scale(0.5)',
            opacity: 1,
        });
    }
}

function runGsapScrollAnimations(trigger, target, stagger = 0.2) {
    const elements = gsap.utils.toArray(target);
    if (!elements.length) return;

    gsap.timeline({
        scrollTrigger: {
            trigger: trigger,
            start: 'top 90%',
            end: 'bottom 80%',
            toggleActions: 'play none none none',
        },
    }).fromTo(
        elements,
        { y: 200, opacity: 0, force3D: true },
        {
            y: 0,
            opacity: 1,
            duration: 1.5,
            ease: 'power2.inOut',
            stagger: stagger,
            force3D: true,
        }
    );
}

// ✅ 텍스트 복사 + 토스트 호출 함수
function copyTextAndToast(button, message) {
    const $targetP = $(button).closest('p');
    const clone = $targetP.clone();
    clone.find('button').remove(); // 버튼 제거
    const text = clone.text().trim();

    const temp = $('<textarea>');
    $('body').append(temp);
    temp.val(text).select();
    document.execCommand('copy');
    temp.remove();

    toast('auto', message, 1500);
}

// ✅ 토스트 띄우기
function toast(_type, _message, _time) {
    const _toast = $('.toast');
    _toast
        .removeClass('active auto confirm') // 기존 class 제거
        .addClass('active ' + _type)
        .html('<span>' + _message + '</span>');

    if (_type === 'auto') {
        setTimeout(function () {
            toast_close(_toast);
        }, _time);
    } else if (_type === 'confirm') {
        _toast.append('<a href="#none" onclick="toast_close($(this).parent());" class="btn_close">close</a>');
        setTimeout(function () {
            _toast.find('.btn_close').focus();
        });
    }
}

// ✅ 토스트 닫기
function toast_close(_toast) {
    _toast.attr('class', 'toast'); // class 초기화
    setTimeout(function () {
        $('body').find('[tabindex="-1"]').focus().removeAttr('tabindex');
        _toast.empty();
    }, 200);
}


