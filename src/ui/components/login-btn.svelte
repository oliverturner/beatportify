<script>
  export let href = "";
  let clicked = false;

  function remove(event) {
    clicked = true;
  }
</script>

<a class="loginbtn" class:faded={clicked} {href} on:click={remove}>
  <svg class="icon" aria-hidden="true">
    <use xlink:href="#icon-spotify" />
  </svg>
  <p class="cta">Click to sign in to Spotify</p>
</a>

<style lang="scss">
  .loginbtn {
    --wh: 80px;

    transition: opacity 0.5s;

    display: grid;
    justify-items: center;
    gap: 1rem;

    width: var(--wh);

    &.faded {
      opacity: 0;
    }
  }

  .icon {
    width: var(--wh);
    height: var(--wh);
  }

  .cta {
    text-align: center;
  }
</style>
