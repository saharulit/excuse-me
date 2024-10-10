<script lang="ts">
  import { Router, Route, Link } from "svelte-routing";
  import {Edit, List} from "./routes/excuse";
  
  // let basePath = '/excuses';
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

