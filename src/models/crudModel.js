/**
 * crudModel.js - Ortak CRUD Model mantığı.
 */
import { safeGet, safeSet } from '../utils/storage.js';

export const getBaseData = (key, defaultData) => {
    const stored = safeGet(key);
    return stored || defaultData;
};

export const saveData = (key, data) => {
    safeSet(key, data);
};

export const resetToBaseline = (key) => {
    localStorage.removeItem(key);
};
