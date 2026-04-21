/**
 * storage.js - LocalStorage güvenli erişim katmanı.
 * SRP: Sadece kalıcı depolama işlemleri.
 */

export const safeGet = (key, defaultValue = null) => {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (e) {
        console.error(`Error reading from localStorage: ${key}`, e);
        return defaultValue;
    }
};

export const safeSet = (key, value) => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
        console.error(`Error saving to localStorage: ${key}`, e);
    }
};
