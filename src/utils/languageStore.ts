import { create } from 'zustand';

type LanguageState = {
  language: 'ES' | 'EN';
  setLanguage: (lang: 'ES' | 'EN') => void;
};

export const useLanguageStore = create<LanguageState>((set) => ({
  language: 'ES',
  setLanguage: (lang: 'ES' | 'EN') => set({ language: lang }),
}));
