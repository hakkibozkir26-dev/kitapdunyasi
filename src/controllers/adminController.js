/**
 * adminController.js - Admin girişi.
 */
import { renderModal, renderToast } from '../views/components.js';
import { el } from '../utils/dom.js';

export const handleLogin = () => {
    const input = el('input', { 
        type: 'password', 
        placeholder: 'Admin Şifresi', 
        style: { width: '100%', padding: '0.5rem', border: '1px solid #ccc' } 
    });

    renderModal(
        'Yönetici Girişi',
        el('div', {}, [
            el('p', { style: { marginBottom: '0.5rem', fontSize: '0.8rem' } }, ['Lütfen "admin" yazın']),
            input
        ]),
        () => {
            if (input.value === 'admin') {
                sessionStorage.setItem('kd_admin', 'true');
                window.app.render();
            } else {
                renderToast('Yanlış şifre!');
            }
        }
    );
};
