<script lang="ts">
  import { tick } from "svelte";
  import { fade } from "svelte/transition";
  import { link } from "svelte-routing";

  import { getDefaultPage } from "../utils";
  import { playlists } from "../stores/tracks";
  import { menuOpen } from "stores/ui";
  import Pagelinks from "../components/pagelinks.svelte";

  import type { Playlist } from "@typings/spotify";

  const limit = 50;
  const makeLink = (offset: number) => `/api/playlists?offset=${offset * limit}&limit=${limit}`;

  let page = getDefaultPage<Playlist>({ limit });

  function hideMenu() {
    menuOpen.set(false);
  }

  async function loadPage(offset: number) {
    playlists.set([]);
    await tick();

    try {
      const res = await fetch(makeLink(offset));
      page = await res.json();
      playlists.set(page.items);
    } catch (error) {
      console.log({ error });
    }
  }

  loadPage(0);
</script>

<nav class="sidebar" class:active={$menuOpen}>
  {#if $playlists?.length}
    <div
      class="sidebar__items"
      in:fade={{ duration: 250, delay: 500 }}
      out:fade={{ duration: 250, delay: 0 }}
    >
      {#each $playlists as playlist, index (playlist.id)}
        <a class="sidebar__item" href="/playlist/{playlist.id}" use:link on:click={hideMenu}>
          <span>{playlist.name}</span>
        </a>
      {/each}
    </div>
  {:else}
    <div class="sidebar__items" />
  {/if}

  <div class="sidebar__controls">
    <Pagelinks {page} {makeLink} {loadPage} />
  </div>
</nav>

<style lang="scss">
  .sidebar {
    --sidebar-x: -100vw;

    display: grid;
    grid-template-rows: 1fr auto;
    align-items: flex-start;

    transition: transform 0.5s;

    position: absolute;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100%;
    transform: translate3d(var(--sidebar-x), 0, 0);
    background: var(--app-bg);

    &.active {
      --sidebar-x: 0;
    }

    @media (--mq-medium) {
      --sidebar-x: 0;
      position: static;
      width: unset;
    }
  }

  .sidebar__items {
    display: grid;
    gap: var(--s1);

    overflow-y: auto;
    max-height: 100%;
    padding: 1rem;
    color: #333;
  }

  .sidebar__item {
    padding: var(--s2);
    background: var(--item-bg);
    color: var(--item-text);
  }

  .sidebar__controls {
    padding: var(--s4);
    border-top: 1px solid var(--border);
  }
</style>
