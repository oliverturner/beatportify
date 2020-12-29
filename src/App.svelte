<script>
  import { onMount } from "svelte";
  export let name;
  export let data = {
    message: "",
  };

  onMount(async () => {
    data = await (await fetch("/login")).json();

    console.log({ data });
  });
</script>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>

<main>
  <h1>Hello {name}!</h1>
  <h2>{data.message}</h2>
  {#if data.loginURL}
    <p><a href={data.loginURL}>Log in to Spotify</a></p>
    <form action="/logout" method="post"><button>log out</button></form>
  {/if}
</main>
