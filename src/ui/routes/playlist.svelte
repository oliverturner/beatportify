<script>
  import { tick } from "svelte";

  import { pageTitle, contentTitle } from "../stores/ui";
  import { tracks, playlistMap } from "../stores/tracks";
  import TrackList from "../components/track-list.svelte";
  import Pagelinks from "../components/pagelinks.svelte";
  import Loader from "../components/loader.svelte";

  /** @type {string} */
  export let id;
  /** @type {Location} */
  export const location = null;

  const TRACK_LIMIT = 24;

  // TODO: set pageTitle at App level
  pageTitle.set("Playlist");

  /** @type {import("@typings/app").PlaylistPage} */
  let page;
  /** @type {import("@typings/app").Album} */
  let album;
  let compact = false;

  function reset() {
    tracks.set([]);
    compact = false;
    album = undefined;

    return tick();
  }

  /**
   * @param {number} offset
   */
  function makeLink(offset) {
    return `/api/playlists/${id}?offset=${offset * TRACK_LIMIT}&limit=${TRACK_LIMIT}`;
  }

  /**
   * @param {number} offset
   */
  async function loadPage(offset) {
    await reset();

    page = await (await fetch(makeLink(offset))).json();
    if (page.isCollection) {
      compact = true;
      album = page.items[0].album;
    }
    tracks.set(page.items);
  }

  /**
   * @param {string} playlistId
   */
  async function loadTracks(playlistId) {
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
