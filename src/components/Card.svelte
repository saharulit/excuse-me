<script lang="ts">
  import type { Excuse } from "../entities/excuse";

  export let excuse:Excuse
  export let onEdit: (id: string) => void;
  export let onDelete: (id: string) => void;
</script>

<div class="bg-white shadow-md rounded-lg p-4 mb-4">
  <h2 class="text-xl font-semibold text-gray-800">{excuse.text}</h2>
  <p class="text-gray-600">Category: {excuse.category}</p>
  <p class="text-gray-500">Success Rate: {excuse.successRate}/5</p>
  <div class="mt-4">
    <button
      on:click={() => onEdit(excuse.id)}
      class="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
    >
      Edit
    </button>
    <button
      on:click={() => onDelete(excuse.id)}
      class="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 ml-2"
    >
      Delete
    </button>
  </div>
</div>