/**
 * idGenerator.js - Otomatik ID üretme.
 */

export const generateId = (items, prefix) => {
    if (!items || items.length === 0) return `${prefix}01`;
    
    // ID'ler içindeki rakamları bul (örn: KT20 -> 20)
    const ids = items.map(item => {
        const num = parseInt(item.id.replace(prefix, ''));
        return isNaN(num) ? 0 : num;
    });
    
    const maxId = Math.max(...ids);
    const nextId = maxId + 1;
    
    // 2 haneli format (01, 02... 10, 11...)
    return `${prefix}${nextId.toString().padStart(2, '0')}`;
};
