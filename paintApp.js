var color = $('.selected').css('background-color');
var $canvas = $('canvas');
var context = $canvas[0].getContext('2d');
var lastEvent;
var mousedown = false;

    
//When clicking on control list items
$('.controls').on('click', 'li', function () {
  //Deselect sibling elements
  $(this).siblings().removeClass('selected');
  //Select clicked eleements
  $(this).addClass('selected');
  //cachse current color
  color = $(this).css('background-color');
  
});

console.log("Test");

//When new color is pressed
$('#revealColorSelect').click(function(){
  //Show color select or hide it
  changeColor();
  $('#colorSelect').toggle();
});

//Update the new color span 
function changeColor() {
  var r = $('#red').val();
  var g = $('#green').val();
  var b = $('#blue').val();
  $('#newColor').css('background-color' , "rgb(" + r + "," + g +"," + b + ")");
}

//When color sliders change
$('input[type = range]').change(changeColor);
  
//When 'new color' is pressed 
$('#addNewColor').click(function () {
  //Append the color to the controls UL
  var $newColor = $('<li></li>');
  $newColor.css('background-color', $('#newColor').css('background-color'));
  $('.controls ul').append($newColor);
  //Select the new color
  $newColor.click();                                                 
});

//On mouse events on the canvas
$canvas.mousedown(function(e) {
  lastEvent = e;
  mousedown = true;
}).mousemove(function (e) {
  //Draw lines
 if (mousedown) { 
  context.beginPath();
  context.moveTo(lastEvent.offsetX, lastEvent.offsetY);
  context.lineTo(e.offsetX, e.offsetY);
   context.strokeStyle = color;
  context.stroke();
  lastEvent  = e;
 }
}) .mouseup(function(){
  mousedown = false;
});






