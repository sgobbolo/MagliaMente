import { Work } from '../services/workService';
import { Category } from '../services/categoryService';

export const STATIC_CATEGORIES: Category[] = [
  { id: 'cat-1', name: 'Scialli & Sciarpe', slug: 'scialli-sciarpe' },
  { id: 'cat-2', name: 'Maglie & Cardigan', slug: 'maglie-cardigan' },
  { id: 'cat-3', name: 'Accessori', slug: 'accessori' },
  { id: 'cat-4', name: 'Lezioni', slug: 'lezioni' },
];

export const STATIC_WORKS: Work[] = [
  {
    id: 'work-1',
    title: 'Scialle di Seta Oltremare',
    description: 'Un elegante scialle lavorato a mano con pura seta italiana. Caratterizzato da motivi a pizzo complessi che evocano le onde del mare.',
    category: 'scialli-sciarpe',
    imageUrl: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&q=80&w=800',
    createdAt: { seconds: Date.now() / 1000 }
  },
  {
    id: 'work-2',
    title: 'Cardigan in Lana Merino Bianca',
    description: 'Caldo e soffice cardigan in lana merino bianca, perfetto per le serate autunnali. Lavorazione a nido d\'ape.',
    category: 'maglie-cardigan',
    imageUrl: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80&w=800',
    createdAt: { seconds: (Date.now() / 1000) - 86400 }
  },
  {
    id: 'work-3',
    title: 'Berretto "Montagna" in Cashmere',
    description: 'Berretto in cashmere grigio antracite con pon-pon. Massima morbidezza e protezione dal freddo intenso.',
    category: 'accessori',
    imageUrl: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&q=80&w=800',
    createdAt: { seconds: (Date.now() / 1000) - 172800 }
  },
  {
    id: 'work-4',
    title: 'Guanti Senza Dita "Elegance"',
    description: 'Guanti senza dita ideali per chi ama lavorare a maglia o usare il telefono mantenendo le mani al caldo.',
    category: 'accessori',
    imageUrl: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=800',
    createdAt: { seconds: (Date.now() / 1000) - 259200 }
  },
  {
    id: 'work-5',
    title: 'Maglione "Forest" Verde Bosco',
    description: 'Maglione robusto lavorato con lana vergine, ideale per passeggiate all\'aria aperta. Colore ispirato alle pinete.',
    category: 'maglie-cardigan',
    imageUrl: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=800',
    createdAt: { seconds: (Date.now() / 1000) - 345600 }
  },
  {
    id: 'work-6',
    title: 'Corso Base ai Ferri',
    description: 'Unisciti alle nostre lezioni per imparare i segreti della maglia partendo da zero.',
    category: 'lezioni',
    imageUrl: 'https://images.unsplash.com/photo-1550928431-ee0ec6db30d3?auto=format&fit=crop&q=80&w=800',
    createdAt: { seconds: (Date.now() / 1000) - 432000 }
  }
];
