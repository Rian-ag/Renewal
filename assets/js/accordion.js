function accordion(_target, evt) {
    const accordions = document.querySelectorAll(_target);

    accordions.forEach((dl) => {
        const buttons = dl.querySelectorAll('dt > button');

        buttons.forEach((btn) => {
            btn.addEventListener(evt, () => {
                const dd = btn.parentElement.nextElementSibling;

                if (!dd || dd.classList.contains('animating')) return;

                const isOpen = dd.classList.contains('show');

                // 단일 열림일 경우
                if (dl.classList.contains('single')) {
                    dl.querySelectorAll('dd.show').forEach((otherDd) => {
                        if (otherDd !== dd) {
                            collapse(otherDd);
                            const otherBtn = otherDd.previousElementSibling.querySelector('button');
                            if (otherBtn) otherBtn.classList.remove('active');
                        }
                    });
                }

                if (isOpen) {
                    collapse(dd);
                    btn.classList.remove('active');
                } else {
                    expand(dd);
                    btn.classList.add('active');
                }
            });
        });
    });

    function expand(dd) {
        dd.classList.add('animating');
        dd.classList.add('show');
        dd.style.height = 'auto';
        const height = dd.scrollHeight + 'px';
        dd.style.height = '0px';

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                dd.style.height = height;
            });
        });

        dd.addEventListener(
            'transitionend',
            () => {
                dd.style.height = 'auto';
                dd.classList.remove('animating');
            },
            { once: true }
        );
    }

    function collapse(dd) {
        dd.classList.add('animating');
        dd.style.height = dd.scrollHeight + 'px';

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                dd.style.height = '0px';
            });
        });

        dd.addEventListener(
            'transitionend',
            () => {
                dd.classList.remove('show');
                dd.classList.remove('animating');
                dd.style.height = '';
            },
            { once: true }
        );
    }
}

accordion('.board_type_toggle', 'click');
