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
  'posts.status',
  'posts.user_id',
  'posts.created_at as post_created_at',
  'posts.updated_at as post_updated_at',
];

const conditionHandlers = {
  id: (postsQuery, value) => postsQuery.where('published_posts.id', value),
  slug: (postsQuery, value) => postsQuery.where('published_posts.slug', value),
  user_id: (postsQuery, value) =>
    postsQuery.where('published_posts.user_id', value),
  title: (postsQuery, value) =>
    postsQuery.where('published_posts.title', 'ilike', `%${value}%`),
  content: (postsQuery, value) =>
    postsQuery.where('published_posts.content', 'ilike', `%${value}%`),
  status: (postsQuery, value) =>
    postsQuery.where('published_posts.status', value),
  sort_field: (postsQuery, value, sort) => {
    if (value) {
      postsQuery.orderBy(
        `published_posts.${value}`,
        sort === 'down' ? 'desc' : 'asc',
      );
    }
  },
};

export default {
  async getPostsByCondition(condition = {}, trx = knex) {
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
      const postsQuery = trx
        .with('published_posts', (qb) => {
          qb.select([
            ...postsFields,
            knex.raw('LAG(posts.id) OVER (ORDER BY posts.id) as prev_id'),
            knex.raw('LAG(posts.slug) OVER (ORDER BY posts.id) as prev_slug'),
            knex.raw('LEAD(posts.id) OVER (ORDER BY posts.id) as next_id'),
            knex.raw('LEAD(posts.slug) OVER (ORDER BY posts.id) as next_slug'),
          ])
            .from(postsTable)
            .where('posts.status', 'published');
        })
        .select([
          'published_posts.id',
          'published_posts.slug',
          'published_posts.title',
          'published_posts.excerpt',
          'published_posts.content',
          'published_posts.images',
          'published_posts.tags',
          'published_posts.category',
          'published_posts.source_type',
          'published_posts.source_url',
          'published_posts.address',
          knex.raw('ST_AsEWKT(published_posts.location) as location'),
          'published_posts.formatted_address',
          'published_posts.status',
          'published_posts.user_id',
          'published_posts.post_created_at',
          'published_posts.post_updated_at',
          'published_posts.prev_id',
          'published_posts.prev_slug',
          'published_posts.next_id',
          'published_posts.next_slug',
          knex.raw(
            'array_agg(h.name) FILTER (WHERE h.name IS NOT NULL) as hashtags',
          ),
        ])
        .from('published_posts')
        .leftJoin(
          `${postHashtagsTable} as ph`,
          'ph.post_id',
          'published_posts.id',
        )
        .leftJoin(`${hashtagsTable} as h`, 'h.id', 'ph.hashtag_id')
        .groupBy([
          'published_posts.id',
          'published_posts.slug',
          'published_posts.title',
          'published_posts.excerpt',
          'published_posts.content',
          'published_posts.images',
          'published_posts.tags',
          'published_posts.category',
          'published_posts.source_type',
          'published_posts.source_url',
          'published_posts.address',
          'published_posts.location',
          'published_posts.formatted_address',
          'published_posts.status',
          'published_posts.user_id',
          'published_posts.post_created_at',
          'published_posts.post_updated_at',
          'published_posts.prev_id',
          'published_posts.prev_slug',
          'published_posts.next_id',
          'published_posts.next_slug',
        ])
        .limit(limit)
        .offset(offset);

      // Застосовуємо умови до CTE published_posts
      for (const [key, value] of Object.entries(condition)) {
        const handler = conditionHandlers[key];
        if (handler) {
          handler(postsQuery, value, sort);
        } else {
          postsQuery.where(`published_posts.${key}`, value);
        }
      }

      const result = await postsQuery;

      if (!result.length) {
        return { data: [] };
      }

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
        status: row.status,
        user_id: row.user_id,
        created_at: row.post_created_at,
        updated_at: row.post_updated_at,
        hashtags: row.hashtags?.filter(Boolean) || [],
        prev_id: row.prev_id,
        prev_slug: row.prev_slug,
        next_id: row.next_id,
        next_slug: row.next_slug,
      }));
    } catch (error) {
      console.error('Error fetching posts by condition:', error.message);
      console.error('Full error:', JSON.stringify(error, null, 2));
      throw error;
    }
  },

  async createPost(post, trx = knex) {
    try {
      const result = await trx(postsTable)
        .insert(post)
        .returning(['id', 'slug']);
      if (!result.length) {
        return null;
      }
      return result[0];
    } catch (error) {
      console.error('Error creating post:', error.message);
      throw error;
    }
  },
};
