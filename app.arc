@app
portify

@create
autocreate true

@static

@http
get /login
get /auth
post /logout

get /api/top
get /api/playlists
get /api/tracks/:trackId
get /api/albums/:albumId
get /api/play/:trackId
get /api/artists/:artistId

@tables
data
  scopeID *String
  dataID **String
  ttl TTL
