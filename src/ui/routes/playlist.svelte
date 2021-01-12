<script lang="ts">
  import { tracks } from "./stores";
  import TrackItem from "../components/track-item.svelte";

  export let id: string;
  tracks.set([]);

  async function loadTracks(playlistId) {
    console.log({ playlistId });

    try {
      const newTracks = await (await fetch(`/api/playlists/${playlistId}`)).json();
      tracks.set(newTracks);
    } catch (error) {
      console.log({ error });
    }
  }

  $: loadTracks(id);
</script>

<div class="column items">
  {#each tracks as item}
    <!-- // TODO: consume entire item object -->
    <TrackItem track={item.track} />
  {/each}
</div>
