(function($) {
  var gy = 0,
      speed = 40,
      flg = {
        ax: false,
        brake: false
      },
      socket = io("http://" + host + ":"+port);

  window.addEventListener("devicemotion", function(e) {
    var acc_g = e.accelerationIncludingGravity;
    gy = Math.floor(objToNumberFix(acc_g.y, 5) * 10);

    function objToNumberFix(obj, fix_deg) {
      return Number(obj).toFixed(fix_deg);
    }
  });
  $("#ax")[0].addEventListener('touchstart', _AtouchHandler, false);
  $("#ax")[0].addEventListener('touchend', _AtouchHandler, false);

  function _AtouchHandler(e) {
    e.preventDefault();
    if (e.type == "touchstart") {
      flg.ax = true;
      $(".upspeed-mp3")[0].play();
      $(".downspeed-mp3")[0].pause();
      $(".downspeed-mp3")[0].currentTime = 0;
    }
    if (e.type == "touchend") {
      flg.ax = false;
      $(".upspeed-mp3")[0].pause();
      $(".upspeed-mp3")[0].currentTime = 0;
      $(".downspeed-mp3")[0].play();
    }
  }
  (function ax_flg() {
    if (flg.ax) {
      setTimeout(function() {
        if (speed <= 95) {
          speed += 5;
        }
      }, 400);
    } else {
      setTimeout(function() {
        if (speed > 40) {
          speed -= 5;
        }
      }, 400);
    }
    setTimeout(function() {
      ax_flg();
    }, 400);
  })();

  $("#brake")[0].addEventListener('touchstart', _BtouchHandler, false);
  $("#brake")[0].addEventListener('touchend', _BtouchHandler, false);

  function _BtouchHandler(e) {
    e.preventDefault();
    if (e.type == "touchstart") {
      flg.brake = true;
      $(".upspeed-mp3")[0].pause();
      $(".upspeed-mp3")[0].currentTime = 0;
      $(".downspeed-mp3")[0].pause();
      $(".downspeed-mp3")[0].currentTime = 0;
      $(".brake-mp3")[0].play();
    }
    if (e.type == "touchend") {
      flg.brake = false;
    }
  }
  (function brake_flg() {
    if (flg.brake) {
      setTimeout(function() {
        speed-=50;
        if(speed<40){
          speed=39;
        }
      }, 400);
    }else{
      if (speed==39) {
        speed=40;
      }
    }
    setTimeout(function() {
      brake_flg();
    }, 400);
  })();

  var isLandscape = function(){
    if ((navigator.userAgent.indexOf('iPhone') > 0 && navigator.userAgent.indexOf('iPad') == -1) || navigator.userAgent.indexOf('iPod') > 0 || navigator.userAgent.indexOf('Android') > 0) {
      var orientation = window.orientation;
      if(orientation != 0){
        $(".sideWays").fadeOut();
        setTimeout(function(){
          guide();
        },500);
      }else{
        alert("横向きにしてください！");
      }
    }
  }

  function emit() {
    socket.on("load",function(data){
      console.log(data);
      if(data == "hoge"){
        speed = 40;
        window.location.reload();
        return;
      }
    });
    $(".pointer").css({
      transform: "rotate(" + (speed + 20) + "deg)"
    });
    var values = gy + "," + speed;
    socket.emit('ras', values);
    setTimeout(function() {
      emit();
    }, 100);
  };

  function guide() {
    $(".text").html("こっちがアクセル！<br/><br/>画面右側を押すと車が発車するよ！");
    $(".text").css({
      top: "5%",
      right: "3%"
    });
    $("#ax").addClass("guide");
    setTimeout(function () {
      $(".text").html("こっちがブレーキ！<br/><br/>画面左を押すと車が止まるよ！");
      $(".text").css({
        top: "5%",
        left: "3%"
      });
      $("#ax").removeClass("guide");
      $("#brake").addClass("guide");
      setTimeout(function () {
        $(".text").html("<br/>携帯を傾けて、ラジコンを操作しよう！！！<br/><br/>");
        $(".text").css({
          top: "5%",
          left: "30%"
        });
        $("#brake").removeClass("guide");
        $("#ax,#brake").addClass("guide");
        setTimeout(function () {
          $("#ax,#brake").removeClass("guide");
          $(".text").hide();
          $(".engine-btn").show();
        }, 5000);
      }, 5000);
    }, 5000);
  }

  //play menu
  $(".ok").on("click",function(){
    isLandscape();
    $(this).hide();
  });
  $(".engine-btn").on("click",function(){
    $(this).hide();
    $(".overlay").fadeOut();
    $(".start-mp3")[0].play();
    setTimeout(function(){
      emit();
      $(".start-mp3")[0].pause();
      $(".start-mp3")[0].currentTime = 0;
    },5000);
  });
})(jQuery);
