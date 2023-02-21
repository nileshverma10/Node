const express = require('express');
const router = express.Router();
const data = require('../controller/main')


router.post('/addData', data.addData)
router.get('/getData', data.getData)

module.exports = router