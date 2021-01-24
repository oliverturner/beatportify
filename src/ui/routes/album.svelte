<script lang="ts">
  import { pageTitle, contentTitle } from "../stores/ui";

  export let id: string;

  pageTitle.set(`Album`);

  async function loadAlbum(albumId: string) {
    const response = await (await fetch(`/api/albums/${albumId}`)).json();
    contentTitle.set(response.name);
  }

  $: loadAlbum(id);
</script>

<div class="album">
  <p>Current query is {id}</p>
</div>
