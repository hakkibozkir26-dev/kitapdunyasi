/**
 * authorsListView.js - Tüm yazarlar listesi.
 */
import { el } from '../utils/dom.js';
import { getAuthors } from '../models/authorModel.js';

export const renderAuthorsList = () => {
    const authors = getAuthors();
    return el('div', {}, [
        el('h1', { style: { marginBottom: '2rem' } }, ['Yazarlarimiz']),
        el('div', { 
            style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1.5rem' } 
        }, authors.map(a => el('div', {
            className: 'book-card',
            style: { textAlign: 'center', cursor: 'pointer' },
            onclick: () => window.router.navigate(`/author/${a.id}`)
        }, [
            el('img', { src: a.image, style: { width: '100px', height: '100px', borderRadius: '50%', margin: '0 auto 1rem' }, referrerPolicy: 'no-referrer' }),
            el('h3', {}, [a.name]),
            el('p', { style: { fontSize: '0.8rem', color: '#888' } }, [a.bio])
        ])))
    ]);
};
