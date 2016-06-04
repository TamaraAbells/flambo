const Twit   = require('twit');
const moment = require('moment');


const tweetToNewsItem = tweet => {
    //console.log(tweet);
    const createdAt = new Date(tweet.created_at);

    return {
        content:    tweet.text,
        externalId: tweet.id,
        createdAt:  moment(createdAt).toISOString(),
    };

};


module.exports = (config) => {
    const T = new Twit(config);

    return {
        load(config) {
            return new Promise((resolve, reject) => {
                T.get('statuses/user_timeline', {
                    screen_name: config.user,
                    include_rts: 'false',
                }, (err, data, res) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(data.map(tweetToNewsItem));
                    }
                });
            });
        }
    }
};