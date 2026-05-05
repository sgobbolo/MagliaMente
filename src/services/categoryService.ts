import { STATIC_CATEGORIES } from '../data/staticData';

export interface Category {
  id?: string;
  name: string;
  slug: string;
}

const STORAGE_KEY = 'magliamente_categories';

const getStoredCategories = (): Category[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      return STATIC_CATEGORIES;
    }
  }
  return STATIC_CATEGORIES;
};

const saveCategories = async (categories: Category[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
  try {
    const works = JSON.parse(localStorage.getItem('magliamente_works') || '[]');
    await fetch('/api/save-data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ works, categories })
    });
  } catch (e) {
    console.error("Failed to sync categories to file", e);
  }
};

export const categoryService = {
  async getAllCategories(): Promise<Category[]> {
    return getStoredCategories().sort((a, b) => a.name.localeCompare(b.name));
  },

  async addCategory(category: Omit<Category, 'id'>) {
    const cats = getStoredCategories();
    const newCat = { ...category, id: Math.random().toString(36).substr(2, 9) };
    const updated = [...cats, newCat];
    await saveCategories(updated);
    return newCat;
  },

  async deleteCategory(id: string) {
    const cats = getStoredCategories();
    const updated = cats.filter(c => c.id !== id);
    await saveCategories(updated);
  }
};
