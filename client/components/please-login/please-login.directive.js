'use strict';

angular.module('budgetApp')
  .directive('pleaseLogin', ['Auth', function (Auth) {
    return {
      templateUrl: 'components/please-login/please-login.html',
      restrict: 'E',
      link: function(scope, element) {
        scope.isLoggedIn = Auth.isLoggedIn;
        element.addClass('please-login');
      }
    };
  }]);
