gsap.registerPlugin(ScrollTrigger);

$(function () {
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

    // ✅ .visual h1 → h2 순차 애니메이션
    const visualH1 = gsap.utils.toArray('.visual h1 span');
    const visualH2 = gsap.utils.toArray('.visual h2 span');

    if (visualH1.length > 0 || visualH2.length > 0) {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.visual',
                start: 'top 90%',
                toggleActions: 'play none none none',
                // markers: true,
            },
        });

        tl.fromTo(
            visualH1,
            { y: 200, opacity: 0, force3D: true },
            { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power2.out', force3D: true }
        ).fromTo(
            visualH2,
            { y: 200, opacity: 0, force3D: true },
            { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power2.out', force3D: true }
        );
    }

    // ✅ .section-common h3 → p 순차 애니메이션
    const sectionH3 = gsap.utils.toArray('.section-common h3 span');
    const sectionP = gsap.utils.toArray('.section-common p span');

    if (sectionH3.length > 0 || sectionP.length > 0) {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.section-common',
                start: 'top 90%',
                toggleActions: 'play none none none',
                // markers: true,
            },
        });

        tl.fromTo(
            sectionH3,
            { y: 200, opacity: 0, force3D: true },
            { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power2.out', force3D: true }
        ).fromTo(
            sectionP,
            { y: 200, opacity: 0, force3D: true },
            { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power2.out', force3D: true }
        );
    }

    // ✅ visual 내부 project-info 순차 등장
    gsap.timeline({
        scrollTrigger: {
            trigger: '.visual',
            start: 'top 100%',
            toggleActions: 'play none none none',
        },
    })
        .to('.project-info li:nth-child(1)', { duration: 1, ease: 'none', opacity: 1 }, 0.2)
        .to('.project-info li:nth-child(2)', { duration: 1, ease: 'none', opacity: 1 }, 0.4)
        .to('.project-info li:nth-child(3)', { duration: 1, ease: 'none', opacity: 1 }, 0.6);

    // ✅ section-common des-container 순차 등장
    gsap.timeline({
        scrollTrigger: {
            trigger: '.des-container',
            start: 'top 100%',
            toggleActions: 'play none none none',
        },
    })
        .to('.des-container li:nth-child(1)', { duration: 1, ease: 'none', opacity: 1 }, 0.2)
        .to('.des-container li:nth-child(2)', { duration: 1, ease: 'none', opacity: 1 }, 0.4)
        .to('.des-container li:nth-child(3)', { duration: 1, ease: 'none', opacity: 1 }, 0.6);
});
