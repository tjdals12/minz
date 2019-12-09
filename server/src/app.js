import "@babel/polyfill";

import Koa from "koa";
import errorHandler from "middlewares/errorHandler";
import responseHandler from "middlewares/responseHandler";
import requestId from "koa-requestid";
import serve from "koa-static-server";
import bodyParser from "koa-bodyparser";
import cors from "koa2-cors";
import helmet from "koa-helmet";
import router from "routes";
import { jwtMiddleware } from "lib/token";
import logSettings from "logger";
import swaggerSettings from "swagger";

const app = new Koa();

app.use(responseHandler());
app.use(errorHandler());
app.use(requestId());
app.use(serve({ rootDir: "upload", rootPath: "/images" }));
app.use(
  bodyParser({
    enableTypes: ["json", "form"],
    jsonLimit: "50mb",
    formLimit: "50mb"
  })
);
app.use(
  cors({
    origin: "*",
    allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD"],
    allowHeaders: ["Content-Type", "Authorization"],
    exposeHeaders: ["Content-Length", "Date", "X-Request-Id", "Last-Page"]
  })
);
app.use(helmet());
logSettings(app);
swaggerSettings(app);
app.use(jwtMiddleware);
app.use(router.routes());
app.use(router.allowedMethods());

export default app;
