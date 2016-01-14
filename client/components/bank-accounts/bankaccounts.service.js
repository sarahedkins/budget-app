angular.module('budgetApp')
  .factory("BankAccountFactory", function($http, Auth){
    var accounts = {};
    var currentUser = Auth.getCurrentUser();

    // Create and save a new account
    accounts.saveAccount = function(accInfo) {
      // Expect accInfo to be an object with name, type, amount
      accInfo.owner = currentUser._id; // append current user id as owner to account object
      return $http.post('/api/bank', accInfo);
    }

    // Retrieve all accounts owned by the user.
    accounts.getUsersAccounts = function() {
      return $http.get('/api/bank/' + currentUser._id);
    }

    // Delete an account by its id
    accounts.deleteAccountById = function(id) {
      return $http.delete('/api/bank/' + id);
    }

    return accounts;
  })
