// Firebase is disabled in static mode.
// Mock exports to prevent import errors.

export const db = {} as any;
export const auth = {
  currentUser: null as any,
  onAuthStateChanged: () => () => {},
  signOut: async () => {},
} as any;

export const isFirebaseConfigured = false;
