'use strict';

class LoginController {
  constructor(Auth, $state, BankAccountFactory) {
    this.user = {};
    this.errors = {};
    this.submitted = false;

    this.Auth = Auth;
    this.$state = $state;
    this.BankAccountFactory = BankAccountFactory;
  }

  login(form) {
    this.submitted = true;

    if (form.$valid) {
      this.Auth.login({
        email: this.user.email,
        password: this.user.password
      })
      .then(() => {
        // Logged in, get users bank accounts info
        this.BankAccountFactory.getUsersAccounts(this.Auth.getCurrentUser()._id)
          .then(function(accs) {
            console.log("got the accs!")
          });
          // Redirect to home
          this.$state.go('main');
      })
      .catch(err => {
        this.errors.other = err.message;
      });
    }
  }
}

angular.module('budgetApp')
  .controller('LoginController', LoginController);
