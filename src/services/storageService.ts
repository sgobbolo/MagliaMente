
import { Work } from './workService';
import { Category } from './categoryService';

const WORKS_KEY = 'magliamente_works';
const CATEGORIES_KEY = 'magliamente_categories';
const AUTH_KEY = 'magliamente_auth';

const initialCategories: Category[] = [
  { id: '1', name: 'Ferri', slug: 'ferri' },
  { id: '2', name: 'Uncinetto', slug: 'uncinetto' },
  { id: '3', name: 'Cucito', slug: 'cucito' },
  { id: '4', name: 'Macramè', slug: 'macrame' }
];

const initialWorks: Work[] = [
  {
    id: 'w1',
    title: 'Sciarpa Intreccio d\'Autunno',
    description: 'Una morbida sciarpa realizzata a mano con ferri circolari in pura lana mohair color ocra.',
    category: 'ferri',
    imageUrl: 'https://images.unsplash.com/photo-1520903074185-8eca362b3dce?q=80&w=600&auto=format&fit=crop',
    createdAt: { seconds: Math.floor(Date.now() / 1000) }
  },
  {
    id: 'w2',
    title: 'Runner in Macramè',
    description: 'Centrotavola realizzato con tecnica macramè in cotone naturale non trattato.',
    category: 'macrame',
    imageUrl: 'https://images.unsplash.com/photo-1544411047-c4915839bd73?q=80&w=600&auto=format&fit=crop',
    createdAt: { seconds: Math.floor(Date.now() / 1000) - 86400 }
  },
  {
    id: 'w3',
    title: 'Amigurumi Orsetto',
    description: 'Piccolo orsetto realizzato all\'uncinetto con filato di cotone certificato per neonati.',
    category: 'uncinetto',
    imageUrl: 'https://images.unsplash.com/photo-1554492334-a256920f2622?q=80&w=600&auto=format&fit=crop',
    createdAt: { seconds: Math.floor(Date.now() / 1000) - 172800 }
  }
];

export const storageService = {
  getWorks(): Work[] {
    const data = localStorage.getItem(WORKS_KEY);
    if (!data) {
      this.saveWorks(initialWorks);
      return initialWorks;
    }
    return JSON.parse(data);
  },

  saveWorks(works: Work[]) {
    localStorage.setItem(WORKS_KEY, JSON.stringify(works));
  },

  getCategories(): Category[] {
    const data = localStorage.getItem(CATEGORIES_KEY);
    if (!data) {
      this.saveCategories(initialCategories);
      return initialCategories;
    }
    return JSON.parse(data);
  },

  saveCategories(categories: Category[]) {
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
  },

  isLoggedIn(): boolean {
    return localStorage.getItem(AUTH_KEY) === 'true';
  },

  login() {
    localStorage.setItem(AUTH_KEY, 'true');
  },

  logout() {
    localStorage.removeItem(AUTH_KEY);
  }
};
