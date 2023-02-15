const { Router } = require('express');
const router = Router();
const {getDiets} = require('../handlers/dietsHandlers.js')
router.get('/', getDiets)

module.exports = router;