import ApiError from '../../middlewares/exceptions/api-errors.js';
import postsModel from '../../data-layer/models/posts-model.js';

const queryMappings = {
  id: 'id',
  slug: 'slug',
  user_id: 'user_id',
  sourceType: 'source_type',
  sourceUrl: 'source_url',
  title: 'title',
  content: 'content',
  sort_field: 'sort_field', // Исправлено с sortField на sort_field
  sortDirection: 'sortDirection',
  limit: 'limit',
  offset: 'offset',
};

class postsController {
  async getPosts(req, res) {
    let conditions = {};
    try {
      const queryParams = req.query;
      for (const key in queryParams) {
        const mappedKey = queryMappings[key];
        if (mappedKey) {
          conditions[mappedKey] = ['limit', 'offset'].includes(mappedKey)
            ? parseInt(queryParams[key], 10)
            : queryParams[key];
        }
      }
      const response = await postsModel.getPostsByCondition(conditions);
      if (!response) {
        return res.json(ApiError.NotFound('posts not found'));
      }
      return res.json(response);
    } catch (error) {
      console.error('Error in getPosts:', error.message);
      console.error('Full error:', JSON.stringify(error, null, 2));
      return res.json(ApiError.IntServError(error.message));
    }
  }

  async createPost(req, res) {
    const post = req.body;
    try {
      const response = await postsModel.createPost(post);
      if (!response) {
        return res.json(ApiError.BadRequest('Post not created'));
      }
      return res.json(response);
    } catch (error) {
      console.error('Error in createPost:', error.message);
      console.error('Full error:', JSON.stringify(error, null, 2));
      return res.json(ApiError.IntServError(error.message));
    }
  }
}

export default new postsController();
