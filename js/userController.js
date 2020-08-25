'use strict';

(function(){
  angular.module( 'githubViewer' );
  angular
    .module( 'githubViewer' )
    .controller( 'UserController', ['$scope', 'github', '$routeParams', UserController] )
  ;

  function UserController( $scope, github, $routeParams ) {
    $scope.username = $routeParams.username;
    $scope.repoSortOrder = '-stargazers_count';
    github.getUser( $scope.username ).then( onUserComplete, onError );

    function onRepos( data ) {
      $scope.repos = data;
    }
    function onUserComplete( data ) {
      $scope.user = data;
      github.getRepos($scope.user).then( onRepos, onError );
    }
    function onError( reason ) {
      $scope.error = 'Could not fetch data.';
    }
  };

})();
