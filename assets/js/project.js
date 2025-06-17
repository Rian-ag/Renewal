const project = {
    title: ['Go deep\nDive in\nWatch on', 'Simple\nClear\nModule', 'Effortless\nChic\nLifestyle'],
    subTitle: ['CGV\nOn MOBILE', 'LOTTE\nDUTY FREE', 'HOME &\nSHOPPING'],
    industry: ['Commerce', 'Commerce', 'Commerce'],
    date: ['July, 2025', '2021 - In Progress', '2019 - In Progress'],
    type: [
        'UI/UX Design / Mobile Web&App / PC Web',
        'UI/UX Design / Mobile Web&App / PC Web',
        'UI/UX Design / Mobile Web&App / PC Web',
    ],
};

function updateTitleAndSubtitle(index) {
    const $title = $('.title');
    const $subtitle = $('.sub-title');

    const titleLines = project.title[index]
        .split('\n')
        .map((line) => `<div>${line}</div>`)
        .join('');
    const subtitleLines = project.subTitle[index]
        .split('\n')
        .map((line) => `<div>${line}</div>`)
        .join('');

    $title.removeClass('active').html(titleLines);
    $subtitle.removeClass('active').html(subtitleLines);

    setTimeout(() => {
        $title.addClass('active');
        $subtitle.addClass('active');

        $title.find('div').each(function (i) {
            $(this).css('transition-delay', i * 0.1 + 's');
        });
        $subtitle.find('div').each(function (i) {
            $(this).css('transition-delay', i * 0.1 + 's');
        });
    }, 10);
}

$(window).on('load', function () {
    let mainSwiper = null;
    let thumbSwiper = null;

    const $industry = $('.industry');
    const $date = $('.date');
    const $type = $('.type');

    function isMobile() {
        return $(window).width() <= 768;
    }
    function slideToCenter(index) {
        const viewer = document.querySelector('.thumbnail-viewer');
        const thumbnails = document.querySelectorAll('.thumbnail');

        if (!viewer || thumbnails.length === 0) return;

        const target = thumbnails[index];
        const slideWidth = target.offsetWidth; // 각 썸네일 가로 너비
        const gap = parseFloat(getComputedStyle(thumbnails[0]).marginRight || 0); // 썸네일 간 간격

        const offset = (slideWidth + gap) * index;

        viewer.style.transform = `translateX(-${offset}px)`;
    }

    function updateThumbnailState(index) {
        const thumbnails = document.querySelectorAll('.thumbnail');
        thumbnails.forEach((el, i) => {
            el.classList.toggle('active', i === index);
        });
    }
    function initSwiper() {
        thumbSwiper = new Swiper('.thumbnail-swiper', {
            slidesPerView: 1,
            centeredSlides: true,
            spaceBetween: 33,
            centeredSlides: true,
            allowTouchMove: false,
            watchSlidesProgress: true,
            //slideToClickedSlide: true,
            on: {
                init: function () {
                    const index = this.activeIndex;
                    updateThumbnailState(index);
                    slideToCenter(index);
                },
                slideChange: function () {
                    const index = this.activeIndex;
                    updateThumbnailState(index);
                    slideToCenter(index);
                },
            },
        });

        mainSwiper = new Swiper('.main-swiper', {
            allowTouchMove: true,
            simulateTouch: true,
            grabCursor: true,
            scrollbar: {
                el: '.swiper-scrollbar',
                draggable: true,
            },
            thumbs: {
                swiper: thumbSwiper,
            },
            on: {
                init: function () {
                    const index = this.activeIndex;
                    updateTitleAndSubtitle(index);
                    $industry.text(project.industry[index]);
                    $date.text(project.date[index]);
                    $type.text(project.type[index]);
                },
                slideChange: function () {
                    thumbSwiper.slideTo(this.activeIndex);
                },
                slideChangeTransitionEnd: function () {
                    const index = this.activeIndex;
                    updateTitleAndSubtitle(index);
                    $industry.text(project.industry[index]);
                    $date.text(project.date[index]);
                    $type.text(project.type[index]);
                },
            },
        });
    }

    function destroySwiper() {
        if (mainSwiper) {
            mainSwiper.destroy(true, true);
            mainSwiper = null;
        }
        if (thumbSwiper) {
            thumbSwiper.destroy(true, true);
            thumbSwiper = null;
        }
    }

    function handleLayout() {
        if (isMobile()) {
            destroySwiper();
            initSwiper();
        } else {
            destroySwiper();
            initFullpage();
        }
    }

    function initFullpage() {
        const totalSections = $('.project-section').length;
        const formattedTotal = totalSections < 10 ? '0' + totalSections : totalSections;

        $('#section_wrap').simpleFullpage({
            duration: 800,
            easing: 'ease',
            parallax: true,
            keyboard: true,
            touch: true,
            navigation: false,
            on: {
                init() {
                    $('.fp-navi').remove();
                    $('.fp-arrows').prepend(`
                                        <div class="fp-navi">
                                            <span>01</span>
                                            <em>${formattedTotal}</em>
                                        </div>
                                    `);
                },
            },
            afterLoad(index) {
                const current = index + 1;
                $('.fp-navi span').text(current < 10 ? '0' + current : current);

                const $thumbnailViewer = $('.thumbnail-viewer');
                const $thumbnails = $('.thumbnail');
                const thumbHeight = $thumbnails.outerHeight();

                gsap.to($thumbnailViewer, {
                    y: -(index * thumbHeight),
                    duration: 1.2,
                    ease: 'power2.out',
                });

                $thumbnails.removeClass('active').eq(index).addClass('active');

                $('.industry').text(project.industry[index]);
                $('.date').text(project.date[index]);
                $('.type').text(project.type[index]);
                updateTitleAndSubtitle(index);

                $('.project-info li').css({
                    opacity: 0,
                    transform: 'translateY(100%)',
                    transition: 'none',
                });

                setTimeout(() => {
                    $('.project-info li').each(function (i) {
                        $(this).css({
                            opacity: 1,
                            transform: 'translateY(0%)',
                            transition: 'all 0.8s var(--title-transition-ease)',
                            'transition-delay': i * 0.1 + 0.2 + 's',
                        });
                    });
                }, 100);

                if (index === totalSections - 1) {
                    setTimeout(() => {
                        const plugin = $('#section_wrap').data('simpleFullpage');
                        if (plugin && typeof plugin.destroy === 'function') {
                            plugin.destroy();
                            $('body, html').css('overflow', 'auto');
                        }
                    }, 1300);
                }
            },
        });
    }

    handleLayout();
    $(window).on('resize', handleLayout);
});
