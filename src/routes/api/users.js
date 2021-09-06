const express = require('express');
const { check, validationResult } = require('express-validator');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const router = express.Router();

// @route  POST api/users
// @desc   Register user
// @access Public
router.post(
	'/',
	[
		check('name', 'Please enter correct name').notEmpty().isLength({ max: 20 }),
		check('email', 'Please provide correct email address.')
			.isEmail()
			.normalizeEmail(),
		check('password', 'Password must be between 6-20 letters long')
			.notEmpty()
			.isLength({ min: 6, max: 20 }),
	],
	async (req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { name, email, password } = req.body;

		try {
			// check if user exists
			let user = await User.findOne({ email });
			if (user) {
				return res
					.status(400)
					.json({ errors: [{ msg: 'User already exists' }] });
			}
			// get users gravatar
			const avatar = gravatar.url(email, {
				s: '200',
				r: 'pg',
				d: 'mm',
			});

			user = new User({
				email,
				name,
				avatar,
				password,
			});
			// encrypt password
			const salt = await bcrypt.genSalt(10);
			user.password = await bcrypt.hash(password, salt);
			await user.save();
			//return jwt
			const payload = {
				user: {
					id: user.id,
				},
			};
			jwt.sign(
				payload,
				process.env.jwtSecret,
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
