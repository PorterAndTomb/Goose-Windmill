angular.module('hack.auth', [])

.controller('AuthController', ["$scope", "$window", "$location", "Auth", "Followers", 
  function ($scope, $window, $location, Auth, Followers) {
  
  $scope.user = {};
  $scope.newUser = {};
  $scope.loggedIn = Auth.isAuth();

  $scope.signin = function () {
    Auth.signin($scope.user)
      .then(function (followers) {
        console.log(JSON.stringify(followers));
        $window.localStorage.setItem('com.hack', followers);
        $window.localStorage.setItem('hfUsers', followers)

        Followers.localToArr();

        $scope.loggedIn = true;
        $scope.user = {};
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  $scope.signup = function () {
    $scope.newUser.following = Followers.following.join(',');

    Auth.signup($scope.newUser)
      .then(function (data) {
        $window.localStorage.setItem('com.hack', data.user);

        $scope.loggedIn = true;
        $scope.newUser = {};
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  $scope.logout = function () {
    Auth.signout();
    $scope.loggedIn = false;
  }
}]);
