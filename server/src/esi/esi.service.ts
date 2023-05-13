import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";

@Injectable()
export class EsiService {
  constructor(private httpService: HttpService) {}
}
