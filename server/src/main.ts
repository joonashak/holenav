import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { CLIENT_URL, HOST_FRONTEND, PORT } from "./config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: HOST_FRONTEND ? false : { origin: CLIENT_URL, credentials: true },
  });
  await app.listen(PORT);
}
bootstrap();
