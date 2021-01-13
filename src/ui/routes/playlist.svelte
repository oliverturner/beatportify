<script lang="ts">
  import { tracks } from "../stores/tracks";
  import TrackItem from "../components/track-item.svelte";

  export let id: string;

  async function loadTracks(playlistId) {
    console.log({ playlistId });

    tracks.set([]);

    try {
      const newTracks: SpotifyApi.PagingObject<TrackItem> = await (
        await fetch(`/api/playlists/${playlistId}`)
      ).json();
      tracks.set(newTracks.items);

      console.log({ $tracks });

      console.log({ newTracks });
    } catch (error) {
      console.log({ error });
    }
  }

  $: loadTracks(id);
</script>

<div class="column items">
  {#each $tracks as item, index (item.track.id)}
    <!-- // TODO: consume entire item object -->
    <TrackItem {item} {index} />
  {/each}
</div>
