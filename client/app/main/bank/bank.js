'use strict';

angular.module('budgetApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('bank', {
        url: '/bank',
        templateUrl: 'app/main/bank/bank.html',
        controller: 'BankController',
        controllerAs: 'bank'
      });
  });
