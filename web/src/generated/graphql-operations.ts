import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type Alliance = {
  __typename?: 'Alliance';
  eveId: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  ticker: Scalars['String']['output'];
};

export type AppData = {
  __typename?: 'AppData';
  appVersion: Scalars['String']['output'];
  motd: Scalars['String']['output'];
  settings: AppSettings;
};

export type AppDataUpdateDto = {
  settings?: InputMaybe<AppSettingsUpdateDto>;
};

export type AppSettings = {
  __typename?: 'AppSettings';
  registration: RegistrationSettings;
};

export type AppSettingsUpdateDto = {
  registration?: InputMaybe<RegistrationSettingsUpdateDto>;
};

export type Character = {
  __typename?: 'Character';
  alliance?: Maybe<Alliance>;
  corporation: Corporation;
  eveId: Scalars['Float']['output'];
  name: Scalars['String']['output'];
};

export type Connection = {
  __typename?: 'Connection';
  createdAt: Scalars['DateTime']['output'];
  createdBy: Scalars['String']['output'];
  eol: Scalars['Boolean']['output'];
  eolAt?: Maybe<Scalars['DateTime']['output']>;
  from: Scalars['String']['output'];
  id: Scalars['String']['output'];
  k162?: Maybe<Scalars['Boolean']['output']>;
  massStatus: MassStatus;
  reverse: Connection;
  to: Scalars['String']['output'];
  type?: Maybe<Scalars['String']['output']>;
  unknown: Scalars['Boolean']['output'];
  updatedAt: Scalars['DateTime']['output'];
  updatedBy: Scalars['String']['output'];
};

export type Corporation = {
  __typename?: 'Corporation';
  eveId: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  ticker: Scalars['String']['output'];
};

