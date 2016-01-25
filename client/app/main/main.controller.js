'use strict';

(function() {

class MainController {
  constructor($http, Auth, BankAccountFactory) {
    this.$http = $http;
    this.awesomeThings = [];

    $http.get('/api/things').then(response => {
      this.awesomeThings = response.data;
    });
  }
}

angular.module('budgetApp')
  .controller('MainController', MainController);

})();
