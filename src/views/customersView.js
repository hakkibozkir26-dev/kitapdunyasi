/**
 * customersView.js - Müşteriler ve adres zinciri.
 */
import { el } from '../utils/dom.js';
import { getCustomers, resolveAddressChain } from '../models/customerModel.js';

export const renderCustomers = () => {
    const customers = getCustomers();

    return el('div', {}, [
        el('h1', { style: { marginBottom: '1rem' } }, ['Müşteri Veritabanı']),
        el('p', { style: { marginBottom: '2rem', color: '#666' } }, ['Aşağıdaki müşteriler SAP ABAP sistemindeki FK ilişkileri (Join) üzerinden çözümlenmiştir.']),
        el('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' } }, customers.map(c => {
            const addr = resolveAddressChain(c.addressId);
            return el('div', { className: 'book-card', style: { height: 'auto' } }, [
                el('h3', {}, [c.name]),
                el('p', { style: { color: 'var(--primary-dark)', fontSize: '0.9rem' } }, [c.phone]),
                el('hr', { style: { margin: '0.5rem 0', border: 'none', borderTop: '1px dashed var(--border)' } }),
                el('div', { style: { fontSize: '0.8rem' } }, [
                    el('div', {}, [el('b', {}, ['Ülke: ']), addr.details.country.name]),
                    el('div', {}, [el('b', {}, ['İl: ']), addr.details.state.name]),
                    el('div', {}, [el('b', {}, ['İlçe: ']), addr.details.city.name]),
                    el('div', {}, [el('b', {}, ['Cadde: ']), addr.details.street.name]),
                    el('div', {}, [el('b', {}, ['Adres: ']), `No:${addr.details.addr.houseNo} D:${addr.details.addr.flatNo}`])
                ])
            ]);
        }))
    ]);
};
