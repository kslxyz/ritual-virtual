$(document).ready(function() {

    let buffer = [];
    let lastKeyTime = Date.now();

   document.addEventListener('keydown', event => {
        const charList = 'abcdefghijklmnopqrstuvwxyz';
        const key = event.key.toLowerCase();

        //check only for alphabet keys
        if (charList.indexOf(key) === -1) return;

        //resetting array of keystrokes after 1 second delay
        const currentTime = Date.now();
        if (currentTime - lastKeyTime > 1000) {
            buffer = [];
        }

        buffer.push(key);
        lastKeyTime = currentTime;

        var inputString = buffer.join('');

        console.log(inputString);

        var desireWords = ["want", "need", "wish", "hope", "aspire", "crave", "require", "covet", "long", "thirst", "yearn", "desire", "hunger", "hungry", "lust", "pine", "pining", "wanting", "needing", "desiring", "hoping", "aspiring", "craving", "wishing", "vulnerability"];

        

        for(let i=0; i<=desireWords.length-1; i++) {
            if (inputString.includes(desireWords[i])) {

                if (i<desireWords.length-2) {
                    triggerImage();
                    buffer = [];
                } 
                else if (i>=desireWords.length-1) {
                    console.log('WORKING');
                    // showConfession();
                    buffer = [];
                }
            }
        }

        var projectDescrip = ["confess", "vulnerability", "vulnerable", "transparency", "transparent", "open"];

   });

   var imageInfo = [
    {location: "data/computers.jpg",
     hoverText: "Computers",
    }, 
    {
      location: "data/exoband.png",
      hoverText: "Exo (band)"
    },
    {
      location: "data/food.jpg",
      hoverText: "Food"
    },
    {
      location: "data/hiphopmusic.jpg",
      hoverText: "Hip-hop music"
    },
    {
    location: "data/software.jpg",
      hoverText: "Software"
    },
    {
      location: "data/skin.jpg",
      hoverText: "Skin"
    },
    {
      location: "data/motiongraphics.jpg",
      hoverText: "Motion Graphics"
    },
  
    {
      location: "data/vertebrate.jpg",
      hoverText: "Vertebrate"
    },
    {
      location: "data/videogames.jpg",
      hoverText: "Video Games"
    },
    {
      location: "data/beauty.png",
      hoverText: "Beauty"
    },
    {
      location: "data/behance.jpg",
      hoverText: "Behance"
    },
    {
      location: "data/business.jpg",
      hoverText: "Business"
    },
    {
      location: "data/child.jpg",
      hoverText: "Child"
    },
    {
      location: "data/clothing.jpg",
      hoverText: "Clothing"
    },
    {
      location: "data/comedymovies.jpg",
      hoverText: "Comedy movies"
    },
    {
      location: "data/construction.jpg",
      hoverText: "Construction"
    },
    {
      location: "data/dogs.jpg",
      hoverText: "Dogs"
    },
    {
      location: "data/doityourselfdiy.jpg",
      hoverText: "Do-it-yourself (DIY)"
    },
    {
      location: "data/drmartens.jpg",
      hoverText: "Dr. Martens"
    },
    {
      location: "data/electronicmusic.jpg",
      hoverText: "Electronic Music"
    },
    {
      location: "data/entertainment.jpeg",
      hoverText: "Entertainment"
    },
    {
      location: "data/entrepreneurship.jpg",
      hoverText: "Entrepreneurship"
    },
    {
      location: "data/family.jpg",
      hoverText: "Family"
    },
    {
      location: "data/footwear.jpg",
      hoverText: "Footwear"
    },
    {
      location: "data/furniture.jpg",
      hoverText: "Furniture"
    },
    {
      location: "data/grunge.jpg",
      hoverText: "Grunge"
    },
    {
      location: "data/hautecouture.jpg",
      hoverText: "Haute Couture"
    },
    {
      location: "data/interiordesign.png",
      hoverText: "Interior Design"
    },
  
    {
      location: "data/massivelymultiplayeronlineroleplayinggames.jpg",
      hoverText: "Massively multiplayer online role playing games"
    },
  
    {
      location: "data/parties.jpg",
      hoverText: "Parties"
    },
    {
      location: "data/rayhigdon.jpeg",
      hoverText: "Ray Higdon"
    },
    {
      location: "data/roleplayinggames.png",
      hoverText: "Role playing games"
    },
    {
      location: "data/sigma.png",
      hoverText: "Sigma"
    },
    {
      location: "data/tattoos.jpg",
      hoverText: "Tattoos"
    },
    {
      location: "data/whitneymuseumofamericanart.jpg",
      hoverText: "Whitney Museum of American Art"
    },
    {
      location: "data/tvrealityshows.jpg",
      hoverText: "TV Reality shows"
    }
  
  
  ];
  
  
  var w = $("#area").width();
  var h = $("#area").height();
  
  var img = '';
  var randomImage;
  var imageLocation;
  var hoverText;
  var imageWidth;
  
  var confession = '';

 
  
  function triggerImage() {
  
   for(ii=0; ii<imageInfo.length; ii++) {
        zindex = ii;
   }

    
    randomImage = imageInfo[Math.floor(Math.random() * imageInfo.length)];
    imageLocation = randomImage.location;
    hoverText = randomImage.hoverText;
    imageWidth = Math.random() * 50 + 150;

    var bottomLimit = h - 300;
    var leftLimit = imageWidth;
    var rightLimit = $(window).width()*0.6-50;
    let positiontop = Math.random()*h;
    let positionright = Math.random()*w;

    if(positiontop > bottomLimit) {
        positiontop = bottomLimit;
    }

    if(positionright < leftLimit) {
        positionright = leftLimit;
    }



  
    img += `<div class="ui-widget-draggable draggable" style="top:${positiontop}px;right:${positionright}px;z-index:${zindex};"><a href="https://www.amazon.com/s?k='${hoverText}" target="_blank"><img src="${imageLocation}" title="${hoverText}" style="width:${imageWidth}px;"></a></div>`
  
  
    document.getElementById('area').innerHTML= img;
    $(function() {
        $( ".draggable" ).draggable({
            stop: function( event, ui ) {
                console.log(ui.position.left);
                var thisPos = ui.position.left + $(this).width();
                $(this).css({
                    "top": `${ui.position.top}`,
                    "right": `${thisPos}`
                });
            }
        });
     });
  
  }
  
  
});