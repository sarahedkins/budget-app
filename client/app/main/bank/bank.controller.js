angular.module('budgetApp')
  .controller('BankController', function($scope, BankAccountFactory){

      $scope.createAccount = function(accountInfo) {
        $scope.newAccount = {};
        BankAccountFactory.saveAccount(accountInfo)
          .then(function(acc){
            $scope.accounts.push(acc.data);
            $scope.total += acc.data.amount;
          })
      }

      BankAccountFactory.getUsersAccounts()
        .then(function(res){
          $scope.accounts = res.data;
          $scope.total = sumAmounts(res.data);
        })

      $scope.delete = function(index, id) {
        BankAccountFactory.deleteAccountById(id)
          .then(function(acc){
            console.log("deleted acc is ", acc);
            $scope.accounts.splice(index, 1);
            $scope.total -= acc.amount;
          })
      }

      var sumAmounts = function(listOfAccounts) {
        return listOfAccounts.map(function(elem){
          return elem.amount;
        }).reduce(function(prev, curr){
              return prev + curr;
        });
      }

  });
