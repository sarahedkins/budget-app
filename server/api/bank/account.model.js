'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var AccountSchema = new mongoose.Schema({
  name: String,
  type: String,  // Savings, Checking, Credit, Loan, Other,
  rate: Number, // if Loan, provide interest rate
  amount: Number, // Negative numbers reflect debt such as in Credit and Loans
  owner: String
  // { type: Schema.Types.ObjectId, ref: 'User' }
});

export default mongoose.model('Account', AccountSchema);
