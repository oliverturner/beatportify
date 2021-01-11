<script>
  import { onMount } from "svelte";

  export let id;

  onMount(async () => {
    try {
      // TODO: load track date from store but request analysis from embedded URL
      const data = await (await fetch(`/api/tracks/${id}`)).json();

      console.log({ data });
    } catch (error) {
      console.log({ error });
    }
  });
</script>

<p>Current query is {id}</p>
