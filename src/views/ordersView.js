/**
 * ordersView.js - Sipariş geçmişi.
 */
import { el } from '../utils/dom.js';
import { getOrders, getOrderItems } from '../models/orderModel.js';
import { getFullCustomer } from '../models/customerModel.js';
import { formatPrice, formatDate } from '../utils/format.js';

export const renderOrders = () => {
    const orders = getOrders();
    const statusMap = { 'H': 'Hazırlanıyor', 'K': 'Kargoda', 'T': 'Teslim Edildi' };

    return el('div', {}, [
        el('h1', { style: { marginBottom: '2rem' } }, ['Sipariş Geçmişi']),
        el('div', { style: { display: 'flex', flexDirection: 'column', gap: '1rem' } }, orders.map(o => {
            const customer = getFullCustomer(o.customerId);
            const items = getOrderItems(o.id);
            const total = items.reduce((acc, i) => acc + (i.price * i.qty), 0);

            return el('div', {
                className: 'book-card',
                style: { height: 'auto' }
            }, [
                el('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' } }, [
                   el('div', {}, [
                       el('b', {}, [`Sipariş: ${o.id}`]),
                       ' | ',
                       formatDate(o.date)
                   ]),
                   el('span', { 
                       className: 'badge',
                       style: { background: o.status === 'T' ? '#dcfce7' : '#fef3c7', color: o.status === 'T' ? 'green' : 'orange' } 
                   }, [statusMap[o.status]])
                ]),
                el('div', { style: { display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' } }, [
                    el('div', { style: { flex: 1 } }, [
                        el('p', { style: { fontWeight: 'bold' } }, [customer.name]),
                        el('p', { style: { fontSize: '0.8rem', color: '#666' } }, [customer.address.full])
                    ]),
                    el('div', { style: { textAlign: 'right' } }, [
                        el('p', {}, [`${items.length} ürün`]),
                        el('p', { style: { fontSize: '1.2rem', fontWeight: '800', color: 'var(--primary-dark)' } }, [formatPrice(total)])
                    ])
                ]),
                el('div', { style: { marginTop: '1rem', display: 'flex', gap: '0.5rem' } }, items.map(i => el('div', {
                    title: i.book.title,
                    style: { width: '40px', height: '60px', background: '#f3f4f6', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }
                }, [i.book.emoji])))
            ]);
        }))
    ]);
};
