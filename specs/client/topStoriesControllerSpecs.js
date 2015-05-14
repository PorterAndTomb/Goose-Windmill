describe('TopStoriesController', function () {
  var $scope, $rootScope, createController, Links, $httpBackend;

  // using angular mocks, we can inject the injector
  // to retrieve our dependencies
  beforeEach(module('hack'));
  beforeEach(inject(function($injector) {

    // mock out our dependencies
    $rootScope = $injector.get('$rootScope');
    $httpBackend = $injector.get('$httpBackend');
    Links = $injector.get('Links');
    Followers = $injector.get('Followers');
    $scope = $rootScope.$new();

    var $controller = $injector.get('$controller');

    createController = function () {
      return $controller('TopStoriesController', {
        $scope: $scope,
        Links: Links,
        Followers: Followers
      });
    };
  }));

  // it('should have a data property on the $scope', function() {
  //   createController();
  //   expect($scope.data).to.be.an('object');
  // });

  // it('should have a getLinks method on the $scope', function () {
  //   createController();
  //   // console.log('----------------------RESULT OF GET LINKS:' + $scope.getLinks());
  //   expect($scope.getLinks).to.be.a('function');
  // });
  
  // it('should call getLinks() when controller is loaded', function () {
  //   var mockLinks = [{},{},{}];
  //   $httpBackend.whenGET("/api/links").respond(mockLinks);
  //   $httpBackend.expectGET("/api/links");
  //   console.log('----------------------MOCKLINKS: '+JSON.stringify(mockLinks));
  //   createController();
  //   console.log('----------------------RESULT OF GET LINKS AFTER MOCKLINKS:' + JSON.stringify($scope.getLinks()));
  //   $httpBackend.flush();
  //   expect($scope.data.links).to.eql(mockLinks);
  // });
});
