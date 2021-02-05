
# Portify

Like music? Like supporting the artists who make it? If you said "hell yeah", then this app is for you! 

![lgagerxflc execute-api us-west-2 amazonaws com_playlist_37i9dQZEVXbpfc3fG6dt9B(iPad)](https://user-images.githubusercontent.com/21795/105782072-ac318d00-5f6b-11eb-81c3-0b50ebef0d7f.png)

### What it does
- 🥰  Links the music you like on Spotify to buy on Beatport and Bandcamp
- 🎧  Shows you each track's musical key so you can see how DJ mixes are structured
- 🔍  Surfaces related tracks and artists 

### How it works
Portify uses the amazing [Architect](https://arc.codes) framework to easily shape data from Spotify's API and [Svelte](https://svelte.dev/) to surface it.

I built it as a learning exercise and because it was a product that I needed. Mad respect to [Henry Desroches](https://twitter.com/xdesro) and [Tom Duncalf](https://twitter.com/tomduncalf) for their prior art and inspiration:
- https://henry.codes/writing/spotify-now-playing
- https://tomduncalf.github.io/supportify/

This is a very early sneak peek... there's much more to come! 😀

[![Begin build status](https://buildstatus.begin.app/pie-lb1/status.svg)](https://begin.com)

### Project setup

```sh
npm install
npx arc env
```

### Start the local dev server

```sh
npm run dev
```

Navigate to [localhost:3333](http://localhost:3333)

## TO DO:

### UX
- [ ] User preferences: allow toggling musical notation
- [x] Link to album page from tracks
- [x] Load tracks + audio for albums
- [x] Fix missing playlists at boot
- [ ] Preload top 100 playlists
- [ ] Underline artist links
- [x] Truncate long titles in mobile headers
- [ ] TrackList: Offer compact views of items
- [ ] TrackList: Make sortable via derived store
- [ ] Paging: Make page limits configurable
- [ ] Paging: Scroll-to-load on paged content
- [x] Album: Use CSS counter to display track numbers against names AND/OR create `albumIndex`?
- [x] Album: Don't repeat cover image per track
- [ ] Page transitions

#### Stretch
- [ ] Use Spotify Connect to highlight playing track

### Tech debt
- [ ] Remove `/track/:id` endpoint
- [ ] Relax `processTrack` requirements: Pick<{...required}>

### DX        
- [ ] Work out how to attach a debug session to Arc endpoints
- [ ] Switch to Snowpack
- [ ] Use query params to drive paging?

### Perf:
- [x] Create a `use:onload` action for fading in lazy-loaded images
- [ ] Investigate `content-visibility`
        - https://infrequently.org/2020/12/resize-resilient-deferred-rendering/
        - https://web.dev/content-visibility/
