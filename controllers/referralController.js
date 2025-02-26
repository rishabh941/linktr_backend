// controllers/referralController.js
const Referral = require('../models/Referral');

exports.getReferrals = async (req, res) => {
  try {
    // Get all referrals made by the logged-in user
    const referrals = await Referral.find({ referrer: req.user.userId })
      .populate('referredUser', 'username email');
    res.json(referrals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getReferralStats = async (req, res) => {
  try {
    // Count successful referrals for the logged-in user
    const count = await Referral.countDocuments({ referrer: req.user.userId, status: 'successful' });
    res.json({ successfulReferrals: count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
