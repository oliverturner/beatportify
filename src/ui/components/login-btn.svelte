<script>
  export let href = "";
  let fadeout = false;

  function remove(event) {
    fadeout = true;
  }
</script>

<a class="loginbtn" class:fadein={href.length} class:fadeout {href} on:click={remove}>
  <svg class="icon icon--spotify" aria-hidden="true">
    <use xlink:href="#icon-spotify" />
  </svg>
  <svg class="icon icon--arrow" aria-hidden="true">
    <use xlink:href="#icon-arrow-up" />
  </svg>
  <p class="cta title">Click to sign in</p>
</a>

<style lang="scss">
  .loginbtn {
    --wh: 140px;

    transition: opacity 0.5s;
    opacity: 0;

    display: grid;
    justify-items: center;
    gap: 1rem;

    width: var(--wh);

    &.fadein {
      transition-delay: 1s;
      opacity: 1;
    }

    &.fadeout {
      opacity: 0;
    }
  }

  .icon--spotify {
    width: var(--wh);
    height: var(--wh);
  }

  .icon--arrow {
    --wh: 32px;

    width: var(--wh);
    height: var(--wh);
  }

  .cta {
    text-align: center;
  }
</style>
