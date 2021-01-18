<script lang="ts">
  import { tick } from "svelte";

  import { tracks, playlistDict } from "../stores/tracks";
  import TrackList from "../components/track-list.svelte";
  import Pagelinks from "../components/pagelinks.svelte";
  import { getDefaultPage } from "../utils";

  export let id: string;

  const limit = 24;

  let title = "";
  let makeLink = (_offset: number) => "";
  let loadPage = (_offset: number) => {};
  let page = getDefaultPage({ limit });

  async function loadTracks(playlistId: string) {
    title = `Playlist: ${$playlistDict[playlistId].name}`;
    makeLink = (offset: number) =>
      `/api/playlists/${playlistId}?offset=${offset * limit}&limit=${limit}`;

    loadPage = async (offset) => {
      tracks.set([]);
      await tick();

      page = await (await fetch(makeLink(offset))).json();
      tracks.set(page.items);
    };

    loadPage(0);
  }

  $: loadTracks(id);
</script>

<TrackList {title} tracks={$tracks}>
  <div class="controls" slot="controls">
    <p>pages:</p>
    <Pagelinks {page} {makeLink} {loadPage} />
  </div>
</TrackList>

<style lang="scss">
  .controls {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 0.5rem;

    padding: var(--s4);
    padding-bottom: 0;
    border-top: 1px solid currentColor;
    font-size: small;

    & p {
      margin: 0;
      line-height: var(--s6);
    }
  }
</style>
