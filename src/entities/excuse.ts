import { v4 as uuidv4 } from 'uuid';

export enum Category {
  WORK = 'Work',
  SOCIAL = 'Social',
  FAMILY = 'Family',
  OTHER = 'Other',
}

export interface Excuse {
  id: string;
  text: string;
  category: Category;
  successRate: 1 | 2 | 3 | 4 | 5;
  createdAt: Date;
}

export const excusesMock: Excuse[] = [
  {
    id: uuidv4(),
    text: 'My dog ate my project files.',
    category: Category.WORK,
    successRate: 2,
    createdAt: new Date(),
  },
  {
    id: uuidv4(),
    text: 'The traffic was crazy!',
    category: Category.SOCIAL,
    successRate: 4,
    createdAt: new Date(),
  },
  {
    id: uuidv4(),
    text: 'I accidentally overslept after my nap.',
    category: Category.FAMILY,
    successRate: 3,
    createdAt: new Date(),
  },
  {
    id: uuidv4(),
    text: "I couldn't find my left shoe.",
    category: Category.OTHER,
    successRate: 1,
    createdAt: new Date(),
  },
  {
    id: uuidv4(),
    text: 'My internet connection dropped right before the meeting.',
    category: Category.WORK,
    successRate: 4,
    createdAt: new Date(),
  },
];
