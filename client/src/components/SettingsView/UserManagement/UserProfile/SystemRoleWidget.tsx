import { Box, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useState } from "react";
import { SystemRoles, User } from "../../../../generated/graphqlOperations";

type SystemRoleWidgetProps = {
  user: User;
};

const SystemRoleWidget = ({ user }: SystemRoleWidgetProps) => {
  const [selectedRole, setSelectedRole] = useState(user.systemRole);

  const onChange = (event: SelectChangeEvent<SystemRoles>) => {
    console.log(event.target.value);
  };

  return (
    <Box>
      <Select
        id={`role-select-${user.id}`}
        labelId={`role-select-${user.id}`}
        value={selectedRole}
        label="System Role"
        onChange={onChange}
      >
        <MenuItem value={SystemRoles.User}>{SystemRoles.User}</MenuItem>
        <MenuItem value={SystemRoles.Manager}>{SystemRoles.Manager}</MenuItem>
        <MenuItem value={SystemRoles.Administrator}>{SystemRoles.Administrator}</MenuItem>
      </Select>
    </Box>
  );
};

export default SystemRoleWidget;
