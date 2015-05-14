var request = require('request');

//In server memory of Hacker News current top stories
var topStories = [];
var showStories = [];
var askStories = [];

//Names of the caches for error messages
topStories.name = "Top Stories";
showStories.name = "Show HN Stories";
askStories.name = "Ask HN Stories";

//Urls to get story orders
topStories.url = "https://hacker-news.firebaseio.com/v0/topstories.json";
showStories.url = "https://hacker-news.firebaseio.com/v0/showstories.json";
askStories.url = " https://hacker-news.firebaseio.com/v0/askstories.json";

var getStories = function (cache, callback) {
    if (cache.length) {
      callback(null,cache);
    } else {
      callback(new Error(cache.name + ' not found!'));
    }
}

var updateStories = function (cache) {
    // Configure API request
    var options = {
      url: cache.url,
      method: 'GET',
      headers: headers
    };

    // Perform the firebase API request
    request(options, function(error, response, html){
      var data = JSON.parse(response.body);
      var storyOrder = data;

      // Generate algolia search API URL
      var storyUrl = 'http://hn.algolia.com/api/v1/search?hitsPerPage=500&tagFilters=story,(';
      var storyUrlIds = [];
      for(var i = 0; i < storyOrder.length; i++) {
        storyUrlIds.push('story_' + storyOrder[i]);
      }
      storyUrl += storyUrlIds.join(',') + ')';
      options.url = storyUrl;

      request(options, function(error, response, html){
        // Reorder the retrieved stories to match the hacker news front page

        var data = JSON.parse(response.body);
        var index;
        var indexMap = data.hits.map(function(obj) {
          return obj.objectID;
        });

        // Clear out previous top stories
        cache.length = 0;

        //storyOrder matches hacker news front page. Find data related to the story ID
        //in the incoming response data
        for(var i = 0; i < storyOrder.length; i++) {
          index = indexMap.indexOf(String(storyOrder[i]));
          var item = data.hits[index];
          if(item){
            cache.push(data.hits[index]);
          }
        }
        console.log(cache.name + " Updated");
      });
    });
};

//Set headers
var headers = {
  'User-Agent': 'Hacker Feed',
  'Content-Type': 'application/json'
};

module.exports = {
  //Access function for model data
  getTopStories: getStories.bind(null, topStories),
  getShowStories: getStories.bind(null, showStories),
  getAskStories: getStories.bind(null, askStories),

  // The top news stories data is retrieved from the Algolia API, however it does not include
  // Hacker News' ranking algorithm. The data retrieved from Algolia is sorted according to the
  // ranking on the firebase API

  updateTopStories: updateStories.bind(null, topStories),
  updateShowStories: updateStories.bind(null, showStories),
  updateAskStories: updateStories.bind(null, askStories)
};
