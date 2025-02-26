// models/Referral.js
const mongoose = require('mongoose');

const referralSchema = new mongoose.Schema({
  referrer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  referredUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  dateReferred: { type: Date, default: Date.now },
  status: { type: String, default: 'pending' } // update to 'successful' upon verification
});

module.exports = mongoose.model('Referral', referralSchema);
