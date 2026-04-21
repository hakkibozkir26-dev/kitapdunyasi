/**
 * bookCrudView.js - Kitap CRUD arayüzü.
 */
import { el } from '../../utils/dom.js';
import { getAuthors } from '../../models/authorModel.js';
import { getPublishers } from '../../models/publisherModel.js';
import { formatPrice } from '../../utils/format.js';

export const renderBookRow = (book, onEdit, onDelete) => {
    const author = getAuthors().find(a => a.id === book.authorId);
    return el('tr', { dataset: { id: book.id } }, [
        el('td', {}, [book.id]),
        el('td', { style: { fontWeight: 'bold' } }, [book.title]),
        el('td', {}, [author ? author.name : 'Unknown']),
        el('td', {}, [book.category]),
        el('td', {}, [formatPrice(book.price)]),
        el('td', {}, [book.stock ? '✅' : '❌']),
        el('td', { className: 'action-btns' }, [
            el('button', { className: 'btn-icon btn-edit', onclick: () => onEdit(book) }, ['✏️']),
            el('button', { className: 'btn-icon btn-delete', onclick: () => onDelete(book) }, ['🗑️'])
        ])
    ]);
};

export const renderBookFormFields = (data = {}) => {
    const authors = getAuthors();
    const publishers = getPublishers();
    const categories = ['Roman', 'Psikoloji', 'Tarih', 'Mizah', 'Polisiye', 'Klasik', 'Anı'];

    return [
        el('div', { className: 'form-group' }, [
            el('label', {}, ['Kitap Başlığı']),
            el('input', { name: 'title', className: 'form-control', required: true, minLength: 3, defaultValue: data.title || '' })
        ]),
        el('div', { className: 'form-row' }, [
            el('div', { className: 'form-group' }, [
                el('label', {}, ['Yazar']),
                el('select', { name: 'authorId', className: 'form-control', required: true }, [
                    el('option', { value: '' }, ['Seçiniz...']),
                    ...authors.map(a => el('option', { value: a.id, selected: a.id === data.authorId }, [a.name]))
                ])
            ]),
            el('div', { className: 'form-group' }, [
                el('label', {}, ['Yayınevi']),
                el('select', { name: 'publisherId', className: 'form-control', required: true }, [
                    el('option', { value: '' }, ['Seçiniz...']),
                    ...publishers.map(p => el('option', { value: p.id, selected: p.id === data.publisherId }, [p.name]))
                ])
            ])
        ]),
        el('div', { className: 'form-row' }, [
            el('div', { className: 'form-group' }, [
                el('label', {}, ['Kategori']),
                el('select', { name: 'category', className: 'form-control' }, categories.map(c => el('option', { value: c, selected: c === data.category }, [c])))
            ]),
            el('div', { className: 'form-group' }, [
                el('label', {}, ['Fiyat (TL)']),
                el('input', { type: 'number', name: 'price', className: 'form-control', required: true, min: 1, max: 9999, defaultValue: data.price || '' })
            ])
        ]),
        el('div', { className: 'form-row' }, [
            el('div', { className: 'form-group' }, [
                el('label', {}, ['Sayfa Sayısı']),
                el('input', { type: 'number', name: 'pages', className: 'form-control', required: true, min: 1, defaultValue: data.pages || '' })
            ]),
            el('div', { className: 'form-group' }, [
                el('label', {}, ['Yayın Tarihi']),
                el('input', { type: 'date', name: 'date', className: 'form-control', defaultValue: data.date ? `${data.date.substring(0,4)}-${data.date.substring(4,6)}-${data.date.substring(6,8)}` : '' })
            ])
        ]),
        el('div', { className: 'form-row' }, [
            el('div', { className: 'form-group' }, [
                el('label', {}, ['Emoji']),
                el('input', { name: 'emoji', className: 'form-control', maxLength: 2, placeholder: '📖', defaultValue: data.emoji || '📖' })
            ]),
            el('div', { className: 'form-group', style: { flexDirection: 'row', alignItems: 'center', gap: '0.5rem', marginTop: '1.5rem' } }, [
                el('input', { type: 'checkbox', name: 'stock', id: 'stock-cb', checked: data.stock !== false }),
                el('label', { htmlFor: 'stock-cb' }, ['Stokta Var'])
            ])
        ]),
        el('div', { className: 'form-group' }, [
            el('label', {}, ['Açıklama']),
            el('textarea', { name: 'desc', className: 'form-control', required: true, minLength: 20, style: { height: '80px' }, defaultValue: data.desc || '' })
        ])
    ];
};
