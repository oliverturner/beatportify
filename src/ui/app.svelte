<script lang="ts">
  import { onMount } from "svelte";
  import { Router, Link, Route } from "svelte-routing";
  import { SvelteToast } from "@zerodevx/svelte-toast";

  import Nav from "./panels/nav.svelte";
  import AppContent from "./app-content.svelte";

  import type { LoginData } from "@typings/app";

  export let data: LoginData = {
    message: "",
  };

  let toastOpts = {
    intro: { y: 50 }
  };

  onMount(async () => {
    try {
      data = await (await fetch("/login")).json();
      console.log({ "app.onMount": data });
    } catch (err) {
      console.log({ "app.onMount:err:": err });
    }
  });

  let url = "";
</script>

<Router {url}>
  <div class="app">
    <Nav user={data.user} />
    <main class="app__main" class:active={data.user}>
      {#if data.user}
        <AppContent />
      {:else}
        <p><a href={data.loginURL}>Log in to Spotify</a></p>
      {/if}
    </main>
  </div>
</Router>
<SvelteToast options={toastOpts} />

<style lang="scss">
  .app__main {
    place-content: center;

    &.active {
      place-content: initial;
      grid-template-columns: 250px 1fr;
    }
  }
</style>
