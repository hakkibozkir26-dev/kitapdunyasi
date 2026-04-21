/**
 * crudController.js - Ortak CRUD yardımcısı.
 */
import { el } from '../../utils/dom.js';

export class CrudController {
    constructor(entityName, model, renderRow, renderFormFields, validate = null) {
        this.entityName = entityName;
        this.model = model;
        this.renderRow = renderRow;
        this.renderFormFields = renderFormFields;
        this.validate = validate;
        this.page = 1;
        this.limit = 10;
        this.query = '';
    }

    renderTable(items) {
        let filtered = items;
        if (this.query.length >= 2) {
            const q = this.query.toLowerCase();
            filtered = items.filter(item => {
                const searchStr = Object.values(item).join(' ').toLowerCase();
                return searchStr.includes(q);
            });
        }

        const totalPages = Math.ceil(filtered.length / this.limit);
        const start = (this.page - 1) * this.limit;
        const end = start + this.limit;
        const paginated = filtered.slice(start, end);

        const tableBody = el('tbody', {}, paginated.map(item => this.renderRow(item, (d) => this.handleEdit(d), (d) => this.handleDelete(d))));

        const header = el('div', { className: 'crud-header' }, [
            el('div', { style: { display: 'flex', gap: '1rem', flex: 1 } }, [
                el('input', { 
                    className: 'form-control', 
                    style: { maxWidth: '300px' },
                    placeholder: 'Ara...',
                    oninput: (e) => {
                        this.query = e.target.value;
                        this.page = 1;
                        window.app.render();
                    }
                })
            ]),
            el('button', { 
                className: 'btn btn-primary',
                onclick: () => this.handleCreate()
            }, [`+ Yeni ${this.entityName} Ekle`])
        ]);

        const table = el('div', { className: 'crud-table-container' }, [
            el('table', { className: 'crud-table' }, [
                this.getTableHeader(),
                tableBody
            ])
        ]);

        const pagination = el('div', { className: 'pagination' }, [
            el('button', { 
                className: 'btn', 
                disabled: this.page === 1,
                onclick: () => { this.page--; window.app.render(); }
            }, ['◄ Önceki']),
            el('span', { className: 'page-info' }, [`Sayfa ${this.page} / ${totalPages || 1}`]),
            el('button', { 
                className: 'btn', 
                disabled: this.page >= totalPages,
                onclick: () => { this.page++; window.app.render(); }
            }, ['Sonraki ►'])
        ]);

        return el('div', {}, [header, table, pagination]);
    }

    getTableHeader() {
        // override in children or use generic
        return el('thead', {}, [
            el('tr', {}, [el('th', {}, ['ID']), el('th', {}, ['İsim/Başlık']), el('th', {}, ['İşlemler'])])
        ]);
    }

    handleCreate() {
        // Implementation in child or specific view
    }

    handleEdit(data) {
        // Implementation in child
    }

    handleDelete(data) {
        // Implementation in child
    }
}
