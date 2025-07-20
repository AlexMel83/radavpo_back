import knex from '../../../config/knex.config.js';

const partnersTable = 'partners';
const partnersFields = [
  'partners.id',
  'partners.user_id',
  'partners.title',
  'partners.slug',
  'partners.excerpt',
  'partners.content',
  'partners.address',
  'partners.location',
  'partners.formatted_address',
  'partners.url',
  'partners.category',
  'partners.images',
  'partners.tags',
  'partners.contacts',
  'partners.published',
  'partners.created_at',
  'partners.updated_at',
];

const conditionHandlers = {
  id: (partnersQuery, value) => partnersQuery.where('partners.id', value),
  slug: (partnersQuery, value) => partnersQuery.where('partners.slug', value),
  user_id: (partnersQuery, value) =>
    partnersQuery.where('partners.user_id', value),
  title: (partnersQuery, value) =>
    partnersQuery.where('partners.title', 'ilike', `%${value}%`),
  content: (partnersQuery, value) =>
    partnersQuery.where('partners.content', 'ilike', `%${value}%`),
  sort_field: (partnersQuery, value, sort) => {
    if (value) {
      partnersQuery.orderBy(value, sort === 'down' ? 'desc' : 'asc');
    }
  },
};

export default {
  async getPartnersByCondition(condition = {}, trx = knex) {
    let sort;
    if ('sortDirection' in condition) {
      sort = condition.sortDirection;
      delete condition.sortDirection;
    }
    try {
      const partnersQuery = trx(partnersTable).select(partnersFields);

      for (const [key, value] of Object.entries(condition)) {
        const handler = conditionHandlers[key];
        if (handler) {
          handler(partnersQuery, value, sort);
        } else {
          partnersQuery.where(key, value);
        }
      }

      const result = await partnersQuery;
      if (!result.length) {
        return null;
      }

      return result;
    } catch (error) {
      console.error('Error fetching partners by condition:', error.message);
      throw error;
    }
  },
};
