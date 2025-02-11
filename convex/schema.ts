import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  users: defineTable({
    clerkId: v.string(), // Clerk ID
    displayName: v.string(), // Display name
    email: v.string(), // Unique email
    image_url: v.optional(v.string()), // URL to profile picture
    bio: v.optional(v.string()), // User bio
    followers: v.optional(v.array(v.id('users'))), // Array of user IDs following this user
    following: v.optional(v.array(v.id('users'))), // Array of user IDs this user follows
    createdAt: v.optional(v.number()), // Timestamp for account creation
  }).index('by_email', ['email']),

  posts: defineTable({
    user_id: v.id('users'), // User ID of the post author
    content: v.string(), // Post content
    image_url: v.optional(v.array(v.string())), // URL to post image
    likes: v.optional(v.array(v.id('users'))), // Array of user IDs that liked this post
    createdAt: v.optional(v.number()), // Timestamp for post creation
  }),
});
