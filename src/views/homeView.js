/**
 * homeView.js - Ana sayfa kitap listesi (Vibrant Palette version).
 */
import { el } from '../utils/dom.js';
import { getBooks, getCategories, sortBooks, filterByCategory, searchBooks } from '../models/bookModel.js';
import { getAuthor } from '../models/authorModel.js';
import { getStats } from '../models/orderModel.js';
import { isFav } from '../models/favModel.js';
import { renderBookCard } from './components.js';
import { formatPrice } from '../utils/format.js';

export const renderHome = ({ query = '', category = 'Tümü', sort = 'default' }) => {
    let books = query ? searchBooks(query) : getBooks();
    books = filterByCategory(books, category);
    books = sortBooks(books, sort);

    const stats = getStats();

    // Stats Row (Theme Specific)
    const statsRow = el('div', { className: 'stats-row', style: { marginBottom: '24px' } }, [
        { label: 'Toplam Kitap', value: `${stats.bookCount} Adet` },
        { label: 'Aktif Yazarlar', value: `${stats.authorCount} Kişi` },
        { label: 'Günün Cirosu', value: formatPrice(stats.ciro) },
        { label: 'Sipariş Durumu', value: `${stats.orderCount} Yeni` }
    ].map(s => el('div', { className: 'stat-card' }, [
        el('span', { className: 'label' }, [s.label]),
        el('span', { className: 'value' }, [s.value])
    ])));

    // Filter controls
    const controls = el('div', { 
        style: { display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap', alignItems: 'center' } 
    }, [
        el('div', { style: { flex: 1 } }, [
            el('h2', { style: { fontSize: '1.5rem', fontWeight: '800' } }, [query ? `"${query}" için sonuçlar` : '📚 Tüm Kitaplar']),
            el('small', { style: { color: 'var(--text-muted)' } }, [`${books.length} kitap bulundu`])
        ]),
        el('select', { 
            className: 'btn', 
            style: { border: '1px solid var(--border)', background: 'white' },
            onchange: (e) => {
                const params = new URLSearchParams(location.search);
                params.set('cat', e.target.value);
                window.router.navigate(`/?${params.toString()}`);
            }
        }, getCategories().map(cat => el('option', { value: cat, selected: cat === category }, [cat]))),
        el('select', { 
            className: 'btn',
            style: { border: '1px solid var(--border)', background: 'white' },
            onchange: (e) => {
                const params = new URLSearchParams(location.search);
                params.set('sort', e.target.value);
                window.router.navigate(`/?${params.toString()}`);
            }
        }, [
            el('option', { value: 'default', selected: sort === 'default' }, ['Sıralama']),
            el('option', { value: 'expensive', selected: sort === 'expensive' }, ['En Pahalı']),
            el('option', { value: 'cheap', selected: sort === 'cheap' }, ['En Ucuz']),
            el('option', { value: 'new', selected: sort === 'new' }, ['En Yeni']),
            el('option', { value: 'az', selected: sort === 'az' }, ['A-Z'])
        ])
    ]);

    const grid = el('div', { className: 'book-grid' }, books.map(book => {
        const author = getAuthor(book.authorId);
        return renderBookCard(
            { ...book, author },
            isFav(book.id),
            window.controllers.fav.handleToggle,
            window.controllers.cart.handleAddToCart
        );
    }));

    return el('div', {}, [statsRow, controls, grid]);
};
