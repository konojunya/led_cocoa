(function($){
	$("input[type=range]").on("input",function(){
		var red = $("#red").val();
		var green = $("#green").val();
		var blue = $("#blue").val();
		setBackgroundColor(red,green,blue);
	})

	function setBackgroundColor(red,green,blue){
		var colors = [red,green,blue]
		$("body,html").css("background-color","rgb("+colors.join(",")+")");
	}
})(jQuery)