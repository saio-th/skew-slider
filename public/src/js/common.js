function slickFunc () {
  $('.slider').slick({
    dots: true
  });
}


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
