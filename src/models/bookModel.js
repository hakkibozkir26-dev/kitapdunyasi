/**
 * bookModel.js - Kitap verisi işleme.
 * SRP: Sadece kitap verisi sorguları.
 */
import { sap_data } from './data.js';
import { getBaseData, saveData } from './crudModel.js';
import { generateId } from '../utils/idGenerator.js';
import { safeGet } from '../utils/storage.js';

const KEY = 'kd_books';

export const getBooks = () => getBaseData(KEY, sap_data.books);

export const getBook = (id) => getBooks().find(b => b.id === id);

export const createBook = (bookData) => {
    const books = getBooks();
    const newId = generateId(books, 'KT');
    const newBook = { ...bookData, id: newId };
    saveData(KEY, [...books, newBook]);
    return newBook;
};

export const updateBook = (id, bookData) => {
    const books = getBooks();
    const index = books.findIndex(b => b.id === id);
    if (index === -1) return null;
    
    const updatedBooks = [...books];
    updatedBooks[index] = { ...bookData, id };
    saveData(KEY, updatedBooks);
    return updatedBooks[index];
};

export const deleteBook = (id) => {
    const books = getBooks().filter(b => b.id !== id);
    saveData(KEY, books);
    
    // Bağımlı verileri temizle
    const carts = safeGet('kd_cart', []);
    const favs = safeGet('kd_favs', []);
    const reviews = safeGet('kd_reviews', []);
    
    saveData('kd_cart', carts.filter(i => i.id !== id));
    saveData('kd_favs', favs.filter(i => i !== id));
    saveData('kd_reviews', reviews.filter(i => i.bookId !== id));
};

export const searchBooks = (query) => {
    const q = query.toLowerCase();
    const books = getBooks();
    const authors = getBaseData('kd_authors', sap_data.authors);
    
    return books.filter(b => {
        const author = authors.find(a => a.id === b.authorId);
        return b.title.toLowerCase().includes(q) || 
               (author && author.name.toLowerCase().includes(q));
    });
};

export const filterByCategory = (books, category) => {
    if (!category || category === 'Tümü') return books;
    return books.filter(b => b.category === category);
};

export const sortBooks = (books, sortBy) => {
    const sorted = [...books];
    switch (sortBy) {
        case 'expensive': return sorted.sort((a, b) => b.price - a.price);
        case 'cheap': return sorted.sort((a, b) => a.price - b.price);
        case 'new': return sorted.sort((a, b) => b.date.localeCompare(a.date));
        case 'az': return sorted.sort((a, b) => a.title.localeCompare(b.title, 'tr'));
        default: return sorted;
    }
};

export const getCategories = () => {
    const cats = getBooks().map(b => b.category);
    return ['Tümü', ...new Set(cats)];
};
