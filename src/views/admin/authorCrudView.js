/**
 * authorCrudView.js - Yazar CRUD arayüzü.
 */
import { el } from '../../utils/dom.js';

export const renderAuthorRow = (author, onEdit, onDelete) => {
    return el('tr', { dataset: { id: author.id } }, [
        el('td', {}, [author.id]),
        el('td', { style: { fontWeight: 'bold' } }, [author.name]),
        el('td', {}, [author.bio]),
        el('td', { className: 'action-btns' }, [
            el('button', { className: 'btn-icon btn-edit', onclick: () => onEdit(author) }, ['✏️']),
            el('button', { className: 'btn-icon btn-delete', onclick: () => onDelete(author) }, ['🗑️'])
        ])
    ]);
};

export const renderAuthorFormFields = (data = {}) => {
    const [name = '', surname = ''] = (data.name || '').split(' ');
    
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
                el('label', {}, ['Website']),
                el('input', { type: 'url', name: 'website', className: 'form-control', defaultValue: data.website || '' })
            ])
        ]),
        el('div', { className: 'form-group' }, [
            el('label', {}, ['Biyografi']),
            el('textarea', { name: 'bio_long', className: 'form-control', required: true, minLength: 50, style: { height: '120px' }, defaultValue: data.bio_long || '' })
        ])
    ];
};
