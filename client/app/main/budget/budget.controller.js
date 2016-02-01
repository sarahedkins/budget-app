angular.module('budgetApp')
  .controller('BudgetController', function($scope, Auth, BudgetFactory){
      $scope.name = "budgettttt";
      $scope.isLoggedIn = Auth.isLoggedIn;
      $scope.createBudget = BudgetFactory.saveBudget;
      $scope.createBudgetItem = BudgetFactory.saveBudgetItem;
  });
