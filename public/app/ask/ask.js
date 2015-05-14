angular.module('hack.askStories', [])

.controller('AskController', function ($scope, $window, Links, Followers) {
  angular.extend($scope, Links);
  $scope.stories = Links.askStories;
  $scope.perPage = 30;
  $scope.index = $scope.perPage;

  $scope.currentlyFollowing = Followers.following;

  $scope.getData = function() {
    Links.getAskStories();
  };

  $scope.addUser = function(username) {
    Followers.addFollower(username);
  };

  $scope.getData();
});
