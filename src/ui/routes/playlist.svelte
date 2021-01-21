<script lang="ts">
  import { tick } from "svelte";

  import { ui } from "../stores/ui";
  import { tracks, playlistDict } from "../stores/tracks";
  import TrackList from "../components/track-list.svelte";
  import Pagelinks from "../components/pagelinks.svelte";
  import { getDefaultPage } from "../utils";

  export let id: string;
  export const location: Location = null;

  const limit = 24;

  let makeLink = (_offset: number) => "";
  let loadPage = (_offset: number) => {};
  let page = getDefaultPage({ limit });

  async function loadTracks(playlistId: string) {
    if (!$playlistDict[playlistId]) return;

    ui.update((props) => ({ ...props, title: `Playlist: ${$playlistDict[playlistId].name}` }));

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

<TrackList tracks={$tracks}>
  <div class="controls" slot="footer">
    <p>pages:</p>
    <Pagelinks {page} {makeLink} {loadPage} />
  </div>
</TrackList>

<style lang="scss">
  .controls {
    display: flex;
    justify-content: end;
    gap: 0.5rem;

    padding: var(--s4);
    padding-bottom: 0;
    border-top: 1px solid currentColor;

    & p {
      margin: 0 4px 0 auto;
      line-height: var(--s6);
    }
  }
</style>
