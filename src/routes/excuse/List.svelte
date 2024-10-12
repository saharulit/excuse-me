<script lang="ts">
  import Card from '../../components/Card.svelte';
  import { navigate } from "svelte-routing";
  import { excusesStore, deleteExcuse } from '../../stores/excusesStore';
  import GroupButtons from '../../components/GroupButtons.svelte';
  import { Category } from '../../entities/excuse';

  let selectedCategory: Category | null = null
  $:filteredExcuses = selectedCategory ? $excusesStore.filter(excuse => excuse.category === selectedCategory) : $excusesStore

  const editExcuse = (id: string) => {
  navigate(`/excuses/edit/${id}`);
  };

  const onCreate = () => {
    navigate(`/excuses/create`);
  };

  const toggleCategory = (value: Category) => {
    if(selectedCategory === value){
      selectedCategory = null
    } else {
      selectedCategory = value
    }
  }
</script>

  <div class="container mx-auto p-4">
    <div class="flex flex-row justify-between items-center pb-4">
      <h1 class="text-3xl font-bold">Excuses List</h1>
      <button
      on:click={onCreate}
      class="bg-sky-500 text-white py-1 px-3 rounded hover:bg-sky-600 ml-2"
    >
      Create
    </button>
    </div>
    <div class="pb-4">
      <GroupButtons {toggleCategory} selected={selectedCategory}/>
    </div>
    {#if filteredExcuses.length > 0}
      <ul class="space-y-4">
        {#each filteredExcuses as excuse (excuse.id)}
          <li class="flex flex-col">
            <Card {excuse} onDelete={() => deleteExcuse(excuse.id)} onEdit={() => editExcuse(excuse.id)}/>
          </li>
        {/each}
      </ul>
    {:else}
      <p class="text-gray-500">No excuses found.</p>
    {/if}
  </div>

