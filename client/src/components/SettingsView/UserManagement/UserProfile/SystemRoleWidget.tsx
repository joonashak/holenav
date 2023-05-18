import { Box, Button, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useState } from "react";
import { SystemRoles, User } from "../../../../generated/graphqlOperations";
import useSettingsData from "../../SettingsData/useSettingsData";

const options = [
  { value: SystemRoles.None, label: "Account Disabled" },
  { value: SystemRoles.User, label: "User" },
  { value: SystemRoles.Manager, label: "Manager" },
  { value: SystemRoles.Administrator, label: "Administrator" },
];

type SystemRoleWidgetProps = {
  user: User;
};

const SystemRoleWidget = ({ user }: SystemRoleWidgetProps) => {
  // Represent `null` role as an empty string so that it works with <Select>.
  const [selectedRole, setSelectedRole] = useState(user.systemRole);
  const [showConfirm, setShowConfirm] = useState(false);
  const { assignSystemRole } = useSettingsData();

  const onChange = (event: SelectChangeEvent<SystemRoles>) => {
    setSelectedRole(event.target.value);
    setShowConfirm(true);
  };

  const confirm = async () => {
    const role = await assignSystemRole(user.id, selectedRole);
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
        {options.map((opt) => (
          <MenuItem value={opt.value} key={`role-opt-${user.id}-${opt.label}`}>
            {opt.label}
          </MenuItem>
        ))}
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
