var
	express = require("express"),
	app = express(),
	http = require("http").Server(app),
	uuid = require("node-uuid"),
	path = require("path"),
	id = "",
	id_before = "",
	MilkCocoa = require("milkcocoa");

var milkcocoa = new MilkCocoa('yieldivyo8q19.mlkcca.com'),
		rgb_data = milkcocoa.dataStore("rgb"),
		url_data = milkcocoa.dataStore("url");

var ml = new MilkCocoa("dogivyoc3zl.mlkcca.com"),
		led_data = ml.dataStore("led");

rgb_data.on("send",function(data){
	led_data.push({
		red: parseInt(data.value.rgb[0]),
		green: parseInt(data.value.rgb[1]),
		blue: parseInt(data.value.rgb[2])
	})
})

app.use(express.static(path.join(__dirname, "public")))
app.set('views', __dirname + '/views');

app.get("/admin/qr",function(req,res){
	id = uuid.v4().split("-").join("");
	url_data.push({ uuid: id });
	res.sendfile("views/index.html")
});

app.get("/control/:id",function(req,res){
	if(req.params.id == id){
		res.sendfile("views/app.html")
		id_before = id;
	}else if(req.params.id == id_before){
		res.sendfile("views/thankyou.html")
	}else{
		res.sendfile("views/notfound.html")
	}
});

app.get("/",function(req,res){
	res.redirect("/admin/qr");
});

app.get("/*",function(req,res){
	res.sendfile("views/notfound.html");
})

http.listen(1337,function(){
	console.log("Node app listening...")
})
