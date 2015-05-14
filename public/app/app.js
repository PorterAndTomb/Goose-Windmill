angular.module('hack', [
  'hack.topStories',
  'hack.askStories',
  'hack.showStories',
  'hack.personal',
  'hack.currentlyFollowing',
  'hack.linkService',
  'hack.authService',
  'hack.followService',
  'hack.tabs',
  'hack.auth',
  'ngRoute',
  'angular-inview'
])

.config(function($routeProvider, $httpProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'app/topStories/topStories.html',
      controller: 'TopStoriesController'
    })
    .when('/personal', {
      templateUrl: 'app/personal/personal.html',
      controller: 'PersonalController'
    })
    .when('/ask', {
      templateUrl: 'app/ask/ask.html',
      controller: 'AskController'
    })
    .when('/show', {
      templateUrl: 'app/show/show.html',
      controller: 'ShowController'
    })
    .otherwise({
      redirectTo: '/'
    });
})

.filter('fromNow', function(){
  return function(date){
    return humanized_time_span(new Date(date));
  }
})

.filter('htmlsafe', ['$sce', function ($sce) {
  return function (text) {
    return $sce.trustAsHtml(text);
  };
}])

.directive('rotate', function () {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      scope.$watch(attrs.degrees, function (rotateDegrees) {
        var r = 'rotate(' + rotateDegrees + 'deg)';
        console.log(r);
        element.css({
          '-moz-transform': r,
          '-webkit-transform': r,
          '-o-transform': r,
          '-ms-transform': r
        });
      });
    }
  }
});

