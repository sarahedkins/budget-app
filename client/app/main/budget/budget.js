'use strict';

angular.module('budgetApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('budget', {
        url: '/budget',
        templateUrl: 'app/main/budget/budget.html',
        controller: 'BudgetController',
        controllerAs: 'budget'
      });
  });
