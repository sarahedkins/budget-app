'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var AccountSchema = new mongoose.Schema({
  name: String,
  type: String,
  amount: Number
});

export default mongoose.model('Account', AccountSchema);
