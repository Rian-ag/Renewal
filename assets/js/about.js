const paths = document.querySelectorAll('path');

paths.forEach((path, i) => {
const length = path.getTotalLength();
path.style.stroke = "white";
path.style.strokeWidth = "2";
path.style.fill = "none";

gsap.set(path, {
    strokeDasharray: length,
    strokeDashoffset: length
});

gsap.to(path, {
    strokeDashoffset: 0,
    duration: 2,
    delay: i * 0.3,
    ease: "power2.out",
    onComplete: () => {
    gsap.to(path, {
        fill: "white",
        duration: 0.5,
        ease: "power1.inOut"
    });
    }
});
});