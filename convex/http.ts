import { httpRouter } from 'convex/server';
import { httpAction } from './_generated/server';

const http = httpRouter();

http.route({
  path: '/create-user-webhook',
  method: 'POST',
  handler: httpAction(async () => {
    console.log('user created....');
    return new Response(null, {
      status: 200,
    });
  }),
});

export default http;
