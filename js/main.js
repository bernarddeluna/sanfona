$(document).ready(function() {

// =================================
// Variables

  // Screen sizes
  var oldScreenSize = window.innerWidth,
      newScreenSize = 0;

  // Audio
  var audioIncrease = $('#sanfona-increase'),
      audioDecrease = $('#sanfona-decrease');

  var dialog = $('.dialog');

// =====================================
// Change audio according to screen size

  window.onresize = resize;

  function resize() {

    dialog.fadeOut();

    newScreenSize = window.innerWidth;

    // Increasing screen size
    if (newScreenSize > oldScreenSize) {
      audioIncrease.addClass('active');
      audioDecrease.removeClass('active');
    }
    // Decreasing screen size
    else if (newScreenSize < oldScreenSize) {
      audioDecrease.addClass('active');
      audioIncrease.removeClass('active');
    }

    oldScreenSize = newScreenSize;

    toggleAudio();

  }

  function toggleAudio() {

    if (audioIncrease.hasClass('active')) {
      audioIncrease[0].play();
      audioDecrease[0].pause();
      audioDecrease[0].currentTime = 0;
    } else {
      audioDecrease[0].play();
      audioIncrease[0].pause();
      audioIncrease[0].currentTime = 0;
    }

  }

// ====================================
// Play audio according to resize event

  $(window).bind('resizestop', function () {
      turnOff();
  });

  function turnOff() {

    if (audioIncrease.hasClass('active')) {
      audioIncrease[0].pause();
      audioIncrease[0].currentTime = 0;
    } else {
      audioDecrease[0].pause();
      audioDecrease[0].currentTime = 0;
    }

  }

});