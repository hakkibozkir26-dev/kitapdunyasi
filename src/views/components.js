/**
 * components.js - Reusable UI components.
 */
import { el } from '../utils/dom.js';
import { formatPrice } from '../utils/format.js';

export const renderBookCard = (book, isFavorite = false, onToggleFav, onAddToCart) => {
    const catClass = `category-${book.category.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`;
    
    return el('div', { 
        className: 'book-card',
        onclick: (e) => {
            if (e.target.closest('.fav-btn') || e.target.closest('.add-btn')) return;
            window.router.navigate(`/book/${book.id}`);
        }
    }, [
        el('button', { 
            className: `fav-btn ${isFavorite ? 'active' : ''}`,
            onclick: (e) => onToggleFav(e, book.id)
        }, ['❤']),
        el('span', { className: `category-badge cat-${book.category}` }, [book.category]),
        el('div', { className: 'book-emoji' }, [book.emoji]),
        el('div', { className: 'book-info' }, [
            el('div', { className: 'book-title' }, [book.title]),
            el('div', { className: 'book-author' }, [book.author ? book.author.name : '']),
            el('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } }, [
                 el('div', { className: 'book-price' }, [formatPrice(book.price)]),
                 el('button', { 
                    className: 'btn add-btn',
                    style: { padding: '4px 8px', fontSize: '0.7rem', background: 'var(--bg-light)', color: 'var(--primary-dark)', border: '1px solid var(--primary)' },
                    onclick: (e) => onAddToCart(e, book)
                }, ['+ Sepet'])
            ])
        ])
    ]);
};

export const renderToast = (message) => {
    const container = document.getElementById('toast-container');
    const toast = el('div', { className: 'toast' }, [message]);
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
};

export const renderModal = (title, content, onConfirm, onCancel) => {
    const overlay = el('div', { className: 'modal-overlay' }, [
        el('div', { className: 'modal-content' }, [
            el('h2', { style: { marginBottom: '1rem' } }, [title]),
            el('div', { style: { marginBottom: '2rem' } }, [content]),
            el('div', { style: { display: 'flex', gap: '1rem', justifyContent: 'flex-end' } }, [
                el('button', { 
                    className: 'btn', 
                    style: { background: '#eee' },
                    onclick: () => { overlay.remove(); if(onCancel) onCancel(); }
                }, ['İptal']),
                el('button', { 
                    className: 'btn btn-primary',
                    onclick: () => { overlay.remove(); onConfirm(); }
                }, ['Onayla'])
            ])
        ])
    ]);
    document.body.appendChild(overlay);
};
