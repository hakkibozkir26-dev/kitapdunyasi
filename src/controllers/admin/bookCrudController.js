/**
 * bookCrudController.js - Kitap CRUD yönetimi.
 */
import { el } from '../../utils/dom.js';
import { getBooks, createBook, updateBook, deleteBook } from '../../models/bookModel.js';
import { renderBookRow, renderBookFormFields } from '../../views/admin/bookCrudView.js';
import { renderFormModal } from '../../views/admin/formModalView.js';
import { renderConfirmModal } from '../../views/admin/confirmModalView.js';
import { renderToast } from '../../views/components.js';

export class BookCrudController {
    constructor() {
        this.page = 1;
        this.limit = 10;
        this.query = '';
    }

    render() {
        let items = getBooks();
        if (this.query.length >= 2) {
            const q = this.query.toLowerCase();
            items = items.filter(b => b.title.toLowerCase().includes(q));
        }

        const totalPages = Math.ceil(items.length / this.limit);
        const start = (this.page - 1) * this.limit;
        const paged = items.slice(start, start + this.limit);

        return el('div', {}, [
            el('div', { className: 'crud-header' }, [
                el('input', { 
                    id: 'admin-search-input',
                    className: 'form-control', 
                    style: { maxWidth: '300px' },
                    placeholder: 'Kitap ara...',
                    defaultValue: this.query,
                    oninput: (e) => { 
                        this.query = e.target.value; 
                        this.page = 1; 
                        window.app.render();
                        // Restore focus
                        setTimeout(() => {
                            const input = document.getElementById('admin-search-input');
                            if (input) {
                                input.focus();
                                input.setSelectionRange(input.value.length, input.value.length);
                            }
                        }, 0);
                    }
                }),
                el('button', { className: 'btn btn-primary', onclick: () => this.showForm() }, ['+ Yeni Kitap Ekle'])
            ]),
            el('div', { className: 'crud-table-container' }, [
                el('table', { className: 'crud-table' }, [
                    el('thead', {}, [
                        el('tr', {}, [
                            el('th', {}, ['ID']), el('th', {}, ['Başlık']), el('th', {}, ['Yazar']), 
                            el('th', {}, ['Kategori']), el('th', {}, ['Fiyat']), el('th', {}, ['Stok']), 
                            el('th', {}, ['İşlemler'])
                        ])
                    ]),
                    el('tbody', {}, paged.map(b => renderBookRow(b, (d) => this.showForm(d), (d) => this.askDelete(d))))
                ])
            ]),
            this.renderPagination(totalPages)
        ]);
    }

    renderPagination(totalPages) {
        return el('div', { className: 'pagination' }, [
            el('button', { disabled: this.page <= 1, className: 'btn', onclick: () => { this.page--; window.app.render(); } }, ['◄ Önceki']),
            el('span', { className: 'page-info' }, [`Sayfa ${this.page} / ${totalPages || 1}`]),
            el('button', { disabled: this.page >= totalPages, className: 'btn', onclick: () => { this.page++; window.app.render(); } }, ['Sonraki ►'])
        ]);
    }

    showForm(data = null) {
        const title = data ? 'Kitabı Düzenle' : 'Yeni Kitap Ekle';
        renderFormModal({
            title,
            fields: renderBookFormFields(data),
            onSave: (formData, modal) => {
                // Date format conversion YYYY-MM-DD -> YYYYMMDD
                if (formData.date) formData.date = formData.date.replace(/-/g, '');
                formData.price = parseFloat(formData.price);
                formData.pages = parseInt(formData.pages);

                if (data) {
                    updateBook(data.id, { ...data, ...formData });
                    renderToast('✅ Kitap güncellendi');
                } else {
                    createBook(formData);
                    renderToast('✅ Kitap başarıyla eklendi');
                }
                modal.remove();
                window.app.render();
            }
        });
    }

    askDelete(book) {
        renderConfirmModal({
            title: 'Kitabı Sil',
            message: `"${book.title}" kitabını silmek istediğinize emin misiniz? Bu işlem geri alınamaz.`,
            onConfirm: () => {
                deleteBook(book.id);
                renderToast('🗑️ Kitap silindi');
                window.app.render();
            }
        });
    }
}
