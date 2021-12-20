import { handleRequest } from "./handler.mjs";

export default {
  async fetch(request: Request, _environment: any, _context: any) {
    return await handleRequest(request);
  },
};
