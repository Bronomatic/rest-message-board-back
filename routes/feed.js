const router = require('express').Router();

const { body } = require('express-validator');
const feedController = require('../controllers/feed');
const isAuth = require('../middleware/is-auth');

// # Validations ------------------------------------
const postValidations = [
  body('title').trim().isLength({min: 5}),
  body('content').trim().isLength({min: 5})
];

const updateValidations = [
  body('title').trim().isLength({min: 5}),
  body('content').trim().isLength({min: 5})
];

// # Posts ------------------------------------------
// * /feed/posts
router.get('/posts', isAuth, feedController.getPosts);

// * /feed/post
router.post('/post', isAuth, postValidations, feedController.createPost);

router.get('/post/:postId', isAuth, feedController.getPost);

router.put('/post/:postId', isAuth, updateValidations, feedController.updatePost);

router.delete('/post/:postId', isAuth, feedController.deletePost);

module.exports = router;