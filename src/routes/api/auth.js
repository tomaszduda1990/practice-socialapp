const express = require('express');
const router = express.Router()


// @route  GET api/auth
// @desc   Test route
// @access Public 
router.get('/', (req, res, next) => {
    res.status(200).json({message: "AUTH route..."});
})

module.exports = router;