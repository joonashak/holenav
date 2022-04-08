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

export type AddSignatureInput = {
  eveId: Scalars["String"];
  name: Scalars["String"];
  systemId: Scalars["String"];
  type?: InputMaybe<SigTypes>;
};

export type AddWormholeInput = {
  destinationName?: InputMaybe<Scalars["String"]>;
  eol: Scalars["Boolean"];
  eveId: Scalars["String"];
  massStatus: MassStatus;
  name: Scalars["String"];
  reverseType: Scalars["String"];
  systemName: Scalars["String"];
  type: Scalars["String"];
};

export type Character = {
  __typename?: "Character";
  accessToken?: Maybe<Scalars["String"]>;
  esiId: Scalars["String"];
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

export type Folder = {
  __typename?: "Folder";
  id: Scalars["String"];
  name: Scalars["String"];
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

export enum MassStatus {
  Crit = "CRIT",
  Destab = "DESTAB",
  Stable = "STABLE",
}

export type Mutation = {
  __typename?: "Mutation";
  addSavedMap: User;
  addSignature: Signature;
  addWormhole: Wormhole;
  createFolder: Folder;
  deleteSavedMap: User;
  deleteSignature: Signature;
  deleteWormhole: Wormhole;
  removeAlt: User;
  updateSelectedMap: User;
  updateSignature: Signature;
  updateWormhole: Wormhole;
};

export type MutationAddSavedMapArgs = {
  name: Scalars["String"];
  rootSystemName: Scalars["String"];
};

export type MutationAddSignatureArgs = {
  input: AddSignatureInput;
};

export type MutationAddWormholeArgs = {
  input: AddWormholeInput;
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

export type MutationRemoveAltArgs = {
  esiId: Scalars["String"];
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

export type Query = {
  __typename?: "Query";
  getAccessibleFolders: Array<Folder>;
  getAllUsers: Array<SanitizedUser>;
  getConnectionTree: ConnectionTree;
  getManageableFolders: Array<Folder>;
  getSystemByName: System;
  getWormholesBySystem: Array<Wormhole>;
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
  eveId?: InputMaybe<Scalars["String"]>;
  id: Scalars["String"];
  name?: InputMaybe<Scalars["String"]>;
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
  folderRoles: Array<FolderRole>;
  id: Scalars["String"];
  main: Character;
  settings: UserSettings;
  systemRole: SystemRoles;
  tokens: Array<Scalars["String"]>;
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

export type FolderFieldsFragment = { __typename?: "Folder"; id: string; name: string };

export type SettingsDataQueryVariables = Exact<{ [key: string]: never }>;

export type SettingsDataQuery = {
  __typename?: "Query";
  getAccessibleFolders: Array<{ __typename?: "Folder"; id: string; name: string }>;
};

export type CreateFolderMutationVariables = Exact<{
  name: Scalars["String"];
}>;

export type CreateFolderMutation = {
  __typename?: "Mutation";
  createFolder: { __typename?: "Folder"; id: string; name: string };
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
