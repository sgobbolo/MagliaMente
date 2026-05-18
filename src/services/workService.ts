import { storageService } from './storageService';

export interface Work {
  id?: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  createdAt: { seconds: number };
  updatedAt?: { seconds: number };
}

export const workService = {
  async getAllWorks(): Promise<Work[]> {
    return storageService.getWorks();
  },

  subscribeToWorks(callback: (works: Work[]) => void, onError?: (error: any) => void) {
    // Return interval that polls or just initial load
    const works = storageService.getWorks();
    callback(works);
    
    // Simple polling to simulate real-time if multiple tabs are used (though localStorage events are better)
    const handleStorage = () => {
      callback(storageService.getWorks());
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  },

  async addWork(work: Omit<Work, 'id' | 'createdAt' | 'updatedAt'>) {
    const works = storageService.getWorks();
    const newWork: Work = {
      ...work,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: { seconds: Math.floor(Date.now() / 1000) }
    };
    const updated = [newWork, ...works];
    storageService.saveWorks(updated);
    window.dispatchEvent(new Event('storage'));
    return newWork;
  },

  async updateWork(id: string, work: Partial<Omit<Work, 'id' | 'createdAt'>>) {
    const works = storageService.getWorks();
    const updated = works.map(w => w.id === id ? { 
      ...w, 
      ...work, 
      updatedAt: { seconds: Math.floor(Date.now() / 1000) } 
    } : w);
    storageService.saveWorks(updated);
    window.dispatchEvent(new Event('storage'));
  },

  async deleteWork(id: string) {
    const works = storageService.getWorks();
    const updated = works.filter(w => w.id !== id);
    storageService.saveWorks(updated);
    window.dispatchEvent(new Event('storage'));
  }
};
