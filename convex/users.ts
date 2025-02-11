import { v } from 'convex/values';

import { internalMutation, internalQuery, query } from './_generated/server';

export const insertUser = internalMutation({
  args: {
    clerkId: v.string(),
    first_name: v.string(),
    last_name: v.string(),
    email_address: v.string(),
    image_url: v.string(),
    created_at: v.optional(v.number()),
    bio: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = {
      clerkId: args.clerkId,
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

export const getCurrentUser = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error('Not authenticated');
    }

    // The subject/sub field from Clerk contains the user's ID
    const clerkId = identity.subject;

    // Query your users table
    const user = await ctx.db
      .query('users')
      .filter((q) => q.eq(q.field('clerkId'), clerkId))
      .first();

    return user;
  },
});
