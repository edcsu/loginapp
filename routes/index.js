let express = require('express');
let router = express.Router();

// get homepage 
router.get('/', (req,res) => {
    res.render('index');
});

module.exports = router;