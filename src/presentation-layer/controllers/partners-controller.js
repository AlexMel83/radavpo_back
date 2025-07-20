import ApiError from '../../middlewares/exceptions/api-errors.js';
import partnersModel from '../../data-layer/models/partners-model.js';

const queryMappings = {
  id: 'id',
  user_id: 'user_id',
  slug: 'slug',
  title: 'title',
  images: 'images',
  tags: 'tags',
  category: 'category',
  url: 'url',
  contacts: 'contacts',
  excerpt: 'excerpt',
  content: 'content',
  sortField: 'sort_field',
  sortDirection: 'sortDirection',
};

class PartnersController {
  async getPartners(req, res) {
    let conditions = {};
    try {
      const queryParams = req.query;
      for (const key in queryParams) {
        const mappedKey = queryMappings[key];
        if (mappedKey) {
          conditions[mappedKey] = queryParams[key];
        }
      }
      const response = await partnersModel.getPartnersByCondition(conditions);
      if (!response) {
        return res.json(ApiError.NotFound('Partners not found'));
      }
      return res.json(response);
    } catch (error) {
      console.error(error);
      return res.json(ApiError.IntServError(error.message));
    }
  }
}

export default new PartnersController();
