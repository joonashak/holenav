import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AccessTokenDto = {
  __typename?: "AccessTokenDto";
  accessToken: Scalars["String"];
};

export type AddFolderRoleInput = {
  folderId: Scalars["String"];
  role: FolderRoles;
  userEsiId: Scalars["String"];
};

export type AddSignatureInput = {
  signatures: Array<SignatureInput>;
  systemId: Scalars["String"];
};

export type AddWormholeInput = {
  wormholes: Array<WormholeInput>;
};

export type AppData = {
  __typename?: "AppData";
  appVersion: Scalars["String"];
  motd: Scalars["String"];
};

export type Character = {
  __typename?: "Character";
  accessToken?: Maybe<Scalars["String"]>;
  esiId: Scalars["String"];
  isMain: Scalars["Boolean"];
  name: Scalars["String"];
  refreshToken?: Maybe<Scalars["String"]>;
};

export type ConnectionTree = {
  __typename?: "ConnectionTree";
  children: Array<ConnectionTreeNode>;
  rootSystemName: Scalars["String"];
};

export type ConnectionTreeNode = {
  __typename?: "ConnectionTreeNode";
  children: Array<ConnectionTreeNode>;
  name: Scalars["String"];
  wormhole: Wormhole;
};

export type Credentials = {
  __typename?: "Credentials";
  passwordHash: Scalars["String"];
  username: Scalars["String"];
};

export type Folder = {
  __typename?: "Folder";
  id: Scalars["String"];
  name: Scalars["String"];
  personal: Scalars["Boolean"];
};

export type FolderRole = {
  __typename?: "FolderRole";
  folder: Folder;
  role: FolderRoles;
};

export enum FolderRoles {
  Admin = "ADMIN",
  Manage = "MANAGE",
  Read = "READ",
  Write = "WRITE",
}

export type LogoutDto = {
  __typename?: "LogoutDto";
  loggedOut: Scalars["Boolean"];
};

export enum MassStatus {
  Crit = "CRIT",
  Destab = "DESTAB",
  Stable = "STABLE",
}

export type Mutation = {
  __typename?: "Mutation";
  addFolderRole: SanitizedUser;
  addSavedMap: User;
  addSignatures: Array<Signature>;
  addWormholes: Array<Wormhole>;
  changeActiveFolder: SanitizedUser;
  createFolder: Folder;
  deleteSavedMap: User;
  deleteSignature: Signature;
  deleteWormhole: Wormhole;
  getToken: AccessTokenDto;
  login: AccessTokenDto;
  logout: LogoutDto;
  removeAlt: User;
  updateMotd: AppData;
  updateSelectedMap: User;
  updateSignature: Signature;
  updateWormhole: Wormhole;
};

export type MutationAddFolderRoleArgs = {
  input: AddFolderRoleInput;
};

export type MutationAddSavedMapArgs = {
  name: Scalars["String"];
  rootSystemName: Scalars["String"];
};

export type MutationAddSignaturesArgs = {
  input: AddSignatureInput;
};

export type MutationAddWormholesArgs = {
  input: AddWormholeInput;
};

export type MutationChangeActiveFolderArgs = {
  folderId: Scalars["String"];
};

export type MutationCreateFolderArgs = {
  name: Scalars["String"];
};

export type MutationDeleteSavedMapArgs = {
  mapId: Scalars["String"];
};

export type MutationDeleteSignatureArgs = {
  id: Scalars["String"];
};

export type MutationDeleteWormholeArgs = {
  id: Scalars["String"];
};

export type MutationGetTokenArgs = {
  state: Scalars["String"];
};

export type MutationLoginArgs = {
  password: Scalars["String"];
  username: Scalars["String"];
};

export type MutationRemoveAltArgs = {
  esiId: Scalars["String"];
};

export type MutationUpdateMotdArgs = {
  motd: Scalars["String"];
};

export type MutationUpdateSelectedMapArgs = {
  selectedMapId: Scalars["String"];
};

export type MutationUpdateSignatureArgs = {
  input: UpdateSignatureInput;
};

export type MutationUpdateWormholeArgs = {
  input: UpdateWormholeInput;
};

export type PublicAppData = {
  __typename?: "PublicAppData";
  motd: Scalars["String"];
};

export type Query = {
  __typename?: "Query";
  addCharacter: StartSsoLoginDto;
  getAccessibleFolders: Array<Folder>;
  getAllUsers: Array<SanitizedUser>;
  getConnectionTree: ConnectionTree;
  getManageableFolders: Array<Folder>;
  getPublicAppData: PublicAppData;
  getSystemByName: System;
  getWormholesBySystem: Array<Wormhole>;
  searchCharactersByMain: Array<Character>;
  startSsoLogin: StartSsoLoginDto;
  whoami: User;
};

