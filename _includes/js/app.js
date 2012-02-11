var searchTerm = 'Jeremy Lin';

// TODO: Move this into the liveTwitter plugin object.
var tweetStream = [];

$("#tweet-holder").liveTwitter(searchTerm);

setInterval(function() {
  var moveTweet = tweetStream.pop();
  $('#tweet-sidebar').prepend((moveTweet.node).hide().fadeIn());
  console.log(moveTweet);
}, 3000);


/* SET UP SOUND */
soundManager.flashVersion = (window.location.toString().match(/#flash8/i)?8:9);
if (soundManager.flashVersion != 8) {
  soundManager.useHighPerformance = true;
  soundManager.useFastPolling = true;
}
soundManager.url = '../files/notes'; // path to load SWF from (overriding default)
soundManager.bgcolor = '#333333';
soundManager.wmode = 'transparent';
soundManager.debugMode = false;
soundManager.consoleOnly = false;
soundManager.useFlashBlock = true;

soundManager.onready(function() {
  console.log('SoundManager ready!');
  soundManager.play();
});
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