gsap.registerPlugin(ScrollTrigger);

$(document).ready(function () {
    lazyLoads();

    // ✅ Lenis
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

    // 🔝 Top 버튼
    $('.top').on('click', function (e) {
        e.preventDefault();
        lenis.scrollTo(0, {
            duration: 1,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
    });

    // 📌 Visual pin 고정
    ScrollTrigger.create({
        trigger: '.wrap',
        start: 'top top',
        end: '+=400%',
        pin: '.visual',
        pinSpacing: false,
        scrub: false,
    });

    // ✅ .visual h1,h2 -> project-info 순차 애니메이션
    const visualH1 = gsap.utils.toArray('.visual h1 span');
    const visualH2 = gsap.utils.toArray('.visual h2 span');
    const projectInfoItems = gsap.utils.toArray('.project-info li');

    const isMobile = window.innerWidth <= 768;

    if ((visualH1.length > 0 || visualH2.length > 0) && projectInfoItems.length > 0) {
        if (isMobile) {
            // 📱 모바일: project-info는 별도 타임라인, trigger: .visual-sub
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
            // 💻 데스크탑: h1 + h2 + project-info 같은 타임라인
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: '.visual',
                    start: 'top 90%',
                    toggleActions: 'play none none none',
                },
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
                0
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
                0.6
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
                // markers: true,
            },
        });

        // 동시에 시작할 그룹
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
            0 // 타임라인 0초에 시작
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
