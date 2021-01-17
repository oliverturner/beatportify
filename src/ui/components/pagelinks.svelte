<script lang="ts">
  export let pageCurrent = 0;
  export let pageLinks = [];
  export let loadPage;
</script>

<div class="pagelinks">
  {#each pageLinks as href, index}
    <a
      class="pagelink"
      class:active={index === pageCurrent}
      {href}
      on:click|preventDefault|stopPropagation={loadPage(index)}>
      <span>{index + 1}</span>
    </a>
  {/each}
</div>

<style lang="scss">
  .pagelinks {
    display: grid;
    grid-template-columns: repeat(auto-fill, var(--wh));
    gap: 0.5rem;

    color: #333;
  }

  .pagelink {
    --bg: #ccc;
    --color: inherit;

    transition: background 0.25s, color 0.25s;

    display: flex;
    align-items: center;
    justify-content: center;

    position: relative;
    width: var(--wh);
    height: var(--wh);
    color: var(--color);

    &:hover,
    &.active {
      --bg: #444;
      --color: #ccc;
    }

    &::before {
      content: "";
      position: absolute;
      display: block;
      inset: 0;
      border-radius: var(--wh);
      background: var(--bg);
    }

    & span {
      position: relative;
    }
  }
</style>
