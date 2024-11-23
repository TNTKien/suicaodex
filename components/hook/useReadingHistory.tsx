import { ReadingHistory } from "@/types";
import useLocalStorage from "./useLocalStorage";
import { useCallback } from "react";

export default function useReadingHistory() {
  const [history, setHistory] = useLocalStorage<Record<string, ReadingHistory>>(
    "suicaodex-history",
    {}
  );

  const addHistory = useCallback(
    (mangaId: string, manga: ReadingHistory) => {
      setHistory((value) => {
        const newHistory = { ...value, [mangaId]: manga };
        const mangaIds = Object.keys(newHistory);
        if (mangaIds.length > 20) {
          delete newHistory[mangaIds[0]];
        }
        return newHistory;
      });
    },
    [setHistory]
  );

  const removeHistory = (mangaId: string) => {
    setHistory((value) => {
      const newHistory = { ...value };
      delete newHistory[mangaId];
      return newHistory;
    });
  };

  return { history, setHistory, addHistory, removeHistory };
}
