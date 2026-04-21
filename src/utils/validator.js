/**
 * validator.js - Form doğrulama yardımcıları.
 */

export const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
};

export const validatePhone = (phone) => {
    // 05xx 000 0000 formatı veya 11 hane
    const digits = phone.replace(/\D/g, '');
    return digits.length === 11 && digits.startsWith('05');
};

export const getEmptyFields = (data, requiredFields) => {
    return requiredFields.filter(field => !data[field] || String(data[field]).trim() === '');
};
