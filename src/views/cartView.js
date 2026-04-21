/**
 * cartView.js - Sepet sayfası.
 */
import { el } from '../utils/dom.js';
import { getCart } from '../models/cartModel.js';
import { formatPrice } from '../utils/format.js';

export const renderCart = () => {
    const cart = getCart();
    const total = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);

    if (cart.length === 0) {
        return el('div', { style: { textAlign: 'center', padding: '4rem 0' } }, [
            el('div', { style: { fontSize: '4rem', marginBottom: '1rem' } }, ['🛒']),
            el('h2', {}, ['Sepetiniz boş']),
            el('button', { 
                className: 'btn btn-primary', 
                style: { marginTop: '1rem' },
                onclick: () => window.router.navigate('/')
            }, ['Alışverişe Başla'])
        ]);
    }

    return el('div', { className: 'cart-container' }, [
        el('h1', { style: { marginBottom: '2rem' } }, ['Sepetim']),
        el('div', { style: { display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem' } }, [
            el('div', { className: 'cart-items' }, cart.map(item => el('div', {
                className: 'book-card',
                style: { display: 'flex', flexDirection: 'row', gap: '1rem', marginBottom: '1rem', height: 'auto' }
            }, [
                el('div', { className: 'book-image', style: { width: '80px', height: '120px', flexShrink: 0, fontSize: '2rem' } }, [item.emoji]),
                el('div', { style: { flex: 1 } }, [
                    el('h3', {}, [item.title]),
                    el('p', { style: { color: 'var(--primary-dark)', fontWeight: 'bold' } }, [formatPrice(item.price)]),
                    el('div', { style: { marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' } }, [
                        el('div', { style: { display: 'flex', alignItems: 'center', border: '1px solid var(--border)', borderRadius: '4px' } }, [
                            el('button', { style: { padding: '5px 10px' }, onclick: () => window.controllers.cart.handleUpdateQty(item.id, item.qty - 1) }, ['-']),
                            el('span', { style: { padding: '0 10px', minWidth: '30px', textAlign: 'center' } }, [item.qty]),
                            el('button', { style: { padding: '5px 10px' }, onclick: () => window.controllers.cart.handleUpdateQty(item.id, item.qty + 1) }, ['+']),
                        ]),
                        el('button', { 
                            style: { color: 'red', fontSize: '0.8rem' },
                            onclick: () => window.controllers.cart.handleRemove(item.id)
                        }, ['Sil'])
                    ])
                ])
            ]))),
            el('div', { className: 'cart-summary' }, [
                el('div', { style: { background: 'var(--bg-white)', padding: '1.5rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)' } }, [
                    el('h2', { style: { fontSize: '1.2rem', marginBottom: '1rem' } }, ['Sipariş Özeti']),
                    el('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' } }, [
                        el('span', {}, ['Ara Toplam']),
                        el('span', {}, [formatPrice(total)])
                    ]),
                    el('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' } }, [
                        el('span', {}, ['Kargo']),
                        el('span', { style: { color: 'green' } }, ['Ücretsiz'])
                    ]),
                    el('hr', { style: { margin: '1rem 0', border: 'none', borderBottom: '1px solid var(--border)' } }),
                    el('div', { style: { display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '1.5rem' } }, [
                        el('span', {}, ['Toplam']),
                        el('span', {}, [formatPrice(total)])
                    ]),
                    el('button', { 
                        className: 'btn btn-primary', 
                        style: { width: '100%', justifyContent: 'center' },
                        onclick: () => window.controllers.cart.handleCheckout()
                    }, ['Alışverişi Tamamla'])
                ])
            ])
        ])
    ]);
};
