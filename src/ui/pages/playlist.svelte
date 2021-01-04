<script>
  import { onMount } from "svelte";
  import { query } from "svelte-micro";

  import TrackItem from "../components/track-item.svelte";

  let data = { items: [] };

  async function loadTracks(query) {
    console.log({ query });

    try {
      const url = new URL(window.location);
      const playlistId = url.searchParams.get("playlistId");
      data = await (await fetch(`/api/playlists/${playlistId}`)).json();
    } catch (error) {
      console.log({ error });
    }
  }

  $: loadTracks($query);
</script>

<div class="column items">
  {#each data.items as item}
    <TrackItem track={item.track} />
  {/each}
</div>
