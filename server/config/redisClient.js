const redis = require("redis");

let redisClient = redis.createClient()
redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisClient.connect().then(res=>{
    console.log("Connected Successfully")
}).catch(err=>{
    console.log(err);
});

module.exports = redisClient;
