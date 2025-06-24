$(document).ready(function () {
 $('body').removeClass('fadeout').addClass('fadein');
  /* s:lazyload */
  lazyLoads();
  /* e:lazyload */
  
  /* header스크롤 */
  initHeaderScrollToggle()

  // ✅ Lenis 전체 공통 적용
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
    smoothTouch: false,
  });

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
          $siteMap.find('.bottom').removeClass('active')
            .children().removeClass('active');
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

});

/* s:lazyload */
function lazyLoads() {
  const lazyElements = document.querySelectorAll('.lazy');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
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
    }, { rootMargin: '0px 0px 200px 0px', threshold: 0.1 });
    lazyElements.forEach(el => observer.observe(el));
  } else {
    lazyElements.forEach(el => {
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
  const $Header = $('header.pc, header.mo');

  $(window).on('scroll.headerToggle', function () {
    if ($('.site_map.active').length > 0) return; // 메뉴 열림 중이면 무시

    const st = $(this).scrollTop();
    if (Math.abs(lastScrollTop - st) <= delta) return;

    if (st > lastScrollTop && st > 100) {
      $Header.addClass('hide'); // 아래로 스크롤 → 숨김
    } else {
      $Header.removeClass('hide'); // 위로 스크롤 → 보임
    }

    lastScrollTop = st;
  });
}
/* e:lazyload */
