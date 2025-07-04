gsap.registerPlugin(ScrollTrigger);

$(document).ready(function () {
    const isMobile = window.innerWidth <= 768;

    // 📌 Visual pin 고정
    ScrollTrigger.create({
        trigger: '.wrap',
        start: 'top top',
        end: '+=400%',
        pin: '.visual',
        pinSpacing: false,
        scrub: false,
    });

    // ✅ .visual h1,h2 -> project-info 요소 수집
    const visualH1 = gsap.utils.toArray('.visual h1 span');
    const visualH2 = gsap.utils.toArray('.visual h2 span');
    const projectInfoItems = gsap.utils.toArray('.project-info li');

    // ✅ visual 진입 시 scale + 텍스트 애니메이션 (PC만)
    if (!isMobile) {
        const viewHeight = window.innerHeight;

        // 초기 스케일 설정
        gsap.set('.visual', {
            scale: 1.5,
            transformOrigin: 'center center',
        });

        // ✅ 통합된 타임라인: scale → 텍스트 등장
        const tl = gsap.timeline();

        tl.to('.visual', {
            scale: 1,
            duration: 3,
            ease: 'power3.out',
        });

        tl.fromTo(
            [...visualH1, ...visualH2],
            { y: 200, opacity: 0, force3D: true },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                stagger: 0.15,
                ease: 'power2.out',
                force3D: true,
            },
            '<+0.8'
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
            '<+1'
        );

        // ✅ 텍스트 패럴럭스 (.title-container)
        gsap.to('.visual .title-container', {
            y: -100,
            ease: 'none',
            scrollTrigger: {
                trigger: '.visual',
                start: 'top top',
                end: '+=100vh',
                scrub: true,
            },
        });

        // ✅ 배경 패럴럭스 (선택)
        gsap.to('.parallax-bg', {
            y: -200,
            ease: 'none',
            scrollTrigger: {
                trigger: '.visual',
                start: 'top top',
                end: `+=${viewHeight}`,
                scrub: true,
            },
        });
    } else {
        // ✅ 모바일: scrollTrigger 기반 순차 애니메이션
        if ((visualH1.length > 0 || visualH2.length > 0) && projectInfoItems.length > 0) {
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
        }
    }

    // ✅ .section-common h3 → p 순차 애니메이션
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
