const express = require('express');
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const Profile = require('../../models/Profile');
const router = express.Router();

// @route  GET api/profile/me
// @desc   Test route
// @access private
router.get('/me', auth, async (req, res, next) => {
	try {
		const profile = await Profile.findOne({ user: req.user.id }).populate(
			'user',
			['name', 'avatar']
		);
		if (!profile) {
			return res.status(400).json({ msg: 'There is no profile for this user' });
		}
		res.json({ profile });
	} catch (err) {
		res.status(500).send('Service unavailable');
	}
});

module.exports = router;
