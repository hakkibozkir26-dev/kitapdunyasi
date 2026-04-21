/**
 * customerCrudController.js - Müşteri CRUD yönetimi.
 */
import { el } from '../../utils/dom.js';
import { getCustomers, createCustomer, updateCustomer, deleteCustomer } from '../../models/customerModel.js';
import { renderCustomerRow, renderCustomerFormFields } from '../../views/admin/customerCrudView.js';
import { renderFormModal } from '../../views/admin/formModalView.js';
import { renderConfirmModal } from '../../views/admin/confirmModalView.js';
import { renderToast } from '../../views/components.js';

export class CustomerCrudController {
    constructor() { this.page = 1; this.limit = 10; this.query = ''; }

    render() {
        let items = getCustomers();
        if (this.query.length >= 2) {
            const q = this.query.toLowerCase();
            items = items.filter(c => c.name.toLowerCase().includes(q));
        }
        const totalPages = Math.ceil(items.length / this.limit);
        const start = (this.page - 1) * this.limit;
        const paged = items.slice(start, start + this.limit);

        return el('div', {}, [
            el('div', { className: 'crud-header' }, [
                el('input', { 
                    id: 'admin-search-input',
                    className: 'form-control', style: { maxWidth: '300px' }, placeholder: 'Müşteri ara...',
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
                el('button', { className: 'btn btn-primary', onclick: () => this.showForm() }, ['+ Yeni Müşteri Ekle'])
            ]),
            el('div', { className: 'crud-table-container' }, [
                el('table', { className: 'crud-table' }, [
                    el('thead', {}, [
                        el('tr', {}, [el('th', {}, ['ID']), el('th', {}, ['İsim']), el('th', {}, ['Telefon']), el('th', {}, ['E-mail']), el('th', {}, ['İşlemler'])])
                    ]),
                    el('tbody', {}, paged.map(c => renderCustomerRow(c, (d) => this.showForm(d), (d) => this.askDelete(d))))
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
            title: data ? 'Müşteriyi Düzenle' : 'Yeni Müşteri Ekle',
            fields: renderCustomerFormFields(data),
            onSave: (formData, modal) => {
                const customerData = {
                    ...formData,
                    name: `${formData.firstName} ${formData.lastName}`
                };
                delete customerData.firstName;
                delete customerData.lastName;

                if (data) {
                    updateCustomer(data.id, customerData);
                    renderToast('✅ Müşteri güncellendi');
                } else {
                    createCustomer(customerData);
                    renderToast('✅ Müşteri başarıyla eklendi');
                }
                modal.remove();
                window.app.render();
            }
        });
    }

    askDelete(c) {
        renderConfirmModal({
            title: 'Müşteriyi Sil',
            message: `"${c.name}" müşterisini silmek istediğinize emin misiniz?`,
            onConfirm: () => {
                deleteCustomer(c.id);
                renderToast('🗑️ Müşteri silindi');
                window.app.render();
            }
        });
    }
}
