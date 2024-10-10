import { writable, get, derived } from 'svelte/store';
import type { Category, Excuse } from '../entities/excuse';
import { excusesMock } from '../entities/excuse';

const loadExcuses = (): Promise<Excuse[]> => {
  return new Promise((resolve) => {
    const stored = localStorage.getItem('excuses');
    if (stored) {
      resolve(JSON.parse(stored));
    } else {
      localStorage.setItem('excuses', JSON.stringify(excusesMock));
      resolve(excusesMock);
    }
  });
};

export const excusesStore = (() => {
  const store = writable<Excuse[]>([]);

  loadExcuses().then((excuses) => {
    store.set(excuses);
  });

  return store;
})();

const saveExcuses = async (excuses: Excuse[]) => {
  return new Promise<void>((resolve) => {
    localStorage.setItem('excuses', JSON.stringify(excuses));
    resolve();
  });
};

export const addExcuse = async (excuse: Excuse) => {
  const currentExcuses = get(await excusesStore);
  const updatedExcuses = [...currentExcuses, excuse];
  await saveExcuses(updatedExcuses);
  (await excusesStore).set(updatedExcuses);
};

export const updateExcuse = async (updatedExcuse: Excuse) => {
  const currentExcuses = get(await excusesStore);
  const newExcuses = currentExcuses.map((excuse) =>
    excuse.id === updatedExcuse.id ? updatedExcuse : excuse
  );
  await saveExcuses(newExcuses);
  (await excusesStore).set(newExcuses);
};

export const deleteExcuse = async (id: string) => {
  const currentExcuses = get(await excusesStore);
  const newExcuses = currentExcuses.filter((excuse) => excuse.id !== id);
  await saveExcuses(newExcuses);
  (await excusesStore).set(newExcuses);
};
