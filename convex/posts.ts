import { paginationOptsValidator } from 'convex/server';
import { v } from 'convex/values';

import { Doc } from './_generated/dataModel';
import { mutation, query } from './_generated/server';

export type PostWithAuthor = Doc<'posts'> & { author: Doc<'users'> };

export const createPostMutation = mutation({
  args: {
    user_id: v.id('users'),
    content: v.string(),
    image_url: v.optional(v.array(v.string())),
    likes: v.optional(v.array(v.id('users'))),
    createdAt: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const post = {
      user_id: args.user_id,
      content: args.content,
      image_url: args.image_url || [],
      likes: args.likes || [],
      createdAt: args.createdAt || Date.now(),
    };
    await ctx.db.insert('posts', post);
  },
});

export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

export const getPostsByUser = query({
  args: {
    user_id: v.id('users'),
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    const { user_id, paginationOpts } = args;

    const posts = await ctx.db
      .query('posts')
      // .filter((q) => q.eq(q.field('user_id'), user_id))
      .order('desc')
      .paginate(paginationOpts);

    // Get unique userIds from posts
    const userIds = new Set(posts.page.map((post) => post.user_id));

    // Fetch all users in one query
    const users = await Promise.all(
      Array.from(userIds).map((userId) =>
        ctx.db
          .query('users')
          .withIndex('by_id', (q) => q.eq('_id', userId))
          .first()
      )
    );

    // Create a map of userId to user for quick lookup
    const userMap = new Map(users.filter(Boolean).map((user) => [user!._id, user]));

    const postsWithAuthors = await Promise.all(
      posts.page.map(async (post) => {
        const author = userMap.get(post.user_id);
        if (post?.image_url?.length ?? 0 > 0) {
          const imageUrls = await Promise.all(
            (post?.image_url ?? []).map(async (url) => {
              const signedUrl = await ctx.storage.getUrl(url);
              return signedUrl;
            })
          );
          return { ...post, author, image_url: imageUrls } as PostWithAuthor;
        }
        return { ...post, author } as PostWithAuthor;
      })
    );

    return {
      posts: postsWithAuthors,
      isDone: posts.isDone,
      continueCursor: posts.continueCursor,
    };
  },
});
