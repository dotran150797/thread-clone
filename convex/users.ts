import { v } from 'convex/values';

import { internalMutation, internalQuery } from './_generated/server';

export const insertUser = internalMutation({
  args: {
    first_name: v.string(),
    last_name: v.string(),
    email_address: v.string(),
    image_url: v.string(),
    created_at: v.optional(v.number()),
    bio: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = {
      displayName: `${args.first_name} ${args.last_name}`,
      bio: args.bio || '',
      createdAt: args.created_at || Date.now(),
      followers: [],
      following: [],
      image_url: args.image_url,
      email: args.email_address,
    };
    await ctx.db.insert('users', user);
  },
});

export const getUserByEmail = internalQuery({
  args: {
    email_address: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('users')
      .withIndex('by_email', (q) => q.eq('email', args.email_address))
      .first();
  },
});
