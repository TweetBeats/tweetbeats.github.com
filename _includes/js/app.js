var searchTerm = 'Jeremy Lin';
var muted = false;

// TODO: Move this into the liveTwitter plugin object.
// I KNOW I KNOW I ATTACHED IT TO WINDOW BUT THIS NEEDS TO FINISH.
window.tweetStream = new Array();
var moveTweet;

var musicMeasure = new Array();
var refreshId;
var TICK_LENGTHS = {
  shortest: 100,
  shorter: 250,
  normal: 500,
  slow: 1000,
  slowest: 2500
}

var numTicks = 0;
var METRONOME_TICK_LENGTHS = {
  fast: 5,
  normal: 10,
  slow: 20
}
var metronomeTick = METRONOME_TICK_LENGTHS.normal; // Notes every x seconds / 10. 50 is 5 seconds, 5 is .5

var METRONOME_COUNT = 4;
var metronomePos = 1;

var chordTick = 30;

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

  setUpControls();

  $("#tweet-holder").liveTwitter(searchTerm);
  var musicTicker = musicTick();
});

function musicTick() {
  return setInterval(function(){

    var notesToPlay = new Array();
    numTicks++;


    var notesToPlay = playChords();
    notesToPlay = notesToPlay.concat(playMetronomeBeat());

    if (notesToPlay.length > 0) {
      soundManager.stopAll();
      $.each(notesToPlay, function(){
        soundManager.play(this);        
      });
    }

    checkMetronomeRate();
  }, 100)
}

function playChords() {
  var arr = new Array();
  if(numTicks%metronomeTick == 0 && metronomePos%2 == 0) {
    var moveTweet = tweetStream.pop();
    if(moveTweet != undefined) {
      $('#tweet-sidebar').prepend((moveTweet.node).hide().fadeIn());
      $('#debug').text = moveTweet['text'].split(' ').length%16 + 1;
      var noteLength = moveTweet['text'].split(' ').length%16 + 1
      arr.push('note' + noteLength);    
    }
  }
  return arr;
};

function playMetronomeBeat() {
  var arr = new Array();
    if(numTicks%metronomeTick == 0) {

      var selectorString = "#metro-" + metronomePos + " .btn-info";
     $(selectorString).each(function (i) {
        arr.push($(this).attr('note'));
      });

      metronomePos++;
      if (METRONOME_COUNT < metronomePos) {
        metronomePos = 1;
      }
    }

  return arr;  
}

function checkMetronomeRate(){
  var tslength = tweetStream.length;
  if (tslength > 70 && metronomeTick != tickLength && metronomeTick != METRONOME_TICK_LENGTHS.fast) {
    console.log("Shortening tick to 5");
    metronomeTick = METRONOME_TICK_LENGTHS.fast;
  } else if (tslength > 40 && tslength <= 70 && metronomeTick != METRONOME_TICK_LENGTHS.normal) {
    console.log("Shortening tick to 10");
    metronomeTick = METRONOME_TICK_LENGTHS.normal;
  } else if (tslength > 10 && tslength <= 40 && metronomeTick != METRONOME_TICK_LENGTHS.slow) {
    metronomeTick = METRONOME_TICK_LENGTHS.slow;
  }
}

function setUpControls() {
  $('#metro-controls a').click(function(){
    $(this).toggleClass('btn-info');
  });

  $('#changeSearch').click(function(){
    searchTerm = $('#changeInput').val();
    console.log("Changing twitter search to " + searchTerm);
    $('#tweet-holder').liveTwitter(searchTerm).each(function(){
      this.twitter.clear();
    });
    $('#search-term').text(searchTerm).hide().fadeIn();
  });
}

function musicTickOld() {
  // Stop everything!
  soundManager.stopAll();
  if(tweetStream.length > 0) {
    var moveTweet = tweetStream.pop();
    $('#tweet-sidebar').prepend((moveTweet.node).hide().fadeIn()); 

    console.log(moveTweet);

    if(!muted) {
      // First, set a beat

      /*
      var noteTextLength = moveTweet['text'].split(' ').length%16 + 1; 
      var noteMinute = moveTweet['created_at'].split(':')[1]%16 + 1;
      var noteHashTag = moveTweet['text'].split('#').length;
      soundManager.play('note' + noteTextLength);
      soundManager.play('note' + noteMinute);
      soundManager.play('note' + noteHashTag);

      console.log('text length: ' + noteTextLength + ', minute ' + noteMinute + ', hash ' + noteHashTag);
      */
    }
  }

  // Save timeout to use again
  refreshId = setTimeout(function(){
    musicTick();
  }, tickLength);
}

function changeRateOld(rate) {
  rate = rate ||TICK_LENGTHS.normal;
  clearTimeout(refreshId);
  tickLength = rate;
  musicTick();
  return "Changed rate to " + tickLength/1000 + " seconds";
}