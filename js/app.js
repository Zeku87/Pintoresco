var $botonNuevoColor = $("#revealColorSelect");
var $panelColor = $("#colorSelect");
var $botonAgregarColor = $("#addNewColor");
var $liColor = $(".controls");
var $liSeleccionado = $(".selected");
var $color = $liSeleccionado.css("background-color");
var $spanColor = $("#newColor");
var totalColor;
var ctx = $("canvas")[0].getContext("2d"); //estamos indicando la forma de dibujar
var $canvas = $("canvas");

$("input[type=range]").on("input", cambioColor);

//Se toma el color de la paleta predefinida
//Se le asigna la selección al color de la paleta seleccionado
$liColor.on("click","li", function(){
    $(this).siblings().removeClass("selected");
    $(this).addClass("selected");
    $color = $(this).css("background-color");
});

//nuevo color seleccionado del panel

function cambioColor(){
    var r = $("#red").val();
    var g = $("#green").val();
    var b = $("#blue").val();
    totalColor =r + g + b;
    $spanColor.css("background-color", "rgb(" + r + "," + g + "," + b + ")");
    totalColor = $spanColor.css("background-color");
}

//Abrir o cerrar panel

$botonNuevoColor.click(function(){
    $panelColor.toggle();
    cambioColor();
});

$botonAgregarColor.click(function(){
    $panelColor.hide();
    var $liNuevoColor = $("<li></li>");
    $(".controls ul").append($liNuevoColor);
    $liNuevoColor.css("background-color", totalColor);
});

//Dibujar
var lastEvent;
var mouseDown = false;
$canvas.mousedown(function(e){
    lastEvent = e;
    mouseDown = true;
}).mousemove(function(e)
	     {
		 if(mouseDown){
		     ctx.beginPath();
		     ctx.moveTo(lastEvent.offsetX,lastEvent.offsetY);
		     ctx.lineTo(e.offsetX,e.offsetY);
		     ctx.strokeStyle = $color;
		     ctx.stroke();
		     lastEvent = e;
		 }
	     }).mouseup(function(){
		mouseDown = false;
	     }).mouseleave(function(){
	     	$canvas.mouseup();
	     });
