$(function () {
    $('.accordion-header').on('click', function () {
        const $item = $(this).parent();

        // 다른 열려있는 아코디언 닫기
        $('.accordion-item').not($item).removeClass('active').find('.accordion-content').slideUp();

        // 현재 클릭한 아이템 toggle
        $item.toggleClass('active');
        $item.find('.accordion-content').stop(true, true).slideToggle();
    });
});
