<script>
  export let user;

  const routes = [
    { label: "Home", path: "/" },
    { label: "Playlists", path: "/playlists" },
  ];
</script>

<style>
  .nav {
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 0.5rem;
  }

  .row {
    display: flex;
  }

  .nav__controls {
    gap: 1rem;
  }
</style>

<nav class="nav">
  <div class="row nav__controls">
    {#each routes as route}<a href={route.path}>{route.label}</a>{/each}
  </div>

  {#if user}
    <div class="nav__user">
      <form action="/logout" method="post"><button>log out</button></form>
    </div>
  {/if}
</nav>
