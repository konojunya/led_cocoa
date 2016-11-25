(function($){
  var socket = io("http://" + host + ":" + port);
  $(".btn").on("click", function() {
    socket.emit("reload","hoge");
  });
})(jQuery);
