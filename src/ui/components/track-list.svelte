<script lang="ts">
  import TrackItem from "./track-item.svelte";

  import type { Track } from "@typings/app";

  export let tracks: Track[] = [];
</script>

<section
  class="tracklist"
  class:tracklist--header={$$slots.header}
  class:tracklist--footer={$$slots.footer}
  class:tracklist--header-footer={$$slots.header && $$slots.footer}
>
  <slot name="header" />

  <div class="tracklist__items">
    {#each tracks as item, index (item.id)}
      <TrackItem {item} {index} />
    {/each}
  </div>

  <slot name="footer" />
</section>

<style lang="scss">
  .tracklist {
    display: grid;

    align-items: start;
    gap: 1rem;

    overflow: hidden;
    height: 100%;
    padding-top: 0.5rem;

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
  }
</style>
