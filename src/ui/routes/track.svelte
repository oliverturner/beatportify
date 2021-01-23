<script lang="ts">
  export let id: string;

  import { pageTitle, contentTitle } from "../stores/ui";

  async function loadTrack(trackId: string) {
    // TODO: display *album* data
    // const response = await (await fetch(`/api/artists/${artistId}`)).json();
    pageTitle.set(`Track`);
    contentTitle.set(id);
    // tracks = response.topTracks;
  }

  $: loadTrack(id);
</script>

<p>Current query is {id}</p>
