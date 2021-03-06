<script>
  export let href = "";
  let fadeout = false;

  function remove(event) {
    fadeout = true;
  }
</script>

<a class="loginbtn" {href} on:click={remove}>
  <svg class="icon icon--spotify" aria-hidden="true">
    <use xlink:href="#icon-spotify" />
  </svg>
  <svg class="icon icon--arrow" aria-hidden="true">
    <use xlink:href="#icon-arrow-up" />
  </svg>
  <p class="cta title">click!</p>
</a>

<style lang="scss">
  .loginbtn {
    --wh: 120px;

    display: grid;
    justify-items: center;
    gap: 0.5rem;

    width: var(--wh);
    margin: 1rem auto;
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
    letter-spacing: 2px;
  }
</style>
