console.log('Loaded!');
// change the value of index pge

var element = document.getElementById('main-text');
element.innerHTML = "New Value";

//move the image
var img = document.getElementById('madi');
var marginLeeft = 0;

function moveRight(){
    marginLeft = marginLeft + 10;
    img.style.marginLeft= marginLeft + 'px';
}

img.onclick = function(){
    
    var interval = setInterval(moveRight,100);
    //img.style.marginLeft ='100px';
}