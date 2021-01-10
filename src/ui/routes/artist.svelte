<script>
  import { onMount } from "svelte";
  
  export let id;

  onMount(async () => {
    try {
      const data = await (await fetch("/api/artists/" + id)).json();

      console.log({ data });
    } catch (error) {
      console.log({ error });
    }
  });
</script>

<p>Current query is {id}</p>
