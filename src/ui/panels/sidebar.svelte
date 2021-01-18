<script lang="ts">
  import { onMount, tick } from "svelte";
  import { fade, fly } from "svelte/transition";
  import { link } from "svelte-routing";

  import { getDefaultPage } from "../utils";
  import { playlists } from "../stores/tracks";
  import Pagelinks from "../components/pagelinks.svelte";
  import type { ApiResponsePlaylists } from "@typings/spotify";

  const limit = 15;
  const makeLink = (offset: number) => `/api/playlists?offset=${offset * limit}&limit=${limit}`;

  let pageRes: Response;
  let page = getDefaultPage({ limit });

  async function loadPage(offset: number) {
    playlists.set([]);
    try {
      pageRes = await fetch(makeLink(offset));
      page = await pageRes.json();
      playlists.set(page.items);
    } catch (error) {
      console.log({ error });
    }
  }

  onMount(() => loadPage(0));
</script>

<nav class="sidebar">
  <div class="sidebar__items">
    {#await pageRes}
      <div class="loading">loading</div>
    {:then}
      {#each $playlists as playlist, index (playlist.id)}
        <a
          class="sidebar__item"
          href="/playlist/{playlist.id}"
          use:link
          in:fade={{ delay: 1000 + index * 50 }}
          out:fly={{ delay: index * 25 }}>
          <span>{playlist.name}</span>
        </a>
      {/each}
    {/await}
  </div>

  <div class="sidebar__controls">
    <p class="controls__label">pages:</p>
    <div class="controls__links">
      <Pagelinks {page} {makeLink} {loadPage} />
    </div>
  </div>
</nav>

<style lang="scss">
  .sidebar {
    display: grid;
    grid-template-rows: 1fr auto;
    align-items: flex-start;

    overflow: hidden;
    font-size: small;
  }

  .loading {
    justify-self: center;
    align-self: center;
  }

  .sidebar__items {
    --item-bg: #ccc;

    display: grid;
    gap: var(--s1);

    overflow-y: auto;
    max-height: 100%;
    padding: 1rem;
    color: #333;
  }

  .sidebar__item {
    padding: var(--s2);
    border-radius: 3px;
    background: var(--item-bg);
  }

  .sidebar__controls {
    --wh: var(--s6);

    display: grid;
    grid-template-columns: auto 1fr;
    gap: 0.5rem;

    padding: var(--s4);
    border-top: 1px solid currentColor;
  }

  .controls__label {
    margin: 0;
    line-height: var(--wh);
  }

  .controls__links {
    flex: 1;
  }
</style>
