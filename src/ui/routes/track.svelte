<script lang="ts">
  import { onMount } from "svelte";

  export let id: string;

  import { ui } from "../stores/ui";

  async function loadTrack(trackId: string) {
    // const response = await (await fetch(`/api/artists/${artistId}`)).json();
    ui.update((props) => ({ ...props, title: `Track: ${id}` }));
    // tracks = response.topTracks;
  }

  $: loadTrack(id);
</script>

<p>Current query is {id}</p>
