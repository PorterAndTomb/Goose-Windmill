angular.module('hack.showStories', [])

.controller('ShowController', function ($scope, $window, Links, Followers) {
  angular.extend($scope, Links);
  $scope.stories = Links.showStories;
  $scope.perPage = 30;
  $scope.index = $scope.perPage;

  $scope.currentlyFollowing = Followers.following;

  $scope.getData = function() {
    Links.getShowStories();
  };

  $scope.addUser = function(username) {
    Followers.addFollower(username);
  };

  $scope.getData();
});
