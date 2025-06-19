function accordion(_target, evt) {
    const accordionList = document.querySelectorAll(_target);

    accordionList.forEach((dl) => {
        const triggers = dl.querySelectorAll('dt > button');

        triggers.forEach((btn, i) => {
            btn.addEventListener(evt, () => {
                const parentDl = btn.closest('dl');
                const currentDd = btn.parentElement.nextElementSibling;

                if (!currentDd) return;

                // 단일 열림
                if (parentDl.classList.contains('single')) {
                    parentDl.querySelectorAll('dd.show').forEach((dd) => {
                        if (dd !== currentDd) {
                            dd.style.height = dd.scrollHeight + 'px'; // 현재 높이로 설정 후
                            requestAnimationFrame(() => {
                                dd.style.height = '0px';
                                dd.addEventListener(
                                    'transitionend',
                                    () => {
                                        dd.classList.remove('show');
                                        dd.style.height = '';
                                    },
                                    { once: true }
                                );
                            });
                        }
                    });
                }

                // 토글
                if (currentDd.classList.contains('show')) {
                    currentDd.style.height = currentDd.scrollHeight + 'px'; // 현재 높이 유지
                    requestAnimationFrame(() => {
                        currentDd.style.height = '0px';
                        currentDd.addEventListener(
                            'transitionend',
                            () => {
                                currentDd.classList.remove('show');
                                currentDd.style.height = '';
                            },
                            { once: true }
                        );
                    });
                } else {
                    currentDd.classList.add('show');
                    currentDd.style.height = 'auto';
                    const height = currentDd.scrollHeight + 'px';
                    currentDd.style.height = '0px';

                    requestAnimationFrame(() => {
                        currentDd.style.height = height;
                        currentDd.addEventListener(
                            'transitionend',
                            () => {
                                currentDd.style.height = '';
                            },
                            { once: true }
                        );
                    });
                }
            });
        });
    });
}
