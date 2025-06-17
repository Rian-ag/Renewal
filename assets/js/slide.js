$(function () {
  let swiper = null;

  function isMobile() {
    return $(window).width() <= 768 || window.location.hostname.indexOf("m.") !== -1;
  }

  function initSwiper() {
    swiper = new Swiper(".on_list_swiper .swiper-container", {
      slidesPerView: 1,
      spaceBetween: 0,
      keyboard: { enabled: true },
      simulateTouch: true,
      grabCursor: true,
      scrollbar: {
        el: ".swiper-scrollbar",
        draggable: true,
      },
    });
    swiper.update();

    // 모바일일 경우에만 heading, thumbnail, project-info 요소를 슬라이드 내부로 복제
    const $head = $(".heading");
    const $thumb = $(".thumbnail-container");
    const $info = $(".project-info");

    $(".swiper-slide").each(function (i) {
      $(this).append($head.clone(true));
      $(this).append($thumb.clone(true));
      if (i === 0) {
        $(this).append($info.clone(true));
      }
    });

    $head.hide();
    $thumb.hide();
    $info.hide();
  }

  function destroySwiper() {
    if (swiper) {
      swiper.destroy(true, true);
      swiper = null;
    }
  }

  function initFullpage() {
    $("#section_wrap").simpleFullpage({
      duration: 800,
      easing: "ease",
      parallax: true,
      keyboard: true,
      touch: true,
      navigation: false,
    });
  }

  function destroyFullpage() {
    const plugin = $("#section_wrap").data("simpleFullpage");
    if (plugin && typeof plugin.destroy === "function") {
      plugin.destroy();
    }
  }

  function handleLayout() {
    if (isMobile()) {
      destroyFullpage();
      if (!swiper) initSwiper();
    } else {
      destroySwiper();
      initFullpage();
    }
  }

  handleLayout();
  $(window).on("resize", handleLayout);
});
