/**
 * orderStatusView.js - Sipariş durum güncelleme.
 */
import { el } from '../../utils/dom.js';
import { formatPrice, formatDate } from '../../utils/format.js';
import { getFullCustomer } from '../../models/customerModel.js';

export const renderOrderStatusRow = (o, onUpdateStatus) => {
    const customer = getFullCustomer(o.customerId);
    const statusMap = { 'H': 'Hazırlanıyor', 'K': 'Kargoda', 'T': 'Teslim Edildi' };
    
    return el('tr', { dataset: { id: o.id } }, [
        el('td', {}, [o.id]),
        el('td', {}, [customer ? customer.name : 'Unknown']),
        el('td', {}, [formatDate(o.date)]),
        el('td', {}, [
            el('span', { 
                className: 'badge',
                style: { background: o.status === 'T' ? '#dcfce7' : '#fef3c7', color: o.status === 'T' ? 'green' : 'orange' } 
            }, [statusMap[o.status]])
        ]),
        el('td', {}, [
            el('div', { style: { display: 'flex', gap: '0.5rem' } }, [
                el('button', { className: 'btn', style: { padding: '2px 5px', fontSize: '0.7rem' }, onclick: () => onUpdateStatus(o.id, 'H') }, ['H']),
                el('button', { className: 'btn', style: { padding: '2px 5px', fontSize: '0.7rem' }, onclick: () => onUpdateStatus(o.id, 'K') }, ['K']),
                el('button', { className: 'btn', style: { padding: '2px 5px', fontSize: '0.7rem' }, onclick: () => onUpdateStatus(o.id, 'T') }, ['T'])
            ])
        ])
    ]);
};
