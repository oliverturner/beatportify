<script lang="ts">
  import { onMount } from "svelte";
  import { fade, fly } from "svelte/transition";
  import { link } from "svelte-routing";

  import { playlists } from "../stores/tracks";
  import Pagelinks from "../components/pagelinks.svelte";

  import type * as Spotify from "@typings/spotify";

  const limit = 15;

  let total = limit;
  let pageTotal = 0;
  let pageLinks = [];
  let pageCurrent = 0;
  let items: Spotify.Playlist[] = [];

  const makeLink = (offset: number) => `/api/playlists?offset=${offset}&limit=${limit}`;

  const loadPage = (pageIndex: number = 0) => async () => {
    try {
      pageCurrent = pageIndex;
      const offset = pageCurrent * limit;

      if (offset > total) return;

      playlists.set([]);

      const page: Spotify.ApiResponsePlaylists = await (await fetch(makeLink(offset))).json();
      playlists.set(page.items);

      items = page.items;
      total = page.total;
      pageTotal = Math.ceil(total / limit);
      pageLinks = Array.from({ length: pageTotal }, (_, index) => index).map(makeLink);
    } catch (error) {
      console.log({ error });
    }
  };

  onMount(loadPage(pageCurrent));
</script>

<nav class="sidebar">
  {#if items?.length}
    <div class="sidebar__items">
      {#each items as playlist, index (playlist.id)}
        <a
          class="sidebar__item"
          href="/playlist/{playlist.id}"
          use:link
          in:fade={{ delay: 1000 + index * 50 }}
          out:fly={{ delay: index * 25 }}>
          <span>{playlist.name}</span>
        </a>
      {/each}
    </div>

    <div class="sidebar__controls">
      <p class="controls__label">pages:</p>
      <div class="controls__links">
        <Pagelinks {pageCurrent} {pageLinks} {loadPage} />
      </div>
    </div>
  {:else}
    <p>...loading</p>
  {/if}
</nav>

<style lang="scss">
  .sidebar {
    display: grid;
    grid-template-rows: 1fr auto;
    align-items: flex-start;

    overflow: hidden;
    font-size: small;
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
