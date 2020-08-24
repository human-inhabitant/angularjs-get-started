'use strict';

(function() {
  angular.module( 'gitHubViewer', [] );

  angular
    .module( 'gitHubViewer' )
    .controller( 'MainController', ['$scope', 'github', '$interval', '$log', '$anchorScroll', '$location',
      function( $scope, github, $interval, $log, $anchorScroll, $location ) {

      const onRepos = function( data ) {
        $scope.repos = data;
        $location.hash( 'userDetails' );
        $anchorScroll();
      };
      const onUserComplete = function( data ) {
        $scope.user = data;
        github
          .getRepos( $scope.user )
          .then( onRepos, onError )
        ;
      };
      const onError = function( reason ) {
        $scope.error = 'Could not fetch data.';
      };
      const decrementCountDown = function() {
        $scope.countDown -= 1;
        if ( $scope.countDown < 1 ) {
          $scope.search( $scope.username );
        }
      };
      let countDownInterval = null;
      const startCountDown = function() {
        countDownInterval = $interval( decrementCountDown, 1e3, $scope.countDown );
      };
      $scope.search = function( username ) {
        github
          .getUser( username )
          .then( onUserComplete, onError )
        ;
        if ( countDownInterval ) {
          $interval.cancel( countDownInterval );
          $scope.countDown = null;
        }
      };
      $scope.username = 'timbl'; // carmelatroncoso qiangxue
      $scope.message = 'GitHub Viewer';
      $scope.repoSortOrder = '-stargazers_count';
      $scope.countDown = 15;
      startCountDown();
    }]);
})();


