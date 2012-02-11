var searchTerm = 'Jeremy Lin';
var muted = false;

// TODO: Move this into the liveTwitter plugin object.
// I KNOW I KNOW I ATTACHED IT TO WINDOW BUT THIS NEEDS TO FINISH.
window.tweetStream = new Array();
var moveTweet;

var musicMeasure = new Array();
var refreshId;
var TICK_LENGTHS = {
  shortest: 500,
  shorter: 1000,
  normal: 2000,
  slow: 2500,
  slowest: 5000
}
var RATE_CHANGE_INTERVAL = 5000;

var tickLength = TICK_LENGTHS.normal;

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

  setInterval(function() {
    var tslength = tweetStream.length;
    if (tslength > 70 && TICK_LENGTHS.shortest != tickLength) {
      changeRate(TICK_LENGTHS.shortest);
      console.log("Shortening tick to 500");
    } else if (tslength > 40 && tslength <= 70 && TICK_LENGTHS.shorter != tickLength) {
      changeRate(TICK_LENGTHS.shorter);
      console.log("Shortening tick to 1000");
    } else if (tslength > 10 && tslength <= 40 && TICK_LENGTHS.slowest != tickLength) {
      changeRate(TICK_LENGTHS.slowest);
    } 
  }, RATE_CHANGE_INTERVAL);
});

function musicTick() {
  // Stop everything!
  soundManager.stopAll();
  if(tweetStream.length > 0) {
    var moveTweet = tweetStream.pop();
    $('#tweet-sidebar').prepend((moveTweet.node).hide().fadeIn()); 

    console.log(moveTweet);

    if(!muted) {
      var noteTextLength = moveTweet['text'].split(' ').length%16 + 1; 
      var noteTime = moveTweet['created_at'].split(':')[1]%16 + 1;
      soundManager.play('note' + noteTextLength);
      soundManager.play('note' + noteTime);
      console.log('text length: ' + noteTextLength + ', time ' + noteTime);
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