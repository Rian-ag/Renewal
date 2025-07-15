gsap.registerPlugin(ScrollTrigger);

$(document).ready(function () {
    const $visualImg = $('.visual img');
    const originalSrc = $visualImg.attr('src'); // PC 이미지 src 저장
    const mobileSrc = originalSrc.replace(/\.png$/, '_mo.png');

    function isMobileView() {
        return window.innerWidth <= 768;
    }

    function updateVisualImageSrc() {
        if (isMobileView()) {
            const imgTest = new Image();
            imgTest.onload = function () {
                $visualImg.attr('src', mobileSrc);
            };
            imgTest.onerror = function () {
                $visualImg.attr('src', originalSrc);
            };
            imgTest.src = mobileSrc;
        } else {
            $visualImg.attr('src', originalSrc);
        }
    }

    // ✅ .scroll_cont 내부 이미지도 모바일이면 _mo.png 로 변경
    function updateScrollContImages() {
        if (!isMobileView()) return;

        // .scroll_cont 내 모든 img 대상 (scroll-box 안 img, p 안 img 모두 포함)
        $('.scroll_cont img').each(function () {
            const $img = $(this);
            const src = $img.attr('src');

            if (!src || /_mo\.png$/.test(src)) return; // 이미 _mo거나 유효하지 않으면 skip

            const moSrc = src.replace(/\.png$/, '_mo.png');

            const imgTest = new Image();
            imgTest.onload = function () {
            $img.attr('src', moSrc);
            };
            imgTest.onerror = function () {
            // 이미지가 없으면 원래 이미지 유지
            };
            imgTest.src = moSrc;
        });
    }

    // 초기 이미지 적용
    updateVisualImageSrc();
    updateScrollContImages(); // ✅ 추가

    // 리사이즈 시 이미지 교체
    $(window).on('resize', function () {
        updateVisualImageSrc();
        updateScrollContImages(); // ✅ 추가
    });

    // 애니메이션 요소 정의
    const visualH1 = gsap.utils.toArray('.visual h1 span');
    const visualH2 = gsap.utils.toArray('.visual h2 span');
    const projectInfoItems = gsap.utils.toArray('.project-info li');

    if ((visualH1.length > 0 || visualH2.length > 0) && projectInfoItems.length > 0) {
        if (isMobileView()) {
            // 📱 모바일
            gsap.timeline({
                scrollTrigger: {
                    trigger: '.visual',
                    start: 'top 90%',
                    toggleActions: 'play none none none',
                },
            }).fromTo(
                [...visualH1, ...visualH2],
                { y: 200, opacity: 0, force3D: true },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    stagger: 0.15,
                    ease: 'power2.out',
                    force3D: true,
                }
            );

            gsap.timeline({
                scrollTrigger: {
                    trigger: '.visual-sub',
                    start: 'top 90%',
                    toggleActions: 'play none none none',
                },
            }).fromTo(
                projectInfoItems,
                { opacity: 0, force3D: true },
                {
                    opacity: 1,
                    duration: 1,
                    stagger: 0.2,
                    ease: 'power2.out',
                    force3D: true,
                }
            );
        } else {
            // 💻 데스크탑
            const viewHeight = window.innerHeight;

            gsap.set('.visual > img', {
                scale: 1.5,
                transformOrigin: 'center center',
            });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: '.wrap',
                    start: 'top top',
                    end: `+=${viewHeight}`,
                    pin: '.visual',
                    pinSpacing: false,
                    scrub: false,
                },
            });

            tl.to('.visual > img', {
                scale: 1,
                duration: 2,
                ease: 'power3.out',
            });

            tl.fromTo(
                [...visualH1, ...visualH2],
                { y: 200, opacity: 0, force3D: true },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.1,
                    stagger: 0.15,
                    ease: 'power2.out',
                    force3D: true,
                },
                '-=1'
            );

            tl.fromTo(
                projectInfoItems,
                { opacity: 0, force3D: true },
                {
                    opacity: 1,
                    duration: 1,
                    stagger: 0.2,
                    ease: 'power2.out',
                    force3D: true,
                },
                '-=0.5'
            );
        }
    }

    // ✅ section-common 애니메이션
    const sectionH3 = gsap.utils.toArray('.section-common h3 span');
    const sectionP = gsap.utils.toArray('.section-common p span');
    const desItems = gsap.utils.toArray('.des-container > li');

    if ((sectionH3.length > 0 || sectionP.length > 0) && desItems.length > 0) {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.section-common',
                start: 'top 90%',
                toggleActions: 'play none none none',
            },
        });

        tl.fromTo(
            [...sectionH3, ...sectionP],
            { y: 200, opacity: 0, force3D: true },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                stagger: 0.15,
                ease: 'power2.out',
                force3D: true,
            },
            0
        );

        tl.fromTo(
            desItems,
            { opacity: 0, force3D: true },
            {
                opacity: 1,
                duration: 1,
                stagger: 0.2,
                ease: 'power2.out',
                force3D: true,
            },
            0.6
        );
    }
});


// ✅ 상세페이지 공통 함수 정의
function animateSectionItems(sectionSelector, itemSelector) {
    const sections = document.querySelectorAll(sectionSelector);
    if (!sections.length) return;

    sections.forEach(section => {
        let items = itemSelector
            ? gsap.utils.toArray(section.querySelectorAll(itemSelector))
            : gsap.utils.toArray(section.children);

        if (!items.length) return;

        gsap.set(items, { opacity: 0, y: 200, force3D: true });

        gsap.to(items, {
            opacity: 1,
            y: 0,
            duration: 1.4,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: section,
                start: 'top 85%',
                toggleActions: 'play none none none'
            }
        });
    });
}
