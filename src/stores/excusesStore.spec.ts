import { get } from 'svelte/store';
import {
  excusesStore,
  addExcuse,
  updateExcuse,
  deleteExcuse,
} from './excusesStore';
import { Category, excusesMock } from '../entities/excuse';

const newExcuse = {
  id: '1',
  text: 'I was late',
  category: Category.WORK,
  successRate: 3 as 1 | 2 | 3 | 4 | 5,
  createdAt: new Date(),
};

describe('Excuses Store', () => {
  beforeEach(() => {
    localStorage.clear();
    excusesStore.set(excusesMock); // Ensure the store starts fresh
  });

  it('loads excuses from localStorage or mock data', async () => {
    const excuses = get(excusesStore);
    expect(excuses.length).toBe(excusesMock.length);
  });

  it('adds an excuse', async () => {
    await addExcuse(newExcuse);
    const excuses = get(excusesStore);
    expect(excuses).toContainEqual(newExcuse);
  });

  it('updates an excuse', async () => {
    await addExcuse(newExcuse);
    const updatedExcuse = { ...newExcuse, text: 'I am late for 5 min' };
    await updateExcuse(updatedExcuse);

    const excuses = get(excusesStore);
    expect(excuses).toContainEqual(updatedExcuse);
  });
  it('deletes an excuse', async () => {
    await addExcuse(newExcuse);
    const excusesBeforeDelete = get(excusesStore);
    expect(excusesBeforeDelete).toContainEqual(newExcuse);

    await deleteExcuse(newExcuse.id);
    const excusesAfterDelete = get(excusesStore);
    expect(excusesAfterDelete).not.toContainEqual(newExcuse);
  });
});
