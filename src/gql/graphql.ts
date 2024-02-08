/* eslint-disable */
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
  _Any: { input: any; output: any; }
  federation__FieldSet: { input: any; output: any; }
  link__Import: { input: any; output: any; }
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  token?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};

export type Mutation = {
  __typename?: 'Mutation';
  authenticate?: Maybe<AuthPayload>;
  createUser?: Maybe<User>;
  delete?: Maybe<User>;
  updateUser?: Maybe<User>;
};


export type MutationAuthenticateArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationCreateUserArgs = {
  branch: Scalars['String']['input'];
  documentAttachment: Scalars['String']['input'];
  email: Scalars['String']['input'];
  employeeNumber: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  middleName: Scalars['String']['input'];
  modifiedBy: Scalars['String']['input'];
  modifiedOn: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phoneNumber: Scalars['String']['input'];
  profile: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationDeleteArgs = {
  id: Scalars['String']['input'];
};


export type MutationUpdateUserArgs = {
  branch: Scalars['String']['input'];
  documentAttachment: Scalars['String']['input'];
  email: Scalars['String']['input'];
  employeeNumber: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  middleName: Scalars['String']['input'];
  modifiedBy: Scalars['String']['input'];
  modifiedOn: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phoneNumber: Scalars['String']['input'];
  profile: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  _service: _Service;
  user?: Maybe<User>;
  users: Array<User>;
};


export type QueryUserArgs = {
  id: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  branch: Scalars['String']['output'];
  documentAttachment: Scalars['String']['output'];
  email: Scalars['String']['output'];
  employeeNumber: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id?: Maybe<Scalars['String']['output']>;
  lastName: Scalars['String']['output'];
  middleName: Scalars['String']['output'];
  modifiedBy: Scalars['String']['output'];
  modifiedOn: Scalars['String']['output'];
  password: Scalars['String']['output'];
  phoneNumber: Scalars['String']['output'];
  profile: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type _Service = {
  __typename?: '_Service';
  sdl?: Maybe<Scalars['String']['output']>;
};

export enum Link__Purpose {
  /** `EXECUTION` features provide metadata necessary for operation execution. */
  Execution = 'EXECUTION',
  /** `SECURITY` features provide metadata necessary to securely resolve fields. */
  Security = 'SECURITY'
}

export type ExampleQueryQueryVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type ExampleQueryQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id?: string | null }>, _service: { __typename?: '_Service', sdl?: string | null }, user?: { __typename?: 'User', branch: string, documentAttachment: string, email: string, employeeNumber: string, firstName: string, id?: string | null, lastName: string, middleName: string, modifiedBy: string, modifiedOn: string, password: string, phoneNumber: string, profile: string, username: string } | null };


export const ExampleQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ExampleQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"_service"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sdl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"branch"}},{"kind":"Field","name":{"kind":"Name","value":"documentAttachment"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"employeeNumber"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"middleName"}},{"kind":"Field","name":{"kind":"Name","value":"modifiedBy"}},{"kind":"Field","name":{"kind":"Name","value":"modifiedOn"}},{"kind":"Field","name":{"kind":"Name","value":"password"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"profile"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]} as unknown as DocumentNode<ExampleQueryQuery, ExampleQueryQueryVariables>;