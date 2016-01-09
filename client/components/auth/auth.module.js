'use strict';

angular.module('budgetApp.auth', [
  'budgetApp.constants',
  'budgetApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
