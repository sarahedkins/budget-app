'use strict';

angular.module('budgetApp')
  .directive('pleaseLogin', function () {
    return {
      templateUrl: 'components/please-login/please-login.html',
      restrict: 'E',
      link: function(scope, element) {
        element.children().addClass('please-login');
      }
    };
  });
