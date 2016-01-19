angular.module('budgetApp')
  .controller('BankController', function($scope, BankAccountFactory){

    BankAccountFactory.getUsersAccounts()
      .then(function(res){
        $scope.accounts = res.data;
        $scope.total = sumAmounts(res.data);
        updateGraphic($scope.accounts);
      })

      $scope.createAccount = function(accountInfo) {
        $scope.newAccount = {};
        BankAccountFactory.saveAccount(accountInfo)
          .then(function(acc){
            $scope.accounts.push(acc.data);
            $scope.total += acc.data.amount;
          })
      }

      $scope.delete = function(index, id) {
        BankAccountFactory.deleteAccountById(id)
          .then(function(acc){
            // Update view by removing the deleted account.
            $scope.accounts.splice(index, 1);
            $scope.total -= acc.amount;
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
            $scope.total = sumAmounts($scope.accounts);
            accObj.editing = false;
          })
      }

      $scope.revert = function(accObj) {
        accObj.editing = false;
      }

      var sumAmounts = function(listOfAccounts) {
        return listOfAccounts.map(function(elem){
          return elem.amount;
        }).reduce(function(prev, curr){
              return prev + curr;
        });
      }

      var listOfAmounts = function(listOfAccounts) {
        return listOfAccounts.map(function(elem){
          return elem.amount;
        });
      }


    // D3 Stuff
    var updateGraphic = function(accounts) {
      console.log("sumAmounts($scope.accounts).toFixed(2)", sumAmounts($scope.accounts).toFixed(2));
      var circle = d3.selectAll("circle");
      circle.data(sumAmounts($scope.accounts).toFixed(2));
      circle.attr("r", function(d) {
       return d * 10;
      });
    }

  });
