import { storageService } from './storageService';

export interface Category {
  id?: string;
  name: string;
  slug: string;
}

export const categoryService = {
  async getAllCategories(): Promise<Category[]> {
    return storageService.getCategories();
  },

  subscribeToCategories(callback: (categories: Category[]) => void, onError?: (error: any) => void) {
    const categories = storageService.getCategories();
    callback(categories);
    
    const handleStorage = () => {
      callback(storageService.getCategories());
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  },

  async addCategory(category: Omit<Category, 'id'>) {
    const categories = storageService.getCategories();
    const newCategory: Category = {
      ...category,
      id: Math.random().toString(36).substr(2, 9)
    };
    const updated = [...categories, newCategory];
    storageService.saveCategories(updated);
    window.dispatchEvent(new Event('storage'));
    return newCategory;
  },

  async deleteCategory(id: string) {
    const categories = storageService.getCategories();
    const updated = categories.filter(c => c.id !== id);
    storageService.saveCategories(updated);
    window.dispatchEvent(new Event('storage'));
  }
};
