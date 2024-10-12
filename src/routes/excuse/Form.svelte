<script lang="ts">
  import { v4 as uuidv4 } from 'uuid';
  import { createForm } from 'felte';
  import { type Excuse, Category } from '../../entities/excuse';
  import { validator } from '@felte/validator-zod';
  import * as zod from 'zod';
  import { addExcuse, updateExcuse } from '../../stores/excusesStore';
  import { navigate } from 'svelte-routing';

  export let excuse: Excuse | null

  const schema = zod.object({
    text: zod.string().min(1, { message: "Text is required." }),
    category: zod.nativeEnum(Category),
    successRate: zod.enum(['1', '2', '3', '4', '5'], {
    required_error: "Success Rate is required."
  })
  });

  const { form, errors, isValid } = createForm({
    extend: validator({ schema }),
    onSubmit: async (values) => {
    try {
      if (excuse) {
        const updatedExcuse = { ...excuse, ...values } as unknown as Excuse;
        await updateExcuse(updatedExcuse);
      } else {
        const id = uuidv4();
        await addExcuse({ id, ...values } as unknown as Excuse);
      }
      navigate('/excuses');
    } catch (error) {
      console.error("An error occurred while submitting the form:", error);
    }
  }, 
    initialValues: {
      text: excuse?.text || '',
      category: excuse?.category || Category.OTHER,
      successRate: excuse?.successRate?.toString() || '1',
    }
  });
</script>
<form use:form class="space-y-4">
  <div>
    <label for="text" class="block">Excuse Text</label>
    <input
      id="text"
      name="text"
      type="text"
      class="border p-2 rounded w-full"
      placeholder="Enter your excuse..."
    />
    {#if errors.text}
      <p class="text-red-500">{errors.text}</p>
    {/if}
  </div>

  <div>
    <label for="category" class="block">Category</label>
    <select id="category" name="category" class="border p-2 rounded w-full">
      <option value={Category.WORK}>{Category.WORK}</option>
      <option value={Category.SOCIAL}>{Category.SOCIAL}</option>
      <option value={Category.FAMILY}>{Category.FAMILY}</option>
      <option value={Category.OTHER}>{Category.OTHER}</option>
    </select>
  </div>

  <div>
    <label for="successRate" class="block">Success Rate</label>
    <select id="successRate" name="successRate" class="border p-2 rounded w-full">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
    </select>
    {#if errors.successRate}
      <p class="text-red-500">{errors.successRate}</p>
    {/if}
  </div>

  <button 
  type="submit" 
  class={`py-2 px-4 rounded ${!$isValid ? 'bg-gray-400 text-gray-100 cursor-not-allowed' : 'bg-blue-500 text-white'}`} 
  disabled={!$isValid}>Submit</button>
</form>
