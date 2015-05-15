describe('AuthController', function () {
  var $scope, $rootScope, $location, $window, $httpBackend, createController, Auth;

  // using angular mocks, we can inject the injector
  // to retrieve our dependencies
  beforeEach(module('hack'));
  beforeEach(inject(function($injector) {

      // mock out our dependencies
      $rootScope = $injector.get('$rootScope');
      $location = $injector.get('$location');
      $window = $injector.get('$window');
      $httpBackend = $injector.get('$httpBackend');
      Auth = $injector.get('Auth');
      $scope = $rootScope.$new();

      var $controller = $injector.get('$controller');


      // used to create our AuthController for testing
      createController = function () {
        return $controller('AuthController', {
          $scope: $scope,
          $window: $window,
          $location: $location,
          Auth: Auth
        });
      };

      createController();
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
      $window.localStorage.removeItem('com.hack');
    });

    it('should have a signup method', function() {
      expect($scope.signup).to.be.a('function');
    });

    it('should create username in localStorage after signup', function() {
      // create a fake JWT for auth
      var user = 'foobar';

      // make a 'fake' request to the server, not really going to our server
      $httpBackend.whenPOST('/api/users/signup').respond({user: user});
      $httpBackend.expectPOST('/api/users/signup');
      $scope.signup();
      $httpBackend.flush();
      expect($window.localStorage.getItem('com.hack')).to.be(user);
    });

    it('should have a signin method', function() {
      expect($scope.signin).to.be.a('function');
    });

    it('should store followers in localStorage after signin', function() {
      // create a fake JWT for auth
      var followers = 'sjj232hwjhr3urw90rof';
      $httpBackend.whenPOST('/api/users/signin').respond(followers);
      $httpBackend.expectPOST('/api/users/signin');
      $scope.signin();
      $httpBackend.flush();
      expect($window.localStorage.getItem('hfUsers')).to.be(followers);
    });

    it('should remove token from localstorage after signout', function() {
      // create a fake JWT for auth
      var user = 'sjj232hwjhr3urw90rof';
      $httpBackend.whenPOST('/api/users/signin').respond(user);
      $httpBackend.expectPOST('/api/users/signin');
      $scope.signin();
      $httpBackend.flush();
      $scope.logout();
      expect($window.localStorage.getItem('.com.hack')).to.be(null);
    });

});