export type QueryGetConnectionTreeArgs = {
  rootSystem: Scalars["String"];
};

export type QueryGetSystemByNameArgs = {
  name: Scalars["String"];
};

export type QueryGetWormholesBySystemArgs = {
  name: Scalars["String"];
};

export type QuerySearchCharactersByMainArgs = {
  search: Scalars["String"];
};

export type SanitizedUser = {
  __typename?: "SanitizedUser";
  id: Scalars["String"];
  main: Character;
};

export type SavedMap = {
  __typename?: "SavedMap";
  id: Scalars["String"];
  name: Scalars["String"];
  rootSystemName: Scalars["String"];
};

export enum SigTypes {
  Data = "DATA",
  Gas = "GAS",
  Relic = "RELIC",
  Wormhole = "WORMHOLE",
}

export type Signature = {
  __typename?: "Signature";
  eveId: Scalars["String"];
  id: Scalars["String"];
  name: Scalars["String"];
  type?: Maybe<SigTypes>;
};

export type SignatureInput = {
  eveId: Scalars["String"];
  name: Scalars["String"];
  type?: InputMaybe<SigTypes>;
};

export type StartSsoLoginDto = {
  __typename?: "StartSsoLoginDto";
  ssoLoginUrl: Scalars["String"];
};

export type System = {
  __typename?: "System";
  folder: Folder;
  id: Scalars["String"];
  name: Scalars["String"];
  signatures: Array<Signature>;
};

export enum SystemRoles {
  Administrator = "ADMINISTRATOR",
  Manager = "MANAGER",
  User = "USER",
}

export type UpdateSignatureInput = {
  eveId: Scalars["String"];
  id: Scalars["String"];
  name: Scalars["String"];
  signatures?: InputMaybe<Array<SignatureInput>>;
  systemId?: InputMaybe<Scalars["String"]>;
  type?: InputMaybe<SigTypes>;
};

export type UpdateWormholeInput = {
  destinationName?: InputMaybe<Scalars["String"]>;
  eol?: InputMaybe<Scalars["Boolean"]>;
  eveId?: InputMaybe<Scalars["String"]>;
  id: Scalars["String"];
  massStatus?: InputMaybe<MassStatus>;
  name?: InputMaybe<Scalars["String"]>;
  reverseType?: InputMaybe<Scalars["String"]>;
  systemName?: InputMaybe<Scalars["String"]>;
  type?: InputMaybe<Scalars["String"]>;
};

export type User = {
  __typename?: "User";
  alts: Array<Character>;
  credentials: Credentials;
  folderRoles: Array<FolderRole>;
  id: Scalars["String"];
  main: Character;
  settings: UserSettings;
  systemRole: SystemRoles;
};

export type UserSettings = {
  __typename?: "UserSettings";
  activeFolder?: Maybe<Folder>;
  maps: Array<SavedMap>;
  selectedMap?: Maybe<SavedMap>;
};

export type Wormhole = {
  __typename?: "Wormhole";
  destinationName?: Maybe<Scalars["String"]>;
  eol: Scalars["Boolean"];
  eveId?: Maybe<Scalars["String"]>;
  folder: Folder;
  id: Scalars["String"];
  massStatus: MassStatus;
  name?: Maybe<Scalars["String"]>;
  reverse?: Maybe<Wormhole>;
  reverseType?: Maybe<Scalars["String"]>;
  systemName: Scalars["String"];
  type?: Maybe<Scalars["String"]>;
};

export type WormholeInput = {
  destinationName?: InputMaybe<Scalars["String"]>;
  eol: Scalars["Boolean"];
  eveId: Scalars["String"];
  massStatus: MassStatus;
  name: Scalars["String"];
  reverseType: Scalars["String"];
  systemName: Scalars["String"];
  type: Scalars["String"];
};

export type GetTokenMutationVariables = Exact<{
  state: Scalars["String"];
}>;

export type GetTokenMutation = {
  __typename?: "Mutation";
  getToken: { __typename?: "AccessTokenDto"; accessToken: string };
};

export type StartSsoLoginQueryVariables = Exact<{ [key: string]: never }>;

export type StartSsoLoginQuery = {
  __typename?: "Query";
  startSsoLogin: { __typename?: "StartSsoLoginDto"; ssoLoginUrl: string };
};

export type AddCharacterQueryVariables = Exact<{ [key: string]: never }>;

export type AddCharacterQuery = {
  __typename?: "Query";
  addCharacter: { __typename?: "StartSsoLoginDto"; ssoLoginUrl: string };
};

