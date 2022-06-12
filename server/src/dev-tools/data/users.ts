import { hashSync } from "bcrypt";
import FolderRoles from "../../user/roles/folder-roles.enum";
import SystemRoles from "../../user/roles/system-roles.enum";

export default [
  {
    id: "mock-1",
    defaultFolderRole: FolderRoles.READ,
    systemRole: SystemRoles.USER,
    main: {
      name: "Char 1 (read)",
      esiId: "123",
      accessToken: "mock access token",
      refreshToken: "mock refresh token",
    },
    credentials: {
      username: "mock-user-1",
      passwordHash: hashSync("mock-password-1", 12),
    },
  },
  {
    id: "mock-2",
    defaultFolderRole: FolderRoles.WRITE,
    systemRole: SystemRoles.USER,
    main: {
      name: "Char 2 (write)",
      esiId: "234",
      accessToken: "mock access token",
      refreshToken: "mock refresh token",
    },
    credentials: {
      username: "mock-user-2",
      passwordHash: hashSync("mock-password-2", 12),
    },
  },
  {
    id: "mock-3",
    defaultFolderRole: FolderRoles.MANAGE,
    systemRole: SystemRoles.MANAGER,
    main: {
      name: "Char 3 (manage)",
      esiId: "345",
      accessToken: "mock access token",
      refreshToken: "mock refresh token",
    },
    credentials: {
      username: "mock-user-3",
      passwordHash: hashSync("mock-password-3", 12),
    },
  },
  {
    id: "mock-4",
    defaultFolderRole: FolderRoles.ADMIN,
    systemRole: SystemRoles.ADMINISTRATOR,
    main: {
      name: "Char 4 (admin)",
      esiId: "456",
      accessToken: "mock access token",
      refreshToken: "mock refresh token",
    },
    credentials: {
      username: "mock-user-4",
      passwordHash: hashSync("mock-password-4", 12),
    },
  },
];