export type CreateConnection = {
  eol: Scalars['Boolean']['input'];
  from: Scalars['String']['input'];
  k162: Scalars['Boolean']['input'];
  massStatus: MassStatus;
  to?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type CreateFolderRoleDto = {
  action: FolderAction;
  allianceEveId?: InputMaybe<Scalars['Float']['input']>;
  corporationEveId?: InputMaybe<Scalars['Float']['input']>;
  folderId: Scalars['String']['input'];
  public?: InputMaybe<Scalars['Boolean']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type CreateMapDto = {
  name: Scalars['String']['input'];
  rootSystemName: Scalars['String']['input'];
};

export type CreateSignature = {
  connection?: InputMaybe<CreateConnection>;
  eveId: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  systemName: Scalars['String']['input'];
  type: SigType;
};

export type EveAccessToken = {
  __typename?: 'EveAccessToken';
  accessToken: Scalars['String']['output'];
  eveId: Scalars['Float']['output'];
};

export type FindConnectionGraph = {
  __typename?: 'FindConnectionGraph';
  connections: Array<GraphConnection>;
  root: Scalars['String']['output'];
};

export type FindMap = {
  __typename?: 'FindMap';
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  rootSystemName: Scalars['String']['output'];
};

export type FindSignature = {
  __typename?: 'FindSignature';
  connection?: Maybe<Connection>;
  createdAt: Scalars['DateTime']['output'];
  createdBy: Scalars['String']['output'];
  eveId?: Maybe<Scalars['String']['output']>;
  folder: Folder;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  systemName: Scalars['String']['output'];
  type: SigType;
  updatedAt: Scalars['DateTime']['output'];
  updatedBy: Scalars['String']['output'];
};

export type Folder = {
  __typename?: 'Folder';
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export enum FolderAction {
  Create = 'Create',
  Delete = 'Delete',
  Manage = 'Manage',
  Read = 'Read',
  Write = 'Write'
}

export type FolderRole = {
  __typename?: 'FolderRole';
  action: FolderAction;
  allianceEveId?: Maybe<Scalars['Float']['output']>;
  corporationEveId?: Maybe<Scalars['Float']['output']>;
  folderId: Scalars['String']['output'];
  public: Scalars['Boolean']['output'];
  userId?: Maybe<Scalars['String']['output']>;
};

export type GraphConnection = {
  __typename?: 'GraphConnection';
  createdAt: Scalars['DateTime']['output'];
  createdBy: Scalars['String']['output'];
  depth: Scalars['Float']['output'];
  eol: Scalars['Boolean']['output'];
  eolAt?: Maybe<Scalars['DateTime']['output']>;
  from: Scalars['String']['output'];
  id: Scalars['String']['output'];
  k162?: Maybe<Scalars['Boolean']['output']>;
  massStatus: MassStatus;
  reverse: Scalars['String']['output'];
  signature?: Maybe<Signature>;
  to: Scalars['String']['output'];
  type?: Maybe<Scalars['String']['output']>;
  unknown: Scalars['Boolean']['output'];
  updatedAt: Scalars['DateTime']['output'];
  updatedBy: Scalars['String']['output'];
};

export enum MassStatus {
  Crit = 'CRIT',
  Destab = 'DESTAB',
  Stable = 'STABLE'
}

export type Mutation = {
  __typename?: 'Mutation';
  addAllowedAlliance: AppData;
  addAllowedCorporation: AppData;
  createFolder: Folder;
  createFolderRole: FolderRole;
  createMap: FindMap;
  createSignatures: Array<Signature>;
  pasteSignatures: SignaturePasteResult;
  refreshToken: EveAccessToken;
  removeAllowedAlliance: AppData;
  removeAllowedCorporation: AppData;
  removeAlt: User;
  removeMap: Scalars['String']['output'];
  removeSignatures: Array<FindSignature>;
  updateActiveFolder: UserPreferences;
  updateAppData: AppData;
  updateMap: FindMap;
  updateMotd: AppData;
  updateSignatures: Array<FindSignature>;
};


export type MutationAddAllowedAllianceArgs = {
  esiId: Scalars['String']['input'];
};


export type MutationAddAllowedCorporationArgs = {
  esiId: Scalars['String']['input'];
};


export type MutationCreateFolderArgs = {
  name: Scalars['String']['input'];
};


export type MutationCreateFolderRoleArgs = {
  role: CreateFolderRoleDto;
};


export type MutationCreateMapArgs = {
  input: CreateMapDto;
};


export type MutationCreateSignaturesArgs = {
  folderId: Scalars['String']['input'];
  signatures: Array<CreateSignature>;
};


export type MutationPasteSignaturesArgs = {
  folderId: Scalars['String']['input'];
  input: SignaturePaste;
};


export type MutationRefreshTokenArgs = {
  characterEveId: Scalars['Float']['input'];
};


export type MutationRemoveAllowedAllianceArgs = {
  esiId: Scalars['String']['input'];
};


export type MutationRemoveAllowedCorporationArgs = {
  esiId: Scalars['String']['input'];
};


export type MutationRemoveAltArgs = {
  eveId: Scalars['Float']['input'];
};


export type MutationRemoveMapArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemoveSignaturesArgs = {
  folderId: Scalars['String']['input'];
  signatureIds: Array<Scalars['String']['input']>;
};


export type MutationUpdateActiveFolderArgs = {
  folderId: Scalars['String']['input'];
};


export type MutationUpdateAppDataArgs = {
  input: AppDataUpdateDto;
};


export type MutationUpdateMapArgs = {
  update: UpdateMapDto;
};


export type MutationUpdateMotdArgs = {
  motd: Scalars['String']['input'];
};


export type MutationUpdateSignaturesArgs = {
  folderId: Scalars['String']['input'];
  updates: Array<UpdateSignature>;
};

export type PastedSignature = {
  eveId: Scalars['String']['input'];
  name: Scalars['String']['input'];
  type: SigType;
};

export type PublicAppData = {
  __typename?: 'PublicAppData';
  motd: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  findAccessibleFolders: Array<Folder>;
  findConnectionGraph: FindConnectionGraph;
  findManageableFolders: Array<Folder>;
  findMaps: Array<FindMap>;
  findSignaturesBySystem: Array<FindSignature>;
  getAllUsers: Array<User>;
  getAppData: AppData;
  getMyTokens: Array<EveAccessToken>;
  getMyUserPreferences: UserPreferences;
  getPublicAppData: PublicAppData;
  getSystemByName?: Maybe<System>;
  whoami: User;
};


export type QueryFindConnectionGraphArgs = {
  folderId: Scalars['String']['input'];
  root: Scalars['String']['input'];
};


export type QueryFindSignaturesBySystemArgs = {
  folderId: Scalars['String']['input'];
  systemName: Scalars['String']['input'];
};


export type QueryGetSystemByNameArgs = {
  folderId: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type RegistrationSettings = {
  __typename?: 'RegistrationSettings';
  allianceFilterEnabled: Scalars['Boolean']['output'];
  allowedAlliances: Array<Scalars['String']['output']>;
  allowedCorporations: Array<Scalars['String']['output']>;
  corporationFilterEnabled: Scalars['Boolean']['output'];
  enabled: Scalars['Boolean']['output'];
};

export type RegistrationSettingsUpdateDto = {
  allianceFilterEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  corporationFilterEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
};

export enum SigType {
  Data = 'DATA',
  Gas = 'GAS',
  Relic = 'RELIC',
  Unknown = 'UNKNOWN',
  Wormhole = 'WORMHOLE'
}

export type Signature = {
  __typename?: 'Signature';
  connection?: Maybe<Connection>;
  createdAt: Scalars['DateTime']['output'];
  createdBy: Scalars['String']['output'];
  eveId?: Maybe<Scalars['String']['output']>;
  folder: Folder;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  systemName: Scalars['String']['output'];
  type: SigType;
  updatedAt: Scalars['DateTime']['output'];
  updatedBy: Scalars['String']['output'];
};

export type SignaturePaste = {
  deleteMissingSigs?: InputMaybe<Scalars['Boolean']['input']>;
  pastedSignatures: Array<PastedSignature>;
  systemName: Scalars['String']['input'];
};

export type SignaturePasteResult = {
  __typename?: 'SignaturePasteResult';
  added: Array<Signature>;
  deleted: Array<Signature>;
  updated: Array<FindSignature>;
};

export type System = {
  __typename?: 'System';
  folderId: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  pseudo: Scalars['Boolean']['output'];
};

export type UpdateConnection = {
  eol?: InputMaybe<Scalars['Boolean']['input']>;
  k162?: InputMaybe<Scalars['Boolean']['input']>;
  massStatus?: InputMaybe<MassStatus>;
  to?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateMapDto = {
  id: Scalars['String']['input'];
  name: Scalars['String']['input'];
  rootSystemName: Scalars['String']['input'];
};

export type UpdateSignature = {
  connection?: InputMaybe<UpdateConnection>;
  eveId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<SigType>;
};

export type User = {
  __typename?: 'User';
  admin: Scalars['Boolean']['output'];
  alts: Array<Character>;
  id: Scalars['String']['output'];
  main: Character;
};

export type UserPreferences = {
  __typename?: 'UserPreferences';
  activeFolder?: Maybe<Folder>;
  id: Scalars['String']['output'];
  user: User;
};

export type FindConnectionGraphQueryVariables = Exact<{
  root: Scalars['String']['input'];
  folderId: Scalars['String']['input'];
}>;


export type FindConnectionGraphQuery = { __typename?: 'Query', findConnectionGraph: { __typename?: 'FindConnectionGraph', root: string, connections: Array<{ __typename?: 'GraphConnection', id: string, from: string, to: string, unknown: boolean, type?: string | null, k162?: boolean | null, eol: boolean, eolAt?: any | null, massStatus: MassStatus, reverse: string, depth: number, signature?: { __typename?: 'Signature', id: string, name: string } | null }> } };

export type FindAccessibleFoldersQueryVariables = Exact<{ [key: string]: never; }>;


export type FindAccessibleFoldersQuery = { __typename?: 'Query', findAccessibleFolders: Array<{ __typename?: 'Folder', id: string, name: string }> };

export type CreateFolderMutationVariables = Exact<{
  name: Scalars['String']['input'];
}>;


export type CreateFolderMutation = { __typename?: 'Mutation', createFolder: { __typename?: 'Folder', id: string } };

export type FolderFieldsFragment = { __typename?: 'Folder', id: string, name: string };

export type MapFieldsFragment = { __typename?: 'FindMap', id: string, name: string, rootSystemName: string };

export type AppSettingsFieldsFragment = { __typename?: 'AppSettings', registration: { __typename?: 'RegistrationSettings', enabled: boolean, corporationFilterEnabled: boolean, allianceFilterEnabled: boolean, allowedCorporations: Array<string>, allowedAlliances: Array<string> } };

export type AppDataFieldsFragment = { __typename?: 'AppData', appVersion: string, settings: { __typename?: 'AppSettings', registration: { __typename?: 'RegistrationSettings', enabled: boolean, corporationFilterEnabled: boolean, allianceFilterEnabled: boolean, allowedCorporations: Array<string>, allowedAlliances: Array<string> } } };

export type CompleteCloneBayUserFragment = { __typename?: 'User', id: string, admin: boolean, main: { __typename?: 'Character', eveId: number, name: string, corporation: { __typename?: 'Corporation', eveId: number, name: string, ticker: string }, alliance?: { __typename?: 'Alliance', eveId: number, name: string, ticker: string } | null }, alts: Array<{ __typename?: 'Character', eveId: number, name: string, corporation: { __typename?: 'Corporation', eveId: number, name: string, ticker: string }, alliance?: { __typename?: 'Alliance', eveId: number, name: string, ticker: string } | null }> };

export type FindMapsQueryVariables = Exact<{ [key: string]: never; }>;


export type FindMapsQuery = { __typename?: 'Query', findMaps: Array<{ __typename?: 'FindMap', id: string, name: string, rootSystemName: string }> };

export type CreateMapMutationVariables = Exact<{
  map: CreateMapDto;
}>;


export type CreateMapMutation = { __typename?: 'Mutation', createMap: { __typename?: 'FindMap', id: string } };

export type UpdateMapMutationVariables = Exact<{
  update: UpdateMapDto;
}>;


export type UpdateMapMutation = { __typename?: 'Mutation', updateMap: { __typename?: 'FindMap', id: string } };

export type RemoveMapMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type RemoveMapMutation = { __typename?: 'Mutation', removeMap: string };

export type GetPublicAppDataQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPublicAppDataQuery = { __typename?: 'Query', getPublicAppData: { __typename?: 'PublicAppData', motd: string } };

export type UpdateMotdMutationVariables = Exact<{
  motd: Scalars['String']['input'];
}>;


export type UpdateMotdMutation = { __typename?: 'Mutation', updateMotd: { __typename?: 'AppData', motd: string } };

export type AppSettingsQueryVariables = Exact<{ [key: string]: never; }>;


export type AppSettingsQuery = { __typename?: 'Query', getAppData: { __typename?: 'AppData', appVersion: string, settings: { __typename?: 'AppSettings', registration: { __typename?: 'RegistrationSettings', enabled: boolean, corporationFilterEnabled: boolean, allianceFilterEnabled: boolean, allowedCorporations: Array<string>, allowedAlliances: Array<string> } } } };

export type SetRegistrationEnabledMutationVariables = Exact<{
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type SetRegistrationEnabledMutation = { __typename?: 'Mutation', updateAppData: { __typename?: 'AppData', settings: { __typename?: 'AppSettings', registration: { __typename?: 'RegistrationSettings', enabled: boolean } } } };

export type SetCorporationFilterEnabledMutationVariables = Exact<{
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type SetCorporationFilterEnabledMutation = { __typename?: 'Mutation', updateAppData: { __typename?: 'AppData', settings: { __typename?: 'AppSettings', registration: { __typename?: 'RegistrationSettings', enabled: boolean } } } };

export type SetAllianceFilterEnabledMutationVariables = Exact<{
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type SetAllianceFilterEnabledMutation = { __typename?: 'Mutation', updateAppData: { __typename?: 'AppData', settings: { __typename?: 'AppSettings', registration: { __typename?: 'RegistrationSettings', enabled: boolean } } } };

export type AddAllowedCorporationMutationVariables = Exact<{
  esiId: Scalars['String']['input'];
}>;


export type AddAllowedCorporationMutation = { __typename?: 'Mutation', addAllowedCorporation: { __typename?: 'AppData', settings: { __typename?: 'AppSettings', registration: { __typename?: 'RegistrationSettings', allowedCorporations: Array<string> } } } };

export type AddAllowedAllianceMutationVariables = Exact<{
  esiId: Scalars['String']['input'];
}>;


export type AddAllowedAllianceMutation = { __typename?: 'Mutation', addAllowedAlliance: { __typename?: 'AppData', settings: { __typename?: 'AppSettings', registration: { __typename?: 'RegistrationSettings', allowedAlliances: Array<string> } } } };

export type RemoveAllowedCorporationMutationVariables = Exact<{
  esiId: Scalars['String']['input'];
}>;


export type RemoveAllowedCorporationMutation = { __typename?: 'Mutation', removeAllowedCorporation: { __typename?: 'AppData', settings: { __typename?: 'AppSettings', registration: { __typename?: 'RegistrationSettings', allowedCorporations: Array<string> } } } };

export type RemoveAllowedAllianceMutationVariables = Exact<{
  esiId: Scalars['String']['input'];
}>;


export type RemoveAllowedAllianceMutation = { __typename?: 'Mutation', removeAllowedAlliance: { __typename?: 'AppData', settings: { __typename?: 'AppSettings', registration: { __typename?: 'RegistrationSettings', allowedCorporations: Array<string> } } } };

export type SignatureFieldsFragment = { __typename?: 'Signature', id: string, name: string, type: SigType, eveId?: string | null, systemName: string, createdAt: any, connection?: { __typename?: 'Connection', eol: boolean, eolAt?: any | null, massStatus: MassStatus } | null };

export type CreateSignaturesMutationVariables = Exact<{
  signatures: Array<CreateSignature> | CreateSignature;
  folderId: Scalars['String']['input'];
}>;


export type CreateSignaturesMutation = { __typename?: 'Mutation', createSignatures: Array<{ __typename?: 'Signature', id: string }> };

export type PasteSignaturesMutationVariables = Exact<{
  input: SignaturePaste;
  folderId: Scalars['String']['input'];
}>;


export type PasteSignaturesMutation = { __typename?: 'Mutation', pasteSignatures: { __typename?: 'SignaturePasteResult', added: Array<{ __typename?: 'Signature', id: string, name: string, type: SigType, eveId?: string | null, systemName: string, createdAt: any, connection?: { __typename?: 'Connection', eol: boolean, eolAt?: any | null, massStatus: MassStatus } | null }>, updated: Array<{ __typename?: 'FindSignature', id: string }>, deleted: Array<{ __typename?: 'Signature', id: string, name: string, type: SigType, eveId?: string | null, systemName: string, createdAt: any, connection?: { __typename?: 'Connection', eol: boolean, eolAt?: any | null, massStatus: MassStatus } | null }> } };

export type FindSignaturesBySystemQueryVariables = Exact<{
  systemName: Scalars['String']['input'];
  folderId: Scalars['String']['input'];
}>;


export type FindSignaturesBySystemQuery = { __typename?: 'Query', findSignaturesBySystem: Array<{ __typename?: 'FindSignature', id: string, eveId?: string | null, type: SigType, name: string, systemName: string, createdAt: any, createdBy: string, updatedAt: any, updatedBy: string, folder: { __typename?: 'Folder', id: string, name: string }, connection?: { __typename?: 'Connection', id: string, eol: boolean, eolAt?: any | null, from: string, k162?: boolean | null, massStatus: MassStatus, to: string, type?: string | null, unknown: boolean, reverse: { __typename?: 'Connection', id: string, type?: string | null, k162?: boolean | null } } | null }> };

export type UpdateSignaturesMutationVariables = Exact<{
  updates: Array<UpdateSignature> | UpdateSignature;
  folderId: Scalars['String']['input'];
}>;


export type UpdateSignaturesMutation = { __typename?: 'Mutation', updateSignatures: Array<{ __typename?: 'FindSignature', id: string }> };

export type RemoveSignaturesMutationVariables = Exact<{
  signatureIds: Array<Scalars['String']['input']> | Scalars['String']['input'];
  folderId: Scalars['String']['input'];
}>;


export type RemoveSignaturesMutation = { __typename?: 'Mutation', removeSignatures: Array<{ __typename?: 'FindSignature', id: string }> };

export type GetMyTokensQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyTokensQuery = { __typename?: 'Query', getMyTokens: Array<{ __typename?: 'EveAccessToken', accessToken: string, eveId: number }> };

export type GetMyUserPreferencesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyUserPreferencesQuery = { __typename?: 'Query', getMyUserPreferences: { __typename?: 'UserPreferences', id: string, activeFolder?: { __typename?: 'Folder', id: string } | null, user: { __typename?: 'User', id: string, admin: boolean, main: { __typename?: 'Character', eveId: number, name: string, corporation: { __typename?: 'Corporation', eveId: number, name: string, ticker: string }, alliance?: { __typename?: 'Alliance', eveId: number, name: string, ticker: string } | null }, alts: Array<{ __typename?: 'Character', eveId: number, name: string, corporation: { __typename?: 'Corporation', eveId: number, name: string, ticker: string }, alliance?: { __typename?: 'Alliance', eveId: number, name: string, ticker: string } | null }> } } };

export type UpdateActiveFolderMutationVariables = Exact<{
  folderId: Scalars['String']['input'];
}>;


export type UpdateActiveFolderMutation = { __typename?: 'Mutation', updateActiveFolder: { __typename?: 'UserPreferences', activeFolder?: { __typename?: 'Folder', id: string } | null } };

export type RemoveAltMutationVariables = Exact<{
  eveId: Scalars['Float']['input'];
}>;


export type RemoveAltMutation = { __typename?: 'Mutation', removeAlt: { __typename?: 'User', id: string } };

export const FolderFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FolderFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Folder"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<FolderFieldsFragment, unknown>;
export const MapFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MapFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FindMap"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"rootSystemName"}}]}}]} as unknown as DocumentNode<MapFieldsFragment, unknown>;
export const AppSettingsFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AppSettingsFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AppSettings"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"registration"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"enabled"}},{"kind":"Field","name":{"kind":"Name","value":"corporationFilterEnabled"}},{"kind":"Field","name":{"kind":"Name","value":"allianceFilterEnabled"}},{"kind":"Field","name":{"kind":"Name","value":"allowedCorporations"}},{"kind":"Field","name":{"kind":"Name","value":"allowedAlliances"}}]}}]}}]} as unknown as DocumentNode<AppSettingsFieldsFragment, unknown>;
export const AppDataFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AppDataFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AppData"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"appVersion"}},{"kind":"Field","name":{"kind":"Name","value":"settings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AppSettingsFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AppSettingsFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AppSettings"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"registration"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"enabled"}},{"kind":"Field","name":{"kind":"Name","value":"corporationFilterEnabled"}},{"kind":"Field","name":{"kind":"Name","value":"allianceFilterEnabled"}},{"kind":"Field","name":{"kind":"Name","value":"allowedCorporations"}},{"kind":"Field","name":{"kind":"Name","value":"allowedAlliances"}}]}}]}}]} as unknown as DocumentNode<AppDataFieldsFragment, unknown>;
export const CompleteCloneBayUserFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CompleteCloneBayUser"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"main"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"eveId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"corporation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"eveId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"ticker"}}]}},{"kind":"Field","name":{"kind":"Name","value":"alliance"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"eveId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"ticker"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"alts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"eveId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"corporation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"eveId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"ticker"}}]}},{"kind":"Field","name":{"kind":"Name","value":"alliance"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"eveId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"ticker"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"admin"}}]}}]} as unknown as DocumentNode<CompleteCloneBayUserFragment, unknown>;
export const SignatureFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SignatureFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Signature"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"eveId"}},{"kind":"Field","name":{"kind":"Name","value":"systemName"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"connection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"eol"}},{"kind":"Field","name":{"kind":"Name","value":"eolAt"}},{"kind":"Field","name":{"kind":"Name","value":"massStatus"}}]}}]}}]} as unknown as DocumentNode<SignatureFieldsFragment, unknown>;
export const FindConnectionGraphDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindConnectionGraph"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"root"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"folderId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findConnectionGraph"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"root"},"value":{"kind":"Variable","name":{"kind":"Name","value":"root"}}},{"kind":"Argument","name":{"kind":"Name","value":"folderId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"folderId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"root"}},{"kind":"Field","name":{"kind":"Name","value":"connections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"to"}},{"kind":"Field","name":{"kind":"Name","value":"unknown"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"k162"}},{"kind":"Field","name":{"kind":"Name","value":"eol"}},{"kind":"Field","name":{"kind":"Name","value":"eolAt"}},{"kind":"Field","name":{"kind":"Name","value":"massStatus"}},{"kind":"Field","name":{"kind":"Name","value":"reverse"}},{"kind":"Field","name":{"kind":"Name","value":"depth"}},{"kind":"Field","name":{"kind":"Name","value":"signature"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<FindConnectionGraphQuery, FindConnectionGraphQueryVariables>;
export const FindAccessibleFoldersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindAccessibleFolders"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findAccessibleFolders"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<FindAccessibleFoldersQuery, FindAccessibleFoldersQueryVariables>;
export const CreateFolderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateFolder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createFolder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateFolderMutation, CreateFolderMutationVariables>;
export const FindMapsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindMaps"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findMaps"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MapFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MapFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FindMap"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"rootSystemName"}}]}}]} as unknown as DocumentNode<FindMapsQuery, FindMapsQueryVariables>;
export const CreateMapDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateMap"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"map"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateMapDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createMap"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"map"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateMapMutation, CreateMapMutationVariables>;
export const UpdateMapDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateMap"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"update"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateMapDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateMap"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"update"},"value":{"kind":"Variable","name":{"kind":"Name","value":"update"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateMapMutation, UpdateMapMutationVariables>;
export const RemoveMapDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveMap"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeMap"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<RemoveMapMutation, RemoveMapMutationVariables>;
export const GetPublicAppDataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPublicAppData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPublicAppData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"motd"}}]}}]}}]} as unknown as DocumentNode<GetPublicAppDataQuery, GetPublicAppDataQueryVariables>;
export const UpdateMotdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateMotd"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"motd"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateMotd"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"motd"},"value":{"kind":"Variable","name":{"kind":"Name","value":"motd"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"motd"}}]}}]}}]} as unknown as DocumentNode<UpdateMotdMutation, UpdateMotdMutationVariables>;
export const AppSettingsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AppSettings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAppData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AppDataFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AppSettingsFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AppSettings"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"registration"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"enabled"}},{"kind":"Field","name":{"kind":"Name","value":"corporationFilterEnabled"}},{"kind":"Field","name":{"kind":"Name","value":"allianceFilterEnabled"}},{"kind":"Field","name":{"kind":"Name","value":"allowedCorporations"}},{"kind":"Field","name":{"kind":"Name","value":"allowedAlliances"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AppDataFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AppData"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"appVersion"}},{"kind":"Field","name":{"kind":"Name","value":"settings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AppSettingsFields"}}]}}]}}]} as unknown as DocumentNode<AppSettingsQuery, AppSettingsQueryVariables>;
export const SetRegistrationEnabledDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SetRegistrationEnabled"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"enabled"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateAppData"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"settings"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"registration"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"enabled"},"value":{"kind":"Variable","name":{"kind":"Name","value":"enabled"}}}]}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"settings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"registration"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"enabled"}}]}}]}}]}}]}}]} as unknown as DocumentNode<SetRegistrationEnabledMutation, SetRegistrationEnabledMutationVariables>;
export const SetCorporationFilterEnabledDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SetCorporationFilterEnabled"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"enabled"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateAppData"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"settings"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"registration"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"corporationFilterEnabled"},"value":{"kind":"Variable","name":{"kind":"Name","value":"enabled"}}}]}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"settings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"registration"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"enabled"}}]}}]}}]}}]}}]} as unknown as DocumentNode<SetCorporationFilterEnabledMutation, SetCorporationFilterEnabledMutationVariables>;
export const SetAllianceFilterEnabledDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SetAllianceFilterEnabled"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"enabled"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateAppData"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"settings"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"registration"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"allianceFilterEnabled"},"value":{"kind":"Variable","name":{"kind":"Name","value":"enabled"}}}]}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"settings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"registration"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"enabled"}}]}}]}}]}}]}}]} as unknown as DocumentNode<SetAllianceFilterEnabledMutation, SetAllianceFilterEnabledMutationVariables>;
export const AddAllowedCorporationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddAllowedCorporation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"esiId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addAllowedCorporation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"esiId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"esiId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"settings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"registration"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allowedCorporations"}}]}}]}}]}}]}}]} as unknown as DocumentNode<AddAllowedCorporationMutation, AddAllowedCorporationMutationVariables>;
export const AddAllowedAllianceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddAllowedAlliance"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"esiId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addAllowedAlliance"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"esiId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"esiId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"settings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"registration"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allowedAlliances"}}]}}]}}]}}]}}]} as unknown as DocumentNode<AddAllowedAllianceMutation, AddAllowedAllianceMutationVariables>;
export const RemoveAllowedCorporationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveAllowedCorporation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"esiId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeAllowedCorporation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"esiId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"esiId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"settings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"registration"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allowedCorporations"}}]}}]}}]}}]}}]} as unknown as DocumentNode<RemoveAllowedCorporationMutation, RemoveAllowedCorporationMutationVariables>;
export const RemoveAllowedAllianceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveAllowedAlliance"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"esiId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeAllowedAlliance"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"esiId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"esiId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"settings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"registration"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allowedCorporations"}}]}}]}}]}}]}}]} as unknown as DocumentNode<RemoveAllowedAllianceMutation, RemoveAllowedAllianceMutationVariables>;
export const CreateSignaturesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateSignatures"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"signatures"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateSignature"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"folderId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createSignatures"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"signatures"},"value":{"kind":"Variable","name":{"kind":"Name","value":"signatures"}}},{"kind":"Argument","name":{"kind":"Name","value":"folderId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"folderId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateSignaturesMutation, CreateSignaturesMutationVariables>;
export const PasteSignaturesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"PasteSignatures"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SignaturePaste"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"folderId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pasteSignatures"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}},{"kind":"Argument","name":{"kind":"Name","value":"folderId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"folderId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"added"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SignatureFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"updated"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"deleted"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SignatureFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SignatureFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Signature"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"eveId"}},{"kind":"Field","name":{"kind":"Name","value":"systemName"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"connection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"eol"}},{"kind":"Field","name":{"kind":"Name","value":"eolAt"}},{"kind":"Field","name":{"kind":"Name","value":"massStatus"}}]}}]}}]} as unknown as DocumentNode<PasteSignaturesMutation, PasteSignaturesMutationVariables>;
export const FindSignaturesBySystemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindSignaturesBySystem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"systemName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"folderId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findSignaturesBySystem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"systemName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"systemName"}}},{"kind":"Argument","name":{"kind":"Name","value":"folderId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"folderId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"eveId"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"systemName"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdBy"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedBy"}},{"kind":"Field","name":{"kind":"Name","value":"folder"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"connection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"eol"}},{"kind":"Field","name":{"kind":"Name","value":"eolAt"}},{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"k162"}},{"kind":"Field","name":{"kind":"Name","value":"massStatus"}},{"kind":"Field","name":{"kind":"Name","value":"to"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"unknown"}},{"kind":"Field","name":{"kind":"Name","value":"reverse"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"k162"}}]}}]}}]}}]}}]} as unknown as DocumentNode<FindSignaturesBySystemQuery, FindSignaturesBySystemQueryVariables>;
export const UpdateSignaturesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateSignatures"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updates"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateSignature"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"folderId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateSignatures"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updates"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updates"}}},{"kind":"Argument","name":{"kind":"Name","value":"folderId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"folderId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateSignaturesMutation, UpdateSignaturesMutationVariables>;
export const RemoveSignaturesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveSignatures"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"signatureIds"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"folderId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeSignatures"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"signatureIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"signatureIds"}}},{"kind":"Argument","name":{"kind":"Name","value":"folderId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"folderId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<RemoveSignaturesMutation, RemoveSignaturesMutationVariables>;
export const GetMyTokensDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMyTokens"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getMyTokens"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"eveId"}}]}}]}}]} as unknown as DocumentNode<GetMyTokensQuery, GetMyTokensQueryVariables>;
export const GetMyUserPreferencesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMyUserPreferences"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getMyUserPreferences"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"activeFolder"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CompleteCloneBayUser"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CompleteCloneBayUser"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"main"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"eveId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"corporation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"eveId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"ticker"}}]}},{"kind":"Field","name":{"kind":"Name","value":"alliance"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"eveId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"ticker"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"alts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"eveId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"corporation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"eveId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"ticker"}}]}},{"kind":"Field","name":{"kind":"Name","value":"alliance"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"eveId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"ticker"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"admin"}}]}}]} as unknown as DocumentNode<GetMyUserPreferencesQuery, GetMyUserPreferencesQueryVariables>;
export const UpdateActiveFolderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateActiveFolder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"folderId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateActiveFolder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"folderId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"folderId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"activeFolder"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateActiveFolderMutation, UpdateActiveFolderMutationVariables>;
export const RemoveAltDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveAlt"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"eveId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeAlt"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"eveId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"eveId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<RemoveAltMutation, RemoveAltMutationVariables>;