var playing = false;

$(document).ready(function() {
    const poster = $("#poster").attr('src');

    $(".item").on({
        mouseenter: function() {
            $(".item").addClass("hover");
            let source = $(this).children('img').attr('src');
            $("#poster").attr('src', source);
        },
        mouseleave: function() {
            $(".item").removeClass("hover");
            if(!$(".text").hasClass("dshow")) {
                $("#poster").attr('src', poster);
            }
        },
        click: function() {
            $(".text").removeClass("dshow");
            let text = $(this).attr('id');
            $(`#${text}-descrip`).addClass("dshow");
        }
    })

    $(".info").on('click', function() {
        switchFade("#poster", ".info-fade", 1000);
    });

    $(".close").on('click', function() {
        switchFade(".info-fade", "#poster", 1000);
    });

    gen = setInterval(checkGeneral, 1000*60);

    let vid = document.getElementById("vid");
    vid.addEventListener('ended',myHandler,false);
    function myHandler(e) {
        $(".jaranan").fadeOut(1200);
        vid.pause();
        vid.currentTime = 0;
        playing == false;
    }
});

function switchFade(outfade, infade, dur) {
    $(outfade).fadeOut(dur, function() {
        $(infade).fadeIn(dur);
    });
}

function checkGeneral() {
    let date = new Date();
    if(date.getHours() == 22 && date.getMinutes() == 23){
        if(!playing) {
            checkSpec();
        }
    }
}

function checkSpec() {
    var spec = setInterval(() => {
        let specDate = new Date();
        if(specDate.getSeconds() == 30) {
            jarananPlay();
            clearInterval(spec);
        }
    }, 1000);
}

function jarananPlay() {
    $(".jaranan").fadeIn(1200, function() {
        let videoDiv = document.getElementById("vid");
        if (videoDiv.requestFullscreen) {
            videoDiv.requestFullscreen();
        }
        else if (videoDiv.mozRequestFullScreen) {
        videoDiv.mozRequestFullScreen();
        }
        else if (videoDiv.webkitRequestFullScreen) {
        videoDiv.webkitRequestFullScreen();
        }
        else if (videoDiv.msRequestFullscreen) {
        videoDiv.msRequestFullscreen();
        }

        videoDiv.play();
        playing == true;
    });
}