// routes/referral.js
const express = require('express');
const router = express.Router();
const { getReferrals, getReferralStats } = require('../controllers/referralController');
const authMiddleware = require('../middlewares/auth');

router.get('/referrals', authMiddleware, getReferrals);
router.get('/referral-stats', authMiddleware, getReferralStats);

module.exports = router;
