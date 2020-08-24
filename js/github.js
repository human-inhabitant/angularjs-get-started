'use strict';

(function() {
  angular
    .module( 'gitHubViewer' )
    .factory( 'github', github )
  ;

  function github( $http ) {
    const getUser = function( username ) {
      return $http
        .get( `https://api.github.com/users/${username}` )
        .then( function( response ) {
          return response.data;
        })
      ;
    };
    const getRepos = function( user ) {
      return $http
        .get( user.repos_url )
        .then( function( response ) {
          return response.data;
        })
      ;
    };

    return {
      getUser, getRepos
    };
  }
})();
