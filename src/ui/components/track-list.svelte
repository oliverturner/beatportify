<script lang="ts">
  import TrackItem from "./track-item.svelte";

  export let title = "";
  export let tracks = [];
</script>

<section class="tracklist">
  <h2 class="title tracklist__title">{title}</h2>
  <div class="tracklist__items">
    {#each tracks as item, index (item.id)}
      <TrackItem {item} {index} />
    {/each}
  </div>
  <div class="tracklist__controls">
    <slot name="controls" />
  </div>
</section>

<style lang="scss">
  .tracklist {
    display: grid;
    grid-template-rows: auto 1fr auto;
    gap: 1rem;

    max-height: 100%;
    overflow: hidden;
  }
  .tracklist__title {
    margin: 0;
    font-size: medium;
  }

  .tracklist__items {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1rem;

    overflow-y: auto;
    max-height: 100%;
  }
</style>
