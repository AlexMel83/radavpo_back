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
  'partners.status',
  'partners.created_at',
  'partners.updated_at',
];

const conditionHandlers = {
  id: (partnersQuery, value) =>
    partnersQuery.where('published_partners.id', value),
  slug: (partnersQuery, value) =>
    partnersQuery.where('published_partners.slug', value),
  user_id: (partnersQuery, value) =>
    partnersQuery.where('published_partners.user_id', value),
  title: (partnersQuery, value) =>
    partnersQuery.where('published_partners.title', 'ilike', `%${value}%`),
  content: (partnersQuery, value) =>
    partnersQuery.where('published_partners.content', 'ilike', `%${value}%`),
  status: (partnersQuery, value) =>
    partnersQuery.where('published_partners.status', value),
  sort_field: (partnersQuery, value, sort) => {
    if (value) {
      partnersQuery.orderBy(
        `published_partners.${value}`,
        sort === 'down' ? 'desc' : 'asc',
      );
    }
  },
};

export default {
  async getPartnersByCondition(condition = {}, trx = knex) {
    let sort;
    let limit = condition.limit || 10;
    let offset = condition.offset || 0;
    if ('sortDirection' in condition) {
      sort = condition.sortDirection;
      delete condition.sortDirection;
    }
    if ('limit' in condition) {
      limit = condition.limit;
      delete condition.limit;
    }
    if ('offset' in condition) {
      offset = condition.offset;
      delete condition.offset;
    }
    try {
      const partnersQuery = trx
        .with('published_partners', (qb) => {
          qb.select([
            ...partnersFields,
            knex.raw('LAG(partners.id) OVER (ORDER BY partners.id) as prev_id'),
            knex.raw(
              'LAG(partners.slug) OVER (ORDER BY partners.id) as prev_slug',
            ),
            knex.raw(
              'LEAD(partners.id) OVER (ORDER BY partners.id) as next_id',
            ),
            knex.raw(
              'LEAD(partners.slug) OVER (ORDER BY partners.id) as next_slug',
            ),
          ])
            .from(partnersTable)
            .where('partners.status', 'published');
        })
        .select('*')
        .from('published_partners');

      // Застосовуємо умови до CTE published_partners
      for (const [key, value] of Object.entries(condition)) {
        const handler = conditionHandlers[key];
        if (handler) {
          handler(partnersQuery, value, sort);
        } else {
          partnersQuery.where(`published_partners.${key}`, value);
        }
      }

      const result = await partnersQuery;
      if (!result.length) {
        return { data: [] };
      }

      return result;
    } catch (error) {
      console.error('Error fetching partners by condition:', error.message);
      throw error;
    }
  },
};
