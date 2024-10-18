import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { Connection } from "./connection.model";
import { ConnectionService } from "./connection.service";
import { CreateConnection } from "./dto/create-connection.dto";

@Resolver()
export class ConnectionResolver {
  constructor(private connectionService: ConnectionService) {}

  @Mutation(() => Connection)
  async createConnection(@Args("connection") connection: CreateConnection) {
    return this.connectionService.create(connection);
  }
}
