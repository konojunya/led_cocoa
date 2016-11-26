(function($){
	var milkcocoa = new MilkCocoa('yieldivyo8q19.mlkcca.com'),
			ds = milkcocoa.dataStore("url");

	var ml = new MilkCocoa('dogivyoc3zl.mlkcca.com'),
			led = ml.dataStore('led');
			
			// led.push({red:255,green:0,blue:0});

	/**
	 * generateQRCode
	 * @param  { string } uuid
	 */
	function generateQRCode(uuid){
		$(".box").qrcode({
			render: "image",
			size: 250,
			fill: "#FF545C",
			text: "http://devjun.link/control/"+uuid,
			radius: 0
		});
		console.log("http://devjun.link/control/"+uuid)
	}

	function init(){
		ds.stream().next(function(err,item){
			generateQRCode(item[item.length -1].value.uuid)
			setTimeout(function(){
				$(".box").fadeIn()
			},500)
		})
	}

	init()


})(jQuery);