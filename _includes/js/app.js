var searchTerm = 'Jeremy Lin';
var muted = false;

// TODO: Move this into the liveTwitter plugin object.
// I KNOW I KNOW I ATTACHED IT TO WINDOW BUT THIS NEEDS TO FINISH.
window.tweetStream = new Array();
var moveTweet;

var musicMeasure = new Array();
var refreshId;
var tickLength = 3000; // num seconds * 1000

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

  $("#tweet-holder").liveTwitter(searchTerm);
  var musicTicker = musicTick();
});

function musicTick() {
  if(tweetStream.length > 0) {
    var moveTweet = tweetStream.pop();
    conso
    $('#tweet-sidebar').prepend((moveTweet.node).hide().fadeIn()); 

    if(!muted) {
      soundManager.play('note' + Math.floor(Math.random()*15)); 
    }
  }

  // Save timeout to use again
  refreshId = setTimeout(function(){
    musicTick();
  }, tickLength);
}

function changeRate(rate) {
  rate = rate || 1000;
  clearTimeout(refreshId);
  tickLength = rate;
  musicTick();
  return "Changed rate to " + tickLength/1000 + " seconds";
}

/*
$('#tweet-receiver').live('newtweet', function(e, data) {
  console.log(data);
});
*/