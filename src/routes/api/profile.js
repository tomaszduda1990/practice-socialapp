const express = require('express');
const request = require('request');
const config = require('config');
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const Profile = require('../../models/Profile');
const Post = require('../../models/Post');
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

// @route  GET api/profile/
// @desc   get all profiles
// @access public

router.get('/', async (req, res, next) => {
	try {
		const profiles = await Profile.find().populate('user', ['name', 'avatar']);
		res.json(profiles);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Internal server error');
	}
});

// @route  GET api/profile/user/:user_id
// @desc   get user profile by id
// @access public

router.get('/user/:user_id', async (req, res, next) => {
	try {
		const id = req.params.user_id;
		const profile = await Profile.findOne({ user: id }).populate('user', [
			'name',
			'avatar',
		]);
		if (!profile) {
			return res.status(404).json({ msg: 'Profile for this user not found' });
		}
		res.json(profile);
	} catch (err) {
		console.error(err.message);
		if (err.kind === 'ObjectId') {
			return res.status(404).json({ msg: 'Profile not found' });
		}
		res.status(500).send('Internal server error');
	}
});

// @route  delete api/profile/delete/
// @desc   remove user profile, user, posts by id
// @access private

router.delete('/delete', auth, async (req, res, next) => {
	try {
		// remove posts
		await Profile.deleteMany({ user: req.user.id });
		// remove profile
		await Post.findOneAndRemove({ user: req.user.id });
		// remove user
		await User.findOneAndRemove({ _id: req.user.id });
		res.json({ msg: 'User succesfully removed' });
	} catch (err) {
		res.status(500).send('Internal server error');
	}
});

// @route  put api/profile/experience
// @desc   add user experience
// @access private

router.put(
	'/experience',
	[
		auth,
		[
			check('title', 'Title is required').notEmpty(),
			check('company', 'Company is required').notEmpty(),
			check('from', 'From date is required').notEmpty(),
		],
	],
	async (req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { title, company, from, to, location, current, description } =
			req.body;
		const newExp = { title, company, from, to, location, current, description };

		try {
			const profile = await Profile.findOne({ user: req.user.id });
			profile.experience.unshift(newExp);
			await profile.save();
			res.json(profile);
		} catch (err) {
			res.status(500).send('Internal server error');
		}
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

// @route  delete api/profile/experience/remove
// @desc   remove user experience
// @access private

router.delete('/experience/:exp_id', auth, async (req, res, next) => {
	try {
		const exp_id = req.params.exp_id;
		const profile = await Profile.findOne({ user: req.user.id });
		const updatedExp = profile.experience.filter(
			(exp) => exp._id.toString() !== exp_id
		);
		profile.experience = updatedExp;
		await profile.save();
		res.json(profile);
	} catch (err) {
		res.status(500).send('Internal server error');
	}
});

// @route  delete api/profile/education/:ed_id
// @desc   remove user experience
// @access private

router.delete('/education/:edu_id', auth, async (req, res, next) => {
	try {
		const { edu_id } = req.params;
		const profile = await Profile.findOne({ user: req.user.id });
		const updatedEdu = profile.education.filter(
			(edu) => edu._id.toString() !== edu_id
		);
		profile.education = updatedEdu;
		await profile.save();
		res.json(profile);
	} catch (err) {
		res.status(500).send('Internal server error');
	}
});

// @route  put api/profile/education
// @desc   add user education
// @access private

router.put(
	'/education',
	[
		auth,
		[
			check('school', 'School is required').notEmpty(),
			check('degree', 'Degree is required').notEmpty(),
			check('fieldofstudy', 'Field of study is required').notEmpty(),
			check('from', 'From field is required').notEmpty(),
		],
	],
	async (req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { school, degree, from, to, fieldofstudy, current, description } =
			req.body;
		const newEd = {
			school,
			degree,
			from,
			to,
			fieldofstudy,
			current,
			description,
		};

		try {
			const profile = await Profile.findOne({ user: req.user.id });
			profile.education.unshift(newEd);
			await profile.save();
			res.json(profile);
		} catch (err) {
			res.status(500).send('Internal server error');
		}
	}
);

// @route  get api/profile/github/:username
// @desc   get user's github
// @access public

router.get('/github/:username', (req, res) => {
	try {
		const options = {
			uri: `https://api.github.com/users/${
				req.params.username
			}/repos?per_page=5&sort=created:asc&client_id=${config.get(
				'gitPublic'
			)}&client_secret=${config.get('gitSecret')}`,
			method: 'GET',
			headers: {
				'user-agent': 'node.js',
			},
		};
		request(options, (error, response, body) => {
			if (error) {
				console.error(error);
			}
			if (response.statusCode !== 200) {
				return res.status(404).json({ msg: 'No github profile found' });
			}
			res.json(JSON.parse(body));
		});
	} catch (err) {
		console.error(err);
		res.status(500).send('Internal server error');
	}
});

module.exports = router;
