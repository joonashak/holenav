import { Module } from "@nestjs/common";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { HOST_FRONTEND } from "../config";

@Module(
  HOST_FRONTEND
    ? {
        imports: [
          ServeStaticModule.forRoot({
            rootPath: join(__dirname, "..", "..", "public"),
            exclude: ["/graphql/(.*)"],
          }),
        ],
      }
    : {},
)
export class FrontendModule {}
