/**
 * bookDetailView.js - Kitap detay sayfası.
 */
import { el } from '../utils/dom.js';
import { getBook } from '../models/bookModel.js';
import { getAuthor } from '../models/authorModel.js';
import { getPublisher } from '../models/publisherModel.js';
import { getAvgRating, getReviewsByBook } from '../models/reviewModel.js';
import { getOrdersByBook } from '../models/orderModel.js';
import { isFav } from '../models/favModel.js';
import { formatPrice, formatDate } from '../utils/format.js';

export const renderBookDetail = (id) => {
    const book = getBook(id);
    if (!book) return el('div', {}, ['Kitap bulunamadı']);
    
    const author = getAuthor(book.authorId);
    const publisher = getPublisher(book.publisherId);
    const avgRating = getAvgRating(id);
    const reviews = getReviewsByBook(id);
    const orders = getOrdersByBook(id);

    return el('div', { className: 'book-detail' }, [
        el('div', { 
            className: 'book-detail-grid',
            style: { display: 'grid', gridTemplateColumns: '300px 1fr', gap: '2rem' }
        }, [
            el('div', { className: 'detail-left' }, [
                el('div', { className: 'book-image', style: { height: '400px' } }, [book.emoji]),
                el('button', { 
                    className: 'btn btn-primary', 
                    style: { width: '100%', marginTop: '1rem' },
                    onclick: (e) => window.controllers.cart.handleAddToCart(e, book)
                }, ['Sepete Ekle']),
                el('button', { 
                    className: 'btn', 
                    style: { width: '100%', marginTop: '0.5rem', border: '1px solid var(--border)' },
                    onclick: (e) => window.controllers.fav.handleToggle(e, book.id)
                }, [isFav(book.id) ? '❤ Favorilerden Çıkar' : '🤍 Favorilere Ekle'])
            ]),
            el('div', { className: 'detail-right' }, [
                el('h1', { style: { fontSize: '2rem', marginBottom: '0.5rem' } }, [book.title]),
                el('div', { style: { marginBottom: '1rem' } }, [
                    el('a', { 
                        href: `/author/${author.id}`,
                        style: { color: 'var(--primary-dark)', fontWeight: 'bold' },
                        onclick: (e) => { e.preventDefault(); window.router.navigate(`/author/${author.id}`); }
                    }, [author.name]),
                    ' | ',
                    el('span', {}, [`Yayınevi: ${publisher.name}`])
                ]),
                el('div', { className: 'stars', style: { marginBottom: '1rem' } }, [
                    '★'.repeat(Math.round(avgRating)) + '☆'.repeat(5 - Math.round(avgRating)),
                    ` (${reviews.length} yorum)`
                ]),
                el('p', { style: { fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--primary-dark)' } }, [formatPrice(book.price)]),
                el('hr', { style: { margin: '1.5rem 0', border: 'none', borderBottom: '1px solid var(--border)' } }),
                el('p', { style: { marginBottom: '1.5rem' } }, [book.desc]),
                el('div', { style: { display: 'flex', gap: '2rem', fontSize: '0.9rem' } }, [
                    el('div', {}, [el('b', {}, ['Sayfa: ']), book.pages]),
                    el('div', {}, [el('b', {}, ['Kategori: ']), book.category]),
                    el('div', {}, [el('b', {}, ['Stok: ']), book.stock])
                ])
            ])
        ]),
        
        // Kimler Aldı (SAP İlişkisi)
        el('div', { style: { marginTop: '3rem' } }, [
            el('h2', {}, ['Bu Kitabı Alanlar']),
            orders.length > 0 ? el('table', { 
                style: { width: '100%', marginTop: '1rem', borderCollapse: 'collapse', textAlign: 'left' } 
            }, [
                el('thead', {}, [
                    el('tr', { style: { background: '#fef3c7' } }, [
                        el('th', { style: { padding: '10px' } }, ['Müşteri']),
                        el('th', { style: { padding: '10px' } }, ['Tarih']),
                        el('th', { style: { padding: '10px' } }, ['Şehir'])
                    ])
                ]),
                el('tbody', {}, orders.map(o => {
                    const city = window.models.customer.resolveAddressChain(o.customer.addressId).details.city;
                    return el('tr', { style: { borderBottom: '1px solid var(--border)' } }, [
                        el('td', { style: { padding: '10px' } }, [o.customer.name]),
                        el('td', { style: { padding: '10px' } }, [formatDate(o.date)]),
                        el('td', { style: { padding: '10px' } }, [city.name])
                    ]);
                }))
            ]) : el('p', { style: { marginTop: '1rem', color: 'var(--text-muted)' } }, ['Henüz sipariş yok.'])
        ]),

        // Yorumlar
        el('div', { style: { marginTop: '3rem' } }, [
            el('h2', {}, ['Okur Yorumları']),
            el('div', { 
               style: { background: 'var(--bg-white)', padding: '1.5rem', borderRadius: 'var(--radius)', marginTop: '1rem' } 
            }, [
                el('h3', { style: { fontSize: '1rem', marginBottom: '1rem' } }, ['Yorum Yap']),
                el('form', {
                    onsubmit: (e) => {
                        e.preventDefault();
                        const rating = parseInt(e.target.rating.value);
                        const comment = e.target.comment.value;
                        window.controllers.review.handleAdd(id, rating, comment);
                    }
                }, [
                    el('select', { name: 'rating', className: 'btn', style: { display: 'block', marginBottom: '0.5rem', width: '100%', border: '1px solid var(--border)' } }, [
                        el('option', { value: '5' }, ['5 Yıldız']),
                        el('option', { value: '4' }, ['4 Yıldız']),
                        el('option', { value: '3' }, ['3 Yıldız']),
                        el('option', { value: '2' }, ['2 Yıldız']),
                        el('option', { value: '1' }, ['1 Yıldız'])
                    ]),
                    el('textarea', { name: 'comment', placeholder: 'Düşüncelerinizi paylaşın...', style: { width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border)', height: '80px', marginBottom: '0.5rem' } }),
                    el('button', { type: 'submit', className: 'btn btn-primary' }, ['Gönder'])
                ])
            ]),
            el('div', { style: { marginTop: '1.5rem' } }, reviews.map(r => el('div', {
                style: { padding: '1rem', borderBottom: '1px solid var(--border)' }
            }, [
                el('div', { style: { display: 'flex', justifyContent: 'space-between' } }, [
                    el('b', {}, [r.username]),
                    el('small', { style: { color: '#bbb' } }, [new Date(r.date).toLocaleDateString('tr')])
                ]),
                el('div', { style: { color: 'var(--primary)' } }, ['★'.repeat(r.rating)]),
                el('p', { style: { marginTop: '0.5rem' } }, [r.comment])
            ])))
        ])
    ]);
};
