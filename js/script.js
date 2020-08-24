'use strict';

(function() {
  angular.module( 'gitHubViewer', [] );

  angular
    .module( 'gitHubViewer' )
    .controller( 'MainController', ['$scope', '$http', function( $scope, $http ) {

      const onRepos = function( response ) {
        $scope.repos = response.data;
      };
      const onUserComplete = function( response ) {
        $scope.user = response.data;
        $http
          .get( $scope.user.repos_url )
          .then( onRepos, onError )
        ;
      };
      const onError = function( reason ) {
        $scope.error = 'Could not fetch data.';
      };
      $scope.search = function( username ) {
        $http
          .get( `https://api.github.com/users/${username}` )
          .then( onUserComplete, onError )
        ;
      };
      $scope.username = 'timbl'; // carmelatroncoso qiangxue
      $scope.message = 'GitHub Viewer';
      $scope.repoSortOrder = '-stargazers_count';

    }]);
})();


