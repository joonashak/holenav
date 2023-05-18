import { Box, Button, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useState } from "react";
import { SystemRoles, User } from "../../../../generated/graphqlOperations";

type SystemRoleWidgetProps = {
  user: User;
};

const SystemRoleWidget = ({ user }: SystemRoleWidgetProps) => {
  const [selectedRole, setSelectedRole] = useState(user.systemRole);
  const [showConfirm, setShowConfirm] = useState(false);

  const onChange = (event: SelectChangeEvent<SystemRoles>) => {
    setSelectedRole(event.target.value as SystemRoles);
    setShowConfirm(true);
  };

  const confirm = () => {
    console.log("confirmed", selectedRole);
  };

  return (
    <Box>
      <Select
        id={`role-select-${user.id}`}
        labelId={`role-select-${user.id}`}
        value={selectedRole}
        label="System Role"
        size="small"
        onChange={onChange}
      >
        <MenuItem value={SystemRoles.User}>{SystemRoles.User}</MenuItem>
        <MenuItem value={SystemRoles.Manager}>{SystemRoles.Manager}</MenuItem>
        <MenuItem value={SystemRoles.Administrator}>{SystemRoles.Administrator}</MenuItem>
      </Select>
      {showConfirm && (
        <Button variant="contained" color="warning" onClick={confirm}>
          Confirm
        </Button>
      )}
    </Box>
  );
};

export default SystemRoleWidget;
