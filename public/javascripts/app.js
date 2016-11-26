(function($){
	var milkcocoa = new MilkCocoa('yieldivyo8q19.mlkcca.com'),
			ds = milkcocoa.dataStore("rgb"),
			url_data = milkcocoa.dataStore("url"),
			colors = [];

	/* range input */
	$("input[type=range]").on("input",function(){
		var red = $("#red").val(),
				green = $("#green").val(),
				blue = $("#blue").val();
		setBackgroundColor(red,green,blue);
	})

	/**
	 * setBackgroundColor
	 * @param { int } red   red color code
	 * @param { int } green green color code
	 * @param { int } blue  blue color code
	 */
	function setBackgroundColor(red,green,blue){
		colors = [red,green,blue];
		$(".rgb-box").css("background-color","rgb("+colors.join(",")+")");
		ds.send({ rgb: colors })
	}

	url_data.on("push",function(){
		window.location.reload()
	})

})(jQuery);