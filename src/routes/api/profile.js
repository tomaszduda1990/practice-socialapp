const express = require('express');
const router = express.Router()


// @route  GET api/profile
// @desc   Test route
// @access Public 
router.get('/', (req, res, next) => {
    res.status(200).json({message: "Profile route..."});
})

module.exports = router;