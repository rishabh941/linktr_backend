// controllers/authController.js
const User = require('../models/User');
const Referral = require('../models/Referral');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { username, email, password, referralCode } = req.body;
  
  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'Email already in use' });
    user = await User.findOne({ username });
    if (user) return res.status(400).json({ message: 'Username already in use' });

    if (!password) {
        return res.status(400).json({ message: 'Password is required' });
      }
      

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user with a generated referral code
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      referralCode: Math.random().toString(36).substr(2, 8) // simple unique code generator
    });

    // If a referral code is provided, find the referrer and update relationships
    if (referralCode) {
      
        const referrer = await User.findOne({ referralCode });
    
        if (referrer) {
          newUser.referredBy = referrer._id;
        } else {
          return res.status(400).json({ message: 'Invalid referral code' });
        }
      }
      

    const savedUser = await newUser.save();

    // Create a referral record if applicable
    if (newUser.referredBy) {
      await new Referral({
        referrer: newUser.referredBy,
        referredUser: savedUser._id,
        status: 'successful'
      }).save();
    }

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res) => {
  const { emailOrUsername, password } = req.body;
  try {
    const user = await User.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }]
    });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const payload = { userId: user._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.forgotPassword = async (req, res) => {
  // Placeholder for password reset functionality.
  res.json({ message: 'Password reset functionality not implemented yet.' });
};
