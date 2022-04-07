import { NestFactory } from "@nestjs/core";
import { GraphQLSchemaHost } from "@nestjs/graphql";
import { writeFileSync } from "fs";
import { printSchema } from "graphql";
import { join } from "path";
import { AppModule } from "./app.module";
import { clientUrl, nodeEnv, port } from "./config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: { origin: clientUrl, credentials: true },
  });
  await app.listen(port);

  // Export schema for use in frontend.
  if (nodeEnv === "development") {
    const { schema } = app.get(GraphQLSchemaHost);
    writeFileSync(join(process.cwd(), `/generated/schema.gql`), printSchema(schema));
  }
}
bootstrap();
