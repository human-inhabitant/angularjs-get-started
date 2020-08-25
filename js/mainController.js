'use strict';

(function(){
  angular.module( 'githubViewer' );
  angular.module( 'githubViewer' ).controller('MainController', ['$scope', '$interval', '$location', MainController]);

  function MainController( $scope, $interval, $location ) {
    let countdownInterval = null;
    $scope.username = 'qiangxue';
    $scope.search = search;
    $scope.countdown = 9;

    startCountdown();

    function search( username ) {
      if ( countdownInterval ) {
        $interval.cancel( countdownInterval );
        $scope.countdown = null;
      }
      $location.path( `/user/${username}` );
    }
    function decrementCountdown() {
      $scope.countdown -= 1;
      if ( $scope.countdown < 1 ) {
        $scope.search( $scope.username );
      }
    }
    function startCountdown() {
      countdownInterval = $interval( decrementCountdown, 1e3, $scope.countdown );
    }
  };

})();


