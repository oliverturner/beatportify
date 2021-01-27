<script lang="ts">
  import { fade } from "svelte/transition";

  import { intersectionObserver } from "../actions/intersection-observer";
  import TrackItem from "./track-item.svelte";

  import type { Track } from "@typings/app";

  export let tracks: Track[] = [];
  export let compact: boolean = false;
</script>

<section
  class="tracklist"
  class:tracklist--header={$$slots.header}
  class:tracklist--footer={$$slots.footer}
  class:tracklist--header-footer={$$slots.header && $$slots.footer}
>
  <slot name="header" />

  {#if tracks?.length}
    <div
      class="tracklist__items"
      class:compact={compact}
      in:fade
      use:intersectionObserver
    >
      {#each tracks as item, index (item.id)}
        <TrackItem {item} {index} compact={compact} />
      {/each}
    </div>
  {:else}
    <div class="tracklist__items" />
  {/if}

  <slot name="footer" />
</section>

<style lang="scss">
  .tracklist {
    display: grid;
    align-items: start;
    gap: 1rem;

    overflow: hidden;
    height: 100%;

    &.tracklist--header {
      grid-template-rows: auto 1fr;
    }

    &.tracklist--footer {
      grid-template-rows: 1fr auto;
    }

    &.tracklist--header-footer {
      grid-template-rows: auto 1fr auto;
    }
  }

  .tracklist__items {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 1rem;

    overflow: hidden auto;
    max-height: 100%;
    padding: 1rem;

    @media (--mq-medium) {
      padding: 1rem 0;
    }

    &.compact {
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    }
  }
</style>
