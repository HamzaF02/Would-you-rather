import { e as eventHandler } from './nitro/node-server.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';

const index = eventHandler(() => {
  return { nitro: "Is Awesome!" };
});

export { index as default };
//# sourceMappingURL=index.mjs.map
