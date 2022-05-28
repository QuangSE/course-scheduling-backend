const express = require('express');
	
const docentRouter = require('./routes/docentRouter');

const router = express.Router();


router.use('/docent', docentRouter);


module.exports = router;