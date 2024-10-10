<script lang="ts">
  import { Category } from "../entities/excuse";

  export let selected: Category;
  export let toggleCategory: (selected: Category) => void;

  const categories = Object.values(Category);

</script>

<div class="flex space-x-2">
  {#each categories as category}
    <button 
      on:click={() => toggleCategory(category)}
      class="px-4 py-2 rounded  {selected === category ? 'bg-blue-500 text-white ' : 'text-blue-500 bg-white border'}">
      {category}
    </button>
  {/each}
</div>

