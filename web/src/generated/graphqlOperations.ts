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

export type AccessTokenDto = {
  __typename?: 'AccessTokenDto';
  accessToken: Scalars['String']['output'];
};

export type AddSignaturesInput = {
  signatures: Array<CreatableSignature>;
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

export type AssignSystemRoleInput = {
  systemRole?: InputMaybe<SystemRoles>;
  userId: Scalars['String']['input'];
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
  eol: Scalars['Boolean']['output'];
  eolAt?: Maybe<Scalars['DateTime']['output']>;
  massStatus: MassStatus;
  reverseSignature: SignatureWithoutConnection;
};

export type ConnectionInput = {
  eol: Scalars['Boolean']['input'];
  eolAt?: InputMaybe<Scalars['DateTime']['input']>;
  massStatus: MassStatus;
  reverseSignature: CreatableSignatureWithoutConnection;
};

export type ConnectionInputUpdate = {
  eol: Scalars['Boolean']['input'];
  eolAt?: InputMaybe<Scalars['DateTime']['input']>;
  massStatus: MassStatus;
  reverseSignature: SignatureUpdateWithoutConnection;
};

export type Corporation = {
  __typename?: 'Corporation';
  eveId: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  ticker: Scalars['String']['output'];
};

export type CreatableSignature = {
  connection?: InputMaybe<ConnectionInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  eveId: Scalars['String']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  systemName: Scalars['String']['input'];
  type: SigType;
  wormholeType?: InputMaybe<Scalars['String']['input']>;
};

export type CreatableSignatureWithoutConnection = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  eveId: Scalars['String']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  systemName: Scalars['String']['input'];
  type: SigType;
  wormholeType?: InputMaybe<Scalars['String']['input']>;
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

export type DeleteSignaturesInput = {
  ids: Array<Scalars['String']['input']>;
};

export type EveAccessToken = {
  __typename?: 'EveAccessToken';
  accessToken: Scalars['String']['output'];
  eveId: Scalars['Float']['output'];
};

export type FindMap = {
  __typename?: 'FindMap';
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  rootSystemName: Scalars['String']['output'];
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

export type HolenavAlliance = {
  __typename?: 'HolenavAlliance';
  esiId: Scalars['String']['output'];
  name: Scalars['String']['output'];
  ticker: Scalars['String']['output'];
};

export type HolenavCharacter = {
  __typename?: 'HolenavCharacter';
  alliance?: Maybe<HolenavAlliance>;
  corporation: HolenavCorporation;
  esiId: Scalars['String']['output'];
  isMain: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  portraitUrl: Scalars['String']['output'];
  ssoToken?: Maybe<SsoToken>;
};

export type HolenavCorporation = {
  __typename?: 'HolenavCorporation';
  esiId: Scalars['String']['output'];
  name: Scalars['String']['output'];
  ticker: Scalars['String']['output'];
};

export type HolenavUser = {
  __typename?: 'HolenavUser';
  alts: Array<HolenavCharacter>;
  id: Scalars['String']['output'];
  main: HolenavCharacter;
  systemRole: SystemRoles;
};

export type LogoutDto = {
  __typename?: 'LogoutDto';
  loggedOut: Scalars['Boolean']['output'];
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
  addSignatures: Array<Signature>;
  assignSystemRole: SanitizedUserForManager;
  createFolder: Folder;
  createFolderRole: FolderRole;
  createMap: FindMap;
  deleteSignatures: Array<Signature>;
  getToken: AccessTokenDto;
  logout: LogoutDto;
  pasteSignatures: SignaturePasteResult;
  refreshToken: EveAccessToken;
  removeAllowedAlliance: AppData;
  removeAllowedCorporation: AppData;
  removeAlt: HolenavUser;
  updateAppData: AppData;
  updateMotd: AppData;
  updateSignatures: Array<Signature>;
};


export type MutationAddAllowedAllianceArgs = {
  esiId: Scalars['String']['input'];
};


export type MutationAddAllowedCorporationArgs = {
  esiId: Scalars['String']['input'];
};


export type MutationAddSignaturesArgs = {
  folderId: Scalars['String']['input'];
  input: AddSignaturesInput;
};


export type MutationAssignSystemRoleArgs = {
  input: AssignSystemRoleInput;
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


export type MutationDeleteSignaturesArgs = {
  folderId: Scalars['String']['input'];
  input: DeleteSignaturesInput;
};


export type MutationGetTokenArgs = {
  state: Scalars['String']['input'];
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
  esiId: Scalars['String']['input'];
};


export type MutationUpdateAppDataArgs = {
  input: AppDataUpdateDto;
};


export type MutationUpdateMotdArgs = {
  motd: Scalars['String']['input'];
};


export type MutationUpdateSignaturesArgs = {
  folderId: Scalars['String']['input'];
  input: UpdateSignaturesInput;
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
  findMaps: Array<FindMap>;
  getAccessibleFolders: Array<Folder>;
  getAllUsers: Array<User>;
  getAllUsersForManager: Array<SanitizedUserForManager>;
  getAppData: AppData;
  getManageableFolders: Array<Folder>;
  getMyTokens: Array<EveAccessToken>;
  getMyUserPreferences: UserPreferences;
  getPublicAppData: PublicAppData;
  getSignaturesBySystem: Array<Signature>;
  getSsoTokens: UserSsoTokens;
  getSystemByName?: Maybe<System>;
  searchCharactersByMain: Array<HolenavCharacter>;
  whoami: HolenavUser;
};


export type QueryGetSignaturesBySystemArgs = {
  folderId: Scalars['String']['input'];
  systemName: Scalars['String']['input'];
};


export type QueryGetSystemByNameArgs = {
  folderId: Scalars['String']['input'];
  name: Scalars['String']['input'];
};


export type QuerySearchCharactersByMainArgs = {
  search: Scalars['String']['input'];
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

export type SanitizedUserForManager = {
  __typename?: 'SanitizedUserForManager';
  id: Scalars['String']['output'];
  main: HolenavCharacter;
  systemRole: SystemRoles;
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
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  eveId: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  systemName: Scalars['String']['output'];
  type: SigType;
  wormholeType?: Maybe<Scalars['String']['output']>;
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
  updated: Array<Signature>;
};

export type SignatureUpdateWithoutConnection = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  eveId: Scalars['String']['input'];
  id: Scalars['String']['input'];
  name: Scalars['String']['input'];
  systemName: Scalars['String']['input'];
  type: SigType;
  wormholeType?: InputMaybe<Scalars['String']['input']>;
};

export type SignatureWithoutConnection = {
  __typename?: 'SignatureWithoutConnection';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  eveId: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  systemName: Scalars['String']['output'];
  type: SigType;
  wormholeType?: Maybe<Scalars['String']['output']>;
};

export type SsoToken = {
  __typename?: 'SsoToken';
  accessToken: Scalars['String']['output'];
  refreshToken: Scalars['String']['output'];
};

export type SsoTokenDto = {
  __typename?: 'SsoTokenDto';
  accessToken: Scalars['String']['output'];
  esiId: Scalars['String']['output'];
};

export type System = {
  __typename?: 'System';
  folderId: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  pseudo: Scalars['Boolean']['output'];
};

export enum SystemRoles {
  Administrator = 'ADMINISTRATOR',
  Manager = 'MANAGER',
  None = 'NONE',
  User = 'USER'
}

export type UpdateSignaturesInput = {
  signatures: Array<UpdateableSignature>;
};

export type UpdateableSignature = {
  connection?: InputMaybe<ConnectionInputUpdate>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  eveId: Scalars['String']['input'];
  id: Scalars['String']['input'];
  name: Scalars['String']['input'];
  systemName: Scalars['String']['input'];
  type: SigType;
  wormholeType?: InputMaybe<Scalars['String']['input']>;
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
  id: Scalars['String']['output'];
  user: User;
};

export type UserSsoTokens = {
  __typename?: 'UserSsoTokens';
  alts: Array<SsoTokenDto>;
  main: SsoTokenDto;
};

export type SearchCharactersByMainQueryVariables = Exact<{
  search: Scalars['String']['input'];
}>;


export type SearchCharactersByMainQuery = { __typename?: 'Query', searchCharactersByMain: Array<{ __typename?: 'HolenavCharacter', esiId: string, name: string, isMain: boolean, portraitUrl: string, corporation: { __typename?: 'HolenavCorporation', esiId: string, name: string, ticker: string } }> };

export type UserFieldsForManagerFragment = { __typename?: 'SanitizedUserForManager', id: string, systemRole: SystemRoles, main: { __typename?: 'HolenavCharacter', esiId: string, name: string, portraitUrl: string, isMain: boolean, corporation: { __typename?: 'HolenavCorporation', esiId: string, name: string, ticker: string }, alliance?: { __typename?: 'HolenavAlliance', esiId: string, name: string, ticker: string } | null } };

export type FolderFieldsFragment = { __typename?: 'Folder', id: string, name: string };

export type CorporationFieldsFragment = { __typename?: 'HolenavCorporation', esiId: string, name: string, ticker: string };

export type CharacterFieldsFragment = { __typename?: 'HolenavCharacter', esiId: string, name: string, isMain: boolean, portraitUrl: string, corporation: { __typename?: 'HolenavCorporation', esiId: string, name: string, ticker: string } };

export type MapFieldsFragment = { __typename?: 'FindMap', id: string, name: string, rootSystemName: string };

export type AppSettingsFieldsFragment = { __typename?: 'AppSettings', registration: { __typename?: 'RegistrationSettings', enabled: boolean, corporationFilterEnabled: boolean, allianceFilterEnabled: boolean, allowedCorporations: Array<string>, allowedAlliances: Array<string> } };

export type AppDataFieldsFragment = { __typename?: 'AppData', appVersion: string, settings: { __typename?: 'AppSettings', registration: { __typename?: 'RegistrationSettings', enabled: boolean, corporationFilterEnabled: boolean, allianceFilterEnabled: boolean, allowedCorporations: Array<string>, allowedAlliances: Array<string> } } };

export type CompleteCloneBayUserFragment = { __typename?: 'User', id: string, admin: boolean, main: { __typename?: 'Character', eveId: number, name: string, corporation: { __typename?: 'Corporation', eveId: number, name: string, ticker: string }, alliance?: { __typename?: 'Alliance', eveId: number, name: string, ticker: string } | null }, alts: Array<{ __typename?: 'Character', eveId: number, name: string, corporation: { __typename?: 'Corporation', eveId: number, name: string, ticker: string }, alliance?: { __typename?: 'Alliance', eveId: number, name: string, ticker: string } | null }> };

export type FindMapsQueryVariables = Exact<{ [key: string]: never; }>;


export type FindMapsQuery = { __typename?: 'Query', findMaps: Array<{ __typename?: 'FindMap', id: string, name: string, rootSystemName: string }> };

export type GetPublicAppDataQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPublicAppDataQuery = { __typename?: 'Query', getPublicAppData: { __typename?: 'PublicAppData', motd: string } };

export type UpdateMotdMutationVariables = Exact<{
  motd: Scalars['String']['input'];
}>;


export type UpdateMotdMutation = { __typename?: 'Mutation', updateMotd: { __typename?: 'AppData', motd: string } };

export type SettingsDataQueryVariables = Exact<{ [key: string]: never; }>;


export type SettingsDataQuery = { __typename?: 'Query', getAccessibleFolders: Array<{ __typename?: 'Folder', id: string, name: string }> };

export type SettingsDataForManagerQueryVariables = Exact<{ [key: string]: never; }>;


export type SettingsDataForManagerQuery = { __typename?: 'Query', getManageableFolders: Array<{ __typename?: 'Folder', id: string, name: string }> };

export type AppSettingsQueryVariables = Exact<{ [key: string]: never; }>;


export type AppSettingsQuery = { __typename?: 'Query', getAppData: { __typename?: 'AppData', appVersion: string, settings: { __typename?: 'AppSettings', registration: { __typename?: 'RegistrationSettings', enabled: boolean, corporationFilterEnabled: boolean, allianceFilterEnabled: boolean, allowedCorporations: Array<string>, allowedAlliances: Array<string> } } } };

export type CreateFolderMutationVariables = Exact<{
  name: Scalars['String']['input'];
}>;


export type CreateFolderMutation = { __typename?: 'Mutation', createFolder: { __typename?: 'Folder', id: string, name: string } };

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

export type SignatureFieldsFragment = { __typename?: 'Signature', id: string, name: string, type: SigType, eveId: string, systemName: string, wormholeType?: string | null, createdAt?: any | null, connection?: { __typename?: 'Connection', eol: boolean, eolAt?: any | null, massStatus: MassStatus, reverseSignature: { __typename?: 'SignatureWithoutConnection', id: string, name: string, type: SigType, eveId: string, systemName: string, wormholeType?: string | null } } | null };

export type SystemQueryVariables = Exact<{
  name: Scalars['String']['input'];
  folderId: Scalars['String']['input'];
}>;


export type SystemQuery = { __typename?: 'Query', getSystemByName?: { __typename?: 'System', id: string, name: string } | null, getSignaturesBySystem: Array<{ __typename?: 'Signature', id: string, name: string, type: SigType, eveId: string, systemName: string, wormholeType?: string | null, createdAt?: any | null, connection?: { __typename?: 'Connection', eol: boolean, eolAt?: any | null, massStatus: MassStatus, reverseSignature: { __typename?: 'SignatureWithoutConnection', id: string, name: string, type: SigType, eveId: string, systemName: string, wormholeType?: string | null } } | null }> };

export type GetSignaturesQueryVariables = Exact<{
  systemName: Scalars['String']['input'];
  folderId: Scalars['String']['input'];
}>;


export type GetSignaturesQuery = { __typename?: 'Query', getSignaturesBySystem: Array<{ __typename?: 'Signature', id: string, name: string, type: SigType, eveId: string, systemName: string, wormholeType?: string | null, createdAt?: any | null, connection?: { __typename?: 'Connection', eol: boolean, eolAt?: any | null, massStatus: MassStatus, reverseSignature: { __typename?: 'SignatureWithoutConnection', id: string, name: string, type: SigType, eveId: string, systemName: string, wormholeType?: string | null } } | null }> };

export type AddSignaturesMutationVariables = Exact<{
  input: AddSignaturesInput;
  folderId: Scalars['String']['input'];
}>;


export type AddSignaturesMutation = { __typename?: 'Mutation', addSignatures: Array<{ __typename?: 'Signature', id: string, name: string, type: SigType, eveId: string, systemName: string, wormholeType?: string | null, createdAt?: any | null, connection?: { __typename?: 'Connection', eol: boolean, eolAt?: any | null, massStatus: MassStatus, reverseSignature: { __typename?: 'SignatureWithoutConnection', id: string, name: string, type: SigType, eveId: string, systemName: string, wormholeType?: string | null } } | null }> };

export type UpdateSignaturesMutationVariables = Exact<{
  input: UpdateSignaturesInput;
  folderId: Scalars['String']['input'];
}>;


export type UpdateSignaturesMutation = { __typename?: 'Mutation', updateSignatures: Array<{ __typename?: 'Signature', id: string, name: string, type: SigType, eveId: string, systemName: string, wormholeType?: string | null, createdAt?: any | null, connection?: { __typename?: 'Connection', eol: boolean, eolAt?: any | null, massStatus: MassStatus, reverseSignature: { __typename?: 'SignatureWithoutConnection', id: string, name: string, type: SigType, eveId: string, systemName: string, wormholeType?: string | null } } | null }> };

export type DeleteSignaturesMutationVariables = Exact<{
  input: DeleteSignaturesInput;
  folderId: Scalars['String']['input'];
}>;


export type DeleteSignaturesMutation = { __typename?: 'Mutation', deleteSignatures: Array<{ __typename?: 'Signature', id: string, name: string, type: SigType, eveId: string, systemName: string, wormholeType?: string | null, createdAt?: any | null, connection?: { __typename?: 'Connection', eol: boolean, eolAt?: any | null, massStatus: MassStatus, reverseSignature: { __typename?: 'SignatureWithoutConnection', id: string, name: string, type: SigType, eveId: string, systemName: string, wormholeType?: string | null } } | null }> };

export type PasteSignaturesMutationVariables = Exact<{
  input: SignaturePaste;
  folderId: Scalars['String']['input'];
}>;


export type PasteSignaturesMutation = { __typename?: 'Mutation', pasteSignatures: { __typename?: 'SignaturePasteResult', added: Array<{ __typename?: 'Signature', id: string, name: string, type: SigType, eveId: string, systemName: string, wormholeType?: string | null, createdAt?: any | null, connection?: { __typename?: 'Connection', eol: boolean, eolAt?: any | null, massStatus: MassStatus, reverseSignature: { __typename?: 'SignatureWithoutConnection', id: string, name: string, type: SigType, eveId: string, systemName: string, wormholeType?: string | null } } | null }>, updated: Array<{ __typename?: 'Signature', id: string, name: string, type: SigType, eveId: string, systemName: string, wormholeType?: string | null, createdAt?: any | null, connection?: { __typename?: 'Connection', eol: boolean, eolAt?: any | null, massStatus: MassStatus, reverseSignature: { __typename?: 'SignatureWithoutConnection', id: string, name: string, type: SigType, eveId: string, systemName: string, wormholeType?: string | null } } | null }>, deleted: Array<{ __typename?: 'Signature', id: string, name: string, type: SigType, eveId: string, systemName: string, wormholeType?: string | null, createdAt?: any | null, connection?: { __typename?: 'Connection', eol: boolean, eolAt?: any | null, massStatus: MassStatus, reverseSignature: { __typename?: 'SignatureWithoutConnection', id: string, name: string, type: SigType, eveId: string, systemName: string, wormholeType?: string | null } } | null }> } };

export type GetMyTokensQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyTokensQuery = { __typename?: 'Query', getMyTokens: Array<{ __typename?: 'EveAccessToken', accessToken: string, eveId: number }> };

export type GetMyUserPreferencesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyUserPreferencesQuery = { __typename?: 'Query', getMyUserPreferences: { __typename?: 'UserPreferences', id: string, user: { __typename?: 'User', id: string, admin: boolean, main: { __typename?: 'Character', eveId: number, name: string, corporation: { __typename?: 'Corporation', eveId: number, name: string, ticker: string }, alliance?: { __typename?: 'Alliance', eveId: number, name: string, ticker: string } | null }, alts: Array<{ __typename?: 'Character', eveId: number, name: string, corporation: { __typename?: 'Corporation', eveId: number, name: string, ticker: string }, alliance?: { __typename?: 'Alliance', eveId: number, name: string, ticker: string } | null }> } } };

export type UserDataQueryVariables = Exact<{ [key: string]: never; }>;


export type UserDataQuery = { __typename?: 'Query', whoami: { __typename?: 'HolenavUser', id: string, systemRole: SystemRoles, main: { __typename?: 'HolenavCharacter', esiId: string, name: string, isMain: boolean, portraitUrl: string, corporation: { __typename?: 'HolenavCorporation', esiId: string, name: string, ticker: string } }, alts: Array<{ __typename?: 'HolenavCharacter', esiId: string, name: string, isMain: boolean, portraitUrl: string, corporation: { __typename?: 'HolenavCorporation', esiId: string, name: string, ticker: string } }> }, getAccessibleFolders: Array<{ __typename?: 'Folder', id: string, name: string }> };

export type RemoveAltMutationVariables = Exact<{
  esiId: Scalars['String']['input'];
}>;


export type RemoveAltMutation = { __typename?: 'Mutation', removeAlt: { __typename?: 'HolenavUser', alts: Array<{ __typename?: 'HolenavCharacter', esiId: string, name: string, isMain: boolean, portraitUrl: string, corporation: { __typename?: 'HolenavCorporation', esiId: string, name: string, ticker: string } }> } };

export type AllUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type AllUsersQuery = { __typename?: 'Query', getAllUsersForManager: Array<{ __typename?: 'SanitizedUserForManager', id: string, systemRole: SystemRoles, main: { __typename?: 'HolenavCharacter', esiId: string, name: string, portraitUrl: string, isMain: boolean, corporation: { __typename?: 'HolenavCorporation', esiId: string, name: string, ticker: string }, alliance?: { __typename?: 'HolenavAlliance', esiId: string, name: string, ticker: string } | null } }> };

export type AssignSystemRoleMutationVariables = Exact<{
  userId: Scalars['String']['input'];
  systemRole: SystemRoles;
}>;


export type AssignSystemRoleMutation = { __typename?: 'Mutation', assignSystemRole: { __typename?: 'SanitizedUserForManager', id: string, systemRole: SystemRoles, main: { __typename?: 'HolenavCharacter', esiId: string, name: string, portraitUrl: string, isMain: boolean, corporation: { __typename?: 'HolenavCorporation', esiId: string, name: string, ticker: string }, alliance?: { __typename?: 'HolenavAlliance', esiId: string, name: string, ticker: string } | null } } };

export const UserFieldsForManagerFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFieldsForManager"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanitizedUserForManager"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"systemRole"}},{"kind":"Field","name":{"kind":"Name","value":"main"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"esiId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"portraitUrl"}},{"kind":"Field","name":{"kind":"Name","value":"isMain"}},{"kind":"Field","name":{"kind":"Name","value":"corporation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"esiId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"ticker"}}]}},{"kind":"Field","name":{"kind":"Name","value":"alliance"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"esiId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"ticker"}}]}}]}}]}}]} as unknown as DocumentNode<UserFieldsForManagerFragment, unknown>;
export const FolderFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FolderFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Folder"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<FolderFieldsFragment, unknown>;
export const CorporationFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CorporationFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HolenavCorporation"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"esiId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"ticker"}}]}}]} as unknown as DocumentNode<CorporationFieldsFragment, unknown>;
export const CharacterFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CharacterFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HolenavCharacter"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"esiId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"isMain"}},{"kind":"Field","name":{"kind":"Name","value":"portraitUrl"}},{"kind":"Field","name":{"kind":"Name","value":"corporation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CorporationFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CorporationFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HolenavCorporation"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"esiId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"ticker"}}]}}]} as unknown as DocumentNode<CharacterFieldsFragment, unknown>;
export const MapFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MapFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FindMap"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"rootSystemName"}}]}}]} as unknown as DocumentNode<MapFieldsFragment, unknown>;
export const AppSettingsFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AppSettingsFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AppSettings"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"registration"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"enabled"}},{"kind":"Field","name":{"kind":"Name","value":"corporationFilterEnabled"}},{"kind":"Field","name":{"kind":"Name","value":"allianceFilterEnabled"}},{"kind":"Field","name":{"kind":"Name","value":"allowedCorporations"}},{"kind":"Field","name":{"kind":"Name","value":"allowedAlliances"}}]}}]}}]} as unknown as DocumentNode<AppSettingsFieldsFragment, unknown>;
export const AppDataFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AppDataFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AppData"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"appVersion"}},{"kind":"Field","name":{"kind":"Name","value":"settings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AppSettingsFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AppSettingsFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AppSettings"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"registration"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"enabled"}},{"kind":"Field","name":{"kind":"Name","value":"corporationFilterEnabled"}},{"kind":"Field","name":{"kind":"Name","value":"allianceFilterEnabled"}},{"kind":"Field","name":{"kind":"Name","value":"allowedCorporations"}},{"kind":"Field","name":{"kind":"Name","value":"allowedAlliances"}}]}}]}}]} as unknown as DocumentNode<AppDataFieldsFragment, unknown>;
export const CompleteCloneBayUserFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CompleteCloneBayUser"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"main"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"eveId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"corporation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"eveId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"ticker"}}]}},{"kind":"Field","name":{"kind":"Name","value":"alliance"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"eveId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"ticker"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"alts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"eveId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"corporation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"eveId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"ticker"}}]}},{"kind":"Field","name":{"kind":"Name","value":"alliance"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"eveId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"ticker"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"admin"}}]}}]} as unknown as DocumentNode<CompleteCloneBayUserFragment, unknown>;
export const SignatureFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SignatureFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Signature"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"eveId"}},{"kind":"Field","name":{"kind":"Name","value":"systemName"}},{"kind":"Field","name":{"kind":"Name","value":"wormholeType"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"connection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"eol"}},{"kind":"Field","name":{"kind":"Name","value":"eolAt"}},{"kind":"Field","name":{"kind":"Name","value":"massStatus"}},{"kind":"Field","name":{"kind":"Name","value":"reverseSignature"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"eveId"}},{"kind":"Field","name":{"kind":"Name","value":"systemName"}},{"kind":"Field","name":{"kind":"Name","value":"wormholeType"}}]}}]}}]}}]} as unknown as DocumentNode<SignatureFieldsFragment, unknown>;
export const SearchCharactersByMainDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SearchCharactersByMain"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"search"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchCharactersByMain"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"search"},"value":{"kind":"Variable","name":{"kind":"Name","value":"search"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CharacterFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CorporationFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HolenavCorporation"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"esiId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"ticker"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CharacterFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HolenavCharacter"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"esiId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"isMain"}},{"kind":"Field","name":{"kind":"Name","value":"portraitUrl"}},{"kind":"Field","name":{"kind":"Name","value":"corporation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CorporationFields"}}]}}]}}]} as unknown as DocumentNode<SearchCharactersByMainQuery, SearchCharactersByMainQueryVariables>;
export const FindMapsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindMaps"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findMaps"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MapFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MapFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FindMap"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"rootSystemName"}}]}}]} as unknown as DocumentNode<FindMapsQuery, FindMapsQueryVariables>;
export const GetPublicAppDataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPublicAppData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPublicAppData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"motd"}}]}}]}}]} as unknown as DocumentNode<GetPublicAppDataQuery, GetPublicAppDataQueryVariables>;
export const UpdateMotdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateMotd"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"motd"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateMotd"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"motd"},"value":{"kind":"Variable","name":{"kind":"Name","value":"motd"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"motd"}}]}}]}}]} as unknown as DocumentNode<UpdateMotdMutation, UpdateMotdMutationVariables>;
export const SettingsDataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SettingsData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAccessibleFolders"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FolderFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FolderFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Folder"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<SettingsDataQuery, SettingsDataQueryVariables>;
export const SettingsDataForManagerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SettingsDataForManager"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getManageableFolders"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FolderFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FolderFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Folder"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<SettingsDataForManagerQuery, SettingsDataForManagerQueryVariables>;
export const AppSettingsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AppSettings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAppData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AppDataFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AppSettingsFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AppSettings"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"registration"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"enabled"}},{"kind":"Field","name":{"kind":"Name","value":"corporationFilterEnabled"}},{"kind":"Field","name":{"kind":"Name","value":"allianceFilterEnabled"}},{"kind":"Field","name":{"kind":"Name","value":"allowedCorporations"}},{"kind":"Field","name":{"kind":"Name","value":"allowedAlliances"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AppDataFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AppData"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"appVersion"}},{"kind":"Field","name":{"kind":"Name","value":"settings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AppSettingsFields"}}]}}]}}]} as unknown as DocumentNode<AppSettingsQuery, AppSettingsQueryVariables>;
export const CreateFolderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateFolder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createFolder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FolderFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FolderFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Folder"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<CreateFolderMutation, CreateFolderMutationVariables>;
export const SetRegistrationEnabledDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SetRegistrationEnabled"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"enabled"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateAppData"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"settings"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"registration"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"enabled"},"value":{"kind":"Variable","name":{"kind":"Name","value":"enabled"}}}]}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"settings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"registration"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"enabled"}}]}}]}}]}}]}}]} as unknown as DocumentNode<SetRegistrationEnabledMutation, SetRegistrationEnabledMutationVariables>;
export const SetCorporationFilterEnabledDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SetCorporationFilterEnabled"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"enabled"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateAppData"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"settings"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"registration"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"corporationFilterEnabled"},"value":{"kind":"Variable","name":{"kind":"Name","value":"enabled"}}}]}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"settings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"registration"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"enabled"}}]}}]}}]}}]}}]} as unknown as DocumentNode<SetCorporationFilterEnabledMutation, SetCorporationFilterEnabledMutationVariables>;
export const SetAllianceFilterEnabledDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SetAllianceFilterEnabled"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"enabled"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateAppData"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"settings"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"registration"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"allianceFilterEnabled"},"value":{"kind":"Variable","name":{"kind":"Name","value":"enabled"}}}]}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"settings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"registration"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"enabled"}}]}}]}}]}}]}}]} as unknown as DocumentNode<SetAllianceFilterEnabledMutation, SetAllianceFilterEnabledMutationVariables>;
export const AddAllowedCorporationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddAllowedCorporation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"esiId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addAllowedCorporation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"esiId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"esiId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"settings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"registration"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allowedCorporations"}}]}}]}}]}}]}}]} as unknown as DocumentNode<AddAllowedCorporationMutation, AddAllowedCorporationMutationVariables>;
export const AddAllowedAllianceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddAllowedAlliance"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"esiId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addAllowedAlliance"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"esiId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"esiId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"settings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"registration"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allowedAlliances"}}]}}]}}]}}]}}]} as unknown as DocumentNode<AddAllowedAllianceMutation, AddAllowedAllianceMutationVariables>;
export const RemoveAllowedCorporationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveAllowedCorporation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"esiId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeAllowedCorporation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"esiId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"esiId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"settings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"registration"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allowedCorporations"}}]}}]}}]}}]}}]} as unknown as DocumentNode<RemoveAllowedCorporationMutation, RemoveAllowedCorporationMutationVariables>;
export const RemoveAllowedAllianceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveAllowedAlliance"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"esiId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeAllowedAlliance"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"esiId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"esiId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"settings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"registration"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allowedCorporations"}}]}}]}}]}}]}}]} as unknown as DocumentNode<RemoveAllowedAllianceMutation, RemoveAllowedAllianceMutationVariables>;
export const SystemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"System"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"folderId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getSystemByName"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"folderId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"folderId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"getSignaturesBySystem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"systemName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"folderId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"folderId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SignatureFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SignatureFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Signature"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"eveId"}},{"kind":"Field","name":{"kind":"Name","value":"systemName"}},{"kind":"Field","name":{"kind":"Name","value":"wormholeType"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"connection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"eol"}},{"kind":"Field","name":{"kind":"Name","value":"eolAt"}},{"kind":"Field","name":{"kind":"Name","value":"massStatus"}},{"kind":"Field","name":{"kind":"Name","value":"reverseSignature"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"eveId"}},{"kind":"Field","name":{"kind":"Name","value":"systemName"}},{"kind":"Field","name":{"kind":"Name","value":"wormholeType"}}]}}]}}]}}]} as unknown as DocumentNode<SystemQuery, SystemQueryVariables>;
export const GetSignaturesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSignatures"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"systemName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"folderId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getSignaturesBySystem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"systemName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"systemName"}}},{"kind":"Argument","name":{"kind":"Name","value":"folderId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"folderId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SignatureFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SignatureFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Signature"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"eveId"}},{"kind":"Field","name":{"kind":"Name","value":"systemName"}},{"kind":"Field","name":{"kind":"Name","value":"wormholeType"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"connection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"eol"}},{"kind":"Field","name":{"kind":"Name","value":"eolAt"}},{"kind":"Field","name":{"kind":"Name","value":"massStatus"}},{"kind":"Field","name":{"kind":"Name","value":"reverseSignature"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"eveId"}},{"kind":"Field","name":{"kind":"Name","value":"systemName"}},{"kind":"Field","name":{"kind":"Name","value":"wormholeType"}}]}}]}}]}}]} as unknown as DocumentNode<GetSignaturesQuery, GetSignaturesQueryVariables>;
export const AddSignaturesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddSignatures"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddSignaturesInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"folderId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addSignatures"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}},{"kind":"Argument","name":{"kind":"Name","value":"folderId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"folderId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SignatureFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SignatureFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Signature"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"eveId"}},{"kind":"Field","name":{"kind":"Name","value":"systemName"}},{"kind":"Field","name":{"kind":"Name","value":"wormholeType"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"connection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"eol"}},{"kind":"Field","name":{"kind":"Name","value":"eolAt"}},{"kind":"Field","name":{"kind":"Name","value":"massStatus"}},{"kind":"Field","name":{"kind":"Name","value":"reverseSignature"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"eveId"}},{"kind":"Field","name":{"kind":"Name","value":"systemName"}},{"kind":"Field","name":{"kind":"Name","value":"wormholeType"}}]}}]}}]}}]} as unknown as DocumentNode<AddSignaturesMutation, AddSignaturesMutationVariables>;
export const UpdateSignaturesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateSignatures"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateSignaturesInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"folderId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateSignatures"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}},{"kind":"Argument","name":{"kind":"Name","value":"folderId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"folderId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SignatureFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SignatureFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Signature"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"eveId"}},{"kind":"Field","name":{"kind":"Name","value":"systemName"}},{"kind":"Field","name":{"kind":"Name","value":"wormholeType"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"connection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"eol"}},{"kind":"Field","name":{"kind":"Name","value":"eolAt"}},{"kind":"Field","name":{"kind":"Name","value":"massStatus"}},{"kind":"Field","name":{"kind":"Name","value":"reverseSignature"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"eveId"}},{"kind":"Field","name":{"kind":"Name","value":"systemName"}},{"kind":"Field","name":{"kind":"Name","value":"wormholeType"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateSignaturesMutation, UpdateSignaturesMutationVariables>;
export const DeleteSignaturesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteSignatures"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeleteSignaturesInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"folderId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteSignatures"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}},{"kind":"Argument","name":{"kind":"Name","value":"folderId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"folderId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SignatureFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SignatureFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Signature"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"eveId"}},{"kind":"Field","name":{"kind":"Name","value":"systemName"}},{"kind":"Field","name":{"kind":"Name","value":"wormholeType"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"connection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"eol"}},{"kind":"Field","name":{"kind":"Name","value":"eolAt"}},{"kind":"Field","name":{"kind":"Name","value":"massStatus"}},{"kind":"Field","name":{"kind":"Name","value":"reverseSignature"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"eveId"}},{"kind":"Field","name":{"kind":"Name","value":"systemName"}},{"kind":"Field","name":{"kind":"Name","value":"wormholeType"}}]}}]}}]}}]} as unknown as DocumentNode<DeleteSignaturesMutation, DeleteSignaturesMutationVariables>;
export const PasteSignaturesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"PasteSignatures"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SignaturePaste"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"folderId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pasteSignatures"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}},{"kind":"Argument","name":{"kind":"Name","value":"folderId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"folderId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"added"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SignatureFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"updated"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SignatureFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"deleted"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SignatureFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SignatureFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Signature"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"eveId"}},{"kind":"Field","name":{"kind":"Name","value":"systemName"}},{"kind":"Field","name":{"kind":"Name","value":"wormholeType"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"connection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"eol"}},{"kind":"Field","name":{"kind":"Name","value":"eolAt"}},{"kind":"Field","name":{"kind":"Name","value":"massStatus"}},{"kind":"Field","name":{"kind":"Name","value":"reverseSignature"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"eveId"}},{"kind":"Field","name":{"kind":"Name","value":"systemName"}},{"kind":"Field","name":{"kind":"Name","value":"wormholeType"}}]}}]}}]}}]} as unknown as DocumentNode<PasteSignaturesMutation, PasteSignaturesMutationVariables>;
export const GetMyTokensDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMyTokens"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getMyTokens"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"eveId"}}]}}]}}]} as unknown as DocumentNode<GetMyTokensQuery, GetMyTokensQueryVariables>;
export const GetMyUserPreferencesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMyUserPreferences"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getMyUserPreferences"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CompleteCloneBayUser"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CompleteCloneBayUser"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"main"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"eveId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"corporation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"eveId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"ticker"}}]}},{"kind":"Field","name":{"kind":"Name","value":"alliance"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"eveId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"ticker"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"alts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"eveId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"corporation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"eveId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"ticker"}}]}},{"kind":"Field","name":{"kind":"Name","value":"alliance"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"eveId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"ticker"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"admin"}}]}}]} as unknown as DocumentNode<GetMyUserPreferencesQuery, GetMyUserPreferencesQueryVariables>;
export const UserDataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"whoami"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"systemRole"}},{"kind":"Field","name":{"kind":"Name","value":"main"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CharacterFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"alts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CharacterFields"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"getAccessibleFolders"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CorporationFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HolenavCorporation"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"esiId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"ticker"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CharacterFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HolenavCharacter"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"esiId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"isMain"}},{"kind":"Field","name":{"kind":"Name","value":"portraitUrl"}},{"kind":"Field","name":{"kind":"Name","value":"corporation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CorporationFields"}}]}}]}}]} as unknown as DocumentNode<UserDataQuery, UserDataQueryVariables>;
export const RemoveAltDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveAlt"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"esiId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeAlt"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"esiId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"esiId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"alts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CharacterFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CorporationFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HolenavCorporation"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"esiId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"ticker"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CharacterFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HolenavCharacter"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"esiId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"isMain"}},{"kind":"Field","name":{"kind":"Name","value":"portraitUrl"}},{"kind":"Field","name":{"kind":"Name","value":"corporation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CorporationFields"}}]}}]}}]} as unknown as DocumentNode<RemoveAltMutation, RemoveAltMutationVariables>;
export const AllUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AllUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllUsersForManager"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFieldsForManager"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFieldsForManager"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanitizedUserForManager"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"systemRole"}},{"kind":"Field","name":{"kind":"Name","value":"main"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"esiId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"portraitUrl"}},{"kind":"Field","name":{"kind":"Name","value":"isMain"}},{"kind":"Field","name":{"kind":"Name","value":"corporation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"esiId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"ticker"}}]}},{"kind":"Field","name":{"kind":"Name","value":"alliance"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"esiId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"ticker"}}]}}]}}]}}]} as unknown as DocumentNode<AllUsersQuery, AllUsersQueryVariables>;
export const AssignSystemRoleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AssignSystemRole"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"systemRole"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SystemRoles"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assignSystemRole"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"systemRole"},"value":{"kind":"Variable","name":{"kind":"Name","value":"systemRole"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFieldsForManager"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFieldsForManager"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanitizedUserForManager"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"systemRole"}},{"kind":"Field","name":{"kind":"Name","value":"main"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"esiId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"portraitUrl"}},{"kind":"Field","name":{"kind":"Name","value":"isMain"}},{"kind":"Field","name":{"kind":"Name","value":"corporation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"esiId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"ticker"}}]}},{"kind":"Field","name":{"kind":"Name","value":"alliance"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"esiId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"ticker"}}]}}]}}]}}]} as unknown as DocumentNode<AssignSystemRoleMutation, AssignSystemRoleMutationVariables>;