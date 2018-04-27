var router = require('express').Router();

//Routes here.
router.get('/', function(req, res, next){
    res.render('sample',{title: 'Sample EJS Implementaion'});
});

module.exports = router;