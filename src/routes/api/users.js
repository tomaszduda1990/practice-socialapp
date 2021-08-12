const express = require('express');
const { check, validationResult } = require('express-validator');
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
	(req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		console.log(req.body);
		res.status(200).json({ message: 'User route...' });
	}
);

module.exports = router;
