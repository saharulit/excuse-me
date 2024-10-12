<script lang="ts">
  import { onMount } from 'svelte';
  import { Router, Route, navigate } from "svelte-routing";
  import { Edit, List } from "./routes/excuse";

  onMount(() => {
    navigate('/excuses', { replace: true });
  });
</script>

<Router basepath="excuses">
  <Route path="/">
    <List />
  </Route>
  <Route path="/create">
    <Edit />
  </Route>
  <Route path="/edit/:id" let:params>
    <Edit id={params.id} />
  </Route>
</Router>
