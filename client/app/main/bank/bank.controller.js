angular.module('budgetApp')
  .controller('BankController', function($scope, Auth, BankAccountFactory, User){

    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.hasAccounts = BankAccountFactory.hasAccounts;
    $scope.getAccounts = BankAccountFactory.getAccounts;
    $scope.addAccount = BankAccountFactory.addAccount;
    $scope.removeAccount = BankAccountFactory.removeAccount;

    $scope.getTotal = function() {
      var accs = BankAccountFactory.getAccounts();
      if (accs) {
              return sumAmounts(accs);
      }
    }

    // If user is logged in, get accounts from BACK-END
    if(Auth.isLoggedIn()){
        BankAccountFactory.getUsersAccounts(Auth.getCurrentUser()._id);
    } else {
      // else, user is not logged in so just make sure accounts is cleared
      BankAccountFactory.deleteStoredAccounts();
    }


  //  updateGraphic($scope.accounts);

      $scope.createAccount = function(accountInfo) {
        $scope.newAccount = {};
        BankAccountFactory.saveAccount(accountInfo)
          .then(function(res){
            $scope.addAccount(res.data);
            $scope.total += res.data.amount;
          })
      }

      $scope.delete = function(index, id) {
        BankAccountFactory.deleteAccountById(id)
          .then(function(res){
            // Update view by removing the deleted account.
            $scope.removeAccount(index);
            $scope.total -= res.data.amount;
          })
      }

      $scope.editAccount = function(acc){
        acc.editing = true;
      }

      $scope.update = function(accObj, newAmt) {
        newAmt = parseFloat(newAmt);
        // if NaN, revert to original number;
        if (newAmt) {
          accObj.amount = newAmt;
        }
        BankAccountFactory.updateAccount(accObj)
          .then(function(res){
            // Update total
            accObj.editing = false;
          })
      }

      $scope.revert = function(accObj) {
        accObj.editing = false;
      }

      function sumAmounts(listOfAccounts) {
        if(listOfAccounts.length == 0) return;
        else {
          return listOfAccounts.map(function(elem){
            return elem.amount;
          }).reduce(function(prev, curr){
                return prev + curr;
          });
        }
      }

      function listOfAmounts(listOfAccounts) {
        return listOfAccounts.map(function(elem){
          return elem.amount;
        });
      }

  });
