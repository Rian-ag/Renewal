// $(document).ready(function () {
//     /* s:lazyload */
//     lazyLoads();
//     /* e:lazyload */

//     // ✅ Lenis 전체 공통 적용
//     const lenis = new Lenis({
//         duration: 1.2,
//         easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
//         smooth: true,
//         smoothTouch: false,
//     });

//     function raf(time) {
//         lenis.raf(time);
//         requestAnimationFrame(raf);
//     }
//     requestAnimationFrame(raf);
    
    
    
//     /* s:sitemap */
//     const $btnHam = $('header .btn_ham');
//     const $siteMap = $('header .site_map');
//     const $h1_img = $('header h1 img').attr('src');
//     const $footer = $('#bottom');
//     const $header = $('header');
//     let isAnimating = false; // 클릭 잠금 변수

//     // 📌 header z-index 조절 함수
//     const updateHeaderZIndex = () => {
//         if ($siteMap.hasClass('active')) {
//             $header.css({ 'z-index': '999' });
//         } else {
//             $header.css('z-index', '')
//         }
//     };

//     $btnHam.on('click', function () {
//         if (isAnimating) return;
//         isAnimating = true;

//         const isType2 = $header.hasClass('type2');
//         const isType3 = $header.hasClass('type3');

//         if ($btnHam.parent().hasClass('close')) {
//             // 닫히는 애니메이션
//             for (let i = 0; i < $siteMap.find('li').length; i++) {
//                 setTimeout(function () {
//                     $siteMap.find('li').eq(i).removeClass('active');

//                     if ((i + 1) === $siteMap.find('li').length) {
//                         $siteMap.removeClass('active').addClass('close');
//                         $btnHam.parent().removeClass('close');

//                         // 📌 .type2: 로고 복원 / .type3: opacity 0
//                         if (isType2) {
//                             $('header h1 img').attr('src', '/assets/images/common/h1_logo_black.png');
//                         } else {
//                             $('header h1 img').attr('src', $h1_img.replace('_black.png', '.png'));
//                         }

//                         if (isType3) {
//                             $('header h1 img').css('opacity', '0');
//                         }

//                         updateHeaderZIndex();
//                     }
//                 }, i * 300);
//             }

//             setTimeout(function(){
//                 $siteMap.removeClass('close');
//                 isAnimating = false;
//             }, $siteMap.find('li').length * 350);

//             setTimeout(function () {
//                 $siteMap.find('.bottom').removeClass('active');
//                 $siteMap.find('.bottom').children().removeClass('active');
//             }, 1000);
//         } else {
//             // 열리는 애니메이션
//             $siteMap.addClass('active');
//             updateHeaderZIndex();

//             // $siteMap.one('animationend webkitAnimationEnd oAnimationEnd', function () {
//                 isAnimating = false;

//                 $btnHam.parent().addClass('close');

//                 if (isType2) {
//                     $('header h1 img').attr('src', '/assets/images/common/h1_logo_black.png');
//                 } else {
//                     $('header h1 img').attr('src', ($h1_img.split('.')[0] + '_black.png'));
//                 }

//                 if (isType3) {
//                     $('header h1 img').css('opacity', '1'); // ✅ 애니메이션 끝난 후 opacity 적용
//                 }

//                 for (let i = 0; i < $siteMap.find('li').length; i++) {
//                     setTimeout(function () {
//                         $siteMap.find('li').eq(i).addClass('active');

//                         if ((i + 1) === $siteMap.find('li').length) {
//                             const $bottomChildren = $siteMap.find('.bottom').children();
//                             $bottomChildren.each(function (j) {
//                                 setTimeout(() => {
//                                     $(this).addClass('active');
//                                 }, 300);
//                             });
//                         }
//                     }, i * 300);
//                 }
//             // });
//         }
//     });
//     /* e:sitemap */
// });




$(document).ready(function () {
  /* s:lazyload */
  lazyLoads();
  /* e:lazyload */

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
/* e:lazyload */
