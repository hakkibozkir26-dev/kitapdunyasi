/**
 * authorModel.js - Yazar verisi işleme.
 */
import { sap_data } from './data.js';
import { getBaseData, saveData } from './crudModel.js';
import { generateId } from '../utils/idGenerator.js';

const KEY = 'kd_authors';

export const getAuthors = () => getBaseData(KEY, sap_data.authors);
export const getAuthor = (id) => getAuthors().find(a => a.id === id);

export const createAuthor = (authorData) => {
    const authors = getAuthors();
    const newId = generateId(authors, 'YZ');
    const newAuthor = { ...authorData, id: newId };
    saveData(KEY, [...authors, newAuthor]);
    return newAuthor;
};

export const updateAuthor = (id, authorData) => {
    const authors = getAuthors();
    const index = authors.findIndex(a => a.id === id);
    if (index === -1) return null;
    const updated = [...authors];
    updated[index] = { ...authorData, id };
    saveData(KEY, updated);
    return updated[index];
};

export const canDeleteAuthor = (id) => {
    const books = getBaseData('kd_books', sap_data.books);
    return books.filter(b => b.authorId === id).length === 0;
};

export const deleteAuthor = (id) => {
    const authors = getAuthors().filter(a => a.id !== id);
    saveData(KEY, authors);
};

export const getBooksByAuthor = (authorId) => getBaseData('kd_books', sap_data.books).filter(b => b.authorId === authorId);
