const express = require('express');
const User = require('../../models/User');
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const router = express.Router();

// @route  GET api/posts
// @desc   Get all posts
// @access private
router.get('/', auth, async (req, res, next) => {
	try {
		const posts = await Post.find().sort({ date: -1 });
		res.json(posts);
	} catch (err) {
		console.error(err);
		res.status(500).send('Server error');
	}
});

// @route  GET api/posts/:post_id
// @desc   Get post by id
// @access private
router.get('/:post_id', auth, async (req, res, next) => {
	try {
		const post = await Post.findById(req.params.post_id);
		if (!post) {
			return;
		}
		res.json(post);
	} catch (err) {
		console.error(err);
		if (err.kind === 'ObjectId') {
			return res.status(404).json({ msg: 'Cannot find post' });
		}
		res.status(500).send('Server error');
	}
});

// @route  POST api/posts
// @desc   Add new post
// @access private
router.post(
	'/',
	[
		auth,
		[
			check('text', 'Invalid text input (1-200) characters')
				.notEmpty()
				.isLength({ max: 200 }),
		],
	],
	async (req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		try {
			const user = await User.findById(req.user.id).select('-password');
			const newPost = new Post({
				text: req.body.text,
				name: user.name,
				avatar: user.avatar,
				user: req.user.id,
			});

			const post = await newPost.save();
			res.json(post);
		} catch (err) {
			console.error(err);
			res.status(500).send('Server error');
		}
	}
);

// @route  DELETE api/posts/:post_id
// @desc   delete post by id
// @access private

router.delete('/:post_id', auth, async (req, res, next) => {
	const post_id = req.params.post_id;
	try {
		const post = await Post.findById(post_id);
		if (post.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: 'Not authorized' });
		}
		if (!post) {
			return res.status(404).json({ msg: 'Cannot find post' });
		}
		await post.remove();
		res.json({ msg: 'Post succesfully removed' });
	} catch (err) {
		console.error(err);
		if (err.kind === 'ObjectId') {
			return res.status(404).json({ msg: 'User not authorized' });
		}
		res.status(500).send('Internal server error');
	}
});

module.exports = router;
