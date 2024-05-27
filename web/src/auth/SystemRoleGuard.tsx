import { ReactNode } from "react";
import useUserData from "../components/user-data/useUserData";
import { SystemRoles } from "../generated/graphqlOperations";

type RoleGuardProps = {
  children: ReactNode;
  defaultComponent: ReactNode;
  showTo: SystemRoles[];
  hideFrom: SystemRoles[];
};

/**
 * Render `children` only if user has required role, `defaultComponent`
 * otherwise.
 *
 * If only `hideFrom` is given, `children` is shown to all other roles.
 * Otherwise, `hideFrom` roles are filtered out of `showTo` roles and `children`
 * shown to the roles that are left.
 */
const SystemRoleGuard = ({
  children,
  defaultComponent,
  showTo,
  hideFrom,
}: RoleGuardProps) => {
  const { systemRole } = useUserData();

  if (!systemRole) {
    return null;
  }

  showTo = showTo.filter((role) => !hideFrom.includes(role));

  if (!showTo.includes(systemRole)) {
    return <>{defaultComponent}</>;
  }

  return <>{children}</>;
};

SystemRoleGuard.defaultProps = {
  defaultComponent: null,
  showTo: [SystemRoles.Administrator, SystemRoles.Manager, SystemRoles.User],
  hideFrom: [],
};

export default SystemRoleGuard;
