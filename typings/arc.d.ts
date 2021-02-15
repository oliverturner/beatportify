export interface SpotifySession {
  accessToken: string;
  refreshToken: string;
  user: SpotifyApi.UserObjectPrivate;
}

interface ArcHeaders {}

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
