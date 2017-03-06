//Counter code
console.log("hghhj");

var button = document.getElementById("counter");
var counter = 0;
alert();
button.onClick = function(){
    alert();
    
    counter = counter+1;
    var span = document.getElementById('count');
    span.innerHTML = counter.toString();
    
};