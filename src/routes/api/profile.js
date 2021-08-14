const express = require('express');
const { check, validationResult } = require('express-validator');
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

// @route  POST api/profile/
// @desc   post create/update a profile
// @access private

router.post(
	'/',
	[
		auth,
		[
			check('status', 'Status is required').notEmpty(),
			check('skills', 'Skills are required').notEmpty(),
		],
	],
	async (req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const {
			company,
			website,
			location,
			bio,
			status,
			githubusername,
			skills,
			youtube,
			facebook,
			twitter,
			instagram,
			linkedin,
		} = req.body;

		// build profile object

		const profileFields = {
			user: req.user.id,
			social: {},
		};
		for (let key in req.body) {
			if (req.body[key] && key !== 'skills' && !checkSocialMedia(key)) {
				profileFields[key] = req.body[key];
			} else if (key === 'skills' && req.body[key]) {
				const skillsArr = req.body[key].split(',').map((skill) => skill.trim());
				profileFields[key] = skillsArr;
			} else if (req.body[key] && checkSocialMedia(key)) {
				profileFields.social[key] = req.body[key];
			}
		}
		try {
			let profile = await Profile.findOne({ user: req.user.id });
			if (profile) {
				// Update
				profile = await Profile.findOneAndUpdate(
					{ user: req.user.id },
					{ $set: profileFields },
					{ new: true }
				);
				return res.json(profile);
			}
			// Create
			profile = new Profile(profileFields);
			await profile.save();
			return res.json(profile);
		} catch (err) {
			console.error(err);
			res.status(500).send('Server malfunction');
		}
		res.json(profileFields);
	}
);

const checkSocialMedia = (key) => {
	return (
		key === 'facebook' ||
		key === 'twitter' ||
		key === 'linkedin' ||
		key === 'instagram'
	);
};

module.exports = router;
