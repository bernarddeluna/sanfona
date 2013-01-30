$(document).ready(function() {

// =================================
// Variables

  // Screen sizes
  var oldScreenSize = window.innerWidth,
      newScreenSize = 0;

  // Audio
  var audio = $('#sanfona-audio'),
      audioPlayer = audio[0],
      currentMusic = '';

  audioPlayer.volume = 1;

// =====================================
// Change audio according to screen size

  window.onresize = resize;

  function resize() {

    newScreenSize = window.innerWidth;

    // Increasing screen size
    if (newScreenSize > oldScreenSize) {
      changeAudio('audio/0-increasing.wav');
    }
    // Decreasing screen size
    else if (newScreenSize < oldScreenSize) {
      changeAudio('audio/0-decreasing.wav');
    }

    oldScreenSize = newScreenSize;

  }

  function changeAudio(music) {

    if (currentMusic != music) {
      currentMusic = music;
      $(audio[0]).attr('src', music);
    }

    turnOn();

  }

// ====================================
// Play audio according to resize event

  $(window).bind('resizestop', function () {
      turnOff();
  });

  function turnOn() {
    audioPlayer.play();
  }

  function turnOff() {
    audioPlayer.pause();
    audioPlayer.currentTime = 0;
  }

});