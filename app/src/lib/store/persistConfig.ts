import { RootState } from "./store";

const PERSIST_KEY = 'rg_store';

const isLocalStorageAvailable = () => {
  try {
    return typeof window !== 'undefined' && window.localStorage;
  } catch (e) {
    return false;
  }
};

export const loadState = (): Partial<RootState> | undefined => {
  if (!isLocalStorageAvailable()) {
    return undefined;
  }

  try {
    const serializedState = localStorage.getItem(PERSIST_KEY);
    if (serializedState === null) {
      return undefined;
    }
    const parsedState = JSON.parse(serializedState);
     // console.log('loadState: loaded from localStorage:', parsedState);
    
    // Возвращаем только аудио состояние, локаль не загружаем из localStorage
    return {
      audio: parsedState.audio,
      // locale: parsedState.locale, // Не загружаем локаль из localStorage
    };
  } catch (err) {
    console.error('Error loading state from localStorage:', err);
    return undefined;
  }
};

export const saveState = (state: Partial<RootState>) => {
  if (!isLocalStorageAvailable()) {
    return;
  }

  try {
     // console.log('saveState: saving to localStorage:', state);
    const serializedState = JSON.stringify(state);
    localStorage.setItem(PERSIST_KEY, serializedState);
  } catch (err) {
    console.error('Error saving state to localStorage:', err);
  }
}; 