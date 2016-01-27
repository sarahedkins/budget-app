angular.module('budgetApp')
  .factory("BudgetFactory", function($http, Auth){

    var budgetService = {};

    // BACK-END //
    // Create and save a new budget
    budgetService.saveBudget = function() {
        console.log("clicked!");
        var budgetInfo = {};
        budgetInfo.owner = Auth.getCurrentUser()._id; // append current user id as owner to budget object
        var today = new Date();   // append current month and year to budget
        budgetInfo.month = today.getMonth();
        budgetInfo.year = today.getFullYear();
        return $http.post('/api/budget', budgetInfo);
    }

    budgetService.saveBudgetItem = function(budgetItemInfo) {
        console.log("budgetitem clicked!");
        return $http.post('/api/budgetItem', budgetItemInfo)
          .then(function(budgetItem){
            console.log("budgetItem", budgetItem);
            // add budgetItem to the current budget;
          });
    }

    return budgetService;
  })
