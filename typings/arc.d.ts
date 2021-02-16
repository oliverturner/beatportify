export interface SpotifySession {
  accessToken: string;
  refreshToken: string;
  user: SpotifyApi.UserObjectPrivate;
}

interface ArcHeaders {
  "Content-Type": "application/json";
  Authorization: string;
}

export interface ArcRequest extends APIGatewayProxyEventV2 {
  session: SpotifySession;
  query: Record<string, string>;
  params: Record<string, string>;
  requestContext: {
    http: {
      path: string;
    };
  };
}
