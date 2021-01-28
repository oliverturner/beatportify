<script lang="ts">
  import { pageTitle, contentTitle } from "../stores/ui";
  import TrackList from "../components/track-list.svelte";

  import type { Track } from "@typings/app";

  export let id: string;

  pageTitle.set(`Album`);
  let tracks: Track[] = [];

  async function loadAlbum(albumId: string) {
    const response = await (await fetch(`/api/albums/${albumId}`)).json();
    contentTitle.set(response.name);
    tracks = response.tracks;
  }

  $: loadAlbum(id);
</script>

<TrackList {tracks} compact={true} />
