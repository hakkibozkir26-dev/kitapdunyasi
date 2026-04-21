/**
 * publisherCrudController.js - Yayınevi CRUD.
 */
import { el } from '../../utils/dom.js';
import { getPublishers, createPublisher, updatePublisher, deletePublisher, canDeletePublisher } from '../../models/publisherModel.js';
import { renderPublisherRow, renderPublisherFormFields } from '../../views/admin/publisherCrudView.js';
import { renderFormModal } from '../../views/admin/formModalView.js';
import { renderConfirmModal } from '../../views/admin/confirmModalView.js';
import { renderToast } from '../../views/components.js';

export class PublisherCrudController {
    constructor() { this.page = 1; this.limit = 10; this.query = ''; }

    render() {
        let items = getPublishers();
        if (this.query.length >= 2) {
            const q = this.query.toLowerCase();
            items = items.filter(p => p.name.toLowerCase().includes(q));
        }
        const totalPages = Math.ceil(items.length / this.limit);
        const start = (this.page - 1) * this.limit;
        const paged = items.slice(start, start + this.limit);

        return el('div', {}, [
            el('div', { className: 'crud-header' }, [
                el('input', { 
                    id: 'admin-search-input',
                    className: 'form-control', style: { maxWidth: '300px' }, placeholder: 'Yayınevi ara...',
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
                el('button', { className: 'btn btn-primary', onclick: () => this.showForm() }, ['+ Yeni Yayınevi Ekle'])
            ]),
            el('div', { className: 'crud-table-container' }, [
                el('table', { className: 'crud-table' }, [
                    el('thead', {}, [
                        el('tr', {}, [el('th', {}, ['ID']), el('th', {}, ['İsim']), el('th', {}, ['E-mail']), el('th', {}, ['Website']), el('th', {}, ['İşlemler'])])
                    ]),
                    el('tbody', {}, paged.map(p => renderPublisherRow(p, (d) => this.showForm(d), (d) => this.askDelete(d))))
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
            title: data ? 'Yayınevini Düzenle' : 'Yeni Yayınevi Ekle',
            fields: renderPublisherFormFields(data),
            onSave: (formData, modal) => {
                if (data) {
                    updatePublisher(data.id, formData);
                    renderToast('✅ Yayınevi güncellendi');
                } else {
                    createPublisher(formData);
                    renderToast('✅ Yayınevi başarıyla eklendi');
                }
                modal.remove();
                window.app.render();
            }
        });
    }

    askDelete(p) {
        if (!canDeletePublisher(p.id)) {
            return renderToast(`❌ Hata: Bu yayınevinin kitapları var.`);
        }
        renderConfirmModal({
            title: 'Yayınevini Sil',
            message: `"${p.name}" yayınevini silmek istediğinize emin misiniz?`,
            onConfirm: () => {
                deletePublisher(p.id);
                renderToast('🗑️ Yayınevi silindi');
                window.app.render();
            }
        });
    }
}
