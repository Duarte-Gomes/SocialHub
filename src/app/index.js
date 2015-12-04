'use strict';

angular.module('socialhubprograms', ['ngAnimate', 'ngSanitize', 'ngRoute', 'mgcrea.ngStrap', 'angular-data.DS'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/main/programs.html',
        controller: 'ProgramsCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
;
