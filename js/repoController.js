'use strict';

(function(){
  angular
    .module( 'githubViewer' )
    .controller( 'RepoController', ['$scope', 'github', '$routeParams', RepoController] )
  ;

  function RepoController( $scope, github, $routeParams, $log ) {
    $scope.username = $routeParams.username;
    $scope.reponame = $routeParams.reponame;
    github.getRepo( $scope.username, $scope.reponame ).then( onRepo, onError );

    function onContributors( data ) {
      $scope.contributors = data;
    }
    function onRepo( data ) {
      $scope.repo = data;
      github.getContributors( $scope.repo ).then( onContributors, onError );
    }
    function onError( reason ) {
      $scope.error = 'Could not fetch data.';
    }
  }
})();
