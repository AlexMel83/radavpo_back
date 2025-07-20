import validateMiddleware from '../../middlewares/validate-middleware.js';
// import authMiddleware from '../../middlewares/auth-middleware.js';
import postsController from '../controllers/posts-controller.js';
import { query } from 'express-validator';

const validateQueryPost = [
  query('id')
    .optional({ checkFalsy: true })
    .isNumeric()
    .withMessage('id is number'),
  query('slug')
    .optional({ checkFalsy: true })
    .isString()
    .withMessage('slug is string'),
  query('user_id')
    .optional({ checkFalsy: true })
    .isNumeric()
    .withMessage('user_id is number'),
  query('source_type').optional({ checkFalsy: true }).isString(),
  query('source_url').optional({ checkFalsy: true }).isString(),
  query('title')
    .optional({ checkFalsy: true })
    .isString()
    .withMessage('title is string'),
  query('content')
    .optional({ checkFalsy: true })
    .isString()
    .withMessage('content is string'),
];

export default function (app) {
  app.get(
    '/posts',
    validateQueryPost,
    validateMiddleware,
    postsController.getPosts,
  );

  app.post(
    '/posts',
    validateQueryPost,
    validateMiddleware,
    postsController.createPost,
  );
}
