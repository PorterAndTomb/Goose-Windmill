var Cache = require('./cacheModel.js');

var dataRes = function(response, err,results){
    if(!err){
      response.status(200).json(results);
    }else{
      response.status(500).send(err);
    }
};

module.exports = {
  topStories: function(request, response) {
    Cache.getTopStories(dataRes.bind(null, response));
  },
  showStories: function(request, response) {
    Cache.getShowStories(dataRes.bind(null, response));
  },
  askStories: function(request, response) {
    Cache.getAskStories(dataRes.bind(null, response));
  }
};

// Initialize and refresh the top story data every two minutes
Cache.updateTopStories();
Cache.updateShowStories();
Cache.updateAskStories();

setInterval(Cache.updateTopStories, 120000);
setInterval(Cache.updateShowStories, 120000);
setInterval(Cache.updateAskStories, 120000);
