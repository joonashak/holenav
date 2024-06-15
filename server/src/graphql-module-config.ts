import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";

const plugins = [];

if (process.env.NODE_ENV !== "production") {
  plugins.push(
    ApolloServerPluginLandingPageLocalDefault({ includeCookies: true }),
  );
}

const graphQlModuleConfig: ApolloDriverConfig = {
  autoSchemaFile: true,
  driver: ApolloDriver,
  playground: false,
  plugins,
};

export default graphQlModuleConfig;
