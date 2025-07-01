gsap.registerPlugin(ScrollToPlugin);

const project = {
    title: ['Go deep\nDive in\nWatch on', 'Effortless\nChic\nLifestyle', 'Making\nShopping\nConvenient'],
    subTitle: ['CGV\nON MOBILE', 'LOTTE\nDUTY FREE', 'HOME&\nSHOPPING'],
    industry: ['Commerce', 'Commerce', 'Commerce'],
    date: ['July, 2025', '2019 - In Preogress', '2021 - In Progress'],
    type: [
        'UI/UX Design/Mobile Web&App/PC Web',
        'UI/UX Design/Mobile Web&App/PC Web',
        'UI/UX Design/Mobile Web&App/PC Web',
    ],
};

let mainSwiper = null;
let thumbSwiper = null;

const $industry = $('.industry');
const $date = $('.date');
const $type = $('.type');

function isMobile() {
    return $(window).width() <= 768;
}
function updateThumbnailState(index) {
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach((el, i) => {
        el.classList.toggle('active', i === index);
    });
}

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

        $title.find('div').each((i, el) => {
            $(el).css('transition-delay', i * 0.1 + 's');
        });
        $subtitle.find('div').each((i, el) => {
            $(el).css('transition-delay', i * 0.1 + 's');
        });

        $projectInfo.find('li').each((i, el) => {
            $(el).css({
                opacity: 1,
                transform: 'translateY(0%)',
                transition: 'all 0.8s cubic-bezier(0.87, 0, 0.13, 1)',
            });
        });
    }, 100);
}

function updateProjectInfo(index) {
    $('.industry').text(project.industry[index]);
    $('.date').text(project.date[index]);
    $('.type').text(project.type[index]);
    updateTitleAndSubtitle(index);
    $('.fp-dot').removeClass('active');
    $(`.fp-dot[data-index="${index}"]`).addClass('active');
    $('.fp-navi.pc span').text((index + 1).toString().padStart(2, '0'));

    // ✅ PC에서도 썸네일 위치 이동 및 상태 갱신
    const $thumbnailViewer = $('.thumbnail-viewer');
    const $thumbnails = $('.thumbnail');
    const thumbHeight = $thumbnails.outerHeight();

    gsap.to($thumbnailViewer, {
        y: -(index * thumbHeight),
        duration: 0.6,
        ease: 'ease',
    });

    $thumbnails.removeClass('active').eq(index).addClass('active');
}

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
// let prevIsMobile = isMobile();

function handleLayout() {
    if (isMobile()) {
        destroySwiper();
        initSwiper();
    } else {
        destroySwiper();
        initFullpage();
    }
}

function initListItemBehavior() {
    const $listItems = $('.list-item');
    const $viewerImg = $('.image-viewer img');
    let ticking = false;

    $('.project-viewer-scrollable').on('scroll', function () {
        if (!ticking) {
            requestAnimationFrame(() => {
                let minDiff = Infinity;
                let $closest = null;
                const centerY = window.innerHeight / 2;

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

    $('.project-viewer-scrollable').on('mouseleave', function () {
        $listItems.removeClass('active');
    });
}

function initFullpage() {
    const sections = gsap.utils.toArray('.project-section');
    let currentIndex = 0;
    updateProjectInfo(0);

    const $container = $('#section_wrap');
    const $arrowWrap = $('<div class="fp-arrows"></div>');
    const $prevBtn = $('<button class="fp-arrow fp-prev">↑</button>');
    const $nextBtn = $('<button class="fp-arrow fp-next">↓</button>');
    $arrowWrap.append($prevBtn, $nextBtn);
    $container.append($arrowWrap);

    $arrowWrap.prepend(`
        <div class="fp-navi pc">
            <span>01</span>
            <em>${sections.length.toString().padStart(2, '0')}</em>
        </div>
    `);
 ScrollTrigger.create({
        trigger: '.project-viewer',
        start: 'top center', // 또는 'top bottom'도 가능
        onEnter: () => {
            $('#bottom').css('background', '#000');
        },
        onLeaveBack: () => {
            $('#bottom').css('background', 'transparent'); // 필요시 원래대로
        },
    });
    function scrollToSection(index) {
        if (index < 0 || index >= sections.length) return;
        currentIndex = index;
        gsap.to(window, {
            scrollTo: { y: window.innerHeight * index },
            duration: 1,
            ease: 'power2.inOut',
            onComplete: () => updateProjectInfo(index),
        });
    }

    $prevBtn.on('click', () => scrollToSection(currentIndex - 1));
    $nextBtn.on('click', () => scrollToSection(currentIndex + 1));

    window.addEventListener('wheel', (e) => {
        if (gsap.isTweening(window)) return;
        if (e.deltaY > 0) scrollToSection(currentIndex + 1);
        else scrollToSection(currentIndex - 1);
    });
}

$(window).on('load', function () {
    if (window.lenis) window.lenis.stop();

    $.getJSON('/assets/data/projectList.json', function (data) {
        const $lists = $('.lists');
        data.forEach((item) => {
            const tagsHtml = item.tags.map((tag) => `<li>${tag}</li>`).join('');
            const html = `
                <a class="list-item" data-image="${item.image}" href="${item.link || 'javascript:void(0);'}"
                   ${item.link ? 'data-link="true" target="_blank"' : ''}>
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

    handleLayout();
    $(window).on('resize', handleLayout);
});

$(document).on('click', '.project-list-button', function () {
    if (isMobile()) {
        $('.project-viewer').addClass('active');
        $('body').css('overflow', 'hidden'); // 스크롤 막기
    }
});
$(document).on('click', '.project-viewer .close', function () {
    if (isMobile()) {
        $('.project-viewer').removeClass('active');
        $('body').css('overflow', 'auto');
    }
});
