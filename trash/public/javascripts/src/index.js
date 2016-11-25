(function($) {
  function qr(qrcode) {
    $(".box").qrcode({
      render: 'image',
      size: 300,
      fill: '#ff1493',
      text: "http://" + host + ":"+ port +"/control/" + qrcode,
      radius: 0.5
    });
  }
  var socket = io("http://" + host + ":" + port);
  socket.on("load",function(data) {
    window.location.reload();
  });
  socket.on('qrcode', function(id) {
    qr(id);
  });

  setTimeout(function() {
    $(".box").animate({
      bottom: "0%"
    },1000);
  },500);

  $(".curtainR").animate({
    right: "-50%"
  },1500);
  $(".curtainL").animate({
    left: "-50%"
   },1500);

})(jQuery);
