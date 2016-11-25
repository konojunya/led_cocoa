//変数
const express = require('express'),
      app = express(),
      http = require('http').Server(app),
      io = require('socket.io')(http),
      uuid = require('node-uuid'),
      ejs = require('ejs'),
      path = require('path'),
      id = "",
      id_before = "",
      fs = require('fs'),
      basicAuth = require('basic-auth-connect'),
      C = require('constants'),
      fd = fs.openSync('myfifo', C.O_NONBLOCK | C.O_RDWR);

app.use(express.static(path.join(__dirname , 'public')));

//Basic認証
// app.all('/admin/*', basicAuth(function(user, password) {
//   return user === 'admin' && password === 'hal';
// }));

//views
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

//routers

// admin control screen
app.get('/admin/ctrl', function(req, res) {
  res.render('adminCtrl.ejs');
});
// qrcode screen
app.get('/admin/qr', function(req, res) {
  res.render('index.ejs');
  id = uuid.v4().split('-').join('');
  console.log("[GET] /" + id);
});
app.get("/", function(req, res) {
  res.render("jump.ejs");
});

// not found
app.get('/:id', function(req, res) {
  if (req.params.id) {
    res.render('notfound.ejs');
  }
});

// user control screen
app.get('/control/:id', function(req, res) {
  if (req.params.id == id) {
    res.render('app.ejs');
    id_before = id;
    console.log("[GET] /control/" + id);
  } else if (req.params.id == id_before) {
    res.render('thankyou.ejs');
  } else {
    res.render('notfound.ejs');
  }
});

//socket.io
var buf = "";
io.on('connection', function(socket) {
  socket.on('ras', function(data) {
  	var buf=data;
  	fs.write(fd, data, null, data.length, 0);
  });
  socket.on("reload", function(data) {
    io.emit("load", data);
  });
  socket.emit("qrcode", id);
});

//server listen
http.listen(1337, function() {
  console.log('Node app listening...');
});
