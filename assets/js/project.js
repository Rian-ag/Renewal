// project.js

const project = {
    title: ['Go deep\nDive in\nWatch on', 'Simple\nClear\nModule', 'Effortless\nChic\nLifestyle'],
    subTitle: ['CGV\nON MOBILE', 'LOTTE\nDUTY FREE', 'HOME&\nSHOPPING'],
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
    const $projectInfo = $('.project-info');

    const titleLines = project.title[index]
        .split('\n')
        .map((line) => `<div>${line}</div>`)
        .join('');

    let subtitleLines = '';
    const raw = project.subTitle[index];

    if (window.innerWidth <= 768) {
        const compactLine = raw.replace(/\n/g, ' ').replace(/\s*&\s*/g, '&');
        subtitleLines = `<div>${compactLine}</div>`;
    } else {
        const lines = raw.split('\n');
        const line1 = lines[0] || '';
        const line2 = (lines[1] || '') + (lines[2] || '');
        subtitleLines = `<div>${line1}</div><div>${line2}</div>`;
    }

    $title.removeClass('active').html(titleLines);
    $subtitle.removeClass('active').html(subtitleLines);

    $projectInfo.find('li').css({
        opacity: 0,
        transform: 'translateY(100%)',
        transition: 'none',
    });

    setTimeout(() => {
        $title.addClass('active');
        $subtitle.addClass('active');

        $title.find('div').each(function (i) {
            $(this).css('transition-delay', i * 0.1 + 's');
        });
        $subtitle.find('div').each(function (i) {
            $(this).css('transition-delay', i * 0.1 + 's');
        });

        $projectInfo.find('li').each(function (i) {
            $(this).css({
                opacity: 1,
                transform: 'translateY(0%)',
                transition: 'all 0.8s cubic-bezier(0.87, 0, 0.13, 1)',
            });
        });
    }, 100);
}

function initListItemBehavior() {
    const $listItems = $('.list-item');
    const $viewerImg = $('.image-viewer img');
    let ticking = false;

    $('.project-viewer-scrollable').on('scroll', function () {
        const $this = $(this);
        if (!ticking) {
            requestAnimationFrame(() => {
                let minDiff = Infinity;
                let $closest = null;
                const containerTop = $this.offset().top;
                const containerHeight = $this.height();
                const centerY = containerTop + containerHeight / 2;

                $listItems.each(function () {
                    const $el = $(this);
                    const offset = $el.offset().top;
                    const height = $el.outerHeight();
                    const middle = offset + height / 2;
                    const diff = Math.abs(centerY - middle);
                    if (diff < minDiff) {
                        minDiff = diff;
                        $closest = $el;
                    }
                });

                if ($closest) {
                    $listItems.removeClass('active');
                    $closest.addClass('active');
                    const imgSrc = $closest.data('image');
                    if (imgSrc) $viewerImg.attr('src', imgSrc);
                }

                ticking = false;
            });
            ticking = true;
        }
    });

    $listItems.on('mouseenter', function () {
        $listItems.removeClass('active');
        $(this).addClass('active');
        const imgSrc = $(this).data('image');
        if (imgSrc) $viewerImg.attr('src', imgSrc);
    });
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

    // ✅ 리스트 동적 생성
    $.getJSON('/assets/data/projectList.json', function (data) {
        const $lists = $('.lists');
        data.forEach((item) => {
            const tagsHtml = item.tags.map((tag) => `<li>${tag}</li>`).join('');
            const html = `
                <a class="list-item" data-image="${item.image}" href="#">
                    <div class="animate-wrap">
                        <div class="animate">
                            <div class="ani-top">
                                <p>${item.title}</p>
                                <ol>${tagsHtml}</ol>
                            </div>
                            <div class="ani-bottom">
                                <p>${item.title}</p>
                                <ol>${tagsHtml}</ol>
                            </div>
                        </div>
                    </div>
                    <div class="bg-dark"></div>
                </a>
            `;
            $lists.append(html);
        });

        if (!isMobile()) initListItemBehavior();
    });

    function slideToCenter(index) {
        const viewer = document.querySelector('.thumbnail-viewer');
        const thumbnails = document.querySelectorAll('.thumbnail');
        if (!viewer || thumbnails.length === 0) return;

        const target = thumbnails[index];
        const slideWidth = target.offsetWidth;
        const gap = parseFloat(getComputedStyle(thumbnails[0]).marginRight || 0);
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
            allowTouchMove: false,
            watchSlidesProgress: true,
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
            easing: 'easeInOutExpo',
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
                    duration: 0.6,
                    ease: 'ease',
                });

                $thumbnails.removeClass('active').eq(index).addClass('active');

                $('.industry').text(project.industry[index]);
                $('.date').text(project.date[index]);
                $('.type').text(project.type[index]);
                updateTitleAndSubtitle(index);

                if (index === totalSections - 1) {
                    setTimeout(() => {
                        const plugin = $('#section_wrap').data('simpleFullpage');
                        if (plugin && typeof plugin.destroy === 'function') {
                            plugin.destroy();
                            $('body, html').css('overflow', 'auto');
                        }
                    }, 500);
                }
            },
        });
    }

    handleLayout();
    $(window).on('resize', handleLayout);

    // ✅ 프로젝트 뷰어 열기/닫기 처리
    $(document).on('click', '.project-list-button', function () {
        $('.project-viewer').addClass('active');
        const firstImgSrc = $('.list-item').first().data('image');
        $('.image-viewer img').attr('src', firstImgSrc);
        if (window.lenis) window.lenis.stop();
        $('.project-viewer').on('wheel touchmove', function (e) {
            e.stopPropagation();
        });
    });

    $(document).on('click', '.project-viewer .close', function () {
        $('.project-viewer').removeClass('active');
        if (window.lenis) window.lenis.start();
        $('.project-viewer').off('wheel touchmove');
    });
});
