/**
 * sidebarView.js - Yan menü navigasyonu.
 */
import { el } from '../utils/dom.js';

export const renderSidebar = () => {
    const navItems = [
        { path: '/', label: 'Tüm Kitaplar', icon: '📚' },
        { path: '/authors', label: 'Yazarlar', icon: '✒️' },
        { path: '/publishers', label: 'Yayınevleri', icon: '🏢' },
        { path: '/orders', label: 'Siparişler', icon: '📦' },
        { path: '/customers', label: 'Müşteriler', icon: '👥' },
        { path: '/admin', label: 'Admin Paneli', icon: '⚙️' }
    ];

    const currentPath = window.location.pathname;

    return el('nav', {}, navItems.map(item => el('div', {
        className: `nav-item ${currentPath === item.path ? 'active' : ''}`,
        onclick: () => window.router.navigate(item.path)
    }, [
        el('span', { className: 'nav-icon' }, [item.icon]),
        el('span', { className: 'nav-text' }, [` ${item.label}`])
    ])));
};
