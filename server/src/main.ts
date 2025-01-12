import { NestFactory } from "@nestjs/core";
import MongoStore from "connect-mongo";
import session from "express-session";
import { AppModule } from "./app.module";
import { CLIENT_URL, HOST_FRONTEND, PORT, SESSION_SECRET } from "./config";

async function bootstrap() {
  if (!SESSION_SECRET) {
    throw new Error("Session secret must be configured.");
  }

  const app = await NestFactory.create(AppModule, {
    cors: HOST_FRONTEND ? false : { origin: CLIENT_URL, credentials: true },
  });

  app.use(
    session({
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL,
      }),
      cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 },
    }),
  );

  await app.listen(PORT);
}
bootstrap();
