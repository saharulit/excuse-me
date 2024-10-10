<script lang="ts">
  import Form from "./Form.svelte";
  import { excusesStore } from "../../stores/excusesStore";

  export let id: string | undefined
  $: excuse = $excusesStore.find(item => item.id === id)
</script>


<div class="container mx-auto p-4">
  <h1 class="text-3xl font-bold mb-6">{id ? 'Edit Excuse' : "Create New Excuse"}</h1>
  <Form {excuse}/>
</div> 