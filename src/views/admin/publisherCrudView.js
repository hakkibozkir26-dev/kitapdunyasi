/**
 * publisherCrudView.js - Yayınevi CRUD arayüzü.
 */
import { el } from '../../utils/dom.js';

export const renderPublisherRow = (p, onEdit, onDelete) => {
    return el('tr', { dataset: { id: p.id } }, [
        el('td', {}, [p.id]),
        el('td', { style: { fontWeight: 'bold' } }, [p.name]),
        el('td', {}, [p.email || '-']),
        el('td', {}, [p.website || '-']),
        el('td', { className: 'action-btns' }, [
            el('button', { className: 'btn-icon btn-edit', onclick: () => onEdit(p) }, ['✏️']),
            el('button', { className: 'btn-icon btn-delete', onclick: () => onDelete(p) }, ['🗑️'])
        ])
    ]);
};

export const renderPublisherFormFields = (data = {}) => {
    return [
        el('div', { className: 'form-group' }, [
            el('label', {}, ['Yayınevi Adı']),
            el('input', { name: 'name', className: 'form-control', required: true, defaultValue: data.name || '' })
        ]),
        el('div', { className: 'form-row' }, [
            el('div', { className: 'form-group' }, [
                el('label', {}, ['E-mail']),
                el('input', { type: 'email', name: 'email', className: 'form-control', defaultValue: data.email || '' })
            ]),
            el('div', { className: 'form-group' }, [
                el('label', {}, ['Website']),
                el('input', { type: 'url', name: 'website', className: 'form-control', defaultValue: data.website || '' })
            ])
        ])
    ];
};
