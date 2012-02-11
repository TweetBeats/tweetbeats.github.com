var searchTerm = 'Jeremy Lin';

// TODO: Move this into the liveTwitter plugin object.
var tweetStream = [];

var musicMeasure = [];

//$("#tweet-holder").liveTwitter(searchTerm);
/*
setInterval(function() {
  var moveTweet = tweetStream.pop();
  $('#tweet-sidebar').prepend((moveTweet.node).hide().fadeIn());
  console.log(moveTweet);
}, 3000);
*/

soundManager.flashVersion = (window.location.toString().match(/#flash8/i)?8:9);
if (soundManager.flashVersion != 8) {
  console.log("Can use flash 9!");
  soundManager.useHighPerformance = true;
  soundManager.useFastPolling = true;
}
soundManager.url = '../files/'; // path to load SWF from (overriding default)
soundManager.bgcolor = '#333333';
soundManager.wmode = 'transparent';
soundManager.debugMode = false;
soundManager.consoleOnly = false;
soundManager.useFlashBlock = true;

soundManager.onready(function() {
  console.log('SoundManager ready!');
  for (var i = 1; i <= 16; i++) {

    // /files/notes/1.mp3, /2.mp3, etc.
    var urlString = '/files/notes/' + i + '.mp3';
    console.log(urlString);
    soundManager.createSound({
      id: 'note' + i,
      url: urlString
    }).load();
  }

  var musicTicker = musicTick();
});

function musicTick() {
  return window.setInterval(function() {
    soundManager.play('note' + Math.floor(Math.random()*15));
    soundManager.play('note' + Math.floor(Math.random()*15));
    soundManager.play('note' + Math.floor(Math.random()*15));
  }, 1000);
}

/*
$('#tweet-receiver').live('newtweet', function(e, data) {
  console.log(data);
});
*/
/* NOTES
72+24
69+24
67+24
65+24
62+24
60+24
69+12
67+12
65+12
62+12
69
67
65
62
60
*/