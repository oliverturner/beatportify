<script>
  import { onMount } from "svelte";
  import { query } from "svelte-micro";

  onMount(async () => {
    try {
      const data = await (await fetch("/api/artist/" + $query)).json();

      console.log({ data });
    } catch (error) {
      console.log({ error });
    }
  });
</script>

<p>Current query is {$query}</p>
