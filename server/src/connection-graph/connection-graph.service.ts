import { Injectable } from "@nestjs/common";
import { Neo4jService } from "../integration/neo4j/neo4j.service";

@Injectable()
export class ConnectionGraphService {
  constructor(private neoService: Neo4jService) {}

  async test() {
    const res = await this.neoService.read("MATCH (p:Person) RETURN p");
    return res;
  }
}
