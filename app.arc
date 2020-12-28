@app
begin-app

@static

@http
get /api

@tables
data
  scopeID *String
  dataID **String
  ttl TTL
