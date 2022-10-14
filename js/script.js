  var countDownFunction = setInterval(function(){
  var countDownDate = new Date("October 1, 2022 11:59:59").getTime();
   var now = new Date().getTime();
   var distance = countDownDate - now;
   var days =  Math.floor(distance / (1000 * 3600 * 24));
   var hours =  Math.floor((distance % (1000 * 3600 * 24))/(1000 * 3600 ));
   var minutes  = Math.floor((distance%(1000*60*60))/(1000*60));
   var seconds = Math.floor((distance%(1000*60))/1000);
   if (days < 10){
      days = "0" + days;
   }   
   if (hours < 10){
      hours = "0" + hours;
   }
   if (minutes < 10){
      minutes = "0" + minutes;
   } 
   if (seconds < 10){
      seconds = "0" + seconds;
   }        
   $('.cost__countdown').html(days + ':' + hours + ":" + minutes + ":" + seconds);
   if(distance <= 0){
     $('.cost__countdown').html('Время вышло');
   }                                       
  }, 1000);

$(document).ready(function () {
   $(window).scroll(function (event) {
    var scroll = $(window).scrollTop();
        if(scroll>10){
            $('.header').addClass('scroll');
        }else{
            $('.header').removeClass('scroll');
        }
    });      
});

$(document).ready(function () {
   $('.header__burger').click(function (event) {
      $('.header__burger, .menu').toggleClass('active');
       $('body').toggleClass('lock');
   });
    $('.menu__link').click(function (event) {
      $('.header__burger, .menu').removeClass('active');
       $('body').removeClass('lock');
   });    
    $('.menu__item:first-child .menu__link').click(function (event) {
      $('.header__burger, .menu').addClass('active');
       $('html, body').addClass('lock');
   });     
   $('.spoiler__title').click(function(event){
      $(this).toggleClass('active').next().slideToggle(300);
      $('.spoiler__body').toggleClass('active');
   })
    $('.menu__link').mouseenter(function (event) {
      $(this).parent().addClass('hover');
   });  
   $('.menu__item').mouseleave(function (event) {  
    $(this).removeClass('hover');
   });
   $('.menu__link').click(function (event) {  
    if ($(window).width() <= '991'){
      $(this).next('ul').slideToggle();
    }
   });
   $('.header__burger').click(function (event) {
      if(!$(this).hasClass('.active'))
      {
        $('.menu__item').removeClass('active');
      }
   });          
});


//    scriptLoader(["https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3A4f5c91a8eb0dbc72b0ba72dbc0fbf858152de70cb3c810200791a346b3c47617&amp;width=100%25&amp;lang=ru_RU&amp;scroll=true"], function(){


function send(event, php){
console.log("Отправка запроса");
event.preventDefault ? event.preventDefault() : event.returnValue = false;
var req = new XMLHttpRequest();
req.open('POST', php, true);
req.onload = function() {
  if (req.status >= 200 && req.status < 400) {
    json = JSON.parse(this.response); // Ебанный internet explorer 11
      console.log(json);
        
      // ЗДЕСЬ УКАЗЫВАЕМ ДЕЙСТВИЯ В СЛУЧАЕ УСПЕХА ИЛИ НЕУДАЧИ
      if (json.result == "success") {
        // Если сообщение отправлено
        alert("Ваше сообщение отправлено");
      } else {
        // Если произошла ошибка
        alert("Ошибка. Сообщение не отправлено");
      }
    // Если не удалось связаться с php файлом
    } else {alert("Ошибка сервера. Номер: "+req.status);}}; 

// Если не удалось отправить запрос. Стоит блок на хостинге
req.onerror = function() {alert("Ошибка отправки запроса"); 
  
};
req.send(new FormData(event.target));
}




