function slickFunc () {
  $('.slider').slick({
    dots: true
  });
}

//参考サイトのスライダー（https://www.ubsc.co.jp/）
// $(function(){
//   $('.js-mainvisual-front').slick({
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     arrows: false,
//     dots: false,
//     asNavFor: '.js-mainvisual-slider'
//   });
//   $('.js-mainvisual-slider').slick({
//     autoplay: true,
//     autoplaySpeed: 5000,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     arrows: false,
//     dots: false,
//     focusOnSelect: true,
//     pauseOnHover: false,
//     asNavFor: '.js-mainvisual-front'
//   });
// });



// --- ページの全データを読み込み後 ----------------------------------
$(window).on('load', function() {

});

// --- リサイズが走った場合 ----------------------------------------
$(window).on('resize', function(){

});

// --- DOM生成後 -----------------------------------------------
$(function(){

  slickFunc();

});
