$(document).ready(function () {
 $('body').removeClass('fadeout').addClass('fadein');
  /* s:lazyload */
  lazyLoads();
  /* e:lazyload */
  

    /* header스크롤 */
    initHeaderScrollToggle();

    // // ✅ Lenis 전체 공통 적용
    // const lenis = new Lenis({
    //     duration: 1.2,
    //     easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    //     smooth: true,
    //     smoothTouch: false,
    // });

    // // 다른 페이이지에서 제어
    // window.lenis = lenis;

    // function raf(time) {
    //     lenis.raf(time);
    //     requestAnimationFrame(raf);
    // }
    // requestAnimationFrame(raf);


        // Lenis 제외 페이지 설정
    const lenisExcludePages = ['/project.html'];
    const currentPath = window.location.pathname;

    // Lenis 실행 (제외 페이지가 아니고, Lenis가 로드된 경우만)
    if (typeof Lenis !== 'undefined' && !lenisExcludePages.includes(currentPath)) {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smooth: true,
            smoothTouch: false,
        });

        window.lenis = lenis;

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
    }


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

        // ✅ 자바스크립트 링크 제외
        if (
            href === 'javascript:void(0);' ||
            href.startsWith('javascript:')
        ) return;

        // ✅ tel: 또는 mailto:는 브라우저 기본 동작으로 처리 (절대 막지 않기)
        if (
            href.startsWith('tel:') ||
            href.startsWith('mailto:')
        ) return;

        // ✅ 나머지 일반 링크만 페이드 아웃 처리
        e.preventDefault();
        $('body').removeClass('fadein').addClass('fadeout');

        setTimeout(function () {
            window.location.href = href;
        }, 500);
    });
    
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
                // ✅ 한 번에 닫히는 처리
                $siteMap.removeClass('active').addClass('close');
                $('body, html').css('overflow', ''); // ✅ body 스크롤 다시 활성화
                $siteMap.find('li').removeClass('active');
                $siteMap.find('.bottom').removeClass('active').children().removeClass('active');
                $btnHam.parent().removeClass('close');
                console.log('hihi')

                if (isType2 && isWhite) {
                    $logo.attr('src', originalLogoSrc);
                } else if (isType2) {
                    $logo.attr('src', toBlackLogo(originalLogoSrc));
                } else {
                    $logo.attr('src', toWhiteLogo(originalLogoSrc));
                }

                if (isType3) {
                    $logo.css('opacity', '0');
                }

                updateHeaderZIndex();

                setTimeout(() => {
                    $siteMap.removeClass('close');
                    isAnimating = false;
                }, 400); // 닫힘 애니메이션 시간 고려
            } else {
                // 열림 처리
                $siteMap.addClass('active');
                 $('body, html').css('overflow', 'hidden'); // ✅ 스크롤 비활성화
                updateHeaderZIndex();
                isAnimating = false;
                $btnHam.parent().addClass('close');

                if (isType2) {
                    $logo.attr('src', toBlackLogo(originalLogoSrc)); // ✅
                } else {
                    $logo.attr('src', toBlackLogo(originalLogoSrc));
                }

                if (isType3) {
                    $logo.css('opacity', '1');
                }

                const $items = $siteMap.find('li');
                $items.each(function (i) {
                    setTimeout(() => {
                        $(this).addClass('active');

                        if (i === $items.length - 1) {
                            $siteMap.find('.bottom').children().each(function (j) {
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
        $('html, body').animate({ scrollTop: 0 }, 800); // 500은 애니메이션 시간(ms)
    });

    $('.to-bottom').on('click', function () {
        $('html, body').animate({
            scrollTop: $(document).height()
        }, 800); // 0.8초 동안 부드럽게 이동
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


function initHeaderScrollToggle() {
  let lastScrollTop = 0;
  const delta = 5;
  const $Headers = $('header');
  const $Logo = $Headers.find('h1 img');
  const originalSrc = $Logo.attr('src');
  const whitekSrc = toWhiteLogo(originalSrc);
  const blacSrc = toBlackLogo(originalSrc);

  $(window).on('scroll.headerToggle', function () {
    if ($('.site_map.active').length > 0) return;

    const st = $(this).scrollTop();
    if (Math.abs(lastScrollTop - st) <= delta) return;

    const isMobile = window.innerWidth <= 767;

    // ✅ scrollTop 5 이하일 때 완전 초기화
    if (st <= 5) {
      if (isMobile) {
        $Headers.removeClass('on hide');
      } else {
        $Headers.removeClass('wh bl hide on');
        $Logo.attr('src', originalSrc);
      }
      lastScrollTop = st;
      return;
    }

    // ✅ 공통: 스크롤 방향에 따라 hide/on 처리
    if (st > lastScrollTop) {
      $Headers.addClass('hide').removeClass('on');
    } else {
      $Headers.removeClass('hide').addClass('on');
    }

    if (!isMobile) {
      // ✅ PC 전용: 섹션 배경에 따라 header 색상 및 로고 변경
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

      // 섹션이 없거나 해당되지 않으면 원래 상태로
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

function toBlackLogo(src) {
  return src.includes('_black.png') ? src : src.replace('.png', '_black.png');
}

function toWhiteLogo(src) {
  return src.replace('_black.png', '.png');
}

