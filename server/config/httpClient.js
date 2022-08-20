const axios = require("axios");
const axiosRetry = require('axios-retry');
const baseUrl = process.env.BASE_URL;

require('dotenv').config();

const axiosInstance = axios.create({
    baseURL: baseUrl,
    header: { 'Access-Control-Allow_Origin': '*' }
})

axiosRetry(axiosInstance, {
    retries: 2, // number of retries
    retryDelay: (retryCount) => {
        console.log(`retry attempt: ${retryCount}`);
        return retryCount * 2000; // time interval between retries
    },
    retryCondition: (error) => {
        // if retry condition is not specified, by default idempotent requests are retried
        return console.log(error);
       // return error.response.status === 503;
    },
});

module.exports = axiosInstance;