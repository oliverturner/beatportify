<script>
  import TrackItem from "../components/track-item.svelte";

  export let id;
  let playlist = { items: [] };

  async function loadTracks(playlistId) {
    console.log({ playlistId });

    try {
      playlist = await (await fetch(`/api/playlists/${playlistId}`)).json();

      console.log({ playlist });
    } catch (error) {
      console.log({ error });
    }
  }

  $: loadTracks(id);
</script>

<div class="column items">
  {#each playlist.items as item}
    <!-- // TODO: consume entire item object -->
    <TrackItem track={item.track} />
  {/each}
</div>
