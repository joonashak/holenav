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

export type AddFolderRoleInput = {
  folderId: Scalars['String']['input'];
  role: FolderRoles;
  userEsiId: Scalars['String']['input'];
};

export type AddSignaturesInput = {
  signatures: Array<CreatableSignature>;
};

export type Alliance = {
  __typename?: 'Alliance';
  esiId: Scalars['String']['output'];
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
  esiId: Scalars['String']['output'];
  isMain: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  portraitUrl: Scalars['String']['output'];
  ssoToken?: Maybe<SsoToken>;
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
  esiId: Scalars['String']['output'];
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

export type Credentials = {
  __typename?: 'Credentials';
  passwordHash: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type DeleteSignaturesInput = {
  ids: Array<Scalars['String']['input']>;
};

export type Folder = {
  __typename?: 'Folder';
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  personal: Scalars['Boolean']['output'];
};

export type FolderRole = {
  __typename?: 'FolderRole';
  folder: Folder;
  role: FolderRoles;
};

export enum FolderRoles {
  Admin = 'ADMIN',
  Manage = 'MANAGE',
  Read = 'READ',
  Write = 'WRITE'
}

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
  addFolderRole: SanitizedUser;
  addSavedMap: User;
  addSignatures: Array<Signature>;
  assignSystemRole: SanitizedUserForManager;
  changeActiveFolder: SanitizedUser;
  createFolder: Folder;
  deleteSavedMap: User;
  deleteSignatures: Array<Signature>;
  getToken: AccessTokenDto;
  login: AccessTokenDto;
  logout: LogoutDto;
  pasteSignatures: SignaturePasteResult;
  removeAllowedAlliance: AppData;
  removeAllowedCorporation: AppData;
  removeAlt: User;
  updateAppData: AppData;
  updateMotd: AppData;
  updateSelectedMap: User;
  updateSignatures: Array<Signature>;
};


export type MutationAddAllowedAllianceArgs = {
  esiId: Scalars['String']['input'];
};


export type MutationAddAllowedCorporationArgs = {
  esiId: Scalars['String']['input'];
};


export type MutationAddFolderRoleArgs = {
  input: AddFolderRoleInput;
};


export type MutationAddSavedMapArgs = {
  name: Scalars['String']['input'];
  rootSystemName: Scalars['String']['input'];
};


export type MutationAddSignaturesArgs = {
  input: AddSignaturesInput;
};


export type MutationAssignSystemRoleArgs = {
  input: AssignSystemRoleInput;
};


export type MutationChangeActiveFolderArgs = {
  folderId: Scalars['String']['input'];
};


export type MutationCreateFolderArgs = {
  name: Scalars['String']['input'];
};


export type MutationDeleteSavedMapArgs = {
  mapId: Scalars['String']['input'];
};


export type MutationDeleteSignaturesArgs = {
  input: DeleteSignaturesInput;
};


export type MutationGetTokenArgs = {
  state: Scalars['String']['input'];
};


export type MutationLoginArgs = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationPasteSignaturesArgs = {
  input: SignaturePaste;
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


export type MutationUpdateSelectedMapArgs = {
  selectedMapId: Scalars['String']['input'];
};


export type MutationUpdateSignaturesArgs = {
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
  addCharacter: StartSsoLoginDto;
  getAccessibleFolders: Array<Folder>;
  getAllUsersForManager: Array<SanitizedUserForManager>;
  getAppData: AppData;
  getManageableFolders: Array<Folder>;
  getPublicAppData: PublicAppData;
  getSignaturesBySystem: Array<Signature>;
  getSsoTokens: UserSsoTokens;
  getSystemByName?: Maybe<System>;
  searchCharactersByMain: Array<Character>;
  startSsoLogin: StartSsoLoginDto;
  whoami: SanitizedUserForSelf;
};


export type QueryGetSignaturesBySystemArgs = {
  systemName: Scalars['String']['input'];
};


export type QueryGetSystemByNameArgs = {
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

export type SanitizedUser = {
  __typename?: 'SanitizedUser';
  id: Scalars['String']['output'];
  main: Character;
};

export type SanitizedUserForManager = {
  __typename?: 'SanitizedUserForManager';
  id: Scalars['String']['output'];
  main: Character;
  systemRole: SystemRoles;
};

export type SanitizedUserForSelf = {
  __typename?: 'SanitizedUserForSelf';
  alts: Array<Character>;
  folderRoles: Array<FolderRole>;
  id: Scalars['String']['output'];
  main: Character;
  settings: UserSettings;
  systemRole: SystemRoles;
};

export type SavedMap = {
  __typename?: 'SavedMap';
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  rootSystemName: Scalars['String']['output'];
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

export type StartSsoLoginDto = {
  __typename?: 'StartSsoLoginDto';
  ssoLoginUrl: Scalars['String']['output'];
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
  alts: Array<Character>;
  credentials: Credentials;
  folderRoles: Array<FolderRole>;
  id: Scalars['String']['output'];
  main: Character;
  settings: UserSettings;
  systemRole: SystemRoles;
};

export type UserSettings = {
  __typename?: 'UserSettings';
  activeFolder?: Maybe<Folder>;
  maps: Array<SavedMap>;
  selectedMap?: Maybe<SavedMap>;
};

export type UserSsoTokens = {
  __typename?: 'UserSsoTokens';
  alts: Array<SsoTokenDto>;
  main: SsoTokenDto;
};

export type GetTokenMutationVariables = Exact<{
  state: Scalars['String']['input'];
}>;


export type GetTokenMutation = { __typename?: 'Mutation', getToken: { __typename?: 'AccessTokenDto', accessToken: string } };

export type StartSsoLoginQueryVariables = Exact<{ [key: string]: never; }>;


export type StartSsoLoginQuery = { __typename?: 'Query', startSsoLogin: { __typename?: 'StartSsoLoginDto', ssoLoginUrl: string } };

export type AddCharacterQueryVariables = Exact<{ [key: string]: never; }>;


export type AddCharacterQuery = { __typename?: 'Query', addCharacter: { __typename?: 'StartSsoLoginDto', ssoLoginUrl: string } };

export type GetSsoTokensQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSsoTokensQuery = { __typename?: 'Query', getSsoTokens: { __typename?: 'UserSsoTokens', main: { __typename?: 'SsoTokenDto', esiId: string, accessToken: string }, alts: Array<{ __typename?: 'SsoTokenDto', esiId: string, accessToken: string }> } };

export type LoginMutationVariables = Exact<{
  username: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AccessTokenDto', accessToken: string } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: { __typename?: 'LogoutDto', loggedOut: boolean } };

export type SearchCharactersByMainQueryVariables = Exact<{
  search: Scalars['String']['input'];
}>;


export type SearchCharactersByMainQuery = { __typename?: 'Query', searchCharactersByMain: Array<{ __typename?: 'Character', esiId: string, name: string, isMain: boolean, portraitUrl: string, corporation: { __typename?: 'Corporation', esiId: string, name: string, ticker: string } }> };

export type UserFieldsForManagerFragment = { __typename?: 'SanitizedUserForManager', id: string, systemRole: SystemRoles, main: { __typename?: 'Character', esiId: string, name: string, portraitUrl: string, isMain: boolean, corporation: { __typename?: 'Corporation', esiId: string, name: string, ticker: string }, alliance?: { __typename?: 'Alliance', esiId: string, name: string, ticker: string } | null } };

export type FolderFieldsFragment = { __typename?: 'Folder', id: string, name: string, personal: boolean };

export type CorporationFieldsFragment = { __typename?: 'Corporation', esiId: string, name: string, ticker: string };

export type CharacterFieldsFragment = { __typename?: 'Character', esiId: string, name: string, isMain: boolean, portraitUrl: string, corporation: { __typename?: 'Corporation', esiId: string, name: string, ticker: string } };

export type MapFieldsFragment = { __typename?: 'SavedMap', id: string, name: string, rootSystemName: string };

export type AppSettingsFieldsFragment = { __typename?: 'AppSettings', registration: { __typename?: 'RegistrationSettings', enabled: boolean, corporationFilterEnabled: boolean, allianceFilterEnabled: boolean, allowedCorporations: Array<string>, allowedAlliances: Array<string> } };

export type AppDataFieldsFragment = { __typename?: 'AppData', appVersion: string, settings: { __typename?: 'AppSettings', registration: { __typename?: 'RegistrationSettings', enabled: boolean, corporationFilterEnabled: boolean, allianceFilterEnabled: boolean, allowedCorporations: Array<string>, allowedAlliances: Array<string> } } };

export type UpdateSelectedMapMutationVariables = Exact<{
  selectedMapId: Scalars['String']['input'];
}>;


export type UpdateSelectedMapMutation = { __typename?: 'Mutation', updateSelectedMap: { __typename?: 'User', settings: { __typename?: 'UserSettings', selectedMap?: { __typename?: 'SavedMap', id: string, name: string, rootSystemName: string } | null } } };

export type AddSavedMapMutationVariables = Exact<{
  name: Scalars['String']['input'];
  rootSystemName: Scalars['String']['input'];
}>;


export type AddSavedMapMutation = { __typename?: 'Mutation', addSavedMap: { __typename?: 'User', settings: { __typename?: 'UserSettings', maps: Array<{ __typename?: 'SavedMap', id: string, name: string, rootSystemName: string }> } } };

export type DeleteSavedMapMutationVariables = Exact<{
  mapId: Scalars['String']['input'];
}>;


export type DeleteSavedMapMutation = { __typename?: 'Mutation', deleteSavedMap: { __typename?: 'User', settings: { __typename?: 'UserSettings', maps: Array<{ __typename?: 'SavedMap', id: string, name: string, rootSystemName: string }> } } };

export type GetPublicAppDataQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPublicAppDataQuery = { __typename?: 'Query', getPublicAppData: { __typename?: 'PublicAppData', motd: string } };

export type UpdateMotdMutationVariables = Exact<{
  motd: Scalars['String']['input'];
}>;


export type UpdateMotdMutation = { __typename?: 'Mutation', updateMotd: { __typename?: 'AppData', motd: string } };

export type SettingsDataQueryVariables = Exact<{ [key: string]: never; }>;


export type SettingsDataQuery = { __typename?: 'Query', getAccessibleFolders: Array<{ __typename?: 'Folder', id: string, name: string, personal: boolean }> };

export type SettingsDataForManagerQueryVariables = Exact<{ [key: string]: never; }>;


export type SettingsDataForManagerQuery = { __typename?: 'Query', getManageableFolders: Array<{ __typename?: 'Folder', id: string, name: string, personal: boolean }> };

export type AppSettingsQueryVariables = Exact<{ [key: string]: never; }>;


export type AppSettingsQuery = { __typename?: 'Query', getAppData: { __typename?: 'AppData', appVersion: string, settings: { __typename?: 'AppSettings', registration: { __typename?: 'RegistrationSettings', enabled: boolean, corporationFilterEnabled: boolean, allianceFilterEnabled: boolean, allowedCorporations: Array<string>, allowedAlliances: Array<string> } } } };

export type CreateFolderMutationVariables = Exact<{
  name: Scalars['String']['input'];
}>;


export type CreateFolderMutation = { __typename?: 'Mutation', createFolder: { __typename?: 'Folder', id: string, name: string, personal: boolean } };

export type AddFolderRoleMutationVariables = Exact<{
  input: AddFolderRoleInput;
}>;


export type AddFolderRoleMutation = { __typename?: 'Mutation', addFolderRole: { __typename?: 'SanitizedUser', id: string } };

export type ChangeActiveFolderMutationVariables = Exact<{
  folderId: Scalars['String']['input'];
}>;


export type ChangeActiveFolderMutation = { __typename?: 'Mutation', changeActiveFolder: { __typename?: 'SanitizedUser', id: string } };

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
}>;


export type SystemQuery = { __typename?: 'Query', getSystemByName?: { __typename?: 'System', id: string, name: string } | null, getSignaturesBySystem: Array<{ __typename?: 'Signature', id: string, name: string, type: SigType, eveId: string, systemName: string, wormholeType?: string | null, createdAt?: any | null, connection?: { __typename?: 'Connection', eol: boolean, eolAt?: any | null, massStatus: MassStatus, reverseSignature: { __typename?: 'SignatureWithoutConnection', id: string, name: string, type: SigType, eveId: string, systemName: string, wormholeType?: string | null } } | null }> };

export type GetSignaturesQueryVariables = Exact<{
  systemName: Scalars['String']['input'];
}>;


export type GetSignaturesQuery = { __typename?: 'Query', getSignaturesBySystem: Array<{ __typename?: 'Signature', id: string, name: string, type: SigType, eveId: string, systemName: string, wormholeType?: string | null, createdAt?: any | null, connection?: { __typename?: 'Connection', eol: boolean, eolAt?: any | null, massStatus: MassStatus, reverseSignature: { __typename?: 'SignatureWithoutConnection', id: string, name: string, type: SigType, eveId: string, systemName: string, wormholeType?: string | null } } | null }> };

export type AddSignaturesMutationVariables = Exact<{
  input: AddSignaturesInput;
}>;


export type AddSignaturesMutation = { __typename?: 'Mutation', addSignatures: Array<{ __typename?: 'Signature', id: string, name: string, type: SigType, eveId: string, systemName: string, wormholeType?: string | null, createdAt?: any | null, connection?: { __typename?: 'Connection', eol: boolean, eolAt?: any | null, massStatus: MassStatus, reverseSignature: { __typename?: 'SignatureWithoutConnection', id: string, name: string, type: SigType, eveId: string, systemName: string, wormholeType?: string | null } } | null }> };

export type UpdateSignaturesMutationVariables = Exact<{
  input: UpdateSignaturesInput;
}>;


export type UpdateSignaturesMutation = { __typename?: 'Mutation', updateSignatures: Array<{ __typename?: 'Signature', id: string, name: string, type: SigType, eveId: string, systemName: string, wormholeType?: string | null, createdAt?: any | null, connection?: { __typename?: 'Connection', eol: boolean, eolAt?: any | null, massStatus: MassStatus, reverseSignature: { __typename?: 'SignatureWithoutConnection', id: string, name: string, type: SigType, eveId: string, systemName: string, wormholeType?: string | null } } | null }> };

export type DeleteSignaturesMutationVariables = Exact<{
  input: DeleteSignaturesInput;
}>;


export type DeleteSignaturesMutation = { __typename?: 'Mutation', deleteSignatures: Array<{ __typename?: 'Signature', id: string, name: string, type: SigType, eveId: string, systemName: string, wormholeType?: string | null, createdAt?: any | null, connection?: { __typename?: 'Connection', eol: boolean, eolAt?: any | null, massStatus: MassStatus, reverseSignature: { __typename?: 'SignatureWithoutConnection', id: string, name: string, type: SigType, eveId: string, systemName: string, wormholeType?: string | null } } | null }> };

export type PasteSignaturesMutationVariables = Exact<{
  input: SignaturePaste;
}>;


export type PasteSignaturesMutation = { __typename?: 'Mutation', pasteSignatures: { __typename?: 'SignaturePasteResult', added: Array<{ __typename?: 'Signature', id: string, name: string, type: SigType, eveId: string, systemName: string, wormholeType?: string | null, createdAt?: any | null, connection?: { __typename?: 'Connection', eol: boolean, eolAt?: any | null, massStatus: MassStatus, reverseSignature: { __typename?: 'SignatureWithoutConnection', id: string, name: string, type: SigType, eveId: string, systemName: string, wormholeType?: string | null } } | null }>, updated: Array<{ __typename?: 'Signature', id: string, name: string, type: SigType, eveId: string, systemName: string, wormholeType?: string | null, createdAt?: any | null, connection?: { __typename?: 'Connection', eol: boolean, eolAt?: any | null, massStatus: MassStatus, reverseSignature: { __typename?: 'SignatureWithoutConnection', id: string, name: string, type: SigType, eveId: string, systemName: string, wormholeType?: string | null } } | null }>, deleted: Array<{ __typename?: 'Signature', id: string, name: string, type: SigType, eveId: string, systemName: string, wormholeType?: string | null, createdAt?: any | null, connection?: { __typename?: 'Connection', eol: boolean, eolAt?: any | null, massStatus: MassStatus, reverseSignature: { __typename?: 'SignatureWithoutConnection', id: string, name: string, type: SigType, eveId: string, systemName: string, wormholeType?: string | null } } | null }> } };

export type UserDataQueryVariables = Exact<{ [key: string]: never; }>;


export type UserDataQuery = { __typename?: 'Query', whoami: { __typename?: 'SanitizedUserForSelf', id: string, systemRole: SystemRoles, main: { __typename?: 'Character', esiId: string, name: string, isMain: boolean, portraitUrl: string, corporation: { __typename?: 'Corporation', esiId: string, name: string, ticker: string } }, alts: Array<{ __typename?: 'Character', esiId: string, name: string, isMain: boolean, portraitUrl: string, corporation: { __typename?: 'Corporation', esiId: string, name: string, ticker: string } }>, settings: { __typename?: 'UserSettings', maps: Array<{ __typename?: 'SavedMap', id: string, name: string, rootSystemName: string }>, selectedMap?: { __typename?: 'SavedMap', id: string, name: string, rootSystemName: string } | null, activeFolder?: { __typename?: 'Folder', id: string, name: string, personal: boolean } | null } }, getAccessibleFolders: Array<{ __typename?: 'Folder', id: string, name: string, personal: boolean }> };

export type RemoveAltMutationVariables = Exact<{
  esiId: Scalars['String']['input'];
}>;


export type RemoveAltMutation = { __typename?: 'Mutation', removeAlt: { __typename?: 'User', alts: Array<{ __typename?: 'Character', esiId: string, name: string, isMain: boolean, portraitUrl: string, corporation: { __typename?: 'Corporation', esiId: string, name: string, ticker: string } }> } };

export type AllUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type AllUsersQuery = { __typename?: 'Query', getAllUsersForManager: Array<{ __typename?: 'SanitizedUserForManager', id: string, systemRole: SystemRoles, main: { __typename?: 'Character', esiId: string, name: string, portraitUrl: string, isMain: boolean, corporation: { __typename?: 'Corporation', esiId: string, name: string, ticker: string }, alliance?: { __typename?: 'Alliance', esiId: string, name: string, ticker: string } | null } }> };

export type AssignSystemRoleMutationVariables = Exact<{
  userId: Scalars['String']['input'];
  systemRole: SystemRoles;
}>;


export type AssignSystemRoleMutation = { __typename?: 'Mutation', assignSystemRole: { __typename?: 'SanitizedUserForManager', id: string, systemRole: SystemRoles, main: { __typename?: 'Character', esiId: string, name: string, portraitUrl: string, isMain: boolean, corporation: { __typename?: 'Corporation', esiId: string, name: string, ticker: string }, alliance?: { __typename?: 'Alliance', esiId: string, name: string, ticker: string } | null } } };

export const UserFieldsForManagerFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFieldsForManager"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanitizedUserForManager"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"systemRole"}},{"kind":"Field","name":{"kind":"Name","value":"main"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"esiId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"portraitUrl"}},{"kind":"Field","name":{"kind":"Name","value":"isMain"}},{"kind":"Field","name":{"kind":"Name","value":"corporation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"esiId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"ticker"}}]}},{"kind":"Field","name":{"kind":"Name","value":"alliance"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"esiId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"ticker"}}]}}]}}]}}]} as unknown as DocumentNode<UserFieldsForManagerFragment, unknown>;
export const FolderFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FolderFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Folder"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"personal"}}]}}]} as unknown as DocumentNode<FolderFieldsFragment, unknown>;
export const CorporationFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CorporationFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Corporation"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"esiId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"ticker"}}]}}]} as unknown as DocumentNode<CorporationFieldsFragment, unknown>;
export const CharacterFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CharacterFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Character"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"esiId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"isMain"}},{"kind":"Field","name":{"kind":"Name","value":"portraitUrl"}},{"kind":"Field","name":{"kind":"Name","value":"corporation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CorporationFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CorporationFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Corporation"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"esiId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"ticker"}}]}}]} as unknown as DocumentNode<CharacterFieldsFragment, unknown>;
export const MapFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MapFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SavedMap"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"rootSystemName"}}]}}]} as unknown as DocumentNode<MapFieldsFragment, unknown>;
export const AppSettingsFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AppSettingsFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AppSettings"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"registration"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"enabled"}},{"kind":"Field","name":{"kind":"Name","value":"corporationFilterEnabled"}},{"kind":"Field","name":{"kind":"Name","value":"allianceFilterEnabled"}},{"kind":"Field","name":{"kind":"Name","value":"allowedCorporations"}},{"kind":"Field","name":{"kind":"Name","value":"allowedAlliances"}}]}}]}}]} as unknown as DocumentNode<AppSettingsFieldsFragment, unknown>;
export const AppDataFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AppDataFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AppData"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"appVersion"}},{"kind":"Field","name":{"kind":"Name","value":"settings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AppSettingsFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AppSettingsFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AppSettings"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"registration"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"enabled"}},{"kind":"Field","name":{"kind":"Name","value":"corporationFilterEnabled"}},{"kind":"Field","name":{"kind":"Name","value":"allianceFilterEnabled"}},{"kind":"Field","name":{"kind":"Name","value":"allowedCorporations"}},{"kind":"Field","name":{"kind":"Name","value":"allowedAlliances"}}]}}]}}]} as unknown as DocumentNode<AppDataFieldsFragment, unknown>;
export const SignatureFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SignatureFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Signature"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"eveId"}},{"kind":"Field","name":{"kind":"Name","value":"systemName"}},{"kind":"Field","name":{"kind":"Name","value":"wormholeType"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"connection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"eol"}},{"kind":"Field","name":{"kind":"Name","value":"eolAt"}},{"kind":"Field","name":{"kind":"Name","value":"massStatus"}},{"kind":"Field","name":{"kind":"Name","value":"reverseSignature"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"eveId"}},{"kind":"Field","name":{"kind":"Name","value":"systemName"}},{"kind":"Field","name":{"kind":"Name","value":"wormholeType"}}]}}]}}]}}]} as unknown as DocumentNode<SignatureFieldsFragment, unknown>;
export const GetTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"GetToken"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"state"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getToken"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"state"},"value":{"kind":"Variable","name":{"kind":"Name","value":"state"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}}]}}]}}]} as unknown as DocumentNode<GetTokenMutation, GetTokenMutationVariables>;
export const StartSsoLoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"StartSsoLogin"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"startSsoLogin"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ssoLoginUrl"}}]}}]}}]} as unknown as DocumentNode<StartSsoLoginQuery, StartSsoLoginQueryVariables>;
export const AddCharacterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AddCharacter"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addCharacter"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ssoLoginUrl"}}]}}]}}]} as unknown as DocumentNode<AddCharacterQuery, AddCharacterQueryVariables>;
export const GetSsoTokensDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSsoTokens"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getSsoTokens"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"main"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"esiId"}},{"kind":"Field","name":{"kind":"Name","value":"accessToken"}}]}},{"kind":"Field","name":{"kind":"Name","value":"alts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"esiId"}},{"kind":"Field","name":{"kind":"Name","value":"accessToken"}}]}}]}}]}}]} as unknown as DocumentNode<GetSsoTokensQuery, GetSsoTokensQueryVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Logout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"loggedOut"}}]}}]}}]} as unknown as DocumentNode<LogoutMutation, LogoutMutationVariables>;
export const SearchCharactersByMainDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SearchCharactersByMain"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"search"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchCharactersByMain"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"search"},"value":{"kind":"Variable","name":{"kind":"Name","value":"search"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CharacterFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CorporationFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Corporation"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"esiId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"ticker"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CharacterFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Character"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"esiId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"isMain"}},{"kind":"Field","name":{"kind":"Name","value":"portraitUrl"}},{"kind":"Field","name":{"kind":"Name","value":"corporation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CorporationFields"}}]}}]}}]} as unknown as DocumentNode<SearchCharactersByMainQuery, SearchCharactersByMainQueryVariables>;
export const UpdateSelectedMapDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateSelectedMap"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"selectedMapId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateSelectedMap"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"selectedMapId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"selectedMapId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"settings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"selectedMap"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MapFields"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MapFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SavedMap"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"rootSystemName"}}]}}]} as unknown as DocumentNode<UpdateSelectedMapMutation, UpdateSelectedMapMutationVariables>;
export const AddSavedMapDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddSavedMap"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"rootSystemName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addSavedMap"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"rootSystemName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"rootSystemName"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"settings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"maps"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MapFields"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MapFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SavedMap"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"rootSystemName"}}]}}]} as unknown as DocumentNode<AddSavedMapMutation, AddSavedMapMutationVariables>;
export const DeleteSavedMapDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteSavedMap"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mapId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteSavedMap"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"mapId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mapId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"settings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"maps"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MapFields"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MapFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SavedMap"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"rootSystemName"}}]}}]} as unknown as DocumentNode<DeleteSavedMapMutation, DeleteSavedMapMutationVariables>;
export const GetPublicAppDataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPublicAppData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPublicAppData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"motd"}}]}}]}}]} as unknown as DocumentNode<GetPublicAppDataQuery, GetPublicAppDataQueryVariables>;
export const UpdateMotdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateMotd"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"motd"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateMotd"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"motd"},"value":{"kind":"Variable","name":{"kind":"Name","value":"motd"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"motd"}}]}}]}}]} as unknown as DocumentNode<UpdateMotdMutation, UpdateMotdMutationVariables>;
export const SettingsDataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SettingsData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAccessibleFolders"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FolderFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FolderFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Folder"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"personal"}}]}}]} as unknown as DocumentNode<SettingsDataQuery, SettingsDataQueryVariables>;
export const SettingsDataForManagerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SettingsDataForManager"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getManageableFolders"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FolderFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FolderFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Folder"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"personal"}}]}}]} as unknown as DocumentNode<SettingsDataForManagerQuery, SettingsDataForManagerQueryVariables>;
export const AppSettingsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AppSettings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAppData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AppDataFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AppSettingsFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AppSettings"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"registration"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"enabled"}},{"kind":"Field","name":{"kind":"Name","value":"corporationFilterEnabled"}},{"kind":"Field","name":{"kind":"Name","value":"allianceFilterEnabled"}},{"kind":"Field","name":{"kind":"Name","value":"allowedCorporations"}},{"kind":"Field","name":{"kind":"Name","value":"allowedAlliances"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AppDataFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AppData"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"appVersion"}},{"kind":"Field","name":{"kind":"Name","value":"settings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AppSettingsFields"}}]}}]}}]} as unknown as DocumentNode<AppSettingsQuery, AppSettingsQueryVariables>;
export const CreateFolderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateFolder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createFolder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FolderFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FolderFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Folder"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"personal"}}]}}]} as unknown as DocumentNode<CreateFolderMutation, CreateFolderMutationVariables>;
export const AddFolderRoleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddFolderRole"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddFolderRoleInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addFolderRole"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<AddFolderRoleMutation, AddFolderRoleMutationVariables>;
export const ChangeActiveFolderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ChangeActiveFolder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"folderId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"changeActiveFolder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"folderId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"folderId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<ChangeActiveFolderMutation, ChangeActiveFolderMutationVariables>;
export const SetRegistrationEnabledDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SetRegistrationEnabled"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"enabled"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateAppData"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"settings"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"registration"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"enabled"},"value":{"kind":"Variable","name":{"kind":"Name","value":"enabled"}}}]}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"settings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"registration"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"enabled"}}]}}]}}]}}]}}]} as unknown as DocumentNode<SetRegistrationEnabledMutation, SetRegistrationEnabledMutationVariables>;
export const SetCorporationFilterEnabledDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SetCorporationFilterEnabled"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"enabled"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateAppData"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"settings"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"registration"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"corporationFilterEnabled"},"value":{"kind":"Variable","name":{"kind":"Name","value":"enabled"}}}]}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"settings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"registration"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"enabled"}}]}}]}}]}}]}}]} as unknown as DocumentNode<SetCorporationFilterEnabledMutation, SetCorporationFilterEnabledMutationVariables>;
export const SetAllianceFilterEnabledDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SetAllianceFilterEnabled"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"enabled"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateAppData"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"settings"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"registration"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"allianceFilterEnabled"},"value":{"kind":"Variable","name":{"kind":"Name","value":"enabled"}}}]}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"settings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"registration"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"enabled"}}]}}]}}]}}]}}]} as unknown as DocumentNode<SetAllianceFilterEnabledMutation, SetAllianceFilterEnabledMutationVariables>;
export const AddAllowedCorporationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddAllowedCorporation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"esiId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addAllowedCorporation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"esiId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"esiId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"settings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"registration"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allowedCorporations"}}]}}]}}]}}]}}]} as unknown as DocumentNode<AddAllowedCorporationMutation, AddAllowedCorporationMutationVariables>;
export const AddAllowedAllianceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddAllowedAlliance"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"esiId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addAllowedAlliance"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"esiId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"esiId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"settings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"registration"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allowedAlliances"}}]}}]}}]}}]}}]} as unknown as DocumentNode<AddAllowedAllianceMutation, AddAllowedAllianceMutationVariables>;
export const RemoveAllowedCorporationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveAllowedCorporation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"esiId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeAllowedCorporation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"esiId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"esiId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"settings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"registration"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allowedCorporations"}}]}}]}}]}}]}}]} as unknown as DocumentNode<RemoveAllowedCorporationMutation, RemoveAllowedCorporationMutationVariables>;
export const RemoveAllowedAllianceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveAllowedAlliance"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"esiId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeAllowedAlliance"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"esiId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"esiId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"settings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"registration"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allowedCorporations"}}]}}]}}]}}]}}]} as unknown as DocumentNode<RemoveAllowedAllianceMutation, RemoveAllowedAllianceMutationVariables>;
export const SystemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"System"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getSystemByName"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"getSignaturesBySystem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"systemName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SignatureFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SignatureFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Signature"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"eveId"}},{"kind":"Field","name":{"kind":"Name","value":"systemName"}},{"kind":"Field","name":{"kind":"Name","value":"wormholeType"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"connection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"eol"}},{"kind":"Field","name":{"kind":"Name","value":"eolAt"}},{"kind":"Field","name":{"kind":"Name","value":"massStatus"}},{"kind":"Field","name":{"kind":"Name","value":"reverseSignature"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"eveId"}},{"kind":"Field","name":{"kind":"Name","value":"systemName"}},{"kind":"Field","name":{"kind":"Name","value":"wormholeType"}}]}}]}}]}}]} as unknown as DocumentNode<SystemQuery, SystemQueryVariables>;
export const GetSignaturesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSignatures"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"systemName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getSignaturesBySystem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"systemName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"systemName"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SignatureFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SignatureFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Signature"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"eveId"}},{"kind":"Field","name":{"kind":"Name","value":"systemName"}},{"kind":"Field","name":{"kind":"Name","value":"wormholeType"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"connection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"eol"}},{"kind":"Field","name":{"kind":"Name","value":"eolAt"}},{"kind":"Field","name":{"kind":"Name","value":"massStatus"}},{"kind":"Field","name":{"kind":"Name","value":"reverseSignature"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"eveId"}},{"kind":"Field","name":{"kind":"Name","value":"systemName"}},{"kind":"Field","name":{"kind":"Name","value":"wormholeType"}}]}}]}}]}}]} as unknown as DocumentNode<GetSignaturesQuery, GetSignaturesQueryVariables>;
export const AddSignaturesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddSignatures"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddSignaturesInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addSignatures"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SignatureFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SignatureFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Signature"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"eveId"}},{"kind":"Field","name":{"kind":"Name","value":"systemName"}},{"kind":"Field","name":{"kind":"Name","value":"wormholeType"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"connection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"eol"}},{"kind":"Field","name":{"kind":"Name","value":"eolAt"}},{"kind":"Field","name":{"kind":"Name","value":"massStatus"}},{"kind":"Field","name":{"kind":"Name","value":"reverseSignature"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"eveId"}},{"kind":"Field","name":{"kind":"Name","value":"systemName"}},{"kind":"Field","name":{"kind":"Name","value":"wormholeType"}}]}}]}}]}}]} as unknown as DocumentNode<AddSignaturesMutation, AddSignaturesMutationVariables>;
export const UpdateSignaturesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateSignatures"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateSignaturesInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateSignatures"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SignatureFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SignatureFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Signature"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"eveId"}},{"kind":"Field","name":{"kind":"Name","value":"systemName"}},{"kind":"Field","name":{"kind":"Name","value":"wormholeType"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"connection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"eol"}},{"kind":"Field","name":{"kind":"Name","value":"eolAt"}},{"kind":"Field","name":{"kind":"Name","value":"massStatus"}},{"kind":"Field","name":{"kind":"Name","value":"reverseSignature"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"eveId"}},{"kind":"Field","name":{"kind":"Name","value":"systemName"}},{"kind":"Field","name":{"kind":"Name","value":"wormholeType"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateSignaturesMutation, UpdateSignaturesMutationVariables>;
export const DeleteSignaturesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteSignatures"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeleteSignaturesInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteSignatures"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SignatureFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SignatureFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Signature"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"eveId"}},{"kind":"Field","name":{"kind":"Name","value":"systemName"}},{"kind":"Field","name":{"kind":"Name","value":"wormholeType"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"connection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"eol"}},{"kind":"Field","name":{"kind":"Name","value":"eolAt"}},{"kind":"Field","name":{"kind":"Name","value":"massStatus"}},{"kind":"Field","name":{"kind":"Name","value":"reverseSignature"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"eveId"}},{"kind":"Field","name":{"kind":"Name","value":"systemName"}},{"kind":"Field","name":{"kind":"Name","value":"wormholeType"}}]}}]}}]}}]} as unknown as DocumentNode<DeleteSignaturesMutation, DeleteSignaturesMutationVariables>;
export const PasteSignaturesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"PasteSignatures"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SignaturePaste"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pasteSignatures"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"added"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SignatureFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"updated"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SignatureFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"deleted"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SignatureFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SignatureFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Signature"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"eveId"}},{"kind":"Field","name":{"kind":"Name","value":"systemName"}},{"kind":"Field","name":{"kind":"Name","value":"wormholeType"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"connection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"eol"}},{"kind":"Field","name":{"kind":"Name","value":"eolAt"}},{"kind":"Field","name":{"kind":"Name","value":"massStatus"}},{"kind":"Field","name":{"kind":"Name","value":"reverseSignature"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"eveId"}},{"kind":"Field","name":{"kind":"Name","value":"systemName"}},{"kind":"Field","name":{"kind":"Name","value":"wormholeType"}}]}}]}}]}}]} as unknown as DocumentNode<PasteSignaturesMutation, PasteSignaturesMutationVariables>;
export const UserDataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"whoami"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"systemRole"}},{"kind":"Field","name":{"kind":"Name","value":"main"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CharacterFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"alts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CharacterFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"settings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"maps"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MapFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"selectedMap"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MapFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"activeFolder"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"personal"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"getAccessibleFolders"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"personal"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CorporationFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Corporation"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"esiId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"ticker"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CharacterFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Character"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"esiId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"isMain"}},{"kind":"Field","name":{"kind":"Name","value":"portraitUrl"}},{"kind":"Field","name":{"kind":"Name","value":"corporation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CorporationFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MapFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SavedMap"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"rootSystemName"}}]}}]} as unknown as DocumentNode<UserDataQuery, UserDataQueryVariables>;
export const RemoveAltDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveAlt"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"esiId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeAlt"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"esiId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"esiId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"alts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CharacterFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CorporationFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Corporation"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"esiId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"ticker"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CharacterFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Character"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"esiId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"isMain"}},{"kind":"Field","name":{"kind":"Name","value":"portraitUrl"}},{"kind":"Field","name":{"kind":"Name","value":"corporation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CorporationFields"}}]}}]}}]} as unknown as DocumentNode<RemoveAltMutation, RemoveAltMutationVariables>;
export const AllUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AllUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllUsersForManager"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFieldsForManager"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFieldsForManager"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanitizedUserForManager"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"systemRole"}},{"kind":"Field","name":{"kind":"Name","value":"main"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"esiId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"portraitUrl"}},{"kind":"Field","name":{"kind":"Name","value":"isMain"}},{"kind":"Field","name":{"kind":"Name","value":"corporation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"esiId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"ticker"}}]}},{"kind":"Field","name":{"kind":"Name","value":"alliance"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"esiId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"ticker"}}]}}]}}]}}]} as unknown as DocumentNode<AllUsersQuery, AllUsersQueryVariables>;
export const AssignSystemRoleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AssignSystemRole"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"systemRole"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SystemRoles"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assignSystemRole"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"systemRole"},"value":{"kind":"Variable","name":{"kind":"Name","value":"systemRole"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFieldsForManager"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFieldsForManager"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanitizedUserForManager"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"systemRole"}},{"kind":"Field","name":{"kind":"Name","value":"main"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"esiId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"portraitUrl"}},{"kind":"Field","name":{"kind":"Name","value":"isMain"}},{"kind":"Field","name":{"kind":"Name","value":"corporation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"esiId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"ticker"}}]}},{"kind":"Field","name":{"kind":"Name","value":"alliance"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"esiId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"ticker"}}]}}]}}]}}]} as unknown as DocumentNode<AssignSystemRoleMutation, AssignSystemRoleMutationVariables>;