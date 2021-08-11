const express = require('express');
const router = express.Router()


// @route  GET api/users
// @desc   Test route
// @access Public 
router.get('/', (req, res, next) => {
    res.status(200).json({message: "User route..."});
})

module.exports = router;