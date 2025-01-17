$(document).ready(function () {
    if (window.location.href.endsWith('?nfc')) {
        window.history.pushState({}, document.title, window.location.pathname);

        const imageWrapper = document.querySelector('#nfc');
        imageWrapper.style.zIndex = 100;

        anime({
            targets: '#nfc',
            translateY: [-300, 0],
            easing: 'easeOutBack',
            duration: 1500,
            complete: function() {
                anime({
                    scale: {
                        value: 0,
                    },
                    delay: 300,
                    targets: '#nfc',
                    duration: 1500,
                    easing: 'easeInQuart',
                    complete: function() {
                        imageWrapper.remove();
                    }
                });
            }
        });
    }else if (!$.cookie('should-animate')) {
        //set expiry to current time plus 1 minutes in milliseconds
        var expire = new Date();
        expire.setTime(expire.getTime() + (1 * 60 * 1000));
        $.cookie('should-animate', true, {expires: expire});

        $(".info").scramble(5000, 1);
    }

    $('.sidenav-trigger').click(function (e) {
        $(this).attr("data-open", "1");
        $(".sidebar").css("-webkit-transform", "translateX(0%)");
        $(".sidebar").css("transform", "translateX(0%)");
        e.preventDefault();
        return false;
    });

    $('a').each(function () {
        var a = new RegExp('/' + window.location.host + '/');
        if (!a.test(this.href)) {
            $(this).attr("target", "_blank");
        }
    });

    $(document).on('click', function (e) {
        var dataOpen = $('.sidenav-trigger').attr("data-open");
        if (dataOpen && dataOpen.length > 0) {
            if (!$(e.target).hasClass("sidebar") && $(e.target).parents('.sidebar').length === 0) {
                $('.sidenav-trigger').attr("data-open", "");
                $(".sidebar").css("-webkit-transform", "translateX(-105%)");
                $(".sidebar").css("transform", "translateX(-105%)");
            }
        }
    });

    // only load high quality background image if root
    if (location.pathname === "/") {
        setTimeout(function () {
            if ($(".sidebar").css("padding-left") != "14px") {
                // not small screen
                var img = new Image();
                var el = $("#newim");
                img.src = "/images/bg.jpg";
                img.onload = function () {
                    el.css("opacity", "0");
                    el.css('background-image', 'url(' + img.src + ')');
                    el.animate({opacity: 1}, 2000);
                };
            }
        }, 500);
    }
});