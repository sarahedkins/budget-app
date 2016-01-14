angular.module('budgetApp')
  .controller('BankController', function($scope){
      $scope.isitangular = "YES!!"
      $scope.savings = 500;
      $scope.checking = 500;
      $scope.creditdebt = 68;  // what is going on with that fifty?
  });
