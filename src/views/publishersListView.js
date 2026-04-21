/**
 * publishersListView.js - Tüm yayınevleri listesi.
 */
import { el } from '../utils/dom.js';
import { getPublishers } from '../models/publisherModel.js';

export const renderPublishersList = () => {
    const publishers = getPublishers();
    return el('div', {}, [
        el('h1', { style: { marginBottom: '2rem' } }, ['Yayınevleri']),
        el('div', { 
            style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' } 
        }, publishers.map(p => el('div', {
            className: 'book-card',
            style: { padding: '2rem', textAlign: 'center', cursor: 'pointer' },
            onclick: () => window.router.navigate(`/publisher/${p.id}`)
        }, [
            el('h3', { style: { fontSize: '1.2rem' } }, [p.name])
        ])))
    ]);
};
