export class Auth {
  isAuthenticated: boolean;
  hrtokendata: ApiTokenData;
  apitokendata: ApiTokenData;
}

export class ApiTokenData {
  token: string;
  expiration: Date;
}

