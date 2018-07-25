
    $(document).ready(function () {
        $('.core-slider').coreSlider({
            navEnabled: false,
            controlNavEnabled: true,
        });

        $('.slider__bottom-box').click(function () {
            $(this).toggleClass('slider__bottom-box--hidden');
        });

        $('.user-menu__toggle').on('click', function (event) {
            event.preventDefault();
            $(this).siblings().toggleClass('user-menu__list-closed');
        });
        $('.header__popup--link').on('click', function (event) {
            event.preventDefault();
            $('#modal').arcticmodal();
        });
    });