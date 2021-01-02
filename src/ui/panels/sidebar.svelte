<script>
  import { path, query, hash } from "svelte-micro";
</script>

<style>
  .sidebar {
    padding: 1rem;
  }
</style>

<div class="sidebar">
  <ul>
    <li>Current path is {$path}</li>
    <li>Current query is {$query}</li>
    <li>Current hash is {$hash}</li>
  </ul>
</div>
