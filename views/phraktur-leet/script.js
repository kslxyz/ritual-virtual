$(document).ready(function() {
    $('body').attr("spellcheck",false)

    var timelineLeft = $('.start').offset().left;
    var timelineTrigger = ($(window).width()-$(window).width() * 0.75)/2;
    var timelineRight = $('.spacer').offset().left-$(window).width()+timelineTrigger;
    var intArea = (timelineRight+timelineTrigger) - (timelineLeft-timelineTrigger);



    const gg = document.querySelector(".gamergate");
    const ar = document.querySelector(".alt-right");

    $(".gamergate, .alt-right").addClass("beginning");

    $(window).scroll(function() {
        var windowLeft = $(window).scrollLeft();
        if(timelineLeft-timelineTrigger > windowLeft) {
            $(".gamergate, .alt-right").removeClass("shift");
            $(".gamergate, .alt-right").addClass("beginning");
        }
        if (timelineLeft-timelineTrigger < windowLeft && windowLeft < timelineRight+timelineTrigger) {
            $(".gamergate, .alt-right").removeClass("beginning");
            $(".gamergate, .alt-right").removeClass("ending");
            $(".gamergate, .alt-right").addClass("shift");
            gg.style.setProperty('--scroll', window.pageXOffset / (intArea+200));
            ar.style.setProperty('--scroll', window.pageXOffset / (intArea+200));
        } 
        if (windowLeft > timelineRight + timelineTrigger) {
            $(".gamergate, .alt-right").removeClass("shift");
            $(".gamergate, .alt-right").addClass("ending");
        }
    })



    const container = document.querySelector(".hero-container");
    const slider = document.querySelector("#leet");
    slider.oninput = function() {
        container.style.setProperty('--text-weight', slider.value);
    }

    const testContainer = document.getElementById("textarea");
    const testLeet = document.getElementById("test-leet");
    const testSize = document.getElementById("test-size");

    testLeet.oninput = function() {
        testContainer.style.setProperty('--text-weight', testLeet.value);
    }

    testSize.oninput = function() {
        testContainer.style.setProperty('--text-weight', testSize.value);
    }
    $('#test-size').on('input', function() {
        var v = $(this).val();
        $('#textarea').css('font-size', v + 'px');
    });

});