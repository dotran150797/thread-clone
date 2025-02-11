import { httpRouter } from 'convex/server';

import { internal } from './_generated/api';
import { httpAction } from './_generated/server';

const http = httpRouter();

http.route({
  path: '/create-user-webhook',
  method: 'POST',
  handler: httpAction(async (ctx, request) => {
    try {
      const { data } = await request.json();

      // Check if user already exists
      const user = await ctx.runQuery(internal.users.getUserByEmail, {
        email_address: data.email_addresses[0].email_address,
      });

      if (user) {
        return new Response(JSON.stringify({ message: 'User already exists' }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      // Insert user
      await ctx.runMutation(internal.users.insertUser, {
        clerkId: data.id,
        email_address: data.email_addresses[0].email_address,
        first_name: data.first_name,
        last_name: data.last_name,
        image_url: data.image_url,
        created_at: data.created_at,
        bio: '',
      });

      return new Response(JSON.stringify({ message: 'User created successfully' }), {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: (error as Error).message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }),
});

export default http;
