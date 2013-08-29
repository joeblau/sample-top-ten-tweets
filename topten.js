// Developed by Joseph Blau - josephblau@gmail.com
// 
// ** Requires **
// NodeJS - http://nodejs.org/
// node-twitter - https://github.com/gasi/node-twitter
// Node-Hashish - https://github.com/substack/node-hashish
//
// ** Instructions **
// # node topten.js
//
// ** Sample Output **
// Top Ten Trending Topics In Past 30 Seconds
// 1   - woofuckinghoo
// 1   - yum
// 1   - yune
// 1   - zaynmeetzaynmalikarmy
// 1   - ÓTIMO
// 1   - 頭にエアをつけるとションボリする
// 2   - replacesongnameswithcurry
// 2   - tienerthings
// 2   - こうないしゃせいを変換させる事で自分が変態かそうじゃないかが分かるらしい
// 2   - 同じ声優の台詞を混ぜる

var sys = require('util');
var Twitter = require('twitter');
var Hash = require('hashish');
var debug = false;
var secondsBetweenPrinting = 30;

var trendingHash = Hash();
var twitter = new Twitter({
    consumer_key: '',
    consumer_secret: '',
    access_token_key: '',
    access_token_secret: ''
});

twitter.stream('statuses/sample', function(stream) {
    stream.on('data', function (tweet) {
      // sys.puts(sys.inspect(tweet));
      try {
        if (tweet.entities.hashtags.length > 0){
          for (hashtagobj in tweet.entities.hashtags){
            if (debug) console.log("stream::Hashtag "+tweet.entities.hashtags[hashtagobj].text);
            var hahstag = tweet.entities.hashtags[hashtagobj].text.toLowerCase();
            // If key is already in hashtag list, remove it from the hashtag list and increment it's count in the dictionary    
            if (trendingHash.has(hahstag)){
              if (debug) console.log("stream::HashtagExists - "+hahstag);
              var tally = trendingHash.valuesAt(hahstag) + 1;
              var obj = {};
              obj[hahstag] = tally;
              trendingHash.update(obj);
            } else {
              var obj = {};
              obj[hahstag] = 1;
              trendingHash.update(obj);
            }
          }
        }
      } catch (err){}
    });
});
// Loop for printing out tweets and clearing hashtable
setInterval(function() {
  if (trendingHash.size > 0){
    var frequencyList = new Array(trendingHash.size);
    var startIndex = (frequencyList.length < 10)?0:frequencyList.length-10;
    var counter = 0;
    // Assign each hash key/value to a location in an array
    trendingHash.forEach(function(x, key) {
      frequencyList[counter] = {freq:x, ht:key};
      counter++;
    });
    // Sort the array based on frequency
    frequencyList.sort(function(a, b) {return a.freq - b.freq;});
    sys.puts('Top Ten Trending Topics In Past '+secondsBetweenPrinting+' Seconds');
    if (debug) console.log('setInterval::CheckStartIndex - '+startIndex +' == ' + frequencyList.length);
    for (idx=startIndex; idx<frequencyList.length;idx++){
      sys.puts(frequencyList[idx].freq + '\t - ' + frequencyList[idx].ht);
    }
    trendingHash = Hash();
  } else {
    sys.puts('No Trending Topics Added in Past '+secondsBetweenPrinting+' Seconds')
  }
}, secondsBetweenPrinting*1000);
