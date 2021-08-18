import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import eff from "../assets/staticData/wormholeEffects.json";

console.log("data test:", eff);
const port = process.env.PORT || 3001;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: { origin: process.env.CLIENT_URL, credentials: true },
  });
  await app.listen(port);
}
bootstrap();
