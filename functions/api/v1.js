const express = require('express')
const router = express.Router();


router.get('/', (req, res) => {
    res.json({
        message: 'This is the home to the Scoultimate REST API!, goto the docs to see the routes and required arguments'
    })
})
// Get Team Averages at Event


module.exports = router;