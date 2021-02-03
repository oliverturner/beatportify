<script lang="ts">
  import { tick } from "svelte";

  import { pageTitle, contentTitle } from "../stores/ui";
  import { tracks, playlistMap } from "../stores/tracks";
  import TrackList from "../components/track-list.svelte";
  import Pagelinks from "../components/pagelinks.svelte";
  import Loader from "../components/loader.svelte";

  import type { PlaylistPage, Album } from "@typings/app";

  export let id: string;
  export const location: Location = null;

  const TRACK_LIMIT = 24;
  pageTitle.set("Playlist");

  let page: PlaylistPage;
  let compact = false;
  let album: Album;

  function reset() {
    tracks.set([]);
    compact = false;
    album = undefined;
    return tick();
  }

  function makeLink(offset: number) {
    return `/api/playlists/${id}?offset=${offset * TRACK_LIMIT}&limit=${TRACK_LIMIT}`;
  }

  async function loadPage(offset: number) {
    await reset();

    page = await (await fetch(makeLink(offset))).json();
    if (page.isCollection) {
      compact = true;
      album = page.items[0].album;
    }
    tracks.set(page.items);
  }

  async function loadTracks(playlistId: string) {
    if (!playlistId) return;

    await reset();

    const playlist = $playlistMap[playlistId];
    if (playlist) {
      contentTitle.set(playlist.name);
    }

    loadPage(0);
  }

  $: loadTracks(id);
</script>

{#if $tracks?.length}
  <TrackList tracks={$tracks} {compact} {album}>
    <div class="content__footer" slot="footer">
      <Pagelinks {page} {makeLink} {loadPage} />
    </div>
  </TrackList>
{:else}
  <div class="grid">
    <Loader />
  </div>
{/if}
