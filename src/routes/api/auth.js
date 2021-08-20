const express = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const router = express.Router();

// @route  GET api/auth
// @desc   Test route
// @access Public
router.get('/', auth, async (req, res, next) => {
	try {
		const user = await User.findById(req.user.id).select('-password');
		if (!user) {
			return res.status(404).json({ msg: "User doesn't exist" });
		}
		res.json(user);
	} catch (err) {
		res.status(500).send('Server error');
	}
});

// @route  POST api/auth
// @desc   login user & get token
// @access Public
router.post(
	'/',
	[
		check('email', 'Please provide correct email address.')
			.isEmail()
			.normalizeEmail(),
		check('password', 'Password is required').exists(),
	],
	async (req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { email, password } = req.body;

		try {
			// check if user exists
			let user = await User.findOne({ email });
			if (!user) {
				return res
					.status(400)
					.json({ errors: [{ msg: 'Invalid credentials' }] });
			}

			// check password match
			const passwordMatch = await bcrypt.compare(password, user.password);
			if (!passwordMatch) {
				return res
					.status(401)
					.json({ errors: [{ msg: 'Invalid credentials' }] });
			}
			//return jwt
			const payload = {
				user: {
					id: user.id,
				},
			};
			jwt.sign(
				payload,
				config.get('jwtSecret'),
				{
					expiresIn: 36000,
				},
				(err, token) => {
					if (err) {
						throw err;
					}
					res.json({ token });
				}
			);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server error');
		}
	}
);

module.exports = router;
