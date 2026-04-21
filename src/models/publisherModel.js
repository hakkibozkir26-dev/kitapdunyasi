/**
 * publisherModel.js - Yayınevi verisi işleme.
 */
import { sap_data } from './data.js';
import { getBaseData, saveData } from './crudModel.js';
import { generateId } from '../utils/idGenerator.js';

const KEY = 'kd_publishers';

export const getPublishers = () => getBaseData(KEY, sap_data.publishers);
export const getPublisher = (id) => getPublishers().find(p => p.id === id);

export const createPublisher = (data) => {
    const publishers = getPublishers();
    const newId = generateId(publishers, 'YY');
    const newPublisher = { ...data, id: newId };
    saveData(KEY, [...publishers, newPublisher]);
    return newPublisher;
};

export const updatePublisher = (id, data) => {
    const publishers = getPublishers();
    const index = publishers.findIndex(p => p.id === id);
    if (index === -1) return null;
    const updated = [...publishers];
    updated[index] = { ...data, id };
    saveData(KEY, updated);
    return updated[index];
};

export const canDeletePublisher = (id) => {
    const books = getBaseData('kd_books', sap_data.books);
    return books.filter(b => b.publisherId === id).length === 0;
};

export const deletePublisher = (id) => {
    const publishers = getPublishers().filter(p => p.id !== id);
    saveData(KEY, publishers);
};

export const getBooksByPublisher = (publisherId) => getBaseData('kd_books', sap_data.books).filter(b => b.publisherId === publisherId);
