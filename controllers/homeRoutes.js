const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('welcome this is the home page.')
})


module.exports = router;
