angular.module('budgetApp')
  .factory("BankAccountFactory", function($http, Auth){
    var userAccounts = [];
    var accountService = {};

    // BACK-END //
    // Create and save a new account
    accountService.saveAccount = function(accInfo) {
      // Expect accInfo to be an object with name, type, amount
        accInfo.owner = Auth.getCurrentUser()._id; // append current user id as owner to account object
        return $http.post('/api/bank', accInfo);
    }

    // Retrieve all accounts owned by the user from backend.
    accountService.getUsersAccounts = function(userId) {
      return $http.get('/api/bank/' + userId)
      .then(function(res){
        userAccounts = res.data;
        return userAccounts;
      });
    }

    // Update account
    accountService.updateAccount = function(updatedAcc) {
      return $http.put('/api/bank/' + updatedAcc._id, updatedAcc)
    }

    // Delete an account by its id
    accountService.deleteAccountById = function(id) {
      return $http.delete('/api/bank/' + id);
    }

    // FRONT-END //
    // Check if user has any accounts
    accountService.hasAccounts = function() {
      return userAccounts.length > 0;
    }

    // Retrieve all user's accounts on front-end
    accountService.getAccounts = function() {
      return userAccounts;
    }

    // Delete all user's accounts from the singleton
    accountService.deleteStoredAccounts = function() {
      userAccounts = [];
    }

    return accountService;
  })
