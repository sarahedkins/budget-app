'use strict';

class NavbarController {
  //start-non-standard
  menu = [
  {
    'title': 'Home',
    'state': 'main'
  },
  {
    'title': 'Bank',
    'state': 'bank'
  },
  {
    'title': 'Budget',
    'state': 'budget'
  }
];

  isCollapsed = true;
  //end-non-standard

  constructor(Auth) {
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;
  }
}

angular.module('budgetApp')
  .controller('NavbarController', NavbarController);
