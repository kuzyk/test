import { trans } from "lib/trans";
import { useCallback, useState } from "react";

export const useLang = (): [ string, (lang: string) => void ] => {
    const [ lang, setLang ] = useState(() => trans.getLanguage());

    const handleLangChange = useCallback((lang) => {
        trans.setLanguage(lang);
        setLang(lang);
    }, []);

    return [ lang, handleLangChange ];
}