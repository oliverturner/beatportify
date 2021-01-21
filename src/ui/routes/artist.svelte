<script lang="ts">
  import { ui } from "../stores/ui";
  import TrackList from "../components/track-list.svelte";

  import type { Track } from "@typings/app";

  export let id: string;

  let tracks: Track[] = [];

  async function loadArtist(artistId: string) {
    const response = await (await fetch(`/api/artists/${artistId}`)).json();
    ui.update((props) => ({ ...props, title: `Artist: ${response.artist.name}` }));
    tracks = response.topTracks;
  }

  $: loadArtist(id);
</script>

<TrackList {tracks} />
