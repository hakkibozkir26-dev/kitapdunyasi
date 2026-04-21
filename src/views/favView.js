/**
 * favView.js - Favoriler sayfası.
 */
import { el } from '../utils/dom.js';
import { getFavs } from '../models/favModel.js';
import { getBook } from '../models/bookModel.js';
import { getAuthor } from '../models/authorModel.js';
import { renderBookCard } from './components.js';

export const renderFavs = () => {
    const favIds = getFavs();
    const favBooks = favIds.map(id => {
        const book = getBook(id);
        const author = getAuthor(book.authorId);
        return { ...book, author };
    });

    return el('div', {}, [
        el('h1', { style: { marginBottom: '2rem' } }, ['Favorilerim']),
        favBooks.length === 0 ? el('p', {}, ['Henüz favori kitabınız yok.']) :
        el('div', { className: 'book-grid' }, favBooks.map(book => renderBookCard(
            book,
            true,
            window.controllers.fav.handleToggle,
            window.controllers.cart.handleAddToCart
        )))
    ]);
};
