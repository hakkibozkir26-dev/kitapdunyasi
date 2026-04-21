/**
 * adminTabsView.js - Admin üst sekme barı.
 */
import { el } from '../../utils/dom.js';

export const renderAdminTabs = (activeTab = 'dashboard') => {
    const tabs = [
        { id: 'dashboard', label: '📊 Dashboard', path: '/admin' },
        { id: 'books', label: '📚 Kitaplar', path: '/admin/books' },
        { id: 'authors', label: '✒️ Yazarlar', path: '/admin/authors' },
        { id: 'publishers', label: '🏢 Yayınevleri', path: '/admin/publishers' },
        { id: 'customers', label: '👥 Müşteriler', path: '/admin/customers' },
        { id: 'orders', label: '📦 Siparişler', path: '/admin/orders' }
    ];

    return el('div', { className: 'admin-tabs' }, tabs.map(tab => el('a', {
        className: `admin-tab ${activeTab === tab.id ? 'active' : ''}`,
        onclick: (e) => {
            e.preventDefault();
            window.router.navigate(tab.path);
        }
    }, [tab.label])));
};
