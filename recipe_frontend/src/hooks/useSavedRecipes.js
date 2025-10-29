import { useCallback, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'recipeExplorer.saved.v1';

function readSaved() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeSaved(ids) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(new Set(ids))));
  } catch {
    // ignore write failures (e.g., in private mode)
  }
}

// PUBLIC_INTERFACE
export default function useSavedRecipes() {
  /**
   * useSavedRecipes persists saved recipe IDs to localStorage.
   * Exposes:
   * - savedIds: array<string>
   * - isSaved(id): boolean
   * - toggle(id): void
   */
  const [savedIds, setSavedIds] = useState(() => readSaved());

  useEffect(() => {
    // Sync with storage on mount in case another tab updated it
    setSavedIds(readSaved());
    const onStorage = (e) => {
      if (e.key === STORAGE_KEY) {
        setSavedIds(readSaved());
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  useEffect(() => {
    writeSaved(savedIds);
  }, [savedIds]);

  const isSaved = useCallback((id) => savedIds.includes(String(id)), [savedIds]);

  const toggle = useCallback((id) => {
    const key = String(id);
    setSavedIds((prev) =>
      prev.includes(key) ? prev.filter((x) => x !== key) : [...prev, key]
    );
  }, []);

  return useMemo(() => ({ savedIds, isSaved, toggle }), [savedIds, isSaved, toggle]);
}
