import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { CLIENT_URL, PORT } from "./config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: { origin: CLIENT_URL, credentials: true },
  });
  await app.listen(PORT);
}
bootstrap();
