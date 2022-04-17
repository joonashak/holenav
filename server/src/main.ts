import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { clientUrl, port } from "./config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: { origin: clientUrl, credentials: true },
  });
  await app.listen(port)
}
bootstrap();
