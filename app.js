var request = require('request');
var cheerio = require('cheerio');
var URL = require('url-parse');

var START_URL = process.env.URL;
var SEARCH_WORD = process.env.WORDS;

var wordFrequency = {}

function visitPage (url, words) {
    console.log("Visiting page " + url);
    request(url, function (error, response, body) {
        if (response && response.statusCode !== 200) {
            console.log("Status code: " + response.statusCode);
            console.log("Website is down", error);
            return;
        }
        if (body) {
            var $ = cheerio.load(body);
            var bodyText = $('html > body').text().toLowerCase();
            for (let word of words) {
                addWordFrequecy(bodyText, word);
            }
            console.log(bodyText)
        }
        console.log(wordFrequency)
        return;
    });
}

function addWordFrequecy(bodyText, word) {
    wordFrequency[word] = bodyText.split(word.toLowerCase()).length - 1;
    return;
}

function crawl() {
    var page = START_URL;
    let words = SEARCH_WORD.split(",");
    visitPage(page, words);
}

crawl();


