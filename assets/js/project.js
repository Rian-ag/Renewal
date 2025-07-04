// ✅ 프로젝트 기본 정보 데이터
const project = {
    title: [
        'Go deep\nDive in\nWatch on',
        'Effortless\nChic\nLifestyle',
        'Enjoy\nA new\nHappiness',
        'Simple\n& Easy\nConsulting',
        'Concise\nApproach\nFor customer',
        'Find style\nShare\nThe space',
        'Convenient\nIndexing\nFor developers',
        'Brand with\nVisual\nEmphasis',
        'Touch\nOptimized\nTablet UI',
    ],
    subTitle: [
        'CGV\nON MOBILE',
        'LOTTE\nDUTY FREE',
        'HOME&\nSHOPPING',
        'KB Kookmin\nCard TABLET',
        'HYUNDAI\nDUTY F REE',
        'HYUNDAI\nLIVART',
        'SKT\nT ID ADMIN',
        'CJ\nSEAFOOD',
        'WOORI BANK\nTABLET BRUNCH',
    ],
    industry: [
        'Commerce',
        'Commerce',
        'Commerce',
        'Finance',
        'Commerce',
        'Commerce',
        'Telecommunication',
        'Commerce',
        'Finance',
    ],
    date: [
        'July, 2025',
        '2019 - In Preogress',
        '2021 - In Progress',
        'September, 2022',
        '2021 - In Progress',
        'January, 2021',
        'September, 2021',
        'December, 2022',
        'March, 2020',
    ],
    type: [
        'UI/UX Design/Mobile Web&App/PC Web',
        'UI/UX Design/Mobile Web&App/PC Web',
        'UI/UX Design/Mobile Web&App/PC Web',
        'UI/UX Design/Tablet Web & App',
        'UI/UX Design/Mobile Web&App/PC Web',
        'UI/UX Design/Mobile Web&App/PC Web',
        'UI/UX Design/Mobile Web&App/PC Web/ Admin',
        'UI/UX Design/Mobile Web&App/PC Web',
        'UI/UX Design/Mobile Web&App/Tablet',
    ],
};

// ✅ 전역 Swiper 인스턴스 및 정보 DOM 캐싱
let mainSwiper = null;
let thumbSwiper = null;

const $industry = $('.industry');
const $date = $('.date');
const $type = $('.type');

// ✅ 모바일 여부 판단 유틸 함수
function isMobile() {
    return $(window).width() <= 768;
}
// ✅ 타이틀 및 서브타이틀 텍스트 업데이트 함수
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

// ✅ 이미지 or 비디오 경로에 따라 .image-viewer 업데이트 함수
function updateImageViewer(mediaPath) {
    const $viewer = $('.image-viewer');
    $viewer.empty(); // 기존 이미지나 영상 제거

    if (mediaPath.endsWith('.mp4')) {
        const video = document.createElement('video');
        video.src = mediaPath;
        video.autoplay = true;
        video.loop = true;
        video.muted = true;
        video.playsInline = true;
        video.style.width = '100%';
        video.style.height = '100%';
        video.style.objectFit = 'cover';
        $viewer.append(video);
    } else {
        const img = document.createElement('img');
        img.src = mediaPath;
        img.alt = 'project image';
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'cover';
        $viewer.append(img);
    }
}

// ✅ 리스트 hover/scroll 시 image-viewer 이미지 변경 및 active 처리 함수
function initListItemBehavior() {
    const $listItems = $('.list-item');
    const $viewerImg = $('.image-viewer img');
    let ticking = false;

    // 스크롤 감지
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

                ticking = false;
            });
            ticking = true;
        }
    });

    // 마우스 올렸을 때
    $listItems.on('mouseenter', function () {
        $listItems.removeClass('active');
        $(this).addClass('active');
        const imgSrc = $(this).data('image');
        if (imgSrc) updateImageViewer(imgSrc); // ✅
    });

    // ❗ 마우스가 list 바깥으로 나갔을 때
    $('.project-viewer-scrollable').on('mouseleave', function () {
        $listItems.removeClass('active');
    });
}

// ✅ 프로젝트 swiper 초기화 및 썸네일 관리 함수
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
            // 맨 끝 slide 드래그 막기
            touchMove: function (e) {
                const swiper = this;
                const isFirst = swiper.activeIndex === 0;
                const isLast = swiper.activeIndex === swiper.slides.length - 1;

                // 드래그 방향 확인
                const diff = swiper.touches.currentX - swiper.touches.startX;

                // 왼쪽으로 드래그 중인데 첫 번째 슬라이드일 때 → 막기
                if (isFirst && diff > 0) {
                    e.preventDefault();
                    e.stopImmediatePropagation?.();
                }

                // 오른쪽으로 드래그 중인데 마지막 슬라이드일 때 → 막기
                if (isLast && diff < 0) {
                    e.preventDefault();
                    e.stopImmediatePropagation?.();
                }
            },
        },
    });
}

// ✅ swiper 내부 썸네일 상태 업데이트
function updateThumbnailState(index) {
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach((el, i) => {
        el.classList.toggle('active', i === index);
    });
}

// ✅ swiper 썸네일을 가운데로 이동
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

// ✅ swiper 제거 함수
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

// ✅ 전체 레이아웃 핸들링 (모바일/PC 구분)
function handleLayout() {
    if (isMobile()) {
        destroySwiper();
        initSwiper();
    } else {
        destroySwiper();
        initFullpage();
    }
}

// ✅ fullpage.js 초기화 함수
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

// ✅ 리스트 JSON 로딩 및 리스트 동적 생성
function loadProjectList() {
    const $lists = $('.lists');
    $.getJSON('/assets/data/projectList.json', function (data) {
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

        // ✅ data-link가 있는 list-item에 custom cursor "view" 효과 적용
        $('.list-item[data-link="true"]').each(function () {
            customCursorEffect($(this), 'view');
        });

        if (!isMobile()) initListItemBehavior();
    });
}

// ✅ 프로젝트 뷰어 열기 함수
function openProjectViewer() {
    $('.project-viewer').addClass('active');
    const firstImgSrc = $('.list-item').first().data('image');
    updateImageViewer(firstImgSrc);
    if (window.lenis) window.lenis.stop();
    $('.project-viewer').on('wheel touchmove', function (e) {
        e.stopPropagation();
    });
}

// ✅ 프로젝트 뷰어 닫기 함수
function closeProjectViewer() {
    $('.project-viewer').removeClass('active');
    if (window.lenis) window.lenis.start();
    $('.project-viewer').off('wheel touchmove');
}

// ✅ 전체 초기화
$(window).on('load', function () {
    loadProjectList();
    handleLayout();
    $(window).on('resize', handleLayout);
});

// ✅ 이벤트 바인딩
$(document).on('click', '.project-list-button', openProjectViewer);
$(document).on('click', '.project-viewer .close', closeProjectViewer);
