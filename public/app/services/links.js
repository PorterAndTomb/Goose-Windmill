angular.module('hack.linkService', [])

.factory('Links', function($http, $interval, Followers) {
  var personalStories = [];
  var topStories = [];
  var askStories = [];
  var showStories = [];

  topStories.url = '/api/cache/topStories';
  askStories.url = '/api/cache/askStories';
  showStories.url = '/api/cache/showStories';

  var getStories = function(cache) {

    return $http({
      method: 'GET',
      url: cache.url
    })
    .then(function(resp) {

      // Very important to not point cache to a new array.
      // Instead, clear out the array, then push all the new
      // datum in place. There are pointers pointing to this array.
      cache.splice(0, cache.length);
      cache.push.apply(cache, resp.data);
    });
  };

  var getPersonalStories = function(usernames){
    var query = 'http://hn.algolia.com/api/v1/search_by_date?hitsPerPage=500&tagFilters=(story,comment),(';
    var csv = arrToCSV(usernames);

    query += csv + ')';

    return $http({
      method: 'GET',
      url: query
    })
    .then(function(resp) {
      angular.forEach(resp.data.hits, function(item){
        // HN Comments don't have a title. So flag them as a comment.
        // This will come in handy when we decide how to render each item.
        if(item.title === null){
          item.isComment = true;
        }
      });

      // Very important to not point personalStories to a new array.
      // Instead, clear out the array, then push all the new
      // datum in place. There are pointers pointing to this array.
      personalStories.splice(0, personalStories.length);
      personalStories.push.apply(personalStories, resp.data.hits);
    });
  };

  var arrToCSV = function(arr){
    var holder = [];

    for(var i = 0; i < arr.length; i++){
      holder.push('author_' + arr[i]);
    }

    return holder.join(',');
  };

  var init = function(){
    getPersonalStories(Followers.following);
    getStories(topStories);
    getStories(askStories);
    getStories(showStories);

    $interval(function(){
      getPersonalStories(Followers.following);
      getStories(topStories);
      getStories(askStories);
      getStories(showStories);
    }, 300000);
  };

  init();

  return {
    getTopStories: getStories.bind(null, topStories),
    getAskStories: getStories.bind(null, askStories),
    getShowStories: getStories.bind(null, showStories),
    getPersonalStories: getPersonalStories,
    personalStories: personalStories,
    topStories: topStories,
    askStories: askStories,
    showStories: showStories
  };
});


