/**
 * format.js - Para birimi ve tarih formatlama.
 * SRP: Sadece veri biçimlendirme.
 */

export const formatPrice = (amount) => {
    return new Intl.NumberFormat('tr-TR', {
        style: 'currency',
        currency: 'TRY',
        minimumFractionDigits: 2
    }).format(amount);
};

export const formatDate = (yyyymmdd) => {
    if (!yyyymmdd || String(yyyymmdd).length !== 8) return yyyymmdd;
    const str = String(yyyymmdd);
    const y = str.substring(0, 4);
    const m = str.substring(4, 6);
    const d = str.substring(6, 8);
    return `${d}.${m}.${y}`;
};
