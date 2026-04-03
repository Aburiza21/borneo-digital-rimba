import React, { createContext, useContext, useState, useEffect } from 'react';

type Lang = 'id' | 'en';

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string, translations: Record<Lang, any>) => any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('id');

  useEffect(() => {
    const savedLang = localStorage.getItem('app-lang') as Lang;
    if (savedLang) setLangState(savedLang);
  }, []);

  const setLang = (newLang: Lang) => {
    setLangState(newLang);
    localStorage.setItem('app-lang', newLang);
  };

  const t = (key: string, translations: Record<Lang, any>) => {
    return translations[lang] || translations['en'];
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
