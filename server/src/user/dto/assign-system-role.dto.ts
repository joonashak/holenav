import { Field, InputType } from "@nestjs/graphql";
import SystemRole from "../roles/system-role.enum";

@InputType()
export default class AssignSystemRoleInput {
  @Field()
  userId: string;

  @Field((type) => SystemRole)
  systemRole: SystemRole;
}
