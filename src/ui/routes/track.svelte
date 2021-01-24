<script lang="ts">
  import { pageTitle, contentTitle } from "../stores/ui";

  export let id: string;

  pageTitle.set(`Track`);

  async function loadTrack(trackId: string) {
    const response = await (await fetch(`/api/tracks/${trackId}`)).json();
    contentTitle.set(response.name);
  }

  $: loadTrack(id);
</script>

<p>Current query is {id}</p>
