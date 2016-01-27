angular.module('budgetApp')
  .controller('BudgetController', function($scope, BudgetFactory){
      $scope.name = "budgettttt";

      $scope.createBudget = BudgetFactory.saveBudget;
      $scope.createBudgetItem = BudgetFactory.saveBudgetItem;
  });
