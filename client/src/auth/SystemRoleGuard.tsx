import { ReactNode } from "react";
import useUserData from "../components/UserData/useUserData";
import SystemRoles from "../enum/SystemRoles";

type RoleGuardProps = {
  children: ReactNode;
  minRole: SystemRoles;
};

/**
 * Render `children` only if current system role is at least `minRole`.
 */
const SystemRoleGuard = ({ children, minRole }: RoleGuardProps) => {
  const { systemRole } = useUserData();

  if (!systemRole) {
    return null;
  }

  if (systemRole < minRole) {
    return null;
  }

  return <>{children}</>;
};

export default SystemRoleGuard;
