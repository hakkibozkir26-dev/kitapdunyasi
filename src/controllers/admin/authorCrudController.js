/**
 * authorCrudController.js - Yazar CRUD yönetimi.
 */
import { el } from '../../utils/dom.js';
import { getAuthors, createAuthor, updateAuthor, deleteAuthor, canDeleteAuthor } from '../../models/authorModel.js';
import { renderAuthorRow, renderAuthorFormFields } from '../../views/admin/authorCrudView.js';
import { renderFormModal } from '../../views/admin/formModalView.js';
import { renderConfirmModal } from '../../views/admin/confirmModalView.js';
import { renderToast } from '../../views/components.js';

export class AuthorCrudController {
    constructor() { this.page = 1; this.limit = 10; this.query = ''; }

    render() {
        let items = getAuthors();
        if (this.query.length >= 2) {
            const q = this.query.toLowerCase();
            items = items.filter(a => a.name.toLowerCase().includes(q));
        }
        const totalPages = Math.ceil(items.length / this.limit);
        const start = (this.page - 1) * this.limit;
        const paged = items.slice(start, start + this.limit);

        return el('div', {}, [
            el('div', { className: 'crud-header' }, [
                el('input', { 
                    id: 'admin-search-input',
                    className: 'form-control', style: { maxWidth: '300px' }, placeholder: 'Yazar ara...',
                    defaultValue: this.query,
                    oninput: (e) => { 
                        this.query = e.target.value; 
                        this.page = 1; 
                        window.app.render();
                        setTimeout(() => {
                            const input = document.getElementById('admin-search-input');
                            if (input) {
                                input.focus();
                                input.setSelectionRange(input.value.length, input.value.length);
                            }
                        }, 0);
                    }
                }),
                el('button', { className: 'btn btn-primary', onclick: () => this.showForm() }, ['+ Yeni Yazar Ekle'])
            ]),
            el('div', { className: 'crud-table-container' }, [
                el('table', { className: 'crud-table' }, [
                    el('thead', {}, [
                        el('tr', {}, [el('th', {}, ['ID']), el('th', {}, ['İsim']), el('th', {}, ['Biyo']), el('th', {}, ['İşlemler'])])
                    ]),
                    el('tbody', {}, paged.map(a => renderAuthorRow(a, (d) => this.showForm(d), (d) => this.askDelete(d))))
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
        renderFormModal({
            title: data ? 'Yazarı Düzenle' : 'Yeni Yazar Ekle',
            fields: renderAuthorFormFields(data),
            onSave: (formData, modal) => {
                const authorData = {
                    name: `${formData.firstName} ${formData.lastName}`,
                    bio: formData.bio_long.substring(0, 30) + '...',
                    bio_long: formData.bio_long,
                    email: formData.email,
                    website: formData.website,
                    image: data ? data.image : 'https://picsum.photos/seed/author/200/200'
                };
                if (data) {
                    updateAuthor(data.id, authorData);
                    renderToast('✅ Yazar güncellendi');
                } else {
                    createAuthor(authorData);
                    renderToast('✅ Yazar başarıyla eklendi');
                }
                modal.remove();
                window.app.render();
            }
        });
    }

    askDelete(author) {
        if (!canDeleteAuthor(author.id)) {
            return renderToast(`❌ Hata: Bu yazarın kitapları var. Önce kitapları silin.`);
        }
        renderConfirmModal({
            title: 'Yazarı Sil',
            message: `"${author.name}" yazarını silmek istediğinize emin misiniz?`,
            onConfirm: () => {
                deleteAuthor(author.id);
                renderToast('🗑️ Yazar silindi');
                window.app.render();
            }
        });
    }
}
