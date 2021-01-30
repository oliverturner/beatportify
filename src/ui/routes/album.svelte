<script lang="ts">
  import { pageTitle, contentTitle } from "../stores/ui";
  import TrackList from "../components/track-list.svelte";
  import Loader from "../components/loader.svelte";

  import type { Track, Album } from "@typings/app";

  export let id: string;

  pageTitle.set(`Album`);
  let album;
  let tracks: Track[];

  async function loadAlbum(albumId: string) {
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
