<script>
  import { pageTitle, contentTitle } from "../stores/ui";
  import TrackList from "../components/track-list.svelte";
  import Loader from "../components/loader.svelte";

  /** @typedef {import("@typings/app").Track} Track */

  /** @type {string} */
  export let id;

  // TODO: set pageTitle at App level
  pageTitle.set(`Album`);

  // TODO: make `Album` type more consistent with Spotify type
  let album;

  /** @type {Track[]} */
  let tracks;

  /**
   * @param {string} albumId
   */
  async function loadAlbum(albumId) {
    album = await (await fetch(`/api/albums/${albumId}`)).json();
    contentTitle.set(album.name);
    tracks = album.tracks;
  }

  $: loadAlbum(id);
</script>

{#if tracks}
  <TrackList {tracks} {album} compact={true} />
{:else}
  <div class="grid">
    <Loader />
  </div>
{/if}
