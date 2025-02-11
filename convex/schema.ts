import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  users: defineTable({
    displayName: v.string(), // Display name
    email: v.string(), // Unique email
    image_url: v.optional(v.string()), // URL to profile picture
    bio: v.optional(v.string()), // User bio
    followers: v.optional(v.array(v.id('users'))), // Array of user IDs following this user
    following: v.optional(v.array(v.id('users'))), // Array of user IDs this user follows
    createdAt: v.optional(v.number()), // Timestamp for account creation
  }).index('by_email', ['email']),
});
