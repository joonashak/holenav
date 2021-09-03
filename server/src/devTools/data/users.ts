import Roles from "../../role/roles.enum";

export default [
  {
    id: "mock-1",
    role: Roles.READ,
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
    main: {
      name: "Char 4 (admin)",
      esiId: "456",
      accessToken: "mock access token",
      refreshToken: "mock refresh token",
    },
  },
];
