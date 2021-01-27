<script lang="ts">
  import { tick } from "svelte";

  import { pageTitle, contentTitle } from "../stores/ui";
  import { tracks, playlistMap } from "../stores/tracks";
  import { getPlaylistPage } from "../utils";
  import TrackList from "../components/track-list.svelte";
  import Pagelinks from "../components/pagelinks.svelte";

  import type { Track } from "@typings/app";
  import type { Playlist } from "@typings/spotify";

  export let id: string;
  export const location: Location = null;

  const TRACK_LIMIT = 24;
  pageTitle.set("Playlist");

  let page = getPlaylistPage({ limit: TRACK_LIMIT });

  function makeLink(offset: number) {
    return `/api/playlists/${id}?offset=${offset * TRACK_LIMIT}&limit=${TRACK_LIMIT}`;
  }

  async function loadPage(offset: number) {
    tracks.set([]);
    await tick();
    
    page = await (await fetch(makeLink(offset))).json();
    tracks.set(page.items);
  }

  async function loadTracks(playlist: Playlist) {
    if (!playlist) return;

    tracks.set([]);
    await tick();

    contentTitle.set(playlist.name);
    await loadPage(0);
  }

  $: loadTracks($playlistMap[id]);
</script>

<TrackList tracks={$tracks} compact={page.isCollection}>
  <div class="content__footer" slot="footer">
    <Pagelinks {page} {makeLink} {loadPage} />
  </div>
</TrackList>
