<script>
  import TrackItem from "../components/track-item.svelte";

  export let id;
  let data = { items: [] };

  async function loadTracks(playlistId) {
    console.log({ playlistId });

    try {
      data = await (await fetch(`/api/playlists/${playlistId}`)).json();
    } catch (error) {
      console.log({ error });
    }
  }

  $: loadTracks(id);
</script>

<div class="column items">
  {#each data.items as item}
    <TrackItem track={item.track} />
  {/each}
</div>
