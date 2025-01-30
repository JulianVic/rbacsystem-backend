export enum TextQueryMethod {
  TEXT_QUERY_METHOD_EQUALS = 'TEXT_QUERY_METHOD_EQUALS',
}

export enum UserType {
  TYPE_HUMAN = 'TYPE_HUMAN',
}

export class SearchQueryDto {
  projectIdQuery?: { projectId: string };
  userIdQuery?: { userId: string };
  withGrantedQuery?: { withGranted: boolean };
  roleKeyQuery?: { roleKey: string; method: TextQueryMethod };
  projectGrantIdQuery?: { projectGrantId: string };
  userNameQuery?: { userName: string; method: TextQueryMethod };
  firstNameQuery?: { firstName: string; method: TextQueryMethod };
  lastNameQuery?: { lastName: string; method: TextQueryMethod };
  emailQuery?: { email: string; method: TextQueryMethod };
  orgNameQuery?: { orgName: string; method: TextQueryMethod };
  orgDomainQuery?: { orgDomain: string; method: TextQueryMethod };
  projectNameQuery?: { projectName: string; method: TextQueryMethod };
  displayNameQuery?: { displayName: string; method: TextQueryMethod };
  userTypeQuery?: { type: UserType };
}

export class SearchGrantsDto {
  query: {
    offset: string;
    limit: number;
    asc: boolean;
  };
  queries: SearchQueryDto[];
} 