export type LoginMutationVariables = Exact<{
  username: Scalars["String"];
  password: Scalars["String"];
}>;

export type LoginMutation = {
  __typename?: "Mutation";
  login: { __typename?: "AccessTokenDto"; accessToken: string };
};

export type LogoutMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutMutation = {
  __typename?: "Mutation";
  logout: { __typename?: "LogoutDto"; loggedOut: boolean };
};

export type GetPublicAppDataQueryVariables = Exact<{ [key: string]: never }>;

export type GetPublicAppDataQuery = {
  __typename?: "Query";
  getPublicAppData: { __typename?: "PublicAppData"; motd: string };
};

export type UpdateMotdMutationVariables = Exact<{
  motd: Scalars["String"];
}>;

export type UpdateMotdMutation = {
  __typename?: "Mutation";
  updateMotd: { __typename?: "AppData"; motd: string };
};

export type FolderFieldsFragment = { __typename?: "Folder"; id: string; name: string };

export type SettingsDataQueryVariables = Exact<{ [key: string]: never }>;

export type SettingsDataQuery = {
  __typename?: "Query";
  getAccessibleFolders: Array<{ __typename?: "Folder"; id: string; name: string }>;
};

export type SettingsDataForManagerQueryVariables = Exact<{ [key: string]: never }>;

export type SettingsDataForManagerQuery = {
  __typename?: "Query";
  getManageableFolders: Array<{ __typename?: "Folder"; id: string; name: string }>;
};

export type CreateFolderMutationVariables = Exact<{
  name: Scalars["String"];
}>;

export type CreateFolderMutation = {
  __typename?: "Mutation";
  createFolder: { __typename?: "Folder"; id: string; name: string };
};

export type AddFolderRoleMutationVariables = Exact<{
  input: AddFolderRoleInput;
}>;

export type AddFolderRoleMutation = {
  __typename?: "Mutation";
  addFolderRole: { __typename?: "SanitizedUser"; id: string };
};

export type ChangeActiveFolderMutationVariables = Exact<{
  folderId: Scalars["String"];
}>;

export type ChangeActiveFolderMutation = {
  __typename?: "Mutation";
  changeActiveFolder: { __typename?: "SanitizedUser"; id: string };
};

export type SearchCharactersByMainQueryVariables = Exact<{
  search: Scalars["String"];
}>;

export type SearchCharactersByMainQuery = {
  __typename?: "Query";
  searchCharactersByMain: Array<{ __typename?: "Character"; name: string; esiId: string }>;
};

export type SignatureFieldsFragment = {
  __typename?: "Signature";
  id: string;
  name: string;
  type?: SigTypes | null;
  eveId: string;
};

export type AddSignatureMutationVariables = Exact<{
  input: AddSignatureInput;
}>;

export type AddSignatureMutation = {
  __typename?: "Mutation";
  addSignatures: Array<{
    __typename?: "Signature";
    id: string;
    name: string;
    type?: SigTypes | null;
    eveId: string;
  }>;
};

export type WormholeFieldsFragment = {
  __typename?: "Wormhole";
  name?: string | null;
  id: string;
  eveId?: string | null;
  type?: string | null;
  eol: boolean;
  massStatus: MassStatus;
  destinationName?: string | null;
  reverseType?: string | null;
};

export type AddWormholeMutationVariables = Exact<{
  input: AddWormholeInput;
}>;

export type AddWormholeMutation = {
  __typename?: "Mutation";
  addWormholes: Array<{
    __typename?: "Wormhole";
    name?: string | null;
    id: string;
    eveId?: string | null;
    type?: string | null;
    eol: boolean;
    massStatus: MassStatus;
    destinationName?: string | null;
    reverseType?: string | null;
  }>;
};

export type UserDataQueryVariables = Exact<{ [key: string]: never }>;

export type UserDataQuery = {
  __typename?: "Query";
  whoami: { __typename?: "User"; id: string; systemRole: SystemRoles };
};

