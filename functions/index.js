import { https } from "firebase-functions";
import next from "next";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev, 
  conf: { distDir: 'out' }  });
const handle = app.getRequestHandler();

export const nextjs = https.onRequest((req, res) => {
  return app.prepare().then(() => handle(req, res));
});
