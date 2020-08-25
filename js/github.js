'use strict';

(function(){
  angular.module( 'githubViewer' ).factory( 'github', github );

  function github( $http ) {
    return {
      getUser, getRepos, getRepo, getContributors
    };

    function getUser( username ) {
      return $http.get( `https://api.github.com/users/${username}` )
        .then(function( response ) {
          return response.data;
        })
        ;
    }
    function getContributors( repo ) {
      return $http.get( repo.contributors_url )
        .then(function( response ) {
          return response.data;
        })
        ;
    }
    function getRepos( user ) {
      return $http.get( user.repos_url )
        .then(function( response ) {
          return response.data;
        })
        ;
    }
    function getRepo( username, reponame ) {
      const uri = `https://api.github.com/repos/${username}/${reponame}`;
      return $http.get( uri )
        .then(function( response ) {
          return response.data;
        })
        ;
    }
  }
})();
