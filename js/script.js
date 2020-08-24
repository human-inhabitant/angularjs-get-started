'use strict';

(function() {
  angular.module( 'gitHubViewer', [] );

  angular
    .module( 'gitHubViewer' )
    .controller( 'MainController', ['$scope', '$http', function( $scope, $http ) {

      const onUserComplete = function( response ) {
        $scope.user = response.data;
      };
      const onError = function( reason ) {
        $scope.error = 'Could not fetch the user.';
      };
      $http
        .get( 'https://api.github.com/users/timbl' )
        .then( onUserComplete, onError )
      ;

      $scope.message = 'Hello, AngularJS...';

    }]);
})();


