import schema from './schema';
import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/listProducts`,
  events: [
    {
      http: {
        method: 'get',
        path: 'listProducts',
        request: {
          schemas: {
            'application/json': schema,
          },
        },
      },
    },
  ],
};
