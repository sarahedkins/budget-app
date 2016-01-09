angular.module('budgetApp')
  .controller('BankController', function($scope){
      $scope.savings = 300;
      $scope.checking = 100;
      $scope.creditdebt = 50;
  });
