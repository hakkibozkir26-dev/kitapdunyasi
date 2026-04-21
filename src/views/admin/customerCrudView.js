/**
 * customerCrudView.js - Müşteri CRUD.
 */
import { el } from '../../utils/dom.js';
import { sap_data } from '../../models/data.js';

export const renderCustomerRow = (c, onEdit, onDelete) => {
    return el('tr', { dataset: { id: c.id } }, [
        el('td', {}, [c.id]),
        el('td', { style: { fontWeight: 'bold' } }, [c.name]),
        el('td', {}, [c.phone]),
        el('td', {}, [c.email || '-']),
        el('td', { className: 'action-btns' }, [
            el('button', { className: 'btn-icon btn-edit', onclick: () => onEdit(c) }, ['✏️']),
            el('button', { className: 'btn-icon btn-delete', onclick: () => onDelete(c) }, ['🗑️'])
        ])
    ]);
};

export const renderCustomerFormFields = (data = {}) => {
    const [name = '', surname = ''] = (data.name || '').split(' ');
    const addresses = sap_data.addresses;

    return [
        el('div', { className: 'form-row' }, [
            el('div', { className: 'form-group' }, [
                el('label', {}, ['Ad']),
                el('input', { name: 'firstName', className: 'form-control', required: true, defaultValue: name })
            ]),
            el('div', { className: 'form-group' }, [
                el('label', {}, ['Soyad']),
                el('input', { name: 'lastName', className: 'form-control', required: true, defaultValue: surname })
            ])
        ]),
        el('div', { className: 'form-row' }, [
            el('div', { className: 'form-group' }, [
                el('label', {}, ['E-mail']),
                el('input', { type: 'email', name: 'email', className: 'form-control', defaultValue: data.email || '' })
            ]),
            el('div', { className: 'form-group' }, [
                el('label', {}, ['Telefon']),
                el('input', { 
                    name: 'phone', 
                    className: 'form-control', 
                    placeholder: '0532 000 0000',
                    required: true,
                    defaultValue: data.phone || '' 
                })
            ])
        ]),
        el('div', { className: 'form-group' }, [
            el('label', {}, ['Adres']),
            el('select', { name: 'addressId', className: 'form-control', required: true }, [
                el('option', { value: '' }, ['Seçiniz...']),
                ...addresses.map(a => el('option', { value: a.id, selected: a.id === data.addressId }, [a.id]))
            ])
        ])
    ];
};
