/**
 * publisherView.js - Yayınevi sayfası.
 */
import { el } from '../utils/dom.js';
import { getPublisher, getBooksByPublisher } from '../models/publisherModel.js';
import { getAuthor } from '../models/authorModel.js';
import { renderBookCard } from './components.js';
import { isFav } from '../models/favModel.js';

export const renderPublisher = (id) => {
    const publisher = getPublisher(id);
    const books = getBooksByPublisher(id);

    return el('div', {}, [
        el('h1', { style: { marginBottom: '1.5rem' } }, [publisher.name]),
        el('p', { style: { marginBottom: '2rem', color: '#666' } }, [`Bu yayınevine ait ${books.length} kitap listeleniyor.`]),
        el('div', { className: 'book-grid' }, books.map(book => {
            const author = getAuthor(book.authorId);
            return renderBookCard(
                { ...book, author },
                isFav(book.id),
                window.controllers.fav.handleToggle,
                window.controllers.cart.handleAddToCart
            );
        }))
    ]);
};
