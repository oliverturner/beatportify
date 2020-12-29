@app
beatportify

@static

@http
get /login
get /auth
post /logout
get /api/playlists
get /api/playlists/:playlistID
get /api/tracks/:trackId

@tables
data
  scopeID *String
  dataID **String
  ttl TTL
