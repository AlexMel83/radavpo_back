import knex from '../../../config/knex.config.js';

const postsTable = 'posts';
const hashtagsTable = 'hashtags';
const postHashtagsTable = 'post_hashtags';
const postsFields = [
  'posts.id',
  'posts.slug',
  'posts.title',
  'posts.excerpt',
  'posts.content',
  'posts.images',
  'posts.tags',
  'posts.category',
  'posts.source_type',
  'posts.source_url',
  'posts.address',
  'posts.location',
  'posts.formatted_address',
  'posts.published',
  'posts.user_id',
  'posts.created_at as post_created_at',
  'posts.updated_at as post_updated_at',
];

const conditionHandlers = {
  id: (postsQuery, value) => postsQuery.where('posts.id', value),
  slug: (postsQuery, value) => postsQuery.where('posts.slug', value),
  user_id: (postsQuery, value) => postsQuery.where('posts.user_id', value),
  title: (postsQuery, value) =>
    postsQuery.where('posts.title', 'ilike', `%${value}%`),
  content: (postsQuery, value) =>
    postsQuery.where('posts.content', 'ilike', `%${value}%`),
  sort_field: (postsQuery, value, sort) => {
    if (sort === 'down') {
      postsQuery.orderBy(value, 'desc');
    } else {
      postsQuery.orderBy(value, 'asc');
    }
  },
};

export default {
  async getPostsByCondition(condition = {}, trx = knex) {
    let sort;
    if ('sortDirection' in condition) {
      sort = condition.sortDirection;
      delete condition.sortDirection;
    }

    try {
      const postsQuery = trx(postsTable)
        .select([
          ...postsFields,
          knex.raw('ST_AsEWKT(location) as location'),
          knex.raw('array_agg(h.name) as hashtags'),
        ])
        .leftJoin(`${postHashtagsTable} as ph`, 'ph.post_id', 'posts.id')
        .leftJoin(`${hashtagsTable} as h`, 'h.id', 'ph.hashtag_id')
        .groupBy([
          'posts.id',
          'posts.slug',
          'posts.title',
          'posts.excerpt',
          'posts.content',
          'posts.images',
          'posts.tags',
          'posts.category',
          'posts.source_type',
          'posts.source_url',
          'posts.address',
          'posts.location',
          'posts.formatted_address',
          'posts.published',
          'posts.user_id',
          'posts.created_at',
          'posts.updated_at',
        ]);

      for (const [key, value] of Object.entries(condition)) {
        const handler = conditionHandlers[key];
        if (handler) {
          handler(postsQuery, value, sort);
        } else {
          postsQuery.where(key, value);
        }
      }

      const result = await postsQuery;

      if (!result.length) return null;

      return result.map((row) => ({
        id: row.id,
        source_type: row.source_type,
        source_url: row.source_url,
        title: row.title,
        slug: row.slug,
        excerpt: row.excerpt,
        content: row.content,
        images: row.images,
        address: row.address,
        location: row.location,
        formatted_address: row.formatted_address,
        published: row.published,
        user_id: row.user_id,
        created_at: row.post_created_at,
        updated_at: row.post_updated_at,
        hashtags: row.hashtags?.filter(Boolean) || [],
      }));
    } catch (error) {
      console.error('Error fetching posts by condition:', error.message);
      throw error;
    }
  },

  async createPost(post, trx = knex) {
    try {
      const result = await trx(postsTable).insert(post);
      if (!result.length) {
        return null;
      }
      return result[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};
