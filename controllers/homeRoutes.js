const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('welcome this is the home page.')
})


router.get('/api', (req, res) => {
    res.send('welcome this is the Api route.')
})

module.exports = router;