<script>
  import { pageTitle, contentTitle } from "../stores/ui";

  /** @type {string} */
  export let id;

  // TODO: set pageTitle / contentTitle at App level
  pageTitle.set(`Track`);

  /**
   * @param {string} trackId
   */
  async function loadTrack(trackId) {
    const response = await (await fetch(`/api/tracks/${trackId}`)).json();
    contentTitle.set(response.name);
  }

  $: loadTrack(id);
</script>

<p>Current query is {id}</p>
