interface ArcHeaders {}

export interface SpotifySession {
  accessToken: string;
  refreshToken: string;
  user: SpotifyApi.UserObjectPrivate;
}

export interface ArcRequest {
  session: SpotifySession;
  query: Record<string, string>;
  params: Record<string, string>;
  requestContext: {
    http: {
      path: string;
    };
  };
}

export interface AwsRequest {
  version: string;
  routeKey: string;
  rawPath: string;
  rawQueryString: string;
  cookies: string[];
  headers: Record<string, string>;
  queryStringParameters: Record<string, string>;
  requestContext: {
    accountId: string;
    apiId: string;
    authentication: {
      clientCert: {
        clientCertPem: string;
        subjectDN: string;
        issuerDN: string;
        serialNumber: string;
        validity: {
          notBefore: string;
          notAfter: string;
        };
      };
    };
    authorizer: {
      jwt: {
        claims: Record<string, string>;
        scopes: string[];
      };
    };
    domainName: string;
    domainPrefix: string;
    http: {
      method: "POST" | "PUT" | "PATCH" | "GET" | "DELETE";
      path: string;
      protocol: string;
      sourceIp: string;
      userAgent: string;
    };
    requestId: string;
    routeKey: string;
    stage: string;
    time: string;
    timeEpoch: number;
  };
  body: string;
  pathParameters: Record<string, string>;
  isBase64Encoded: boolean;
  stageVariables: Record<string, string>;
}
