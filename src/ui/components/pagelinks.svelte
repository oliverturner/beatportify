<script lang="ts">
  import type { PagingObject } from "@typings/spotify";

  export let makeLink = (_offset: number) => "";
  export let loadPage = (_offset: number) => {};
  export let page: PagingObject<unknown>;

  $: pageNum = Math.ceil(page.total / page.limit);
  $: pageCurrent = Math.floor(page.offset / page.limit);
  $: pageLinks = Array.from({ length: pageNum }, (_, index) => index).map(makeLink);
</script>

<div class="pagelinks">
  {#each pageLinks as href, index}
    <a
      class="pagelink"
      class:active={index === pageCurrent}
      {href}
      on:click|preventDefault|stopPropagation={() => loadPage(index)}>
      <span>{index + 1}</span>
    </a>
  {/each}
</div>

<style lang="scss">
  .pagelinks {
    --wh: var(--s6);

    display: grid;
    grid-template-columns: repeat(auto-fill, var(--wh));
    gap: 0.5rem;

    color: #333;
  }

  .pagelink {
    --bg: #ccc;
    --color: inherit;

    transition: color 0.25s;

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
      transition: background 0.25s;

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
