<script lang="ts">
  import { Route } from "svelte-routing";

  import Nav from "./panels/nav.svelte";
  import Sidebar from "./panels/sidebar.svelte";
  import Top from "./routes/top.svelte";
  import Artist from "./routes/artist.svelte";
  import Track from "./routes/track.svelte";
  import Playlist from "./routes/playlist.svelte";

  export let user;
</script>

<Nav {user} />
<main class="app__main">
  <Sidebar />

  <Route path="/artist/:id" component={Artist} />
  <Route path="/track/:id" component={Track} />
  <Route path="/playlist/:id" component={Playlist} />
  <Route component={Top} />
</main>

<style>
  .app__main {
    grid-template-columns: 250px 1fr;
  }
</style>
