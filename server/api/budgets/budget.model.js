'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var BudgetSchema = new mongoose.Schema({
  month: Number, // 0-11. January is 0, February is 1, etc.
  year: Number,
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'BudgetItem' }],
  owner: String // { type: Schema.Types.ObjectId, ref: 'User' }
});

export default mongoose.model('Budget', BudgetSchema);
