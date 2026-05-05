import { STATIC_WORKS } from '../data/staticData';

export interface Work {
  id?: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  createdAt: any;
  updatedAt?: any;
}

const STORAGE_KEY = 'magliamente_works';

const getStoredWorks = (): Work[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      return STATIC_WORKS;
    }
  }
  return STATIC_WORKS;
};

const saveWorks = async (works: Work[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(works));
  try {
    const categories = JSON.parse(localStorage.getItem('magliamente_categories') || '[]');
    await fetch('/api/save-data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ works, categories })
    });
  } catch (e) {
    console.error("Failed to sync works to file", e);
  }
};

export const workService = {
  async getAllWorks(): Promise<Work[]> {
    const works = getStoredWorks();
    return works.sort((a, b) => {
      const dateA = a.createdAt?.seconds || 0;
      const dateB = b.createdAt?.seconds || 0;
      return dateB - dateA;
    });
  },

  async addWork(work: Omit<Work, 'id' | 'createdAt' | 'updatedAt'>) {
    const works = getStoredWorks();
    const newWork: Work = {
      ...work,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: { seconds: Date.now() / 1000 }
    };
    const updated = [newWork, ...works];
    await saveWorks(updated);
    return newWork;
  },

  async updateWork(id: string, work: Partial<Omit<Work, 'id' | 'createdAt'>>) {
    const works = getStoredWorks();
    const index = works.findIndex(w => w.id === id);
    if (index !== -1) {
      works[index] = { ...works[index], ...work, updatedAt: { seconds: Date.now() / 1000 } };
      await saveWorks(works);
      return works[index];
    }
  },

  async deleteWork(id: string) {
    const works = getStoredWorks();
    const updated = works.filter(w => w.id !== id);
    await saveWorks(updated);
  }
};
