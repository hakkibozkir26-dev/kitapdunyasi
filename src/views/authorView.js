/**
 * authorView.js - Yazar detay sayfası.
 */
import { el } from '../utils/dom.js';
import { getAuthor, getBooksByAuthor } from '../models/authorModel.js';
import { renderBookCard } from './components.js';
import { isFav } from '../models/favModel.js';

export const renderAuthor = (id) => {
    const author = getAuthor(id);
    const books = getBooksByAuthor(id);

    return el('div', {}, [
        el('div', { style: { display: 'flex', gap: '2rem', alignItems: 'center', marginBottom: '2rem' } }, [
            el('img', { src: author.image, style: { width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover' }, referrerPolicy: 'no-referrer' }),
            el('div', {}, [
                el('h1', {}, [author.name]),
                el('p', { style: { color: 'var(--text-muted)' } }, [author.bio_long])
            ])
        ]),
        el('h2', { style: { marginBottom: '1rem' } }, ['Yazarın Kitapları']),
        el('div', { className: 'book-grid' }, books.map(book => renderBookCard(
            { ...book, author },
            isFav(book.id),
            window.controllers.fav.handleToggle,
            window.controllers.cart.handleAddToCart
        )))
    ]);
};
