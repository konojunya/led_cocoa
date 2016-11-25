const
	express = require("express"),
	app = express(),
	http = require("http").Server(app),
	uuid = require("node-uuid"),
	path = require("path"),
	id = "",
	id_before = "",
	fs = require("fs"),
	basicAuth = require("basic-auth-connect");

app.use(express.static(path.join(__dirname, "public")))
app.set('views', __dirname + '/views');

app.get("/admin/qr",function(req,res){
	res.sendfile("views/index.html")
	id = uuid.v4().split("-").join("");
	console.log("[GET] /"+id)
});

app.get("/",function(req,res){
	// res.redirect("/admin/qr")
	res.sendfile("views/index.html");
});

app.get("/:id",function(req,res){
	if(req.params.id) {
		res.sendfile("views/notfound.html");
	}
});

app.get("/control/:id",function(req,res){
	if(req.params.id == id){
		res.sendfile("views/app.html")
		id_before = id;
		console.log("[GET] /control/"+id)
	}else if(req.params.id == id_before){
		res.sendfile("views/thankyou.html")
	}else{
		res.sendfile("views/notfound.html")
	}
});

http.listen(1337,function(){
	console.log("Node app listening...")
})