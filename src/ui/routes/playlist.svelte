<script lang="ts">
  import { pageTitle, contentTitle, menuOpen } from "../stores/ui";
  import { tracks, playlistMap } from "../stores/tracks";
  import { getDefaultPage } from "../utils";
  import TrackList from "../components/track-list.svelte";
  import Pagelinks from "../components/pagelinks.svelte";

  import type { Track } from "@typings/app";
  import type { Playlist } from "@typings/spotify";

  export let id: string;
  export const location: Location = null;

  const TRACK_LIMIT = 24;
  pageTitle.set("Playlist");

  let page = getDefaultPage<Track>({ limit: TRACK_LIMIT });

  function makeLink(offset: number) {
    return `/api/playlists/${id}?offset=${offset * TRACK_LIMIT}&limit=${TRACK_LIMIT}`;
  }

  async function loadPage(offset: number) {
    page = await (await fetch(makeLink(offset))).json();
    tracks.set(page.items);
  }
  
  async function loadTracks(playlist: Playlist) {
    if (!playlist) return;
    
    tracks.set([]);
    contentTitle.set(playlist.name);
    await loadPage(0);
    menuOpen.set(false);
  }

  $: loadTracks($playlistMap[id]);
</script>

<TrackList tracks={$tracks}>
  <div class="content__footer" slot="footer">
    <p>pages:</p>
    <Pagelinks {page} {makeLink} {loadPage} />
  </div>
</TrackList>

<style lang="scss">
  .content__footer > p {
    margin: 0 4px 0 auto;
    line-height: var(--s6);
  }
</style>
