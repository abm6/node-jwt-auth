const { Router } = require('express');
const { requireAuth } = require('../middleware/authMiddleware');
const userController = require('../controllers/userControllers');

const router = Router();

router.get('/profile/', requireAuth, userController.profile_redirect);
router.get('/profile/:userId', requireAuth, userController.profile_get);
router.get('/profile/:userId/authors', requireAuth, userController.authors_get);
router.get('/profile/:userId/authors/:authorId', requireAuth, userController.books_get);

module.exports = router;