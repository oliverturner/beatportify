<script>
  export let user;
</script>

<nav>
  {#if user}
    <form action="/logout" method="post"><button>log out</button></form>
  {/if}
</nav>
