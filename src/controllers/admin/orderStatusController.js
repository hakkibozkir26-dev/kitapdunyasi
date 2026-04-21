/**
 * orderStatusController.js - Sipariş durum yönetimi.
 */
import { el } from '../../utils/dom.js';
import { getOrders, updateOrderStatus } from '../../models/orderModel.js';
import { renderOrderStatusRow } from '../../views/admin/orderStatusView.js';
import { renderToast } from '../../views/components.js';

export class OrderStatusController {
    constructor() { this.page = 1; this.limit = 10; this.query = ''; }

    render() {
        let items = getOrders();
        if (this.query.length >= 2) {
            const q = this.query.toLowerCase();
            items = items.filter(o => o.id.toLowerCase().includes(q));
        }
        const totalPages = Math.ceil(items.length / this.limit);
        const start = (this.page - 1) * this.limit;
        const paged = items.slice(start, start + this.limit);

        return el('div', {}, [
            el('div', { className: 'crud-header' }, [
                el('input', { 
                    id: 'admin-search-input',
                    className: 'form-control', style: { maxWidth: '300px' }, placeholder: 'Sipariş ID ara...',
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
                })
            ]),
            el('div', { className: 'crud-table-container' }, [
                el('table', { className: 'crud-table' }, [
                    el('thead', {}, [
                        el('tr', {}, [el('th', {}, ['ID']), el('th', {}, ['Müşteri']), el('th', {}, ['Tarih']), el('th', {}, ['Durum']), el('th', {}, ['İşlem'])])
                    ]),
                    el('tbody', {}, paged.map(o => renderOrderStatusRow(o, (id, status) => this.handleUpdate(id, status))))
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

    handleUpdate(id, status) {
        updateOrderStatus(id, status);
        renderToast('✅ Sipariş durumu güncellendi');
        window.app.render();
    }
}
