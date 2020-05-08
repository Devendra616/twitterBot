const Twit = require('twit');
const fs = require('fs');
require('dotenv').config({path: __dirname + '/.env'});

const T = new Twit({
    consumer_key: process.env.APPLICATION_CONSUMER_KEY,
    consumer_secret: process.env.APPLICATION_CONSUMER_SECRET,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
  });

// start stream and track tweets
const stream = T.stream('statuses/filter', {track: '#100DaysOfCode'});

// use this to log errors from requests
function responseCallback (err, data, response) {
    console.log(err);
    if(!err) {
      console.log("retweeted",data);
    }
   }
   
// event handler
stream.on('tweet', tweet => {
    // retweet
    T.post('statuses/retweet/:id', {id: tweet.id_str}, responseCallback);
    // like
    T.post('favorites/create', {id: tweet.id_str}, responseCallback);
});

// Set up your search parameters
var params = {
  q: '#100DaysOfCode',
  count: 10,
  result_type: 'recent',
  lang: 'en'
}
