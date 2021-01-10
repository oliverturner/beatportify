<script>
  import { Link, Route } from "svelte-routing";

  import Nav from "./panels/nav.svelte";
  import Sidebar from "./panels/sidebar.svelte";
  import Top from "./routes/top.svelte";
  import Artist from "./routes/artist.svelte";
  import Track from "./routes/track.svelte";
  import Playlist from "./routes/playlist.svelte";

  export let user;
</script>

<style>
  .app__main {
    grid-template-columns: 250px 1fr;
  }

  .app__main__content {
    overflow: hidden;
    padding: 1em 0;
  }
</style>

<Nav {user}>
  <Link to="/">Top Tracks</Link>
</Nav>
<main class="app__main">
  <Sidebar />
  <div class="app__main__content">
    <Route path="/artist/:id" let:params>
      <Artist id={params.id} />
    </Route>
    <Route path="/track/:id" let:params>
      <Track id={params.id} />
    </Route>
    <Route path="/playlist/:id" let:params>
      <Playlist id={params.id} />
    </Route>
    <Route component={Top} />
  </div>
</main>
