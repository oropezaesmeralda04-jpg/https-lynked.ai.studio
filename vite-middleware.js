import { createServer } from 'vite';

export const vite = await createServer({
  server: { middlewareMode: true },
  appType: 'custom',
});
