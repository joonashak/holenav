import Roles from "../../role/roles.enum";
import FolderRoles from "../../user/folderRoles/folderRoles.enum";

export default [
  {
    id: "mock-1",
    role: Roles.READ,
    defaultFolderRole: FolderRoles.READ,
    main: {
      name: "Char 1 (read)",
      esiId: "123",
      accessToken: "mock access token",
      refreshToken: "mock refresh token",
    },
  },
  {
    id: "mock-2",
    role: Roles.WRITE,
    defaultFolderRole: FolderRoles.WRITE,
    main: {
      name: "Char 2 (write)",
      esiId: "234",
      accessToken: "mock access token",
      refreshToken: "mock refresh token",
    },
  },
  {
    id: "mock-3",
    role: Roles.MANAGE,
    defaultFolderRole: FolderRoles.MANAGE,
    main: {
      name: "Char 3 (manage)",
      esiId: "345",
      accessToken: "mock access token",
      refreshToken: "mock refresh token",
    },
  },
  {
    id: "mock-4",
    role: Roles.ADMIN,
    defaultFolderRole: FolderRoles.ADMIN,
    main: {
      name: "Char 4 (admin)",
      esiId: "456",
      accessToken: "mock access token",
      refreshToken: "mock refresh token",
    },
  },
];