export const FolderFieldsFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "FolderFields" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "Folder" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<FolderFieldsFragment, unknown>;
export const SignatureFieldsFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "SignatureFields" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "Signature" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "type" } },
          { kind: "Field", name: { kind: "Name", value: "eveId" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SignatureFieldsFragment, unknown>;
export const WormholeFieldsFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "WormholeFields" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "Wormhole" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "eveId" } },
          { kind: "Field", name: { kind: "Name", value: "type" } },
          { kind: "Field", name: { kind: "Name", value: "eol" } },
          { kind: "Field", name: { kind: "Name", value: "massStatus" } },
          { kind: "Field", name: { kind: "Name", value: "destinationName" } },
          { kind: "Field", name: { kind: "Name", value: "reverseType" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<WormholeFieldsFragment, unknown>;
export const GetTokenDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "GetToken" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "state" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getToken" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "state" },
                value: { kind: "Variable", name: { kind: "Name", value: "state" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "Field", name: { kind: "Name", value: "accessToken" } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetTokenMutation, GetTokenMutationVariables>;
export const StartSsoLoginDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "StartSsoLogin" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "startSsoLogin" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "Field", name: { kind: "Name", value: "ssoLoginUrl" } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<StartSsoLoginQuery, StartSsoLoginQueryVariables>;
export const AddCharacterDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "AddCharacter" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "addCharacter" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "Field", name: { kind: "Name", value: "ssoLoginUrl" } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AddCharacterQuery, AddCharacterQueryVariables>;
export const LoginDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "Login" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "username" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "password" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "login" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "username" },
                value: { kind: "Variable", name: { kind: "Name", value: "username" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "password" },
                value: { kind: "Variable", name: { kind: "Name", value: "password" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "Field", name: { kind: "Name", value: "accessToken" } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "Logout" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "logout" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "Field", name: { kind: "Name", value: "loggedOut" } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<LogoutMutation, LogoutMutationVariables>;
export const GetPublicAppDataDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetPublicAppData" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getPublicAppData" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "Field", name: { kind: "Name", value: "motd" } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetPublicAppDataQuery, GetPublicAppDataQueryVariables>;
export const UpdateMotdDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateMotd" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "motd" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateMotd" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "motd" },
                value: { kind: "Variable", name: { kind: "Name", value: "motd" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "Field", name: { kind: "Name", value: "motd" } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateMotdMutation, UpdateMotdMutationVariables>;
export const SettingsDataDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "SettingsData" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getAccessibleFolders" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "FragmentSpread", name: { kind: "Name", value: "FolderFields" } },
              ],
            },
          },
        ],
      },
    },
    ...FolderFieldsFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<SettingsDataQuery, SettingsDataQueryVariables>;
export const SettingsDataForManagerDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "SettingsDataForManager" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getManageableFolders" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "FragmentSpread", name: { kind: "Name", value: "FolderFields" } },
              ],
            },
          },
        ],
      },
    },
    ...FolderFieldsFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<SettingsDataForManagerQuery, SettingsDataForManagerQueryVariables>;
export const CreateFolderDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CreateFolder" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "name" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createFolder" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "name" },
                value: { kind: "Variable", name: { kind: "Name", value: "name" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "FragmentSpread", name: { kind: "Name", value: "FolderFields" } },
              ],
            },
          },
        ],
      },
    },
    ...FolderFieldsFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<CreateFolderMutation, CreateFolderMutationVariables>;
export const AddFolderRoleDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "AddFolderRole" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "input" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "AddFolderRoleInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "addFolderRole" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: { kind: "Variable", name: { kind: "Name", value: "input" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "Field", name: { kind: "Name", value: "id" } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AddFolderRoleMutation, AddFolderRoleMutationVariables>;
export const ChangeActiveFolderDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "ChangeActiveFolder" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "folderId" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "changeActiveFolder" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "folderId" },
                value: { kind: "Variable", name: { kind: "Name", value: "folderId" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "Field", name: { kind: "Name", value: "id" } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ChangeActiveFolderMutation, ChangeActiveFolderMutationVariables>;
export const SearchCharactersByMainDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "SearchCharactersByMain" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "search" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "searchCharactersByMain" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "search" },
                value: { kind: "Variable", name: { kind: "Name", value: "search" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "esiId" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SearchCharactersByMainQuery, SearchCharactersByMainQueryVariables>;
export const AddSignatureDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "AddSignature" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "input" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "AddSignatureInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "addSignatures" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: { kind: "Variable", name: { kind: "Name", value: "input" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "FragmentSpread", name: { kind: "Name", value: "SignatureFields" } },
              ],
            },
          },
        ],
      },
    },
    ...SignatureFieldsFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<AddSignatureMutation, AddSignatureMutationVariables>;
export const AddWormholeDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "AddWormhole" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "input" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "AddWormholeInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "addWormholes" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: { kind: "Variable", name: { kind: "Name", value: "input" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "FragmentSpread", name: { kind: "Name", value: "WormholeFields" } },
              ],
            },
          },
        ],
      },
    },
    ...WormholeFieldsFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<AddWormholeMutation, AddWormholeMutationVariables>;
export const UserDataDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "UserData" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "whoami" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "systemRole" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UserDataQuery, UserDataQueryVariables>;
