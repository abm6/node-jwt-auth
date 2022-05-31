const { Router } = require('express');
const { requireAuth } = require('../middleware/authMiddleware');
const generalController = require('../controllers/generalController');

const router = Router();

router.get('/', generalController.home_get);
router.get('/gallery', generalController.gallery_get);

module.exports = router;
