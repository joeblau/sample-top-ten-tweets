# sample-top-ten-tweets

JavaScript Top Ten Tweet Intervalometer (Weekend Assignment).  This was my first node.js application.

## Install

1. Install node dependencies
```sh
npm install -d
node topten.js
```
2. Add your consumer keys into the file
```javascript
var twitter = new Twitter({
	consumer_key: '<--your consumer key-->',
	consumer_secret: '<--your consumer secret-->',
	access_token_key: '<--your access token key-->',
	access_token_secret: '<--your access token secret-->'
});
```

## Dependencies

1. [node-twitter](https://github.com/jdub/node-twitter) - Twitter API client library for node.js
2. [node-hashish](https://github.com/substack/node-hashish) - Hash data structure manipulation functions

## Sample Output

`topten.js` returns the the top 10 tweets over the last 30 seoconds every 30 seconds until you quit the application.
```
Top Ten Trending Topics In Past 30 Seconds
1   - woofuckinghoo
1   - yum
1   - yune
1   - zaynmeetzaynmalikarmy
1   - ÓTIMO
1   - 頭にエアをつけるとションボリする
2   - replacesongnameswithcurry
2   - tienerthings
2   - こうないしゃせいを変換させる事で自分が変態かそうじゃないかが分かるらしい
2   - 同じ声優の台詞を混ぜる
```

## Licnese
MIT