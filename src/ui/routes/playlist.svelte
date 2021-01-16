<script lang="ts">
  import { tracks } from "../stores/tracks";
  import TrackItem from "../components/track-item.svelte";

  import type * as Portify from "@typings/app";
  import type * as SpotifyApi from "@typings/spotify";

  export let id: string;

  async function loadTracks(playlistId) {
    tracks.set([]);

    try {
      const newTracks: SpotifyApi.PagingObject<Portify.Track> = await (
        await fetch(`/api/playlists/${playlistId}`)
      ).json();
      tracks.set(newTracks.items);

      console.log({ playlistId, $tracks });

      console.log({ newTracks });
    } catch (error) {
      console.log({ error });
    }
  }

  $: loadTracks(id);
</script>

<div class="column items">
  {#each $tracks as item, index (item.track.id)}
    <TrackItem {item} {index} />
  {/each}
</div>
