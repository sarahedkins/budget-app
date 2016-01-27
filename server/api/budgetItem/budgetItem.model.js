'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var BudgetItemSchema = new mongoose.Schema({
  category: String,
  description: String,
  goal: Number,
  current: Number
});

export default mongoose.model('BudgetItem', BudgetItemSchema);
