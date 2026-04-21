/**
 * dom.js - DOM manipülasyonu ve element oluşturma yardımcıları.
 * SRP: Sadece DOM operasyonları.
 */

/**
 * Yeni bir HTML elementi oluşturur.
 * @param {string} tag - HTML etiketi
 * @param {Object} props - Element özellikleri (className, id, textContent vb.)
 * @param {Array} children - Alt elementler
 * @returns {HTMLElement}
 */
export const el = (tag, props = {}, children = []) => {
    const element = document.createElement(tag);
    
    Object.entries(props).forEach(([key, value]) => {
        if (key === 'style' && typeof value === 'object') {
            Object.assign(element.style, value);
        } else if (key.startsWith('on') && typeof value === 'function') {
            element.addEventListener(key.toLowerCase().substring(2), value);
        } else if (key === 'dataset' && typeof value === 'object') {
            Object.assign(element.dataset, value);
        } else {
            element[key] = value;
        }
    });

    children.forEach(child => {
        if (typeof child === 'string' || typeof child === 'number') {
            element.appendChild(document.createTextNode(child));
        } else if (child instanceof HTMLElement) {
            element.appendChild(child);
        }
    });

    return element;
};

/**
 * Event listener bağlama yardımcısı.
 * @param {string} selector - CSS seçici
 * @param {string} event - Olay tipi
 * @param {Function} handler - Olay yakalayıcı
 */
export const on = (selector, event, handler) => {
    const elements = document.querySelectorAll(selector);
    elements.forEach(el => el.addEventListener(event, handler));
};
