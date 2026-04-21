/**
 * headerView.js - ÜÜst menü ve navigasyon.
 */
import { el } from '../utils/dom.js';
import { getCart } from '../models/cartModel.js';
import { getFavs } from '../models/favModel.js';

export const renderHeader = ({ cartCount, favCount, theme }) => {
    const container = el('div', { className: 'header-inner' }, [
        el('a', { 
            href: '/', 
            className: 'logo',
            onclick: (e) => { e.preventDefault(); window.router.navigate('/'); }
        }, [
            'KitapDünyası',
            el('span', { className: 'admin-badge' }, ['SRP/MVC v1.1'])
        ]),
        el('form', { 
            className: 'search-bar',
            onsubmit: (e) => {
                e.preventDefault();
                const q = e.target.querySelector('input').value;
                window.router.navigate(`/?q=${encodeURIComponent(q)}`);
            }
        }, [
            el('input', { type: 'text', placeholder: 'Kitap, yazar veya yayınevi ara...', defaultValue: new URLSearchParams(location.search).get('q') || '' }),
            el('button', { type: 'submit' }, ['🔍'])
        ]),
        el('div', { className: 'nav-icons' }, [
            el('button', { 
                className: 'icon-btn',
                style: { display:'flex', flexDirection:'column', alignItems:'center', gap: '2px' },
                onclick: () => {
                   const siteTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
                   document.documentElement.dataset.theme = siteTheme;
                   localStorage.setItem('kd_theme', siteTheme);
                }
            }, [
                el('span', { style: { fontSize: '18px' } }, [theme === 'dark' ? '☀️' : '🌙']),
                el('span', { style: { fontSize: '10px' } }, ['Tema'])
            ]),
            el('a', { 
                href: '/favs', 
                className: 'icon-btn',
                style: { display:'flex', flexDirection:'column', alignItems:'center', gap: '2px' },
                onclick: (e) => { e.preventDefault(); window.router.navigate('/favs'); }
            }, [
                el('div', { style: { position: 'relative' } }, [
                    el('span', { style: { fontSize: '18px' } }, ['❤️']),
                    favCount > 0 ? el('span', { className: 'badge-count' }, [favCount]) : ''
                ]),
                el('span', { style: { fontSize: '10px' } }, ['Favoriler'])
            ]),
            el('a', { 
                href: '/cart', 
                className: 'icon-btn',
                style: { display:'flex', flexDirection:'column', alignItems:'center', gap: '2px' },
                onclick: (e) => { e.preventDefault(); window.router.navigate('/cart'); }
            }, [
                el('div', { style: { position: 'relative' } }, [
                    el('span', { style: { fontSize: '18px' } }, ['🛒']),
                    cartCount > 0 ? el('span', { className: 'badge-count' }, [cartCount]) : ''
                ]),
                el('span', { style: { fontSize: '10px' } }, ['Sepetim'])
            ]),
            el('a', {
                href: '/admin',
                className: 'icon-btn',
                style: { display:'flex', flexDirection:'column', alignItems:'center', gap: '2px' },
                onclick: (e) => { e.preventDefault(); window.router.navigate('/admin'); }
            }, [
                el('span', { style: { fontSize: '18px' } }, ['👤']),
                el('span', { style: { fontSize: '10px' } }, ['Hesabım'])
            ])
        ])
    ]);

    return [container];
};
