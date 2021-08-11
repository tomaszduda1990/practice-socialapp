const express = require('express');
const router = express.Router()


// @route  GET api/posts
// @desc   Test route
// @access Public 
router.get('/', (req, res, next) => {
    res.status(200).json({message: "Posts route..."});
})

module.exports = router;